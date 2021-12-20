import axios from "axios";

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

    logout(refreshToken) {
        return axios
            .post(API_AUTH_URL + "logout", refreshToken)
            .then(response => {
                localStorage.removeItem(TOKEN);
            });           
    }

    getCurrentUser() {
        const userStr = localStorage.getItem(TOKEN);

        if (userStr) 
            return JSON.parse(userStr);
    
        return null;
      }
}

export default new AuthService();