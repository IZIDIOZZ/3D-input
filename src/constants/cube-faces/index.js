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
