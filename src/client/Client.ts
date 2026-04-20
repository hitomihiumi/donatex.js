import { EventEmitter } from 'events';
import { REST } from '../rest/REST';
import { DonationManager } from '../managers/DonationManager';
import { ProfileManager } from '../managers/ProfileManager';
import { GatewayConnection } from '../gateway/GatewayConnection';

/**
 * Options for the DonateX client.
 */
export interface ClientOptions {
    /**
     * The API token used for authentication.
     */
    token: string;
}

/**
 * The main hub for interacting with the donatex.gg API.
 */
export class Client extends EventEmitter {
    /**
     * The REST manager of the client.
     */
    public readonly rest: REST;

    /**
     * The donation manager for the client.
     */
    public readonly donations: DonationManager;

    /**
     * The profile manager for the client.
     */
    public readonly profiles: ProfileManager;

    /**
     * Managed realtime gateway connection.
     */
    public readonly gateway: GatewayConnection;

    /**
     * The token used for authenticating with the API.
     */
    public token!: string | null;

    /**
     * @param options - Options for the client.
     */
    constructor(options?: Partial<ClientOptions>) {
        super();

        // Define token as non-enumerable so it doesn't show up in console logs or object iterations
        Object.defineProperty(this, 'token', {
            writable: true,
            enumerable: false,
            configurable: true,
            value: null
        });

        this.rest = new REST(this);
        this.donations = new DonationManager(this);
        this.profiles = new ProfileManager(this);
        this.gateway = new GatewayConnection(this);

        if (options?.token) {
            this.token = options.token;
        }
    }

    /**
     * Logs in to the donatex.gg API.
     * 
     * @param token - The token to login with.
     * @returns A promise that resolves to the token when login is successful.
     */
    public async login(token?: string): Promise<string> {
        if (!token && !this.token) {
            throw new Error('TOKEN_MISSING: A token is required to login.');
        }

        this.token = token || this.token;
        this.rest.setToken(this.token as string);

        // Fetch profile to verify token
        await this.profiles.fetch();

        // Connect realtime gateway
        await this.gateway.connect();

        this.emit('ready', this);
        return this.token as string;
    }
}
