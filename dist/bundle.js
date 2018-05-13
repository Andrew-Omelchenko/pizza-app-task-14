/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helper__ = __webpack_require__(1);


class Component {
  constructor(props) {
    this.state = {};
    this.props = props || {};
    this.host = null;

    Object(__WEBPACK_IMPORTED_MODULE_0__utils_helper__["a" /* bindAll */])(this, "updateState", "update");
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

/* harmony default export */ __webpack_exports__["a"] = (Component);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getPoint;
const bindAll = (context, ...names) => {
  names.forEach(name => {
    if (typeof context[name] === "function") {
      context[name] = context[name].bind(context);
    } else {
      throw Error(
        `Expected function ${name}. Instead received: ${typeof context[name]}`
      );
    }
  });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = bindAll;


const toHtml = string => {
  const template = document.createElement("template");
  template.innerHTML = string.trim();

  return template.content;
};
/* harmony export (immutable) */ __webpack_exports__["f"] = toHtml;


const URL_PARAM_REGEXP = /:\w+/g;

const isUrlParam = path => URL_PARAM_REGEXP.test(path);
const urlToRegExp = url => RegExp(`^${url.replace(URL_PARAM_REGEXP, "(.*)")}$`);
const isEqualPaths = (template, url) => urlToRegExp(template).test(url);
/* harmony export (immutable) */ __webpack_exports__["d"] = isEqualPaths;


// template -> /user/:id
// url -> /user/12
const extractUrlParams = (template, url) => {
  const values = url.split("/");  // ["user", "12"]
  const params = {};

  if (!values) {
    return params;
  }

  return template.split("/").reduce((acc, param, index) => {
    if (!isUrlParam(param)) {
      return acc;
    }
    // We need to remove ':' from param name
    acc[param.slice(1)] = values[index];

    return acc;
  }, params);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = extractUrlParams;


const processResponse = res => {
  if (res.ok) {
    return res.json().then(answer => Promise.resolve({ answer, status: res.status }));
    }
  return res.json().then(answer => Promise.reject({ answer, status: res.status }));
};
/* harmony export (immutable) */ __webpack_exports__["e"] = processResponse;


function random(min, max) {
  return min + Math.random() * (max - min + 1.0);
};

function getPoint(canvSize, diam, iter, maxIter) {
  const radiusSquared = (diam - 63) * (diam - 63) / 4;
  const randomRadius = Math.sqrt(random(0, radiusSquared));
  const randomAngle = random(2 * iter * Math.PI / maxIter, 2 * (iter + 1) * Math.PI / maxIter);
  const point = {
    x: 0.0,
    y: 0.0
  };
  const offset = canvSize / 2;
  point.x = Math.floor(offset + randomRadius * Math.cos(randomAngle));
  point.y = Math.floor(offset + randomRadius * Math.sin(randomAngle));
  // console.log(radiusSquared, randomRadius, randomAngle, offset, point.x, point.y);
  return point;
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Clock__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Options__ = __webpack_require__(13);





class HeaderComponent extends __WEBPACK_IMPORTED_MODULE_1__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("header-container");

    this.clock = new __WEBPACK_IMPORTED_MODULE_2__Clock__["a" /* default */]();
    this.options = new __WEBPACK_IMPORTED_MODULE_3__Options__["a" /* default */](props);
  }

  render() {
    let login = false;
    if (this.props) {
      const { isLogin } = this.props;
      login = isLogin;
    }

    const htmlString = `
      <div class="flex-container header">
        <div class="lbl" id="clock-placeholder"></div>
        <div class="flex-container center logo-wrapper">
          <img class="logo" src="./img/pizza-cat.png" alt="logo">
        </div>
        <div class="lbl" id="options-placeholder"></div>
      </div>
    `;

    const node = Object(__WEBPACK_IMPORTED_MODULE_0__utils_helper__["f" /* toHtml */])(htmlString);
    node.getElementById("clock-placeholder").append(this.clock.update());
    node.getElementById("options-placeholder").append(this.options.update({ isLogin: login}));

    return node;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HeaderComponent);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);


class FooterComponent extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("footer-container");
  }

  render() {

    return `
      <div class="flex-container footer">
        <span>
          Kottans, Kottans str., 1. <a href="Tel: 577-788-87">Tel.: 577-788-87</a> 
        </span>
        <span>
          Pizza Manager&copy;, 2018
        </span>
      </div>
    `;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FooterComponent);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helper__ = __webpack_require__(1);



class AuthService {
  constructor() {
    this._token = localStorage.getItem("token");
    // payload
    this._claims = JSON.parse(localStorage.getItem("claims"));

    Object(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["a" /* bindAll */])(this, "isAuthorized");
  }

  get token() {
    return this._token;
  }

  set token(token) {
    this._token = token;
    localStorage.setItem("token", token);
  }

  get claims() {
    return this._claims;
  }

  set claims(claims) {
    this._claims = claims;
    localStorage.setItem("claims", JSON.stringify(claims));
  }

  isAuthorized() {
    if (!this.tokenIsNotExpired()) {
      this.clearStorage();
      return false;
    }
    return true;
  }

  clearStorage() {
    this._token = null;
    this._claims = null;
    localStorage.removeItem("token");
    localStorage.removeItem("claims");
  }

  tokenIsNotExpired() {
    if (!this.token) {
      return false;
    }
    return this.claims.exp * 1000 > Date.now();
  }

  login(userData) {
    return fetch(`${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].BASE_URL}${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].ENDPOINTS.LOGIN}`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: new Headers().append("content-type", "application/json")
    })
    .then(res => {
      if (res.ok) {
        return res.json().then(answer => {
          this.token = answer.token;
          this.claims = this.parseJwtClaims(answer.token);
          return Promise.resolve({ answer, status: res.status });
          });
        }
      return res.json().then(answer => Promise.reject({ answer, status: res.status }));
    });
  }

  parseJwtClaims(jwtToken) {
    if (jwtToken) {
      let base64Url = jwtToken.split(".")[1];
      // replaces invalid symbols
      let base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    }
    return {};
  }
}

// Singleton
const AUTH_SERVICE = new AuthService();
/* harmony export (immutable) */ __webpack_exports__["a"] = AUTH_SERVICE;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const API = {
  BASE_URL: "https://pizza-tele.ga/",
  ENDPOINTS: {
    STORE_LIST: "api/v1/store/list",
    CREATE_USER: "api/v1/user/create",
    LOGIN: "api/v1/user/login",
    MY_INFO: "api/v1/user/my_info",
    PIZZA_LIST: "api/v1/pizza/list",
    CREATE_PIZZA: "api/v1/pizza/create",
    INGREDIENT_LIST: "api/v1/ingredient/list",
    TAG_LIST: "api/v1/tag/list"
  },
  CRUST_PIZZA: "static/images/pizza.png"
};
/* harmony export (immutable) */ __webpack_exports__["a"] = API;


// export const STATUS_CODES = {
//   OK: "200",
//   BAD_REQUEST: "400",
//   UNAUTHORIZED: "401",
//   FORBIDDEN: "403",
//   NOT_FOUND: "404"
// };


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AuthHttpService__ = __webpack_require__(7);



class PizzaDataService {
  constructor() {
    this.crust_pizza = `${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].BASE_URL}${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].CRUST_PIZZA}`;
    console.log(this.crust_pizza);

    this.ingredients = [];
    this.tags = [];
    this.images = {};
  }

