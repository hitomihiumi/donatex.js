import { Client } from '../client/Client';
import { Base } from './Base';
import { IDonation, Currency, SkipDonationResponse } from '../types';

export type RawDonationData = Omit<IDonation, 'timestamp'> & { timestamp: string };

export class Donation extends Base implements IDonation {
    public username: string;
    public message: string;
    public currency: Currency;
    public amount: number;
    public amountInRub: number;
    public timestamp: Date;
    public isTest: boolean;
    public isPotentiallyUnsafe: boolean;
    public isFeePaidByUser: boolean;
    public voiceFilePath: string;
    public paidVoice: string;
    public withAiResponse: boolean;
    public aiResponse?: string;
    public musicLink?: string;
    public wasShown: boolean;

    constructor(client: Client, data: RawDonationData) {
        super(client, data);
        this.username = data.username;
        this.message = data.message;
        this.currency = data.currency;
        this.amount = data.amount;
        this.amountInRub = data.amountInRub;
        this.timestamp = new Date(data.timestamp);
        this.isTest = data.isTest;
        this.isPotentiallyUnsafe = data.isPotentiallyUnsafe;
        this.isFeePaidByUser = data.isFeePaidByUser;
        this.voiceFilePath = data.voiceFilePath;
        this.paidVoice = data.paidVoice;
        this.withAiResponse = data.withAiResponse;
        this.aiResponse = data.aiResponse;
        this.musicLink = data.musicLink;
        this.wasShown = data.wasShown;
    }

    public async skip(): Promise<void | SkipDonationResponse> {
        return await this.client.donations.skip(this.id);
    }
}