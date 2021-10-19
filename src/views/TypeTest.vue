<template>
  <div class="type-test-container">
    <WordContainer ref="word-container" :words="words" />
    <div v-if="!testStart">Start Typing</div>
    <TestResult 
      :visible="showResult" 
      :test-start="testStart" 
      :test-end="testEnd" 
      :words="words" 
      @restart-test="restartTest"
    />
  </div>
</template>

<script>
import { getWords } from "@/util/wordUtil";
import WordContainer from '../components/typingTest/WordContainer.vue';
import TestResult from '../components/typingTest/TestResult.vue';
import Letter from '../models/Letter';

const numOfWords = 5;

export default {
  name: "TypeTest",
  components: {
    WordContainer,
    TestResult,
  },
  data() {
    return {
      words: [],
      activeWord: 0,
      testStart: null,
      testEnd: null,
      showResult: false,
    };
  },
  created() {
    this.startTest();
  },
  destroyed() {
    document.removeEventListener("keydown", this.keyPressed);
  },
  methods: {
    startTest() {
      this.words = getWords(numOfWords);
      this.$nextTick(() => {
        this.$refs["word-container"].setActiveWord(this.activeWord)
      });

      document.addEventListener("keydown", this.keyPressed);
    },
    restartTest() {
      this.showResult = false;
      this.testEnd = null;
      this.testStart = null;
      this.activeWord = 0;
      this.removeActiveWords();
      this.startTest();
    },
    removeActiveWords() {
      for(let i=0;i<this.words.length;i++) {
        this.$refs["word-container"].removeActiveWord(i);
      }
    },
    checkForError() {
      let activeWord = this.words[this.activeWord];
      for (let i = 0; i < activeWord.letters.length; i++) {
        let letter = activeWord.letters[i];
        if (letter.hasError || letter.isAdditional || !letter.isTyped) {
          activeWord.hasError = true;
          return;
        }
      }
    },
    keyPressed(event) {
      if (!this.testStart) {
        this.testStart = new Date();
      }

      let activeWord = this.words[this.activeWord];
      let pressedKey = event.key;

      if (pressedKey === "Backspace") {
        if (activeWord.currentLetter != 0) {
          activeWord.currentLetter--;
        }

        let previousChar = activeWord.letters[activeWord.currentLetter];
        if(previousChar.isAdditional) {
          activeWord.letters.pop();
        }
        previousChar.isTyped = false;
        previousChar.hasError = false;
        return;
      } 

      if (pressedKey === " " && this.activeWord !== numOfWords - 1) {
        this.checkForError();
        this.$refs["word-container"].removeActiveWord(this.activeWord)
        this.activeWord++;
        this.$refs["word-container"].setActiveWord(this.activeWord)
        return;
      }

      if (activeWord.currentLetter === activeWord.letters.length) {
        let letter = new Letter();
        letter.character = pressedKey;
        letter.isAdditional = true;
        letter.hasError = true;
        this.words[this.activeWord].letters.push(letter);
        activeWord.currentLetter++;
        return;
      }

      let activeChar = activeWord.letters[activeWord.currentLetter];
      activeChar.isTyped = true;
      if (activeChar.character !== pressedKey) {
        activeChar.isTyped = true;
        activeChar.hasError = true;
        activeChar.hadError = true;
      }

      activeWord.currentLetter++;

      if (
        this.activeWord === numOfWords - 1 &&
        (pressedKey === " " ||
          activeWord.currentLetter === activeWord.letters.length)
      ) {
        this.checkForError();
        this.endTest();
      }
    },
    endTest() {
      this.testEnd = new Date();
      this.showResult = true;
      document.removeEventListener("keydown", this.keyPressed);
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.type-test-container {
  width: 100%;
  text-align: center;
  display: grid;
}

</style>
