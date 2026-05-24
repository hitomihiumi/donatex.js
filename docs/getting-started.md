# Getting Started with donatex.js

This guide will help you set up and authenticate your `@hitomihiumi/donatex.js` client.

## 1. Obtaining a Token

The DonateX API supports two types of authentication:
1. **External Token (Single Streamer):** Ideal for personal bots and scripts. You can generate a permanent token in your DonateX dashboard under "Settings -> API".
2. **OAuth 2.0 (Multiple Streamers):** Ideal for public applications (SaaS, Web Apps) that require users to log in with their DonateX accounts.

*Pass the obtained token to the `client.login()` method.*

## 2. Initialization & Login

Unlike older versions, you do not pass the token to the `Client` constructor. Instead, instantiate the client and call `login()`.

```typescript
import { Client } from '@hitomihiumi/donatex.js';

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.username}`);
});

// Start the authentication and WebSocket connection process
client.login('YOUR_TOKEN_HERE').catch(console.error);
```

### What happens during `login()`?
1. The client sets the authorization token for the REST manager.
2. It fetches the authenticated user's profile (`/v1/user/me`) and populates `client.user`.
3. It connects to the SignalR Gateway to start listening for real-time events.

## 3. Listening to Real-Time Events

The client connects to the DonateX SignalR Hub. You can listen to incoming donations using the `DonationCreated` event.

```typescript
client.on('DonationCreated', (donation) => {
    console.log(`${donation.username} donated ${donation.amountInRub} RUB!`);
    console.log(`Message: ${donation.message}`);
    
    // Check if AI responded
    if (donation.withAiResponse && donation.aiResponse) {
        console.log(`AI said: ${donation.aiResponse}`);
    }
});
```

## 4. Handling Errors & Disconnections

Make sure to listen for `error` and `disconnected` events to handle network issues gracefully.

```typescript
client.on('error', (error) => {
    console.error('Gateway Error:', error);
});

client.on('disconnected', () => {
    console.log('Disconnected from the Gateway.');
});
```