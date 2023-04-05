import { clearScene, renderCube } from "./js/generator/index.js";
import { generateRandomColor } from "./js/helpers/color/index.js";
import { applyCssTo } from "./js/helpers/css/index.js";
import keysMap from "./js/keys-map/index.js";

const moveCameraHorizontal = (cameraPosition) => {
  const cubes = document.querySelectorAll(".cube");

  cubes.forEach((child) => {
    applyCssTo(child, {
      transform: `rotateY(45deg) translateX(${cameraPosition}px)`,
    });
  });
};

export const init = ({ size = 200, perspective = 900 }) => {
  const keyboardScene = document.getElementById("keyboard-scene");
  const keyboardText = document.getElementById("keyboard-value");
  let cameraPosition = 0;

  keyboardText.focus();
  keyboardText.onblur = () => setTimeout(() => keyboardText.focus());

  const usedSpace = {
    horizontalUnits: 0,
    verticalUnits: 0,
  };

  let zIndex = 0;

  applyCssTo(keyboardScene, {
    width: `${size}px`,
    height: `${size}px`,
    perspective: `${perspective}px`,
  });

  const { r, g, b } = generateRandomColor();
  keyboardText.addEventListener("keyup", (event) => {
    clearScene(keyboardScene, usedSpace);

    for (const key of keyboardText.value) {
      const keyCode = key.toUpperCase().charCodeAt();
      const map = keysMap.find((x) => x.KeyCode === keyCode);
      
      if (map) {
        map.cubes.forEach((cube) => {
          keyboardScene.appendChild(
            renderCube({
              size,
              usedSpace,
              position: {
                horizontalPos: cube.horizontalPos,
                verticalPos: cube.verticalPos,
                cameraPos: cameraPosition,
              },
              zIndex,
              color: `rgb(${r},${g},${b})`,
            })
          );
          zIndex -= 1;
          usedSpace.verticalUnits = usedSpace.verticalUnits + 1;
        });

        usedSpace.horizontalUnits += map.horizontalSpaceUnit;
      }
    }

    cameraPosition = -(keyboardText.value.length * (300));

    moveCameraHorizontal(cameraPosition);
  });
};

init({ size: 100, perspective: 1300 });
