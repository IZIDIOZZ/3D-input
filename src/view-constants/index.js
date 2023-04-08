const positions = {
  front: {
    horizontal: (pos) => translateFunc("X", pos),
    vertical: (pos) => translateFunc("Y", invert(pos)),
  },
  back: {
    horizontal: (pos) => translateFunc("X", invert(pos)),
    vertical: (pos) => translateFunc("Y", invert(pos)),
  },
  right: {
    horizontal: (pos) => translateFunc("Z", pos),
    vertical: (pos) => translateFunc("Y", invert(pos)),
  },
  left: {
    horizontal: (pos) => translateFunc("Z", invert(pos)),
    vertical: (pos) => translateFunc("Y", invert(pos)),
  },
  top: {
    horizontal: (pos) => translateFunc("X", pos),
    vertical: (pos) => translateFunc("Z", pos),
  },
  bottom: {
    horizontal: (pos) => translateFunc("X", pos),
    vertical: (pos) => translateFunc("Z", invert(pos)),
  },
};

const translateFunc = (translateDirection = "X", position) =>
  `translate${translateDirection}(${position}px)`;

const invert = (number) =>
  (number < 0 && Math.abs(number)) || -Math.abs(number);

export const getPositionByFace = (face) => positions[face];

export const getCubeFaces = ({ size, color }) => [
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
