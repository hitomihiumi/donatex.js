import { BaseManager } from './BaseManager';
import { Profile } from '../structures/Profile';
import { IProfile } from '../types';

export class ProfileManager extends BaseManager {

    async fetch(): Promise<Profile> {
        const data = await this.client.rest.get<IProfile>('/v1/user/me');
        return new Profile(this.client, data);
    }
}