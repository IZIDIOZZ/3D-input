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

export const findKeyMapByName = (name, keysMap) =>
  keysMap.find((x) => x.keyName.toUpperCase() === name.toUpperCase());
