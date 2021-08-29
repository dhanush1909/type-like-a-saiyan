export default class Letter {
  character;
  hasError;
  isAdditional;
  isTyped;
  hadError;

  constructor(
    character,
    hasError = false,
    isAdditional = false,
    isTyped = false,
    hadError = false
  ) {
    this.character = character;
    this.hasError = hasError;
    this.isAdditional = isAdditional;
    this.isTyped = isTyped;
    this.hadError = hadError;
  }

  checkForError(typedLetter) {
    if (this.Letter === typedLetter) {
      this.hasError = true;
    }
  }
}
