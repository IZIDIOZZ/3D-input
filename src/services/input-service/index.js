import { moveCameraHorizontal } from "../../helpers/camera-simulation/index.js";
import {
  findKeyMap,
  removeUnmappedCharacters,
} from "../../helpers/key-map-finder/index.js";
import { lengthOf } from "../../helpers/string/index.js";
import generatorService from "../generator-service/index.js";
import keysMap from "../../keys-map/index.js";

const create3DInput = ({
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
    generatorService.generateLetter(usedSpace, size, color, keyMap, letterList);
  }

  keyboardScene.append(...letterList);
  moveCameraHorizontal(keyboardText, size, keysMap);
};

const clearScene = (keyboardScene, usedSpace, letterList) => {
  keyboardScene.innerHTML = "";
  usedSpace.horizontalUnits = 0;
  usedSpace.verticalUnits = 0;
  letterList.splice(0, letterList.length);
};

export default {
  create3DInput,
};
