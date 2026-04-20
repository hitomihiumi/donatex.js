import { Client } from '../client/Client';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * A manager for handling REST API requests to donatex.gg.
 */
export class REST {
    /**
     * The client that instantiated this REST manager.
     */
    public readonly client: Client;

    /**
     * The axios instance used for making requests.
     */
    private readonly requestManager: AxiosInstance;

    /**
     * @param client - The instantiating client.
     */
    constructor(client: Client) {
        this.client = client;
        this.requestManager = axios.create({
            baseURL: 'https://donatex.gg/api/v1', // Using /api/v1 as a probable endpoint base
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Sets the authorization token for future requests.
     *
     * @param token - The token to use.
     */
    public setToken(token: string): void {
        this.requestManager.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Makes a GET request.
     *
     * @param url - The URL to request.
     * @param params - Optional query parameters.
     * @returns A promise resolving to the response data.
     */
    public async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
        const response: AxiosResponse<T> = await this.requestManager.get(url, { params });
        return response.data;
    }

    /**
     * Makes a POST request.
     *
     * @param url - The URL to request.
     * @param data - The data to send.
     * @returns A promise resolving to the response data.
     */
    public async post<T = any>(url: string, data?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.requestManager.post(url, data);
        return response.data;
    }

    /**
     * Makes a PUT request.
     *
     * @param url - The URL to request.
     * @param data - The data to send.
     * @returns A promise resolving to the response data.
     */
    public async put<T = any>(url: string, data?: any): Promise<T> {
        const response: AxiosResponse<T> = await this.requestManager.put(url, data);
        return response.data;
    }

    /**
     * Makes a DELETE request.
     *
     * @param url - The URL to request.
     * @returns A promise resolving to the response data.
     */
    public async delete<T = any>(url: string): Promise<T> {
        const response: AxiosResponse<T> = await this.requestManager.delete(url);
        return response.data;
    }
}

