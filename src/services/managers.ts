import axios from 'axios';
import { ManagerSchema } from '../schemas';
import { Manager } from '../types';

export async function getManagers(): Promise<Manager[]> {
    const url = process.env.NEXT_PUBLIC_API_MANAGERS;

    if (!url) {
        throw new Error('NEXT_PUBLIC_API_MANAGERS environment variable is not defined');
    }

    try {
        const response = await axios.get(url);
        // The API returns an array directly, not wrapped in a response object
        const validatedData = ManagerSchema.array().parse(response.data);

        return validatedData;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Unknown error occurred while fetching managers');
    }
}