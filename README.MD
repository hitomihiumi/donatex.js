<div align="center">
	<p>
		<a href="https://www.npmjs.com/package/@hitomihiumi/donatex.js"><img src="https://img.shields.io/npm/v/@hitomihiumi/donatex.js.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@hitomihiumi/donatex.js"><img src="https://img.shields.io/npm/dt/@hitomihiumi/donatex.js.svg?maxAge=3600" alt="npm downloads" /></a>
	</p>
</div>

`@hitomihiumi/donatex.js` is a simple, object-oriented Node.js library for interacting with the [**donatex.gg** API](https://donatex.gg/).

It provides an intuitive, class-based approach to managing your donations, music queue, and webhooks.

## Features

* **Object-Oriented API:** Easily manage entities through dedicated managers (`client.donations`, `client.music`, `client.webhooks`).

* **Entity Methods:** Perform actions directly on objects (e.g., `donation.skip()`, `webhook.delete()`).

* **Real-Time Gateway:** Built-in automatic connection to SignalR to listen for live donation events instantly.

* **REST Client:** Built-in fetch-based HTTP client for robust interaction with API endpoints.

* **TypeScript Ready:** Written entirely in TypeScript with strong typings out-of-the-box.

## Installation

```bash
npm install @hitomihiumi/donatex.js
```

*Note: This package uses native `fetch` and requires Node.js 18 or newer.*

## Basic Usage

Below is a brief example of how to initialize the client, connect to the Gateway, and interact with the API.

```javascript
const { Client } = require('@hitomihiumi/donatex.js');

// Initialize the Client
const client = new Client();

// Triggered when the client successfully authenticates and connects via WebSocket
client.on('ready', async () => {
    // The currently authenticated user's profile is accessible via client.user
    console.log(`Connected with profile: ${client.user.username}`);
    
    try {
        // Fetch an array of recent donations with pagination parameters
        const donations = await client.donations.fetch({ skip: 0, take: 10 });
        console.log(`Successfully fetched ${donations.length} recent donations.`);
    } catch (error) {
        console.error('Failed to fetch donations:', error);
    }
});

// Triggered automatically whenever a new donation comes in via the real-time gateway
client.on('DonationCreated', async (donation) => {
    console.log(`🎉 New Donation!`);
    console.log(`Received ${donation.amount} ${donation.currency} from ${donation.username}!`);
    
    // Example: Automatically skip a donation if the message contains a specific word
    if (donation.message.includes('skipme')) {
        await donation.skip();
        console.log(`Donation from ${donation.username} was skipped.`);
    }
});

// Login to the API using your generated API Token
client.login('YOUR_DONATEX_API_TOKEN_HERE');
```

## Documentation

* [Getting Started](docs/getting-started.md)
* [API Reference](docs/api-reference.md)