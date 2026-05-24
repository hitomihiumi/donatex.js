import { BaseManager } from './BaseManager';
import { CurrentMusic, SkipMusicResponse } from '../types';

export class MusicManager extends BaseManager {

    async fetchCurrent(): Promise<CurrentMusic> {
        return await this.client.rest.get<CurrentMusic>('/v1/music/current');
    }

    async skip(): Promise<SkipMusicResponse> {
        return await this.client.rest.post<SkipMusicResponse>('/v1/music/skip-current');
    }
}