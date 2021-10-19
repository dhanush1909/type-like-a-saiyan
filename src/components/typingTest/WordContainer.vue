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
    },
    methods: {
        setActiveWord(wordIndex) {
            let wordEl = this.$refs["word-ref"][wordIndex].$el;
            wordEl.classList.add("active");
        },
        removeActiveWord(wordIndex) {
            let wordEl = this.$refs["word-ref"][wordIndex].$el;
            wordEl.classList.remove("active");
        }
    }
}
</script>

<style lang="scss">

.type-test-container {
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

      &.additional {
        color: #ff4800;
        opacity: 100% !important;
      }

    }
  }
}

</style>