import { Client } from '../client/Client';
import { Base } from './Base';
import { IProfile } from '../types';

export class Profile extends Base implements IProfile {
    public username: string;
    public avatarUrl?: string;

    constructor(client: Client, data: IProfile) {
        super(client, data);
        this.username = data.username;
        this.avatarUrl = data.avatarUrl;
    }
}