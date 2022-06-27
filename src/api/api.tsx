import axios from "axios";
import IUser from "../types/types";

const ENV_URL = 'https://frontend-candidate.dev.sdh.com.ua/v1/contact/';

export async function getListUsers() {
    try {
        const response = await axios.get<IUser[]>(ENV_URL);
        return response.data
    } catch (error) {
        alert(error)
    }
}

export async function getUser(id: string) {
    try {
        return await axios.get<IUser>(`${ENV_URL}${id}/`);
    } catch (error) {
        alert(error)
    }
}

export async function deleteUser(id: string) {
    try {
        return await axios.delete<void>(`${ENV_URL}${id}`);
    } catch (error) {
        alert(error)
    }
}


export async function createUser(user: IUser) {
    try {
        return await axios.post<void>(`${ENV_URL}`, user);
    } catch (error) {
        alert(error)
    }
}

export async function updateUser(user: IUser, id: string) {
    try {
        return await axios.put<void>(`${ENV_URL}${id}`, user);
    } catch (error) {
        alert(error)
    }
}