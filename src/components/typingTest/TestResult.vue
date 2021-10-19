<template>
    <el-dialog class="result-model" :visible="visible">
        <div class="result-container">
            <!-- <div class="result-image"><img src="../../assets/goku-god-speed.png" alt="speed" /></div> -->
            <div><div>WPM</div>{{ getWpm }}</div>
            <div><div>CPM</div>{{ getCpm }}</div>
            <div><div>RAW WPM</div>{{ getRawWpm }}</div>
            <div><div>ACCURACY</div>{{ getAccuracy+'%' }}</div>
        </div>
        <div 
            @click="restartTest" 
            class="restart-button"
        >
            <i class="el-icon-refresh-right"></i>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'TestResult',
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
            let timeTakenInMills = this.testEnd - this.testStart;
            let timeTakenInMins = timeTakenInMills / 1000 / 60;
            let correctWordcount = this.words.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.hasError ? 0 : 1);
            }, 0);
            return Math.floor(correctWordcount / timeTakenInMins);
        },
        getCpm() {
            let timeTakenInMills = this.testEnd - this.testStart;
            let timeTakenInMins = timeTakenInMills / 1000 / 60;
            let charAuditObj = this.words.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.hasError ? 0 : 1);
            }, 0);
            return Math.floor(charAuditObj * 6 / timeTakenInMins);
        },
        getRawWpm() {
            let timeTakenInMills = this.testEnd - this.testStart;
            let timeTakenInMins = timeTakenInMills / 1000 / 60;
            let wordCount = this.words.length;
            return Math.floor(wordCount / timeTakenInMins);
        },
        getAccuracy() {
            let wordCount = this.words.length;
            let correctWordcount = this.words.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.hasError ? 0 : 1);
            }, 0);
            return Math.round(correctWordcount / wordCount * 100);
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
.restart-button i {
    font-size: 30px;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: rgb(22, 58, 58);
    margin-top: 60px;
    cursor: pointer;
}

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