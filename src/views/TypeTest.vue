<template>
  <div class="type-test-container">
    <el-row class="words-container">
      <el-col
        class="words has-error"
        v-for="(word, index) in words"
        :key="`word-${index}`"
        :ref="`word-ref`"
        ><div
          class="chars"
          :class="[
            {
              chars: true,
              wrong: char.hasError,
              correct: word.currentLetter > charIndex && !char.hasError,
            },
          ]"
          v-for="(char, charIndex) in word.letters"
          :key="`char-${charIndex}`"
          :ref="`char-ref-${index}`"
        >
          {{ char.character }}
        </div></el-col
      >
    </el-row>
    <div v-if="!testStart">Start Typing</div>
    <el-dialog :visible.sync="showResult">
      {{ getTestResults }}
    </el-dialog>
  </div>
</template>

<script>
import { getWords } from "@/util/wordUtil";

export default {
  name: "TypeTest",
  data() {
    return {
      words: [],
      activeWord: 0,
      testStart: null,
      testEnd: null,
      speed: null,
      showResult: false,
    };
  },
  computed: {
    getTestResults() {
      let timeTakenInMills = this.testEnd - this.testStart;
      let timeTakenInMins = timeTakenInMills / 1000 / 60;
      let correctWordcount = this.words.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.hasError ? 0 : 1);
      }, 0);
      return Math.floor(correctWordcount / timeTakenInMins);
    },
  },
  created() {
    this.startTest();
  },
  destroyed() {
    document.removeEventListener("keydown", this.keyPressed);
  },
  methods: {
    startTest() {
      this.testEnd = null;
      this.words = getWords();
      this.$nextTick(() => {
        let firstWord = this.$refs["word-ref"][this.activeWord].$el;
        firstWord.classList.add("active");
      });

      document.addEventListener("keydown", this.keyPressed);
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

      if (activeWord.currentLetter > activeWord.letters.length) {
        return;
      }

      if (pressedKey === " ") {
        this.checkForError();
        let activeWord = this.$refs["word-ref"][this.activeWord].$el;
        activeWord.classList.remove("active");
        this.activeWord++;
        let nextWord = this.$refs["word-ref"][this.activeWord].$el;
        nextWord.classList.add("active");

        return;
      }

      if (pressedKey === "Backspace") {
        if (activeWord.currentLetter != 0) {
          activeWord.currentLetter--;
        }

        let previousChar = activeWord.letters[activeWord.currentLetter];
        previousChar.isTyped = false;
        previousChar.hasError = false;
        return;
      }

      let activeChar = activeWord.letters[activeWord.currentLetter];
      if (activeChar.character === pressedKey) {
        activeChar.isTyped = true;
      } else {
        activeChar.isTyped = true;
        activeChar.hasError = true;
      }

      activeWord.currentLetter++;

      if (
        this.activeWord === 9 &&
        (pressedKey === " " ||
          activeWord.currentLetter === activeWord.letters.length)
      ) {
        this.testEnd = new Date();
        this.showResult = true;
        document.removeEventListener("keydown", this.keyPressed);
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.type-test-container {
  width: 100%;
  text-align: center;
  display: grid;

  .words-container {
    margin: 0 10%;
    font-family: "Roboto", sans-serif;
    font-size: 1.8vw;
    color: #eeeeee;
    letter-spacing: 1.2pt;

    .words {
      width: auto;
      margin: 5px;
      padding: 10px;
      height: auto;
      box-sizing: border-box;
      border-radius: 20px;

      &.active {
        background-color: #1b1a17;
      }
    }

    .chars {
      opacity: 50%;
      display: inline-block;

      &.correct {
        color: #f6c90e;
        opacity: 100% !important;
      }

      &.wrong {
        color: #ff8303;
        opacity: 100% !important;
      }
    }
  }
}
</style>
