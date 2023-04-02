import { renderCube } from "./js/generator/index.js";
import { generateRandomColor } from "./js/helpers/color/index.js";
import { applyCssTo } from "./js/helpers/css/index.js";
import keysMap from "./js/keys-map/index.js";
export const init = ({ size = 200, perspective = 900 }) => {
  
  const keyboardScene = document.getElementById("keyboard-scene");
  const keyboardText = document.getElementById("keyboard-value");

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

  for (const key of keyboardText.value) {
      const keyCode = key.toUpperCase().charCodeAt();
      const { r, g, b } = generateRandomColor();

      const map = keysMap.find(x=>x.KeyCode === keyCode);
      
      if(map) {
        map.cubes.forEach((cube) => {
          keyboardScene.appendChild(
            renderCube({
              size,
              usedSpace,
              position: {
                horizontalPos: cube.horizontalPos,
                verticalPos: cube.verticalPos,
              },
              zIndex,
              color: `rgb(${r},${g},${b})`
            })
          );
          zIndex -= 1
          usedSpace.verticalUnits = usedSpace.verticalUnits + 1;
        });
        usedSpace.horizontalUnits = usedSpace.horizontalUnits + map.horizontalSpaceUnit;
      }
  }

  window.addEventListener("keyup", (event) => {
    // TODO: add text generation when press key
  });
};

init({ size: 60, perspective: 900 });
