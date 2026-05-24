export class REST {
    private token: string | null = null;
    private baseURL = 'https://donatex.gg/api';

    constructor(token?: string) {
        if (token) this.token = token;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
        if (!this.token) throw new Error('[DonateX API] Token is not provided. Call client.login() first.');

        const url = new URL(`${this.baseURL}${endpoint}`);

        if (method === 'GET' && data) {
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined && data[key] !== null) {
                    url.searchParams.append(key, String(data[key]));
                }
            });
        }

        const headers: Record<string, string> = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };

        const options: RequestInit = {
            method,
            headers,
        };

        if (method !== 'GET' && data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url.toString(), options);

        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText);
            throw new Error(`[DonateX API Error] ${response.status} ${response.statusText}: ${errorText}`);
        }

        if (response.status === 204) {
            return {} as T;
        }

        return await response.json() as T;
    }

    get<T>(endpoint: string, query?: any) { return this.request<T>('GET', endpoint, query); }
    post<T>(endpoint: string, body?: any) { return this.request<T>('POST', endpoint, body); }
    delete<T>(endpoint: string) { return this.request<T>('DELETE', endpoint); }
}