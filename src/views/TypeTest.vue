<template>
  <div class="type-test-container">
    <el-row class="words-container">
      <el-col
        class="words"
        v-for="(word, index) in words"
        :key="`word-${index}`"
        :ref="`word-ref`"
        ><div
          class="chars"
          v-for="(char, charIndex) in word"
          :key="`char-${charIndex}`"
          :ref="`char-ref-${index}`"
        >
          {{ char }}
        </div></el-col
      >
    </el-row>
    <div v-if="!testStart">Start Typing</div>
  </div>
</template>

<script>
import { getWords } from "@/util/wordUtil";

export default {
  name: "TypeTest",
  data() {
    return {
      words: [],
      testCompleted: false,
      activeWord: 0,
      currentChar: 0,
      testStart: null,
      testEnd: null,
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
      this.testEnd = null;
      this.words = getWords();
      this.$nextTick(() => {
        let firstWord = this.$refs["word-ref"][this.activeWord].$el;
        firstWord.classList.add("active");
      });

      document.addEventListener("keydown", this.keyPressed);
    },
    keyPressed(event) {
      if (!this.testStart) {
        this.testStart = new Date();
      }

      let pressedKey = event.key;

      if (
        this.activeWord === 24 &&
        (pressedKey === " " ||
          this.currentChar > this.words[this.activeWord].length)
      ) {
        this.testEnd = new Date();
        document.removeEventListener("keydown", this.keyPressed);
        return;
      }

      if (this.currentChar > this.words[this.activeWord].length) {
        return;
      }

      if (pressedKey === " ") {
        let activeWord = this.$refs["word-ref"][this.activeWord].$el;
        activeWord.classList.remove("active");
        this.activeWord++;
        let nextWord = this.$refs["word-ref"][this.activeWord].$el;
        nextWord.classList.add("active");

        this.currentChar = 0;
        return;
      }

      let charRefs = this.$refs[`char-ref-${this.activeWord}`];
      if (pressedKey === "Backspace") {
        if (this.currentChar != 0) {
          this.currentChar--;
        }

        let previousChar = charRefs[this.currentChar];
        previousChar.classList.remove("correct");
        previousChar.classList.remove("wrong");
        return;
      }

      let charRef = charRefs[this.currentChar];
      if (this.words[this.activeWord][this.currentChar] === pressedKey) {
        charRef.classList.add("correct");
      } else {
        charRef.classList.add("wrong");
      }

      this.currentChar++;
      return;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.type-test-container {
  width: 100%;
  text-align: center;

  .words-container {
    position: absolute;
    top: 20%;
    margin: 0 10%;
    font-family: "Roboto", sans-serif;
    font-size: 1.5vw;
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
