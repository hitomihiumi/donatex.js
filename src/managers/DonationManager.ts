import { Client } from '../client/Client';
import { Donation } from '../structures/Donation';

/**
 * Options for fetching a list of donations.
 */
export interface FetchDonationOptions {
    skip?: number;
    take?: number;
    query?: string;
    hideTest?: boolean;
}

/**
 * Manages API methods for donations.
 */
export class DonationManager {
    /**
     * The client that instantiated this Manager.
     */
    public readonly client: Client;

    /**
     * @param client - The instantiating client.
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Fetches a list of donations.
     * 
     * @param options - Pagination options for fetching donations.
     * @returns A promise that resolves with an array of Donation objects.
     */
    public async fetch(options?: FetchDonationOptions): Promise<Array<Donation>> {
        const params: Record<string, any> = {
            skip: 0,
            take: 100,
        };
        if (options?.skip) params.skip = options.skip;
        if (options?.take) params.take = options.take;
        if (options?.query) params.query = options.query;
        if (options?.hideTest) params.hideTest = options.hideTest;

        const response = await this.client.rest.get('/donations', params);
        
        // Handle paginated response wrapper if necessary
        const items = response.data || response;
        
        if (Array.isArray(items)) {
            return items.map((data: any) => new Donation(this.client, data));
        }
        
        return [];
    }
}

