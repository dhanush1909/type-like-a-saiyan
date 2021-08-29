import Letter from "./Letter";

export default class Word {
  letters;
  hasError;
  isTyped;
  currentLetter = 0;
  totalActualLetters;

  constructor(letters = [], hasError = false, isTyped = false) {
    this.letters = letters;
    this.hasError = hasError;
    this.isTyped = isTyped;

    this.totalActualWords = this.letters.length;
  }

  checkForAdditional(typedKey) {
    if (this.currentLetter >= this.totalActualLetters) {
      this.letters.push(new Letter(typedKey, true, true, true));
      return true;
    } else {
      return false;
    }
  }
}
