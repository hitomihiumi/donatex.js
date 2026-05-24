import { Client } from '../client/Client';
import { Base } from './Base';
import { Webhook } from '../types';

export class WebhookSubscription extends Base implements Webhook {
    public url: string;
    public clientId: string;
    public eventType: string;
    public isActive: boolean;
    public failureCount: number;

    constructor(client: Client, data: Webhook) {
        super(client, data);
        this.url = data.url;
        this.clientId = data.clientId;
        this.eventType = data.eventType;
        this.isActive = data.isActive;
        this.failureCount = data.failureCount;
    }

    public async delete(): Promise<void> {
        return await this.client.webhooks.delete(this.id);
    }

    public async activate(): Promise<void> {
        return await this.client.webhooks.activate(this.id);
        this.isActive = true;
        this.failureCount = 0;
    }
}