import { Client } from '../client/Client';
import { Base } from './Base';

/**
 * Represents a user profile on donatex.gg.
 */
export class Profile extends Base {
    /**
     * The unique identifier of the user.
     */
    public id: string;

    /**
     * The username of the user.
     */
    public username: string;

    /**
     * The URL to the user's avatar image.
     */
    public avatarUrl: string | null;

    /**
     * @param client - The instantiating client.
     * @param data - The raw data retrieved from the API.
     */
    constructor(client: Client, data: any) {
        super(client);
        this.id = data?.id;
        this.username = data?.username;
        this.avatarUrl = data?.avatarUrl || null;
    }
}
