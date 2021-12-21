import axios from "axios";
import AuthHeader from './AuthHeader';

//const API_AUTH_URL = "http://localhost:8082/api/"; //SpringBoot Microservice
//const API_AUTH_URL = "https://localhost:8000/api/"; // PHP Microservice
const API_AUTH_URL = "http://localhost:8001/"; // Python Microservice

export class ProductService {
    getProducts() {
        return axios
            .get(API_AUTH_URL + "products", { headers: AuthHeader() })
            .then(response => {
                if (response.status === 200) {
                    return response.data;
            }
    
            return [];
        });
    }

    getMockProducts() {
        return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    }
}