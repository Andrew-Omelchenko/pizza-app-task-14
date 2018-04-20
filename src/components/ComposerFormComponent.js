import { API } from "../utils/config";
import Component from "../framework/Component";
import { PIZZA_DATA_SERVICE } from "../services/PizzaDataService";
import { PIZZA_DRAW_SERVICE } from "../services/PizzaDrawService";

class ComposerFormComponent extends Component {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("container");

    this.host.addEventListener("submit", this.handleSubmit);
  }


  handleSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    return `
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
              type="radio" 
              name="size" 
              value="30">
          </label>
          <label>
            45
            <input 
              type="radio" 
              name="size" 
              value="45">
          </label>
          <label>
            60
            <input 
              type="radio" 
              name="size" 
              value="60">
          </label>
        </label>
        <label>Ingredients: </label>
        <div class="check-holder">
          ${PIZZA_DATA_SERVICE.ingredients.reduce((html, ingr) => {
            html += `
              <label title="${ingr.name}"> 
                <img src="${API.BASE_URL}${ingr.image_url}" alt="${ingr.name}">
                <input type="checkbox" name="${ingr.name}">
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
  }
}

export default ComposerFormComponent;