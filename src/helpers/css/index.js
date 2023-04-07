export const applyCssTo = (destination, style) => {
  for (const property in style) destination.style[property] = style[property];
};
