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

    bindAll(this, "handleChange", "handleClick", "handleSubmit");

    this.host.addEventListener("change", this.handleChange);
    this.host.addEventListener("click", this.handleClick);
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

  handleClick(ev) {
    if (ev.target.id === "cancel-btn") {
      window.location.hash = "/";
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    const htmlString = `
      <form id="create">
        <div class="topic">
          <label for="name">Pizza and order name: </label>
          <input 
            type="text" 
            name="name" 
            min-length="3" 
            max-length="24"
            placeholder="Pizza and order name" 
            value="" 
            required>
        </div>
        <div class="topic">
          <label for="size">Pizza size: </label>
          <label>
            <input 
              class="size" 
              type="radio" 
              name="size" 
              value="30">
            30
          </label>
          <label>
            <input 
              class="size" 
              type="radio" 
              name="size" 
              value="45">
            45
          </label>
          <label>
            <input 
              class="size" 
              type="radio" 
              name="size" 
              value="60"
              checked>
            60
          </label>
        </div>
        <p>Ingredients: </p>
        <div class="check-holder topic">
          ${PIZZA_DATA_SERVICE.ingredients.reduce((html, ingr) => {
            html += `
              <label class="check-holder-label" title="${ingr.name}"> 
                <input class="ingredient" type="checkbox" name="${ingr.name}" value="${ingr.id}">
                <span class="ingredient-span">
                  <img 
                    src="${API.BASE_URL}${ingr.image_url}" 
                    alt="${ingr.name}"
                    class="ingredient-image">
                  ${ingr.name}
                </span>
              </label>
            `;
            return html;
          }, "")}
        </div>
        <p>Tags: </p>
        <div class="check-holder topic">
          ${PIZZA_DATA_SERVICE.tags.reduce((html, tag) => {
            html += `
              <label class="check-holder-label" title="${tag.name}"> 
                <input class="tag" type="checkbox" name="${tag.name}">
                <span class="tag-span">
                  ${tag.name}
                </span>
              </label>
            `;
            return html;
          }, "")}
        </div>
        <div class="topic" id="price-placeholder"></div>
        <div class="btn-placeholder topic">
          <button class="btn" type="button" id="cancel-btn">Cancel</button>
          <button class="btn" type="submit" id="order-btn">Order</button>
        </div>
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