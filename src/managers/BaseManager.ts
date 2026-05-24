import { Client } from '../client/Client';

export abstract class BaseManager {
    public readonly client!: Client;

    constructor(client: Client) {
        Object.defineProperty(this, 'client', { value: client });
    }
}