export const findKeyMap = (character, keysMap) =>
  keysMap.find(
    (x) =>
      x.KeyCode ===
      character
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .charCodeAt()
  );
