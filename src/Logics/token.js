import { getCookie } from "./cookies";

export default function fetchToken() {
    const accesss_token = getCookie("access_token");

    const authHeader = `BEARER ${accesss_token}`;

    return { authorization: authHeader }
}