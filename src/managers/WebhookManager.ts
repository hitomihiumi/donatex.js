import { BaseManager } from './BaseManager';
import { WebhookSubscription } from '../structures/WebhookSubscription';
import { Webhook, CreateWebhookResponse } from '../types';

export interface CreateWebhookOptions {
    url: string;
    secret: string;
    eventType: 'DonationCreated';
    clientId?: string;
}

export class WebhookManager extends BaseManager {

    async fetch(): Promise<WebhookSubscription[]> {
        const data = await this.client.rest.get<Webhook[]>('/v1/webhooks/subscriptions');
        return data.map(sub => new WebhookSubscription(this.client, sub));
    }

    async create(data: CreateWebhookOptions): Promise<WebhookSubscription> {
        const sub = await this.client.rest.post<CreateWebhookResponse>('/v1/webhooks/subscriptions', data);
        return new WebhookSubscription(this.client, sub);
    }

    async delete(subscriptionId: string): Promise<void> {
        await this.client.rest.delete(`/v1/webhooks/subscriptions/${subscriptionId}`);
    }

    async activate(subscriptionId: string): Promise<void> {
        await this.client.rest.post(`/v1/webhooks/subscriptions/${subscriptionId}/activate`);
    }
}