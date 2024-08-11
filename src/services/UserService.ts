import axios from 'axios';

const API_URL = 'http://localhost:5000';

const username = 'admin';
const password = 'Railway';

export interface PaymentHistory {
    yearOfPayment: number;
    status: string;
    amount: number;
    updatedAt: string;
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    department: string;
    yearOfJoining: number | null;
    paymentHistory: PaymentHistory[];
}

const UserService = {
    getTotalData: async (): Promise<UserData[]> => {
        try {
            const response = await axios.get<UserData[]>(`${API_URL}/api/v1/user/getTotalData`, {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${username}:${password}`),
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching total data:', error);
            throw error;
        }
    },
};

export default UserService;