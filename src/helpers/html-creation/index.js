import { applyCssTo } from "../css/index.js";

export const createHTMLElement = ({ type = "div", css = {}, classes = [] }) => {
  const htmlElement = document.createElement(type);
  htmlElement.classList.add(...classes);
  applyCssTo(htmlElement, css);
  return htmlElement;
};
