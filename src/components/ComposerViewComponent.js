import { API } from "../utils/config";
import Sprite from "../services/Sprite";
import Component from "../framework/Component";
import { PIZZA_DATA_SERVICE } from "../services/PizzaDataService";
import { PIZZA_DRAW_SERVICE } from "../services/PizzaDrawService";

class ComposerViewComponent extends Component {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("container");

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 320;
    this.canvasHeight = 320;

    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  _draw(spritesPool) {
    spritesPool.forEach(sprite => sprite.draw(this.ctx));
  }

  render() {
    const { isDataReady, ingredients, size } = this.props;

    const sprites = {};
    const spritesPool = [];

    if (isDataReady) {
      let pizza = new Sprite(
        PIZZA_DATA_SERVICE.images["pizza"], 
        this.canvasWidth / 2, 
        this.canvasHeight / 2, 
        size + 240, 
        size + 240
      );
      sprites["pizza"] = pizza;
      spritesPool.push(pizza);

      this._clear();
      this._draw(spritesPool);
    }

    return this.canvas;
  }
}

export default ComposerViewComponent;