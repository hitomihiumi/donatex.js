import { Client } from '../client/Client';

/**
 * Represents a base structure for all models returned by the API.
 */
export abstract class Base {
    /**
     * The client that instantiated this structure.
     */
    public readonly client: Client;

    /**
     * @param client - The instantiating client.
     */
    constructor(client: Client) {
        this.client = client;
    }
}

