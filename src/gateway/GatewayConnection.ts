import * as signalR from '@microsoft/signalr';
import { Client } from '../client/Client';
import { Donation } from '../structures/Donation';

/**
 * Manages the real-time Gateway connection to the donatex.gg API using SignalR.
 */
export class GatewayConnection {
    /**
     * The client that instantiated this connection.
     */
    public readonly client: Client;

    /**
     * The internal SignalR HubConnection.
     */
    private connection: signalR.HubConnection | null = null;

    /**
     * The URL of the donation hub.
     */
    private readonly hubUrl: string = 'https://donatex.gg/api/public-donations-hub';

    /**
     * @param client - The instantiating client.
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Connects to the donatex.gg Real-Time Gateway.
     *
     * @returns A promise that resolves when the connection is strictly established.
     */
    public async connect(): Promise<void> {
        if (!this.client.token) {
            throw new Error('TOKEN_MISSING: Cannot connect to internal gateway without a token.');
        }

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl, {
                accessTokenFactory: () => this.client.token as string
            })
            .withAutomaticReconnect()
            .build();

        this.connection.on('DonationCreated', (data: any) => {
            const donation = new Donation(this.client, data);
            this.client.emit('donationCreate', donation);
        });

        try {
            await this.connection.start();
            this.client.emit('gatewayReady');
        } catch (err) {
             throw new Error(`GATEWAY_FAILED: Failed to connect to Gateway - ${err}`);
        }
    }

    /**
     * Disconnects from the Gateway.
     */
    public async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
        }
    }
}

