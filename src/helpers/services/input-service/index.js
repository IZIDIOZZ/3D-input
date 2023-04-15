import { clearScene, generateLetter } from "../../../generator/index.js";
import { moveCameraHorizontal } from "../../camera-simulation/index.js";
import {
  findKeyMap,
  removeUnmappedCharacters,
} from "../../key-map-finder/index.js";
import { lengthOf } from "../../string/index.js";
import keysMap from "../../../keys-map/index.js";

export const create3DInput = ({
  keyboardScene,
  keyboardText,
  usedSpace,
  letterList,
  size,
  color,
}) => {
  clearScene(keyboardScene, usedSpace, letterList);

  if (lengthOf(keyboardText)) removeUnmappedCharacters(keyboardText, keysMap);
  for (const index in keyboardText.value) {
    const keyMap = findKeyMap(keyboardText.value[index], keysMap);
    if (!keyMap) continue;
    generateLetter(usedSpace, size, color, keyMap, letterList);
  }

  keyboardScene.append(...letterList);
  moveCameraHorizontal(keyboardText, size, keysMap);
};