  _loadResources() {
    let promises = [];
    promises.push(this._loadImage("pizza", this.crust_pizza));
    promises = promises.concat(this.ingredients.map(ingredient => {
      const ingrUrl = `${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].BASE_URL}${ingredient.image_url}`;
      return this._loadImage(ingredient.name, ingrUrl);
    }));
    return Promise.all(promises);
  }

  _loadImage(name, url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ name, image });
      image.onerror = (e) => reject(e);
      image.src = url;
    });
  }

  _getIngredients() {
    return __WEBPACK_IMPORTED_MODULE_1__AuthHttpService__["a" /* AUTH_HTTP_SERVICE */].get(`${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].ENDPOINTS.INGREDIENT_LIST}`)
      .then(data => {
        this.ingredients = data.answer.results;
        return data;
      });
  }

  _getTags() {
    return __WEBPACK_IMPORTED_MODULE_1__AuthHttpService__["a" /* AUTH_HTTP_SERVICE */].get(`${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].ENDPOINTS.TAG_LIST}`)
      .then(data => {
        this.tags = data.answer.results;
        return data;
      });
  }

  loadPizzaData() {
    return Promise.all([
      this._getIngredients()
        .then(() => this._loadResources())
        .then(resources => 
          resources.forEach(
            resource => this.images[resource.name] = resource.image
          )
        ),
      this._getTags()
    ]);
  }
}

