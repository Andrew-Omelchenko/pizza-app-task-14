import { API } from "../utils/config";
import { processResponse } from "../utils/helper";
import { AUTH_SERVICE } from "./AuthService";

class AuthHttpService {
  get(endpoint) {
    const headers = new Headers({ "content-type": "application/json" });
    
    if (AUTH_SERVICE.isAuthorized()) {
      headers.append("Authorization", `Bearer ${AUTH_SERVICE.token}`);
    }

    return fetch(`${API.BASE_URL}${endpoint}`, { headers })
      .then(processResponse);
  }

  post(endpoint, payload) {
    const headers = new Headers();

    if (AUTH_SERVICE.isAuthorized()) {
      headers.append("Authorization", `Bearer ${AUTH_SERVICE.token}`);
    }

    return fetch(`${API.BASE_URL}${endpoint}`, {
      method: 'POST',
      body: payload,
      headers
    })
      .then(processResponse);
  }
  
  getStores() {
    return this.get(API.ENDPOINTS.STORE_LIST);
  }
  
  createUser(userData) {
    return this.post(API.ENDPOINTS.CREATE_USER, JSON.stringify(userData));
  }

  getMyInfo() {
    return this.get(API.ENDPOINTS.MY_INFO);
  }

  getPizzaList() {
    return this.get(API.ENDPOINTS.PIZZA_LIST);
  }

  createPizza(data) {
    return this.post(API.ENDPOINTS.CREATE_PIZZA, data);
  }
}

export const AUTH_HTTP_SERVICE = new AuthHttpService();
