export const bindAll = (context, ...names) => {
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

export const toHtml = string => {
  const template = document.createElement("template");
  template.innerHTML = string.trim();

  return template.content;
};

const URL_PARAM_REGEXP = /:\w+/g;

const isUrlParam = path => URL_PARAM_REGEXP.test(path);
const urlToRegExp = url => RegExp(`^${url.replace(URL_PARAM_REGEXP, "(.*)")}$`);
export const isEqualPaths = (template, url) => urlToRegExp(template).test(url);

// template -> /user/:id
// url -> /user/12
export const extractUrlParams = (template, url) => {
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

export const processResponse = res => {
  if (res.ok) {
    return res.json().then(answer => Promise.resolve({ answer, status: res.status }));
    }
  return res.json().then(answer => Promise.reject({ answer, status: res.status }));
};

function random(min, max) {
  return min + Math.random() * (max - min + 1.0);
};

export function getPoint(canvSize, diam, iter, maxIter) {
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
