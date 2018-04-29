import { API } from "../utils/config";
import { bindAll, toHtml } from "../utils/helper";
import Component from "../framework/Component";
import { PIZZA_DATA_SERVICE } from "../services/PizzaDataService";
import PriceComponent from "./PriceComponent";

class ComposerFormComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.size = 60;
    this.ingredients = [];
    this.tags = [];

    this.priceComponent = new PriceComponent({
      size: this.size,
      ingredients: this.ingredients
    });

    this.host = document.createElement("div");
    this.host.classList.add("container");

    bindAll(this, "handleChange", "handleSubmit");

    this.host.addEventListener("change", this.handleChange);
    this.host.addEventListener("submit", this.handleSubmit);
  }


  handleChange(ev) {
    if (ev.target.type !== "radio" && ev.target.type !== "checkbox") return;

    this.ingredients = [];
    this.tags = [];

    for (let sizeElement of this.sizesCollection) {
      if (sizeElement.checked) {
        this.size = Number(sizeElement.value);
        break;
      }
    }

    for (let ingredientElement of this.ingredientsCollection) {
      if (ingredientElement.checked) this.ingredients.push(ingredientElement.name);
    }

    for (let tagElement of this.tagsCollection) {
      if (tagElement.checked) this.tags.push(tagElement.name);
    }

    this.priceComponent.update({
      size: this.size,
      ingredients: this.ingredients
    });

    this.props.onDataChange(this.ingredients, this.size);
  }

  handleSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    const htmlString = `
      <form id="create">
        <label for="name">Pizza and order name: </label>
        <input 
          type="text" 
          name="name" 
          min-length="3" 
          max-length="24"
          placeholder="Pizza and order name" 
          value="" 
          required>
        <label for="size">
          Pizza size: 
          <label>
            30
            <input 
              class="size" 
              type="radio" 
              name="size" 
              value="30">
          </label>
          <label>
            45
            <input 
              class="size" 
              type="radio" 
              name="size" 
              value="45">
          </label>
          <label>
            60
            <input 
              class="size" 
              type="radio" 
              name="size" 
              value="60"
              checked>
          </label>
        </label>
        <label>Ingredients: </label>
        <div class="check-holder">
          ${PIZZA_DATA_SERVICE.ingredients.reduce((html, ingr) => {
            html += `
              <label title="${ingr.name}"> 
                <img src="${API.BASE_URL}${ingr.image_url}" alt="${ingr.name}">
                <input class="ingredient" type="checkbox" name="${ingr.name}" value="${ingr.id}">
              </label>
            `;
            return html;
          }, "")}
        </div>
        <div class="check-holder">
          ${PIZZA_DATA_SERVICE.tags.reduce((html, tag) => {
            html += `
              <label title="${tag.name}"> 
                ${tag.name}
                <input class="tag" type="checkbox" name="${tag.name}">
              </label>
            `;
            return html;
          }, "")}
        </div>
        <div id="price-placeholder"></div>
      </form>
    `;

    const node = toHtml(htmlString);
    const nodeElement = node.getElementById("create");
    this.sizesCollection = nodeElement.getElementsByClassName("size");
    this.ingredientsCollection = nodeElement.getElementsByClassName("ingredient");
    this.tagsCollection = nodeElement.getElementsByClassName("tag");

    node.getElementById("price-placeholder").appendChild(this.priceComponent.update({
      size: this.size,
      ingredients: this.ingredients
    }));

    return node;
  }
}

export default ComposerFormComponent;