import { applyCssTo } from "../css/index.js";
import { findKeyMap } from "../key-map-finder/index.js";

export const moveCameraHorizontal = (keyboardText, size, keysMap) => {
  const cubes = document.querySelectorAll(".cube");

  let sumOfView = 0;
  for (const key of keyboardText.value) {
    const keyMap = findKeyMap(key, keysMap);
    if (!keyMap) continue;
    sumOfView -= keyMap.horizontalSpaceUnit * size;
  }

  cubes.forEach((child) => {
    applyCssTo(child, {
      transform: `rotateY(45deg) translateX(${sumOfView}px)`,
    });
  });
};
