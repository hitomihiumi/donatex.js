import { Client } from '../src';
const client = new Client();

client.on('ready', () => {
    console.log(`Login as ${client.user!.username}!`);
});

client.on('DonationCreated', async (donation) => {
    console.log(`New donation from ${donation.username}: ${donation.amount} ${donation.currency} ${donation.message}`);

    if (donation.message.includes("ban-word")) {
        await donation.skip();
        console.log('Donation was skipped');
    }
});

client.login(process.env.TEST_TOKEN!);