import { Client } from '../client/Client';
import { Base } from './Base';

/**
 * Represents a donation received via donatex.gg.
 */
export class Donation extends Base {
    /**
     * The unique identifier of the donation.
     */
    public id: string;

    /**
     * The username of the sender.
     */
    public username: string | null;

    /**
     * The amount donated.
     */
    public amount: number;

    /**
     * The currency of the donation.
     */
    public currency: string;

    /**
     * The amount of the donation in RUB.
     */
    public amountInRub: number;

    /**
     * The message attached to the donation.
     */
    public message: string | null;

    /**
     * Whether the donation is a test donation.
     */
    public isTest: boolean;

    /**
     * Whether the donation is potentially unsafe.
     */
    public isPotentiallyUnsafe: boolean;

    /**
     * Whether the fee was paid by the user.
     */
    public isFeePaidByUser: boolean;

    /**
     * The URL path to the voice file, if any.
     */
    public voiceFilePath: string | null;

    /**
     * The timestamp when the donation was created.
     */
    public timestamp: Date;

    /**
     * @param client - The instantiating client.
     * @param data - The raw data retrieved from the API.
     */
    constructor(client: Client, data: any) {
        super(client);
        this.id = data?.id;
        this.username = data?.username || null;
        this.currency = data?.currency;
        this.amount = data?.amount;
        this.amountInRub = data?.amountInRub;
        this.message = data?.message || null;
        this.isTest = data?.isTest || false;
        this.isPotentiallyUnsafe = data?.isPotentiallyUnsafe || false;
        this.isFeePaidByUser = data?.isFeePaidByUser || false;
        this.voiceFilePath = data?.voiceFilePath || null;
        this.timestamp = new Date(data?.timestamp || Date.now());
    }
}
