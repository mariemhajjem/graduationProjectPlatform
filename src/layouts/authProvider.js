import jwt from "jwt-decode" 
export default {

    checkAuth: () => {
        const token = localStorage.getItem('token') 
        if(token) {
            const decoded=jwt(token);
            return decoded 
        }
        else
            return null;

    },
    IsWho : () => {
        const token = localStorage.getItem('token') 
        if(token) {
            const decoded=jwt(token);
            return decoded.role 
        }
        else
            return null;

    }
}