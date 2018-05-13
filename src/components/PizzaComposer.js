import { bindAll, toHtml } from "../utils/helper";
import Component from "../framework/Component";
import HeaderComponent from "./HeaderComponent";
import ComposerFormComponent from "./ComposerFormComponent";
import ComposerViewComponent from "./ComposerViewComponent";
import FooterComponent from "./FooterComponent";
import { PIZZA_DATA_SERVICE } from "../services/PizzaDataService";
import { AUTH_HTTP_SERVICE } from "../services/AuthHttpService";

class PizzaComposer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataReady: false
    };

    this.headerComponent = new HeaderComponent();
    this.composerFormComponent = new ComposerFormComponent({
      onDataChange: this.onDataChange,
      onCreatePizza: this.onCreatePizza
    });
    this.composerViewComponent = new ComposerViewComponent({ 
      isDataReady: this.state.isDataReady,
      ingredients: [],
      size: 60
    });
    this.footerComponent = new FooterComponent();

    this.host = document.createElement("div");
    this.host.classList.add("container");

    bindAll(this, "onDataChange", "onCreatePizza");

    this._onInit();
  }

  _onInit() {
    PIZZA_DATA_SERVICE.loadPizzaData()
      .then(data => {
        this.updateState({ isDataReady: true });
        return data;
      });
  }

  onDataChange(ingredients, size) {
    // console.log(ingredients, size);
    this.composerViewComponent.update({
      isDataReady: this.state.isDataReady,
      ingredients,
      size
    });
  }

  onCreatePizza(data) {
    const { canvas } = this.composerViewComponent;

    canvas.toBlob(imageData => {
      data.append("image", imageData);
      // console.log(
      //   data.get("name"),
      //   data.get("description"),
      //   data.get("size"),
      //   data.get("ingredients"),
      //   data.get("tags"),
      //   data.get("image")
      // );
      AUTH_HTTP_SERVICE.createPizza(data)
        .then(res => {
          console.log(res);
          if (res.answer.success) {
            console.log("Success");
            window.location.hash = "/";
          }
        })
        .catch(err => {
          console.log(err);
          console.log("Error creating pizza");
          // document.getElementById("alert-placeholder").innerHTML = err.answer.error;
        });
    });
  }

  render() {
    const { isDataReady } = this.state;

    const htmlString = `
      <div id="header"></div>
      <div class="pizza">
        <h1>Create and order your pizza</h1>
        <div class="pizza-container">
          <section id="canvas-placeholder"></section>
          <section id="data-placeholder"></section>
        </div>
      </div>
      <div id="footer"></div>
    `;

    const node = toHtml(htmlString);
    node.getElementById("header").append(this.headerComponent.update({}));
    node.getElementById("data-placeholder").append(this.composerFormComponent.update({
      onDataChange: this.onDataChange,
      onCreatePizza: this.onCreatePizza
    }));
    node.getElementById("canvas-placeholder").append(this.composerViewComponent.update({
      isDataReady,
      ingredients: [],
      size: 60
    }));
    node.getElementById("footer").append(this.footerComponent.update({}));

    return node;
  }
}

export default PizzaComposer;