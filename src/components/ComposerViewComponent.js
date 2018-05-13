import { getPoint } from "../utils/helper";
import Sprite from "../services/Sprite";
import Component from "../framework/Component";
import { PIZZA_DATA_SERVICE } from "../services/PizzaDataService";

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
    const diameter = size + 240;
    const ingrSize = Math.floor(diameter / 10);
    const maxI = 18;

    const sprites = {};
    const spritesPool = [];

    if (isDataReady) {
      let pizza = new Sprite(
        PIZZA_DATA_SERVICE.images["pizza"], 
        this.canvasWidth / 2, 
        this.canvasHeight / 2, 
        diameter, 
        diameter
      );
      sprites["pizza"] = pizza;
      spritesPool.push(pizza);

      ingredients.forEach(ingredient => {
        for (let i = 0; i < maxI; i++) {
          const point = getPoint(this.canvasWidth, diameter, i, maxI);
          const ingrSprite = new Sprite(
            PIZZA_DATA_SERVICE.images[ingredient], 
            point.x, 
            point.y, 
            ingrSize, 
            ingrSize
          );
          spritesPool.push(ingrSprite);
        }
      });

      this._clear();
      this._draw(spritesPool);
    }

    return this.canvas;
  }
}

export default ComposerViewComponent;