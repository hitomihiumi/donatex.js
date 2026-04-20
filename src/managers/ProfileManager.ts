import { Client } from '../client/Client';
import { Profile } from '../structures/Profile';

/**
 * Manages API methods for user profiles.
 */
export class ProfileManager {
    /**
     * The client that instantiated this Manager.
     */
    public readonly client: Client;

    /**
     * The cached profile of the currently authenticated user.
     */
    public current: Profile | null = null;

    /**
     * @param client - The instantiating client.
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Fetches the current user's profile from the API.
     *
     * @returns A promise that resolves with the Profile object.
     */
    public async fetch(): Promise<Profile> {
        // According to common API standards, endpoint is likely /user or /profile
        // Please adjust to match donatex.gg API exactly if needed.
        const response = await this.client.rest.get('/user/me');
        // If data is wrapped in another object (e.g. { data: {...} }), handle it accordingly
        const data = response.data || response;
        const profile = new Profile(this.client, data);
        this.current = profile;
        return profile;
    }
}

