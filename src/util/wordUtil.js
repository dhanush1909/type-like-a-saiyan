import randomWords from "random-words";
import Word from "@/models/Word";
import Letter from "@/models/Letter";

export const getWords = () => {
  const words = randomWords({
    exactly: 10,
    formatter: (word) => word.toLowerCase(),
  });
  return words.map((word) => {
    let letters = [];
    for (let i = 0; i < word.length; i++) {
      let letter = new Letter(word[i]);
      letter.letter = word[i];
      letters.push(letter);
    }

    return new Word(letters);
  });
};
