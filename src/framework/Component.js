import { bindAll } from "../utils/helper";

class Component {
  constructor(props) {
    this.state = {};
    this.props = props || {};
    this.host = null;

    bindAll(this, "updateState", "update");

    this.onInit();
  }

  _render() {
    const children = this.render();

    this.host.innerHTML = "";

    if (typeof children === "string") {
      this.host.innerHTML = children;
    } else if (Array.isArray(children)) {
      this.host.append(... children);
    } else {
      this.host.append(children);
    }

    return this.host;
  }

  onReceiveProps(nextProps) {}

  onInit() {}

  update(nextProps) {
    this.onReceiveProps(nextProps);
    this.props = nextProps;
    return this._render();
  }

  updateState(state) {
    const nextState = Object.assign({}, this.state, state);

    this.state = nextState;
    this._render();

    return nextState;
  }

  render() {}
}

export default Component;
