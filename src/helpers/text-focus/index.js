export const focusTextInput = (input) => {
  input.focus();
  input.onblur = () => setTimeout(() => input.focus());
};
