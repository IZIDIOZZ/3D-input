import { applyCssTo } from "../helpers/css/index.js";

const getPositionByFace = (face) => {
  const positions = {
    front: {
      horizontal: (position) => `translateX(${position}px)`,
      vertical: (position) => `translateY(${invert(position)}px)`,
    },
    back: {
      horizontal: (position) => `translateX(${invert(position)}px)`,
      vertical: (position) => `translateY(${invert(position)}px)`,
    },
    right: {
      horizontal: (position) => `translateZ(${position}px)`,
      vertical: (position) => `translateY(${invert(position)}px)`,
    },
    left: {
      horizontal: (position) => `translateZ(${invert(position)}px)`,
      vertical: (position) => `translateY(${invert(position)}px)`,
    },
    top: {
      horizontal: (position) => `translateX(${position}px)`,
      vertical: (position) => `translateZ(${position}px)`,
    },
    bottom: {
      horizontal: (position) => `translateX(${position}px)`,
      vertical: (position) => `translateZ(${invert(position)}px)`,
    },
  };

  return positions[face];
};

const invert = (number) =>
  (number < 0 && Math.abs(number)) || -Math.abs(number);

export const renderCube = ({
  size,
  usedSpace: { horizontalUnits, verticalUnits, zIndex },
  position: { horizontalPos, verticalPos },
  color,
}) => {
  const cube = document.createElement("div");
  cube.classList.add("cube", "perspective");

  applyCssTo(cube, {
    zIndex,
  });

  const cubeFaces = [
    {
      side: "front",
      cssProps: {
        transform: `rotateY(0deg) translateZ(${size / 2}px) `,
        backgroundColor: color,
      },
    },
    {
      side: "right",
      cssProps: {
        transform: `rotateY(90deg) translateZ(${size / 2}px)`,
        backgroundColor: color,
      },
    },
    {
      side: "back",
      cssProps: {
        transform: `rotateY(180deg) translateZ(${size / 2}px) `,
        backgroundColor: color,
      },
    },
    {
      side: "left",
      cssProps: {
        transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
        backgroundColor: color,
        filter: "brightness(85%)",
      },
    },
    {
      side: "top",
      cssProps: {
        transform: `rotateX(90deg) translateZ(${size / 2}px)`,
        backgroundColor: color,
        filter: "brightness(90%)",
      },
    },
    {
      side: "bottom",
      cssProps: {
        transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
        backgroundColor: color,
        filter: "brightness(50%)",
      },
    },
  ];

  cubeFaces.forEach(({ side: faceName, cssProps }) => {
    let face = document.createElement("div");

    const { horizontal, vertical } = getPositionByFace(faceName);

    applyCssTo(face, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: `${cssProps.transform} ${horizontal(
        (horizontalUnits + horizontalPos) * size
      )} ${vertical((verticalUnits + verticalPos) * size)}`,
      backgroundColor: cssProps.backgroundColor,
      filter: cssProps?.filter
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
