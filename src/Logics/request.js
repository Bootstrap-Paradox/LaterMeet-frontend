import axios from 'axios';
import { baseURL } from '../url';
import fetchToken from './token';

const API = async ({ method = 'post', endpoint = "", data = {} }) => {

    const req = axios.create({ baseURL: `${baseURL}/` })

    let requestConfig = {
        headers: {
            ...fetchToken(),
        }
    }

    switch (method) {
        case 'post':
            return await req.post(
                `${endpoint}`,
                data,
                requestConfig,
            )

        case 'put':
            return await req.put(
                `${endpoint}`,
                data,
                requestConfig,
            )

        case 'delete':
            return await req.delete(
                `${endpoint}`,
                requestConfig,
            )

        default:
            throw new Error("Method Not Supported")

    }

}

export default API;