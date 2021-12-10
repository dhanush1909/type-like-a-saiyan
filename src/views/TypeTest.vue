<template>
  <div class="type-test-container">
    <div :style="'margin: 5%'">
      <TestStats 
        v-show="testStart !== null"
        :current-word="activeWord" 
        :total-words="words.length"
        :test-type="testType"
        :timeRemaining="timeRemaining"
      />
      <WordContainer 
        ref="word-container" 
        :words="words" 
        :activeWordIndex="activeWord"
      />
    </div>
    <div v-if="!testStart">Start Typing</div>
    <RestartButton @click="restartTest" />
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
import RestartButton from '@/components/buttons/RestartButton'
import TestResult from '../components/typingTest/TestResult.vue';
import TestStats from '@/components/typingTest/TestStats'
import Letter from '../models/Letter';
import { mapGetters } from 'vuex';

export default {
  name: "TypeTest",
  components: {
    WordContainer,
    TestResult,
    RestartButton,
    TestStats,
  },
  data() {
    return {
      words: [],
      activeWord: 0,
      testStart: null,
      testEnd: null,
      showResult: false,
      wordContainerWidth: 0,
      currentLine: 1,
      currentLineWidth: 0,
      timeCounterInterval: null,
      clearIntervalEvent: null,
      timeRemaining: this.testTime,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('typingTest', ['numberOfWords', 'testType', 'testTime']),
  },
  watch: {
    numberOfWords() {
      if(!this.loading)
        this.restartTest();
    },
    testType() {
      if(!this.loading)
        this.restartTest();
    },
    testTime() {
      if(!this.loading)
        this.restartTest();
    },
  },
  mounted() {
    this.wordContainerWidth = this.$refs['word-container'].containerWidth();
    this.startTest();
  },
  destroyed() {
    document.removeEventListener("keydown", this.keyPressed);
    this.wordContainerDiv().removeEventListener("focus", this.focusWordContainer)
    this.wordContainerDiv().removeEventListener("blur", this.blurWordContainer)
  },
  methods: {
    startTest() {
      this.words = getWords(this.numberOfWords);
      this.$nextTick(() => {
        this.$refs["word-container"].setActiveWord(this.activeWord)
      });

      document.addEventListener("keydown", this.keyPressed);
      this.wordContainerDiv().addEventListener("focus", this.focusWordContainer)
      this.wordContainerDiv().addEventListener("blur", this.blurWordContainer)

      if(this.testType === 'Time') {
        this.timeCounterInterval = setInterval(() => {
          let timeLeft = this.timeRemaining
          this.timeRemaining = --timeLeft
        }, 1000);

        this.clearIntervalEvent = setTimeout(() => {
          this.endTest();
          clearInterval(this.timeCounterInterval);
          this.timeCounterInterval = null;
        }, (parseInt(this.testTime) * 1000) + 200)
        
      }
    },
    restartTest() {
      this.loading = true;
      this.showResult = false;
      this.testEnd = null;
      this.testStart = null;
      this.activeWord = 0;
      this.currentLine = 1;
      this.currentLineWidth = 0;
      this.timeRemaining = this.testTime;
      this.$refs['word-container'].scrollToTop();
      this.removeActiveWords();
      clearInterval(this.timeCounterInterval);
      clearTimeout(this.clearIntervalEvent)
      this.startTest();
      this.loading = false;
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
    checkForScroll() {
      const wordWidth = this.$refs['word-container'].wordWidth(this.activeWord);
      this.currentLineWidth += wordWidth;
      if(this.activeWord !== this.words.length) {
        const lineWidthWithNextWord = this.currentLineWidth + this.$refs['word-container'].wordWidth(this.activeWord + 1);
        if(this.currentLine !== 1 && lineWidthWithNextWord > this.wordContainerWidth) {
          this.$refs['word-container'].scrollToNextLine();
          this.currentLine++;
          this.currentLineWidth = 0;
        } else if(this.currentLine === 1 && lineWidthWithNextWord > this.wordContainerWidth) {
          this.currentLine++;
          this.currentLineWidth = 0;
        }
      }
    },
    keyPressed(event) {
      // prevent scroll when space is pressed
      event.preventDefault();

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

      // space is pressed and if its not last word we need to go to next word
      if (pressedKey === " " && this.activeWord !== this.numberOfWords - 1) {
        // if no letter is typed in current word do not go to next word
        if (this.words[this.activeWord].currentLetter === 0) {
          return;
        }
        this.checkForError();
        this.checkForScroll();
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
        this.activeWord === this.numberOfWords - 1 &&
        (pressedKey === " " ||
          activeWord.currentLetter === activeWord.letters.length)
      ) {
        this.checkForError();
        this.activeWord++;
        this.endTest();
      }
    },
    endTest() {
      this.testEnd = new Date();
      this.showResult = true;
      document.removeEventListener("keydown", this.keyPressed);
      this.wordContainerDiv().removeEventListener("focus", this.focusWordContainer)
      this.wordContainerDiv().removeEventListener("blur", this.blurWordContainer)
      clearTimeout(this.clearIntervalEvent)
      this.clearIntervalEvent = null;
      clearInterval(this.timeCounterInterval);
      this.timeCounterInterval = null;
    },
    wordContainerDiv() {
      return this.$refs["word-container"].$el;
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
}

</style>
