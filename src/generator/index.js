import { applyCssTo } from "../helpers/css/index.js";
import { getCubeFaces, getPositionByFace } from "../view-constants/index.js";

export const renderCube = ({
  size,
  spacePosition: { horizontalUnits, verticalUnits, zIndex },
  cubePosition: { horizontalPos, verticalPos },
  color,
  styles,
}) => {
  const cube = createHTMLElement({
    type: "div",
    classes: ["cube", "perspective"],
    css: { zIndex },
  });

  getCubeFaces({ size, color }).forEach(({ side: faceName, cssProps }) => {
    const { horizontal, vertical } = getPositionByFace(faceName);
    const face = createHTMLElement({
      type: "div",
      classes: [faceName],
      css: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${size}px`,
        height: `${size}px`,
        ...cssProps,
        transform: `${cssProps.transform} 
        ${horizontal((horizontalUnits + horizontalPos) * size)} 
        ${vertical((verticalUnits + verticalPos) * size)}
        `,
        ...styles,
      },
    });

    cube.appendChild(face);
  });

  return cube;
};

export const clearScene = (keyboardScene, usedSpace, letterList) => {
  keyboardScene.innerHTML = "";
  usedSpace.horizontalUnits = 0;
  usedSpace.verticalUnits = 0;
  letterList.splice(0, letterList.length);
};

export const generateLetter = (
  usedSpace,
  size,
  { r, g, b },
  keyMap,
  letterList,
  styles = {}
) => {
  const letter = createHTMLElement({ type: "div", classes: ["letter"] });
  keyMap.cubes.forEach((cube, index) => {
    letter.appendChild(
      renderCube({
        size,
        spacePosition: {
          horizontalUnits: usedSpace.horizontalUnits,
          verticalUnits: index,
          zIndex: usedSpace.zIndex,
        },
        cubePosition: cube,
        color: `rgb(${r},${g},${b})`,
        styles,
      })
    );
    usedSpace.zIndex -= 1;
  });

  usedSpace.horizontalUnits += keyMap.horizontalSpaceUnit;
  
  letterList.push(letter);
};

const createHTMLElement = ({ type = "div", css = {}, classes = [] }) => {
  const htmlElement = document.createElement(type);
  htmlElement.classList.add(...classes);
  applyCssTo(htmlElement, css);
  return htmlElement;
};
