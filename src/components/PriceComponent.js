import Component from "../framework/Component";
import { PIZZA_DATA_SERVICE } from "../services/PizzaDataService";

class PriceComponent extends Component {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("flex-container");
  }

  render() {
    const { size, ingredients} = this.props;

    let totalPrice = size / 5;

    if (PIZZA_DATA_SERVICE.ingredients) {
      this.ingredientsData = PIZZA_DATA_SERVICE.ingredients
        .filter(ingredient => ingredients.includes(ingredient.name))
        .forEach(ingredient => {
          totalPrice += ingredient.price
        });
    }

    return `
      <span>
        Total price: 
      </span>
      <span>
        &dollar;${totalPrice.toFixed(2)}
      </span>
    `;
  }
}

export default PriceComponent;