<template>
    <div class="typing-test-setting">
        <div class="options" ref="typeOptions">
            <div 
                class="title" 
                :class="{'title':true, 'active':(testType === 'Words')}"
                @click="onTestTypeChange"
            >
                Words
            </div>
            <div 
                class="title" 
                :class="{'title':true, 'active':(testType === 'Time')}"
                @click="onTestTypeChange"
            >
                Time
            </div>
        </div>
        <div class="options" ref="numberWordsOptions" v-if="testType === 'Words'">
            <span 
                v-for="option in wordOptions" 
                :key="`word-${option}`"
                :class="{'active':(numberOfWords === option)}"
                @click="onNumOfWordsChange"
            >
                {{ option }}
            </span>
        </div>
        <div class="options" ref="timeOptions" v-else-if="testType === 'Time'">
            <span 
                v-for="option in timeOptions" 
                :key="`time-${option}`"
                :class="{'active':(testTime === option)}"
                @click="onTimeChange"
            >
                {{ option }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const WORD_OPTIONS = [10,20,30,50];
const TIME_OPTIONS = [15,30,60];

export default {
    data() {
        return {
            wordOptions: [...WORD_OPTIONS],
            timeOptions: [...TIME_OPTIONS],
        }
    },
    computed: {
        ...mapGetters('typingTest', ['numberOfWords', 'testType', 'testTime']),
    },
    methods: {
        ...mapActions('typingTest', ['changeNumOfWords', 'changeTestType', 'changeTestTime']),

        onNumOfWordsChange(event) {
            let option = event.srcElement.innerHTML;
            if(this.numberOfWords == option) {
                return;
            }

            this.changeNumOfWords(option.trim());
        },

        onTimeChange(event) {
            let option = event.srcElement.innerHTML;
            if(this.testTime == option) {
                return;
            }

            this.changeTestTime(option.trim());
        },

        onTestTypeChange(event) {
            let option = event.srcElement.innerHTML;
            if(this.testType == option) {
                return;
            }

            this.changeTestType(option.trim());
        },
    },
}
</script>

<style lang="scss" scoped>
.typing-test-setting {
    width: 10%;

    .title {
        font-size: 14px;
    }
    
    .options {
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        .active {
            color: #f6c90e;
        }
    }
}
</style>