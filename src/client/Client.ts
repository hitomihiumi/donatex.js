import { EventEmitter } from 'events';
import { REST } from '../rest/REST';
import { GatewayConnection } from '../gateway/GatewayConnection';
import { DonationManager } from '../managers/DonationManager';
import { ProfileManager } from '../managers/ProfileManager';
import { MusicManager } from '../managers/MusicManager';
import { WebhookManager } from '../managers/WebhookManager';
import { Donation } from '../structures/Donation';
import { Profile } from '../structures/Profile';

export declare interface Client {
    on(event: 'ready', listener: () => void): this;
    on(event: 'DonationCreated', listener: (donation: Donation) => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'disconnected', listener: () => void): this;
}

export class Client extends EventEmitter {
    public readonly rest: REST;
    public readonly ws: GatewayConnection;

    public readonly donations: DonationManager;
    public readonly profiles: ProfileManager;
    public readonly music: MusicManager;
    public readonly webhooks: WebhookManager;

    public user: Profile | null = null;

    private token!: string | null;

    constructor() {
        super();

        Object.defineProperty(this, 'token', {
            writable: true,
            enumerable: false,
            configurable: true,
            value: null
        });

        this.rest = new REST();
        this.ws = new GatewayConnection();

        this.donations = new DonationManager(this);
        this.profiles = new ProfileManager(this);
        this.music = new MusicManager(this);
        this.webhooks = new WebhookManager(this);

        this.ws.on('ready', () => this.emit('ready'));
        this.ws.on('error', (err: Error) => this.emit('error', err));
        this.ws.on('disconnected', () => this.emit('disconnected'));

        this.ws.on('DonationCreated', (rawData: any) => {
            const donation = new Donation(this, rawData);
            this.emit('DonationCreated', donation);
        });
    }

    public async login(token: string): Promise<string> {
        this.token = token;
        this.rest.setToken(token);

        try {
            this.user = await this.profiles.fetch();

            await this.ws.connect(token);

            return this.token;
        } catch (err) {
            throw new Error(`[DonateX Client] Failed to login: ${err}`);
        }
    }

    public async destroy(): Promise<void> {
        await this.ws.disconnect();
        this.token = null;
        this.user = null;
    }
}