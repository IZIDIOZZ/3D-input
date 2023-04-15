import { getCubeFaces, getPositionByFace } from "../../constants/index.js";
import { createHTMLElement } from "../../helpers/html-creation/index.js";

const renderCube = ({
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

const generateLetter = (
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

export default {
  renderCube,
  generateLetter,
};
