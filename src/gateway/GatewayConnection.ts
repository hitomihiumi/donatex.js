import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';
import { EventEmitter } from 'events';
import { RawDonationData } from '../structures/Donation';

export declare interface GatewayConnection {
    on(event: 'ready', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    on(event: 'disconnected', listener: () => void): this;
    on(event: 'DonationCreated', listener: (donationData: RawDonationData) => void): this;
}

export class GatewayConnection extends EventEmitter {
    private connection: HubConnection | null = null;

    constructor() {
        super();
    }

    public async connect(token: string): Promise<void> {
        this.connection = new HubConnectionBuilder()
            .withUrl(`https://donatex.gg/api/public-donations-hub?access_token=${encodeURIComponent(token)}`)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.connection.on('DonationCreated', (donationData: RawDonationData) => {
            this.emit('DonationCreated', donationData);
        });

        try {
            await this.connection.start();
            this.emit('ready');
        } catch (error) {
            this.emit('error', error as Error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            this.connection = null;
            this.emit('disconnected');
        }
    }
}