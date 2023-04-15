import { lengthOf } from "../string/index.js";

export const findKeyMap = (character, keysMap) => {
  if (!character) return;
  return keysMap.find(
    (x) =>
      x.KeyCode ===
      character
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .charCodeAt()
  );
};

export const findKeyMapByName = (name, keysMap) =>
  keysMap.find((x) => x.keyName.toUpperCase() === name.toUpperCase());

export const removeUnmappedCharacters = (keyboardText, keysMap) => {
  if (lengthOf(keyboardText) == 1 && !findKeyMap(keyboardText.value, keysMap)) {
    keyboardText.value = "";
    return;
  }

  keyboardText.value = keyboardText.value
    .split("")
    .reduce(
      (prev, current) =>
        (findKeyMap(current, keysMap) && prev + current) || prev
    );
};
