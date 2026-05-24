import { BaseManager } from './BaseManager';
import { Donation, RawDonationData } from '../structures/Donation';
import { SkipDonationResponse } from '../types';

export interface FetchDonationsOptions {
    skip: number;
    take: number;
    query?: string;
    hideTest?: boolean;
}

export interface TestDonationOptions {
    username: string;
    message?: string;
    amount: number;
    currency: string;
    withAIResponse?: boolean;
}

export class DonationManager extends BaseManager {

    async fetch(options: FetchDonationsOptions): Promise<Donation[]> {
        const data = await this.client.rest.get<RawDonationData[]>('/v1/donations', options);
        return data.map(d => new Donation(this.client, d));
    }

    async sendTest(data: TestDonationOptions): Promise<void> {
        await this.client.rest.post('/v1/test-donation', data);
    }

    async skip(id?: string): Promise<SkipDonationResponse | void> {
        if (id) {
            return await this.client.rest.post(`/v1/donations/${id}/skip`);
        }
        return await this.client.rest.post<SkipDonationResponse>('/v1/donations/skip-current');
    }
}