const PIZZA_DATA_SERVICE = new PizzaDataService();
/* harmony export (immutable) */ __webpack_exports__["a"] = PIZZA_DATA_SERVICE;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AuthService__ = __webpack_require__(4);




class AuthHttpService {
  get(endpoint) {
    const headers = new Headers({ "Content-Type": "application/json" });
    
    if (__WEBPACK_IMPORTED_MODULE_2__AuthService__["a" /* AUTH_SERVICE */].isAuthorized()) {
      headers.append("Authorization", `Bearer ${__WEBPACK_IMPORTED_MODULE_2__AuthService__["a" /* AUTH_SERVICE */].token}`);
    }

    return fetch(`${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].BASE_URL}${endpoint}`, { headers })
      .then(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["e" /* processResponse */]);
  }

  post(endpoint, payload) {
    return fetch(`${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["e" /* processResponse */]);
  }
  
  getStores() {
    return this.get(__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].ENDPOINTS.STORE_LIST);
  }
  
  createUser(userData) {
    return this.post(__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].ENDPOINTS.CREATE_USER, userData);
  }

  getMyInfo() {
    return this.get(__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].ENDPOINTS.MY_INFO);
  }
}

const AUTH_HTTP_SERVICE = new AuthHttpService();
/* harmony export (immutable) */ __webpack_exports__["a"] = AUTH_HTTP_SERVICE;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(10);



const router = new __WEBPACK_IMPORTED_MODULE_0__framework_Router__["a" /* default */]({ routes: __WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */], host: document.getElementById("root") });


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helper__ = __webpack_require__(1);



class Router extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {
  constructor(props) {
    super(props);

    const { routes, host } = props;

    this.state = {
      routes,
      currentRoute: null,
      currentComponent: null
    };

    this.host = host;

    Object(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["a" /* bindAll */])(this, "handleUrlChange", "navigateTo");

    window.addEventListener("hashchange", () => {
      this.handleUrlChange(this.path);
    });

    this.handleUrlChange(this.path);
  }

  get path() {
    return window.location.hash.slice(1);
  }

  handleUrlChange(path) {
    const { routes, currentRoute } = this.state;

    // const nextRoute = routes.find(({ href }) => href === this.path);
    const nextRoute = routes.find(({ href }) => Object(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["d" /* isEqualPaths */])(href, this.path));
    console.log(nextRoute);

    if (nextRoute && nextRoute !== currentRoute) {
      if (nextRoute.onEnter) {
        this.handleOnEnter(nextRoute);
        return;
      }

      if (nextRoute.authorized && !nextRoute.authorized()) {
        this.navigateTo("/login");
        return;
      }

      if (nextRoute.redirectTo) {
        this.navigateTo(nextRoute.redirectTo);
        return;
      }

      this.updateState({
        currentComponent: new nextRoute.component(),
        currentRoute: nextRoute
      });
    }
  }

  navigateTo(url) {
    window.location.hash = url;
  }

  handleOnEnter({ onEnter }) {
    onEnter(this.navigateTo);
  }

  render() {
    const { currentComponent, currentRoute } = this.state;

    return currentComponent.update({
      params: Object(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["b" /* extractUrlParams */])(currentRoute.href, this.path)
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Router);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_AuthService__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Dashboard__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Register__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_MyInfo__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_PizzaComposer__ = __webpack_require__(21);







const routes = [
  {
    href: "",
    redirectTo: "/"
  },
  {
    href: "/",
    component: __WEBPACK_IMPORTED_MODULE_1__components_Dashboard__["a" /* default */],
    authorized: __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AUTH_SERVICE */].isAuthorized
  },
  {
    href: "/login",
    component: __WEBPACK_IMPORTED_MODULE_2__components_Login__["a" /* default */]
  },
  {
    href: "/register",
    component: __WEBPACK_IMPORTED_MODULE_3__components_Register__["a" /* default */],
  },
  {
    href: "/my-info",
    component: __WEBPACK_IMPORTED_MODULE_4__components_MyInfo__["a" /* default */],
    authorized: __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AUTH_SERVICE */].isAuthorized
  },
  {
    href: "/create-pizza",
    component: __WEBPACK_IMPORTED_MODULE_5__components_PizzaComposer__["a" /* default */],
    authorized: __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AUTH_SERVICE */].isAuthorized
  },
  {
    href: "/logout",
    onEnter: navigateTo => {
      // console.log("Inside onEnter()");
      __WEBPACK_IMPORTED_MODULE_0__services_AuthService__["a" /* AUTH_SERVICE */].clearStorage();
      navigateTo("/login");
    }
  }
];

/* harmony default export */ __webpack_exports__["a"] = (routes);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DashboardComponent__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FooterComponent__ = __webpack_require__(3);





class Dashboard extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.headerComponent = new __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__["a" /* default */]();
    this.dashboardComponent = new __WEBPACK_IMPORTED_MODULE_2__DashboardComponent__["a" /* default */]();
    this.footerComponent = new __WEBPACK_IMPORTED_MODULE_3__FooterComponent__["a" /* default */]();

    this.host = document.createElement("div");
    this.host.classList.add("container");
  }

  render() {
    return [
      this.headerComponent.update({}),
      this.dashboardComponent.update({}),
      this.footerComponent.update({})
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dashboard);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);


class Clock extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.state = {
      time: "00:00:00"
    };
    
    function align(smth) {
      if ( smth < 10) {
          return `0${smth.toString()}`;
      }
      return smth.toString();
    }
    
    function getCurrentTime() {
      const current = new Date();
      return `
          ${align(current.getHours())}:${align(current.getMinutes())}:${align(current.getSeconds())}
          `;
    }

    this.host = document.createElement("div");
    this.host.classList.add("clock");

    setInterval(() => {
      const time = getCurrentTime();
      this.updateState({ time });
    }, 1000);
  }

  render() {
    const { time } = this.state;

    return `
      <i class="fa fa-clock-o fa-fw label" aria-hidden="true"></i>
      <time datetime="00:00:00" id="clock">${time}</time>
    `;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Clock);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_AuthService__ = __webpack_require__(4);



class Options extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    let uname = "";

    if (__WEBPACK_IMPORTED_MODULE_1__services_AuthService__["a" /* AUTH_SERVICE */].claims) {
      const { username } = __WEBPACK_IMPORTED_MODULE_1__services_AuthService__["a" /* AUTH_SERVICE */].claims;
      uname = username;
    }

    this.state = {
      user: uname
    };

    this.host = document.createElement("div");
    this.host.classList.add("options");

  }

  render() {
    const { user } = this.state;
    
    let login = false;
    if (this.props) {
      const { isLogin } = this.props;
      login = isLogin;
    }

    const href = () => {
      if (!user) {
        if (login) {
          return "register";
        }
        return "login";
      }
      return "logout";
    };

    return `
      <i class="fa fa-user fa-fw label" aria-hidden="true"></i>
      <a href="#/my-info">${user}</a>
      <a href="#/${href()}">${href().toUpperCase()}</a>
    `;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Options);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);


class DashboardComponent extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("dashboard-container");
    this.host.addEventListener("click", this.handleClick);
  }

  handleClick(ev) {
    if (ev.target.id === "add-new-pizza-btn") {
      window.location.hash = "/create-pizza";
    }
  }

  render() {

    let ordersString = "";

    for (let i = 1; i < 10; i++) {
      ordersString += `
        <div class="flex-container center padded position-${i}">
          <div class="img-container">
            <img class="tile" src="img/${i}.png" alt="image">
          </div>
          <div class="details">
            <div class="flex-container">
              <time datetime="00:00:00">XX:XX:XX</time>
              <span>#1</span>
            </div> 
            <div class="flex-container">
              <strong>ETA: 1min</strong>
              <strong><money>$32.00</money></strong>
            </div>      
          </div>
        </div>
      `;
    }

    return `
      <div class="flex-container center">
        <button class="btn btn-ordinary" type="button" id="add-new-pizza-btn">
          <i class="fa fa-plus fa-fw label" aria-hidden="true"></i>
          ADD NEW PIZZA
        </button>
      </div>
      <div class="wrapper">
        ${ordersString}
      </div>
    `;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DashboardComponent);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LoginComponent__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FooterComponent__ = __webpack_require__(3);





class Login extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.headerComponent = new __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__["a" /* default */]();
    this.loginComponent = new __WEBPACK_IMPORTED_MODULE_2__LoginComponent__["a" /* default */]();
    this.footerComponent = new __WEBPACK_IMPORTED_MODULE_3__FooterComponent__["a" /* default */]();

    this.host = document.createElement("div");
    this.host.classList.add("container");
  }

  render() {
    return [
      this.headerComponent.update({ isLogin: true }),
      this.loginComponent.update({}),
      this.footerComponent.update({})
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Login);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_AuthService__ = __webpack_require__(4);



class LoginComponent extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("login-container");

    this.host.addEventListener("focus", this.handleFocus, true);
    this.host.addEventListener("submit", this.handleSubmit);
  }

  handleFocus(ev) {
    if (ev.target.id === "username" || ev.target.id === "password") {
      document.getElementById("alert-placeholder").innerHTML = "";
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const userData = {
      username: ev.target.username.value,
      password: ev.target.password.value
    };

    __WEBPACK_IMPORTED_MODULE_1__services_AuthService__["a" /* AUTH_SERVICE */].login(userData)
      .then(res => {
        if (res.answer.success) {
          console.log(__WEBPACK_IMPORTED_MODULE_1__services_AuthService__["a" /* AUTH_SERVICE */].token);
          console.log(__WEBPACK_IMPORTED_MODULE_1__services_AuthService__["a" /* AUTH_SERVICE */].claims);
          console.log(__WEBPACK_IMPORTED_MODULE_1__services_AuthService__["a" /* AUTH_SERVICE */].isAuthorized());
          window.location.hash = "/my-info";
        }
      })
      .catch(err => {
        document.getElementById("alert-placeholder").innerHTML = err.answer.error;
      });
  }

  render() {
    return `
      <form class="login-form">
        <p class="alert-txt" id="alert-placeholder"></p>
        <label for="username">Username: </label>
        <input 
          name="username"
          class="fld" 
          id="username" 
          type="text" 
          minlength="2" 
          maxlength="24" 
          placeholder="Enter your name..." 
          required 
          value="">
        <label for="password">Password: </label>
        <input 
          name="password" 
          class="fld"
          id="password" 
          type="password" 
          minlength="8" 
          placeholder="Enter your password..." 
          required 
          value="">
        <button class="btn btn-wide" id="submit-btn" type="submit">Submit</button>
      </form>
    `;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LoginComponent);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RegisterComponent__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FooterComponent__ = __webpack_require__(3);





class Register extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.headerComponent = new __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__["a" /* default */]();
    this.registerComponent = new __WEBPACK_IMPORTED_MODULE_2__RegisterComponent__["a" /* default */]();
    this.footerComponent = new __WEBPACK_IMPORTED_MODULE_3__FooterComponent__["a" /* default */]();

    this.host = document.createElement("div");
    this.host.classList.add("container");
  }

  render() {
    return [
      this.headerComponent.update({}),
      this.registerComponent.update({}),
      this.footerComponent.update({})
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Register);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_AuthHttpService__ = __webpack_require__(7);



class RegisterComponent extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.state = {
      options: ""
    };

    this.host = document.createElement("div");
    this.host.classList.add("register-container");

    this.host.addEventListener("focus", this.handleFocus, true);
    this.host.addEventListener("submit", this.handleSubmit);

    __WEBPACK_IMPORTED_MODULE_1__services_AuthHttpService__["a" /* AUTH_HTTP_SERVICE */].getStores()
      .then(data => {
        const options = data.answer.map(store => `<option value="${store.id}">${store.name}</option>`).join("");
        this.updateState({ options });
      });
  }

  handleFocus(ev) {
    if (
      ev.target.id === "username" || 
      ev.target.id === "password" ||
      ev.target.id === "password_repeat" ||
      ev.target.id === "email" ||
      ev.target.id === "store_id" ||
      ev.target.id === "store_password"
    ) {
      document.getElementById("alert-placeholder").innerHTML = "";
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const userData = {
      username: ev.target.username.value,
      password: ev.target.password.value,
      password_repeat: ev.target.password_repeat.value,
      email: ev.target.email.value,
      store_id: Number(ev.target.store_id.value),
      store_password: ev.target.store_password.value
    };
    
    console.log(userData);

    __WEBPACK_IMPORTED_MODULE_1__services_AuthHttpService__["a" /* AUTH_HTTP_SERVICE */].createUser(userData)
      .then(res => {
        if (res.answer.success) {
          window.location.hash = "/login";
        }
      })
      .catch(err => {
        document.getElementById("alert-placeholder").innerHTML = err.answer.error;
      });
  }

  render() {
    const { options } = this.state;

    return `
      <form class="register-form">
        <p class="alert-txt" id="alert-placeholder"></p>
        <label for="username">Username:</label>
        <input 
          name="username" 
          class="fld" 
          id="username" 
          type="text" 
          minlength="2" 
          maxlength="24" 
          placeholder="Enter new user name..." 
          required
          value="">
        <label for="password">Password:</label>
        <input 
          name="password" 
          class="fld" 
          id="password" 
          type="password" 
          minlength="8"
          placeholder="Enter password..."  
          required
          value="">
        <label for="password_repeat">Confirm password:</label>
        <input 
          name="password_repeat" 
          class="fld" 
          id="password_repeat" 
          type="password" 
          minlength="8" 
          placeholder="Repeat entering password..." 
          required
          value="">
        <label for="email">Email:</label>
        <input 
          name="email" 
          class="fld" 
          id="email" 
          type="email"
          placeholder="Enter email address..." 
          required
          value="">
        <label for="store_id">Choose your store:</label>
        <select name="store_id" class="fld" id="store_id" required>
          ${options}
        </select>
        <label for="store_password">Store password:</label>
        <input 
          name="store_password" 
          class="fld"
          id="store_password" 
          type="password" 
          minlength="8"
          placeholder="Enter password for selected store..."  
          required
          value="">
        <button class="btn btn-wide" id="register-btn" type="submit">Submit</button>
      </form>
    `;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RegisterComponent);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MyInfoComponent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FooterComponent__ = __webpack_require__(3);





class MyInfo extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.headerComponent = new __WEBPACK_IMPORTED_MODULE_1__HeaderComponent__["a" /* default */]();
    this.myInfoComponent = new __WEBPACK_IMPORTED_MODULE_2__MyInfoComponent__["a" /* default */]();
    this.footerComponent = new __WEBPACK_IMPORTED_MODULE_3__FooterComponent__["a" /* default */]();

    this.host = document.createElement("div");
    this.host.classList.add("container");
  }

  render() {
    return [
      this.headerComponent.update({}),
      this.myInfoComponent.update({}),
      this.footerComponent.update({})
    ];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MyInfo);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_AuthHttpService__ = __webpack_require__(7);



class MyInfoComponent extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.state = {
      myInfo: {
        username: "",
        uuid: "",
        email: "",
        created_at: "",
        last_login: ""
      }
    };

    this.host = document.createElement("div");
    this.host.classList.add("my-info-container");
    this.host.addEventListener("click", this.handleClick);

    __WEBPACK_IMPORTED_MODULE_1__services_AuthHttpService__["a" /* AUTH_HTTP_SERVICE */].getMyInfo()
      .then(data => this.updateState({ myInfo: data.answer }));
  }

  handleClick(ev) {
    if (ev.target.id === "dashboard-btn") {
      window.location.hash = "/";
    }
  }

  render() {
    const { myInfo } = this.state;

    return `
      <h2>Username: ${myInfo.username}</h2>
      <p>UUID: ${myInfo.uuid}</p>
      <p>Email: ${myInfo.email}</p>
      <p>Created at: ${myInfo.created_at}</p>
      <p>Last login: ${myInfo.last_login}</p>
      <button class="btn btn-wide" id="dashboard-btn" type="button">Dashboard</button>
    `;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MyInfoComponent);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HeaderComponent__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ComposerFormComponent__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ComposerViewComponent__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__FooterComponent__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_PizzaDataService__ = __webpack_require__(6);








class PizzaComposer extends __WEBPACK_IMPORTED_MODULE_1__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.state = {
      isDataReady: false
    };

    this.headerComponent = new __WEBPACK_IMPORTED_MODULE_2__HeaderComponent__["a" /* default */]();
    this.composerFormComponent = new __WEBPACK_IMPORTED_MODULE_3__ComposerFormComponent__["a" /* default */]({
      onDataChange: this.onDataChange
    });
    this.composerViewComponent = new __WEBPACK_IMPORTED_MODULE_4__ComposerViewComponent__["a" /* default */]({ 
      isDataReady: this.state.isDataReady,
      ingredients: [],
      size: 60
    });
    this.footerComponent = new __WEBPACK_IMPORTED_MODULE_5__FooterComponent__["a" /* default */]();

    this.host = document.createElement("div");
    this.host.classList.add("container");

    Object(__WEBPACK_IMPORTED_MODULE_0__utils_helper__["a" /* bindAll */])(this, "onDataChange");

    this._onInit();
  }

  _onInit() {
    __WEBPACK_IMPORTED_MODULE_6__services_PizzaDataService__["a" /* PIZZA_DATA_SERVICE */].loadPizzaData()
      .then(data => {
        this.updateState({ isDataReady: true });
        return data;
      });
  }

  onDataChange(ingredients, size) {
    console.log(ingredients, size);
    this.composerViewComponent.update({
      isDataReady: this.state.isDataReady,
      ingredients,
      size
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

    const node = Object(__WEBPACK_IMPORTED_MODULE_0__utils_helper__["f" /* toHtml */])(htmlString);
    node.getElementById("header").append(this.headerComponent.update({}));
    node.getElementById("data-placeholder").append(this.composerFormComponent.update({
      onDataChange: this.onDataChange
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

/* harmony default export */ __webpack_exports__["a"] = (PizzaComposer);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_PizzaDataService__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PriceComponent__ = __webpack_require__(23);






class ComposerFormComponent extends __WEBPACK_IMPORTED_MODULE_2__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.size = 60;
    this.ingredients = [];
    this.tags = [];

    this.priceComponent = new __WEBPACK_IMPORTED_MODULE_4__PriceComponent__["a" /* default */]({
      size: this.size,
      ingredients: this.ingredients
    });

    this.host = document.createElement("div");
    this.host.classList.add("container");

    Object(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["a" /* bindAll */])(this, "handleChange", "handleClick", "handleSubmit");

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
          ${__WEBPACK_IMPORTED_MODULE_3__services_PizzaDataService__["a" /* PIZZA_DATA_SERVICE */].ingredients.reduce((html, ingr) => {
            html += `
              <label class="check-holder-label" title="${ingr.name}"> 
                <input class="ingredient" type="checkbox" name="${ingr.name}" value="${ingr.id}">
                <span class="ingredient-span">
                  <img 
                    src="${__WEBPACK_IMPORTED_MODULE_0__utils_config__["a" /* API */].BASE_URL}${ingr.image_url}" 
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
          ${__WEBPACK_IMPORTED_MODULE_3__services_PizzaDataService__["a" /* PIZZA_DATA_SERVICE */].tags.reduce((html, tag) => {
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

    const node = Object(__WEBPACK_IMPORTED_MODULE_1__utils_helper__["f" /* toHtml */])(htmlString);
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

/* harmony default export */ __webpack_exports__["a"] = (ComposerFormComponent);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_PizzaDataService__ = __webpack_require__(6);



class PriceComponent extends __WEBPACK_IMPORTED_MODULE_0__framework_Component__["a" /* default */] {
  constructor(props) {
    super(props);

    this.host = document.createElement("div");
    this.host.classList.add("flex-container");
  }

  render() {
    const { size, ingredients} = this.props;

    let totalPrice = size / 5;

    if (__WEBPACK_IMPORTED_MODULE_1__services_PizzaDataService__["a" /* PIZZA_DATA_SERVICE */].ingredients) {
      this.ingredientsData = __WEBPACK_IMPORTED_MODULE_1__services_PizzaDataService__["a" /* PIZZA_DATA_SERVICE */].ingredients
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

/* harmony default export */ __webpack_exports__["a"] = (PriceComponent);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Sprite__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__framework_Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_PizzaDataService__ = __webpack_require__(6);





class ComposerViewComponent extends __WEBPACK_IMPORTED_MODULE_2__framework_Component__["a" /* default */] {
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
      let pizza = new __WEBPACK_IMPORTED_MODULE_1__services_Sprite__["a" /* default */](
        __WEBPACK_IMPORTED_MODULE_3__services_PizzaDataService__["a" /* PIZZA_DATA_SERVICE */].images["pizza"], 
        this.canvasWidth / 2, 
        this.canvasHeight / 2, 
        diameter, 
        diameter
      );
      sprites["pizza"] = pizza;
      spritesPool.push(pizza);

      ingredients.forEach(ingredient => {
        for (let i = 0; i < maxI; i++) {
          const point = Object(__WEBPACK_IMPORTED_MODULE_0__utils_helper__["c" /* getPoint */])(this.canvasWidth, diameter, i, maxI);
          const ingrSprite = new __WEBPACK_IMPORTED_MODULE_1__services_Sprite__["a" /* default */](
            __WEBPACK_IMPORTED_MODULE_3__services_PizzaDataService__["a" /* PIZZA_DATA_SERVICE */].images[ingredient], 
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

/* harmony default export */ __webpack_exports__["a"] = (ComposerViewComponent);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sprite {
  // cx, cy - center of the sprite
  constructor(image, cx, cy, width, height) {
    // order matters
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.width = width || this.image.width;
    this.height = height  || this.image.height;
    this.cx = cx || 0;
    this.cy = cy || 0;
  }

  get cx() {
    return Math.round(this.x + this.width * 0.5);
  }

  get cy() {
    return Math.round(this.y + this.height * 0.5);
  }

  set cx(value) {
    this.x = Math.round(value - this.width * 0.5);
  }

  set cy(value) {
    this.y = Math.round(value - this.height * 0.5);
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);

/***/ })
/******/ ]);