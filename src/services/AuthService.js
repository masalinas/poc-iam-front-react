import axios from "axios";
import jwt_decode from "jwt-decode";

const TOKEN = "poc-token";
const API_AUTH_URL = "http://localhost:8081/iam/poc/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_AUTH_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem(TOKEN, JSON.stringify(response.data));
            }
    
            return response.data;
        });
    }

    logout() {
        return axios
            .post(API_AUTH_URL + "logout", this.getCurrentRefreshToken())
            .then(response => {
                localStorage.removeItem(TOKEN);
            });           
    }

    getCurrentAccessToken() {
        const tokenStr = localStorage.getItem(TOKEN);

        let token = null;
        if (tokenStr) {
            token = JSON.parse(tokenStr);
            return token.access_token
        }

        return null;
    }

    getCurrentRefreshToken() {
        const tokenStr = localStorage.getItem(TOKEN);

        let token = null;
        if (tokenStr) {
            token = JSON.parse(tokenStr);

            return token.refresh_token
        }

        return null;
    }

    getCurrentUser() {
        const tokenStr = localStorage.getItem(TOKEN);

        let token = null;
        if (tokenStr) {            
            token = JSON.parse(tokenStr);
            
            return jwt_decode(token.access_token);
        }
        
        return null;
    }
}

export default new AuthService();