import { API } from "../utils/config";
import { bindAll, toHtml } from "../utils/helper";
import Component from "../framework/Component";
import { PIZZA_DATA_SERVICE } from "../services/PizzaDataService";
import { PIZZA_DRAW_SERVICE } from "../services/PizzaDrawService";

class ComposerFormComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.host = document.createElement("div");
    this.host.classList.add("container");

    bindAll(this, "handleChange", "handleSubmit");

    this.host.addEventListener("change", this.handleChange);
    this.host.addEventListener("submit", this.handleSubmit);
  }


  handleChange(ev) {
    let size = 60;
    const ingredients = [];

    for (let sizeElement of this.sizesCollection) {
      if (sizeElement.checked) {
        size = Number(sizeElement.value);
        break;
      }
    }
    for (let ingredientElement of this.ingredientsCollection) {
      if (ingredientElement.checked) ingredients.push(ingredientElement.name);
    }
    
    this.props.onDataChange(ingredients, size);
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
                <input type="checkbox" name="${tag.name}">
              </label>
            `;
            return html;
          }, "")}
        </div>
      </form>
    `;

    const node = toHtml(htmlString);
    const nodeElement = node.getElementById("create");
    this.sizesCollection = nodeElement.getElementsByClassName("size");
    this.ingredientsCollection = nodeElement.getElementsByClassName("ingredient");

    return node;
  }
}

export default ComposerFormComponent;