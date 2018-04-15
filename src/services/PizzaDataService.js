import { API } from "../utils/config";
import { AUTH_HTTP_SERVICE } from "./AuthHttpService";

class PizzaDataService {
  constructor() {
    this.ingredients = [];
    this.tags = [];
  }

  getIngredients() {
    return AUTH_HTTP_SERVICE.get(`${API.ENDPOINTS.INGREDIENT_LIST}`)
      .then(data => {
        this.ingredients = data.answer.results;
        return data;
      });
  }

  getTags() {
    return AUTH_HTTP_SERVICE.get(`${API.ENDPOINTS.TAG_LIST}`)
      .then(data => {
        this.tags = data.answer.results;
        return data;
      });
  }
}

export const PIZZA_DATA_SERVICE = new PizzaDataService();