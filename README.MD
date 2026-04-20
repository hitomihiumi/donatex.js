<div align="center">
	<p>
		<a href="https://www.npmjs.com/package/@hitomihiumi/donatex.js"><img src="https://img.shields.io/npm/v/@hitomihiumi/donatex.js.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@hitomihiumi/donatex.js"><img src="https://img.shields.io/npm/dt/@hitomihiumi/donatex.js.svg?maxAge=3600" alt="npm downloads" /></a>
	</p>
</div>

`@hitomihiumi/donatex.js` is a simple, object-oriented Node.js library for interacting with the [**donatex.gg** API](https://donatex.gg/).

## Features

- **Object-Oriented API Structure:** Easily manage `Profiles` and `Donations` through dedicated managers.
- **REST Client:** Built-in HTTP client for robust interaction with API endpoints.
- **Real-Time Gateway:** Built-in automatic connection to SignalR `public-donations-hub` to listen for donation events instantly.
- **TypeScript Ready:** Written entirely in TypeScript with strong typings out-of-the-box.

## Installation

```bash
npm install @hitomihiumi/donatex.js
```

## Basic Usage

Below is a brief example on how to initialize the client, connect to the Gateway, and listen for real-time live donations.

```typescript
import { Client } from '@hitomihiumi/donatex.js';

// Initialize the Client
const client = new Client();

// Triggered when client successfully authenticates and connects via WebSocket
client.on('ready', () => {
    // The currently authenticated user's profile is accessible from the ProfileManager cache
    console.log(`Connected with profile: ${client.profiles.current?.username}`);
    
    // Fetch an array of recent donations with pagination parameters (ex. limit: 10)
    // Always make API requests AFTER the client is ready
    client.donations.fetchAll({ limit: 10 }).then(donations => {
        console.log(`Successfully fetched ${donations.length} donations.`);
    }).catch(error => console.error('Failed to fetch donations:', error));
});

// Triggered automatically whenever a new donation comes in via real-time gateway
client.on('donationCreate', (donation) => {
    console.log(`🎉 New Donation!`);
    console.log(`Received ${donation.amountInRub} RUB from ${donation.username}!`);
    
    if (donation.message) {
        console.log(`Message: ${donation.message}`);
    }
});

// Login to the API by using your generated API Token
client.login('YOUR_DONATEX_API_TOKEN_HERE');
```
