import { getCookie, setCookie } from "./cookies";

export default function fetchToken() {
    const accesss_token = getCookie("access_token");

    const authHeader = `BEARER ${accesss_token}`;

    return { authorization: authHeader }
}

export const setToken = ({ tokenData = {} }) => {
    console.log(tokenData)
    setCookie("access_token", tokenData["access_token"])
    return true;

}