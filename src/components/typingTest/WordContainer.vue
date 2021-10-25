<template>
    <el-row v-loading="loading" class="words-container">
      <el-col
        class="words has-error"
        v-for="(word, index) in words"
        :key="`word-${index}`"
        :ref="`word-ref`"
        ><div
          :class="[
            {
              chars: true,
              additional: char.isAdditional,
              wrong: char.hasError && !char.isAdditional,
              correct: word.currentLetter > charIndex && !char.hasError,
              active: word.currentLetter === charIndex && index === activeWordIndex,
              'last-char': word.currentLetter === word.letters.length && index === activeWordIndex && charIndex === word.currentLetter - 1, 
            },
          ]"
          v-for="(char, charIndex) in word.letters"
          :key="`char-${charIndex}`"
          :ref="`char-ref-${index}`"
        >{{ char.character }}</div>
      </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'WordContainer',
    props: {
        words: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: () => false,
        },
        activeWordIndex: {
          type: Number,
          required: true,
        }
    },
    methods: {
        setActiveWord(wordIndex) {
            let wordEl = this.$refs["word-ref"][wordIndex].$el;
            wordEl.classList.add("active");
        },
        removeActiveWord(wordIndex) {
            let wordEl = this.$refs["word-ref"][wordIndex].$el;
            wordEl.classList.remove("active");
        },
        scrollToNextLine() {
          let wordContainer = document.getElementsByClassName('words-container')[0];
          let wordHeight = wordContainer.children[this.activeWordIndex].clientHeight;
          wordContainer.scrollBy({
            top: wordHeight + (wordHeight / 5),
            behavior: 'smooth'
          });
        },
        scrollToTop() {
          let wordContainer = document.getElementsByClassName('words-container')[0];
          wordContainer.scrollBy({
            top: -(wordContainer.scrollTop),
            behavior: 'smooth'
          });
        },
        containerWidth() {
          let wordContainer = document.getElementsByClassName("words-container")[0];
          return wordContainer.clientWidth - (wordContainer.clientWidth/10);
        },
        wordWidth(wordNumber) {
          const words = document.getElementsByClassName("words-container")[0].children;
          return words[wordNumber].clientWidth;
        },
    }
}
</script>

<style lang="scss">

.type-test-container {
  .words-container {
    margin: 5%;
    font-family: "Roboto", sans-serif;
    font-size: 1.8vw;
    color: #eeeeee;
    letter-spacing: 1.5pt;
    height: 30vh;
    overflow: scroll;
    
    &::-webkit-scrollbar {
      display: none;
    }

    .words {
      width: auto;
      margin: 5px;
      padding: 10px;
      height: auto;
      box-sizing: border-box;
      border-radius: 20px;

      &.active {
        // background-color: #1b1a17;
      }
    }

    .chars {
      opacity: 50%;
      display: inline-block;

      &.correct {
        color: #f6c90e;
        opacity: 100% !important;
      }

      &.wrong, &.additional {
        color: #ff4800;
        opacity: 100% !important;
      }

      &.active::before, &.last-char::after {
        content: "";
        background-color: #57bcff !important;
        opacity: 100% !important;
        position: absolute;
        transform: translateX(-4px); //make this reponsive
        padding: 18px 1.5px;
      }

    }
  }
}

</style>