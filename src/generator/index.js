import { applyCssTo } from "../helpers/css/index.js";
import { getCubeFaces, getPositionByFace } from "../view-constants/index.js";

export const renderCube = ({
  size,
  usedSpace: { horizontalUnits, verticalUnits, zIndex },
  position: { horizontalPos, verticalPos },
  color,
  styles,
}) => {
  const cube = document.createElement("div");
  cube.classList.add("cube", "perspective");

  applyCssTo(cube, {
    zIndex,
  });

  getCubeFaces({ size, color }).forEach(({ side: faceName, cssProps }) => {
    let face = document.createElement("div");

    const { horizontal, vertical } = getPositionByFace(faceName);

    applyCssTo(face, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...cssProps,
      transform: `${cssProps.transform} ${horizontal(
        (horizontalUnits + horizontalPos) * size
      )} ${vertical((verticalUnits + verticalPos) * size)}`,
      ...styles,
    });

    face.classList.add(faceName);

    cube.appendChild(face);
  });

  return cube;
};

export const clearScene = (keyboardScene, usedSpace) => {
  keyboardScene.innerHTML = "";
  usedSpace.horizontalUnits = 0;
  usedSpace.verticalUnits = 0;
};

export const generateLetter = (
  keyboardScene,
  usedSpace,
  size,
  { r, g, b },
  keyMap,
  styles = {}
) => {
  keyMap.cubes.forEach((cube) => {
    keyboardScene.appendChild(
      renderCube({
        size,
        usedSpace,
        position: cube,
        color: `rgb(${r},${g},${b})`,
        styles,
      })
    );
    usedSpace.zIndex -= 1;
    usedSpace.verticalUnits = usedSpace.verticalUnits + 1;
  });

  usedSpace.horizontalUnits += keyMap.horizontalSpaceUnit;
};