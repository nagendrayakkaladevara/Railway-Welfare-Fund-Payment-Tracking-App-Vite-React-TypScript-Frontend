import axios from 'axios';

interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}

// const API_URL = 'http://localhost:5000/api/v1/admin';

const API_URL = 'https://payment-details-railwayapplication-backend.vercel.app/api/v1/admin';

const username = 'admin';
const password = 'Railway';


const encodeCredentials = (username: string, password: string): string => {
    return btoa(`${username}:${password}`);
};


export const submitFormData = async (formData: Record<string, any>): Promise<ApiResponse> => {
    try {
        const response = await axios.post(`${API_URL}/addEmployee`, formData, {
            headers: {
                'Authorization': `Basic ${encodeCredentials(username, password)}`,
            },
        });
        return {
            success: true,
            message: response.data.message,
            data: response.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'An error occurred while submitting the form',
        };
    }
};
