import { Client } from '../src';
const client = new Client();

require('dotenv').config();

client.on('ready', () => {
    console.log(`Connected with profile: ${client.profiles.current?.username}`);
});

client.on('donationCreate', (donation) => {
    console.log(donation);
});


client.login(process.env.DONATION_TOKEN);