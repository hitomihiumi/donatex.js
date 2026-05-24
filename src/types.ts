export interface IProfile {
    id: string;
    username: string;
    avatarUrl?: string;
}

export interface IDonation {
    id: string;
    username: string;
    message: string;
    withAiResponse: boolean;
    currency: Currency;
    amount: number;
    amountInRub: number;
    timestamp: Date;
    wasShown: boolean;
    isTest: boolean;
    isPotentiallyUnsafe: boolean;
    isFeePaidByUser: boolean;
    voiceFilePath: string;
    paidVoice: string;
    aiResponse?: string;
    musicLink?: string;
}

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    KZT = 'KZT',
    RUB = 'RUB',
}

export interface BaseMusic {
    hasTrack: boolean;
    widgetId?: string;
    donationId?: string;
    musicLink?: string;
}

export interface CurrentMusic extends BaseMusic {
    isPlaying: boolean;
    widgetConnected: boolean;
    isPaused: boolean;
}

export interface SkipMusicResponse extends BaseMusic {
    skipped: boolean;
    markedAsPlayed?: boolean;
}

export interface SkipDonationResponse {
    skipped: boolean;
    skippedDonationId: string | null;
}

export interface Webhook {
    id: string;
    url: string;
    clientId: string;
    eventType: string;
    isActive: boolean;
    failureCount: number;
}

export interface CreateWebhookResponse extends Webhook {}

