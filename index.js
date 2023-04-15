import { generateRandomColor } from "./src/helpers/color/index.js";
import { focusTextInput } from "./src/helpers/text-focus/index.js";
import { applyCssTo } from "./src/helpers/css/index.js";
import inputService from "./src/services/input-service/index.js";

export const init = ({ size = 200, perspective = 900 }) => {
  const keyboardScene = document.getElementById("keyboard-scene");
  const keyboardText = document.getElementById("keyboard-value");
  const usedSpace = {
    horizontalUnits: 0,
    verticalUnits: 0,
    zIndex: 0,
  };
  const letterList = [];

  applyCssTo(keyboardScene, {
    width: `${size}px`,
    height: `${size}px`,
    perspective: `${perspective}px`,
    display: "flex",
  });

  const color = generateRandomColor();

  focusTextInput(keyboardText);

  keyboardText.onkeyup = () =>
    inputService.create3DInput({
      keyboardScene,
      keyboardText,
      usedSpace,
      letterList,
      size,
      color,
    });
};

init({ size: 30, perspective: 1700 });
