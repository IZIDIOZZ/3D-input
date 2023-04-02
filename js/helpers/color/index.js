export const generateRandomColor = () => {
  let rgb = ["r", "g", "b"].map(() => Math.floor(Math.random() * 255));
  
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
  };
};
