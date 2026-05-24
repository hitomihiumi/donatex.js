# API Reference

This document outlines the available Managers and Structures in `@hitomihiumi/donatex.js`.

---

## The `Client` Class

The main hub for interacting with the API.

### Properties
* `client.user`: (`Profile | null`) The profile of the authenticated user. Available after `ready`.
* `client.donations`: (`DonationManager`) Manages donations.
* `client.music`: (`MusicManager`) Manages the music widget.
* `client.webhooks`: (`WebhookManager`) Manages webhooks.
* `client.profiles`: (`ProfileManager`) Manages user profiles.

### Methods
* `client.login(token: string): Promise<string>` - Authenticates the client and connects to the Gateway.
* `client.destroy(): Promise<void>` - Disconnects the client and clears the token.

---

## Managers

Managers are accessed via the `Client` instance (e.g., `client.donations`).

### `DonationManager`

* **`fetch(options: FetchDonationsOptions): Promise<Donation[]>`**
  Fetches the donation history.
  *Options:* `skip` (number), `take` (number), `query?` (string), `hideTest?` (boolean).

* **`sendTest(data: TestDonationOptions): Promise<void>`**
  Sends a test donation.
  *Options:* `username`, `message`, `amount`, `currency`, `withAIResponse`.

* **`skip(id?: string): Promise<SkipDonationResponse | void>`**
  Skips a specific donation by ID. If no ID is provided, skips the *currently playing* donation on the widget.

### `MusicManager`

* **`fetchCurrent(): Promise<CurrentMusic>`**
  Returns the current playback state of the music widget (e.g., if it's playing, paused, or if there's a track in the queue).

* **`skip(): Promise<SkipMusicResponse>`**
  Skips the currently playing track on the music widget and marks the associated donation as played.

### `WebhookManager`

* **`fetch(): Promise<WebhookSubscription[]>`**
  Retrieves a list of all active and inactive webhook subscriptions.

* **`create(data: CreateWebhookOptions): Promise<WebhookSubscription>`**
  Creates a new webhook subscription.
  *Options:* `url` (HTTPS required), `secret`, `eventType` (currently only 'DonationCreated'), `clientId?`.

* **`delete(subscriptionId: string): Promise<void>`**
  Soft deletes/disables a webhook subscription.

* **`activate(subscriptionId: string): Promise<void>`**
  Reactivates a previously disabled webhook and resets its failure count.

---

## Structures

Structures represent the data returned by the API. They are object-oriented and contain a reference to the `client`, allowing them to have utility methods.

### `Donation`
Represents a donation.

**Properties:**
* `id` (string)
* `username` (string)
* `message` (string)
* `amount` (number) - Original amount.
* `amountInRub` (number) - Converted to RUB.
* `currency` (Currency enum) - USD, EUR, KZT, RUB.
* `timestamp` (Date) - A native JS Date object.
* `voiceFilePath` (string)
* `musicLink?` (string)
* `aiResponse?` (string)
* *...and other properties according to the API.*

**Methods:**
* **`donation.skip(): Promise<void>`**
  Skips this specific donation. (Shortcut for `client.donations.skip(donation.id)`).

### `WebhookSubscription`
Represents a webhook subscription.

**Properties:**
* `id` (string)
* `url` (string)
* `eventType` (string)
* `isActive` (boolean)
* `failureCount` (number)
* `clientId?` (string)

**Methods:**
* **`webhook.delete(): Promise<void>`**
  Disables this webhook.
* **`webhook.activate(): Promise<void>`**
  Reactivates this webhook.

### `Profile`
Represents a streamer's profile.

**Properties:**
* `id` (string)
* `username` (string)
* `avatarUrl?` (string)