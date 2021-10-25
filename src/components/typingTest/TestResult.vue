<template>
    <el-dialog class="result-model" :visible="visible">
        <div class="result-container">
            <!-- <div class="result-image"><img src="../../assets/goku-god-speed.png" alt="speed" /></div> -->
            <div><div>WPM</div>{{ getWpm }}</div>
            <div><div>CPM</div>{{ getCpm }}</div>
            <div><div>RAW WPM</div>{{ getRawWpm }}</div>
            <div><div>ACCURACY</div>{{ getAccuracy+'%' }}</div>
        </div>
        <RestartButton @click="restartTest" />
    </el-dialog>
</template>

<script>
import RestartButton from '../buttons/RestartButton.vue';

export default {
    name: 'TestResult',
    components: {
        RestartButton,
    },
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        testStart: {
            type: Date,
            required: true,
        },
        testEnd: {
            type: Date,
            required: true,
        },
        words: {
            type: Array,
            required: true,
        },
    },
    computed: {
        getWpm() {
            return Math.floor(this.numOfCorrectChars / 5 / this.timeTakenInMins);
        },
        getCpm() {
            return Math.floor(this.numOfChars / this.timeTakenInMins);
        },
        getRawWpm() {
            return Math.floor(this.numOfChars / 5 / this.timeTakenInMins);
        },
        getAccuracy() {
            return Math.round(this.numOfCorrectCharsWithoutHistoyError / this.numOfChars * 100);
        },
        numOfChars() {
           return this.words.reduce((accumulator, word) => {
            return accumulator + word.letters.length;
           }, 0) 
        },
        numOfCorrectChars() {
           return this.words.reduce((accumulator, word) => {
               let correctChars = 0;
               for(let i=0;i<word.letters.length;i++) {
                   if(!(word.letters[i].hasError || !word.letters[i].isTyped || word.letters[i].isAditional)) {
                       correctChars++;
                   }
               }
               return accumulator + correctChars;
           }, 0);
        },
        numOfTypedChars() {
           return this.words.reduce((accumulator, word) => {
               let typedChars = 0;
               for(let i=0;i<word.letters.length;i++) {
                   if(word.letters[i].isTyped) {
                       typedChars++;
                   }
               }
               return accumulator + typedChars;
           }, 0);
        },
        numOfCorrectCharsWithoutHistoyError() {
           return this.words.reduce((accumulator, word) => {
               let correctChars = 0;
               for(let i=0;i<word.letters.length;i++) {
                   if(!(word.letters[i].hasError || word.letters[i].hadError || !word.letters[i].isTyped || word.letters[i].isAditional)) {
                       correctChars++;
                   }
               }
               return accumulator + correctChars;
           }, 0);
        },
        timeTakenInMins() {
            let timeTakenInMills = this.testEnd - this.testStart;
            return timeTakenInMills / 1000 / 60;
        }
    },
    methods: {
        restartTest() {
            this.$emit('restart-test');
        }
    }
}
</script>

<style lang="scss">
.result-container {
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    font-size: 25px;
    line-height: 1.5rem;

    .result-image img{
        width: 100px;
    }
}
</style>