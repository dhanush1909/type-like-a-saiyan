import randomWords from "random-words";

export const getWords = () => {
  return randomWords({ exactly: 25, formatter: (word) => word.toLowerCase() });
};
