import ChatSocket from '../socket';
import { UserData } from './interfaces';

const api = process.env.REACT_APP_API_HOST;

export async function login(data: UserData) {
    return fetch(`${api}/user/login`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then(async res => {
            const data = await res.json();

            if (data.error) {
                throw data;
            }

            ChatSocket.initConnection();

            return data;
        })
        .catch(error => { throw error });
}