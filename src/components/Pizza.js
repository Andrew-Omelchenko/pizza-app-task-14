import Component from "../framework/Component";
import HeaderComponent from "./HeaderComponent";
import PizzaComponent from "./PizzaComponent";
import FooterComponent from "./FooterComponent";

class Login extends Component {
  constructor(props) {
    super(props);

    this.headerComponent = new HeaderComponent();
    this.pizzaComponent = new PizzaComponent();
    this.footerComponent = new FooterComponent();

    this.host = document.createElement("div");
    this.host.classList.add("container");
  }

  render() {
    return [
      this.headerComponent.update({ isLogin: true }),
      this.pizzaComponent.update({}),
      this.footerComponent.update({})
    ];
  }
}

export default Login;