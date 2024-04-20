import { jwtDecode } from "jwt-decode";

export const tokenVerify = () => {
    try {
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTimestamp) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        return false;
    }
};