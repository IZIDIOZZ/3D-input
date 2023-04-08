import { clearScene, generateLetter } from "./src/generator/index.js";
import { generateRandomColor } from "./src/helpers/color/index.js";
import { applyCssTo } from "./src/helpers/css/index.js";
import { findKeyMap } from "./src/helpers/key-map-finder/index.js";
import { lengthOf } from "./src/helpers/string/index.js";
import keysMap from "./src/keys-map/index.js";

export const init = ({ size = 200, perspective = 900 }) => {
  const keyboardScene = document.getElementById("keyboard-scene");
  const keyboardText = document.getElementById("keyboard-value");
  const usedSpace = {
    horizontalUnits: 0,
    verticalUnits: 0,
    zIndex: 0,
  };

  applyCssTo(keyboardScene, {
    width: `${size}px`,
    height: `${size}px`,
    perspective: `${perspective}px`,
  });

  focusTextInput(keyboardText);

  const color = generateRandomColor();

  keyboardText.addEventListener("keyup", (event) => {
    clearScene(keyboardScene, usedSpace);
    if (lengthOf(keyboardText)) removeUnmappedCharacters(keyboardText, keysMap);

    for (const index in keyboardText.value) {
      const keyMap = findKeyMap(keyboardText.value[index], keysMap);
      if (!keyMap) continue;
      generateLetter(keyboardScene, usedSpace, size, color, keyMap);
    }

    moveCameraHorizontal(keyboardText, size, keysMap);
  });
};

const focusTextInput = (keyboardText) => {
  keyboardText.focus();
  keyboardText.onblur = () => setTimeout(() => keyboardText.focus());
};

const removeUnmappedCharacters = (keyboardText, keysMap) => {
  if (lengthOf(keyboardText) == 1 && !findKeyMap(keyboardText.value, keysMap)) {
    keyboardText.value = "";
    return;
  }

  keyboardText.value = keyboardText.value
    .split("")
    .reduce(
      (prev, current) =>
        (findKeyMap(current, keysMap) && prev + current) || prev
    );
};

const moveCameraHorizontal = (keyboardText, size, keysMap) => {
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

init({ size: 30, perspective: 1700 });
