import axios from "axios";
import AuthHeader from './AuthHeader';

const API_AUTH_URL = "localhost:8001/";

export class ProductService {
    getProducts() {
        return axios
            .get(API_AUTH_URL + "products", { headers: AuthHeader() })
            .then(response => {
                if (response.data) {
                    return JSON.stringify(response.data);
            }
    
            return [];
        });
    }

    getMockProducts() {
        return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    }
}