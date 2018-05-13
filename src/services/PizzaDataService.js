import { API } from "../utils/config";
import { AUTH_HTTP_SERVICE } from "./AuthHttpService";

class PizzaDataService {
  constructor() {
    this.crust_pizza = `${API.BASE_URL}${API.CRUST_PIZZA}`;
    console.log(this.crust_pizza);

    this.ingredients = [];
    this.tags = [];
    this.images = {};
  }

  _loadResources() {
    let promises = [];
    promises.push(this._loadImage("pizza", this.crust_pizza));
    promises = promises.concat(this.ingredients.map(ingredient => {
      const ingrUrl = `${API.BASE_URL}${ingredient.image_url}`;
      return this._loadImage(ingredient.name, ingrUrl);
    }));
    return Promise.all(promises);
  }

  _loadImage(name, url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "";
      image.onload = () => resolve({ name, image });
      image.onerror = (e) => reject(e);
      image.src = url;
    });
  }

  _getIngredients() {
    return AUTH_HTTP_SERVICE.get(`${API.ENDPOINTS.INGREDIENT_LIST}`)
      .then(data => {
        this.ingredients = data.answer.results;
        return data;
      });
  }

  _getTags() {
    return AUTH_HTTP_SERVICE.get(`${API.ENDPOINTS.TAG_LIST}`)
      .then(data => {
        this.tags = data.answer.results;
        return data;
      });
  }

  loadPizzaData() {
    return Promise.all([
      this._getIngredients()
        .then(() => this._loadResources())
        .then(resources => 
          resources.forEach(
            resource => this.images[resource.name] = resource.image
          )
        ),
      this._getTags()
    ]);
  }
}

export const PIZZA_DATA_SERVICE = new PizzaDataService();