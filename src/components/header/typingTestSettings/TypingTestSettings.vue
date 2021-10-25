<template>
    <div class="typing-test-setting">
        <div class="title">Number of words</div>
        <div class="options" ref="options">
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>50</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('typingTest', ['numberOfWords']),
    },
    watch: {
        numberOfWords() {
            this.setActiveWordColor();
        },
    },
    mounted() {
        let optionsRef = this.$refs.options;
        let options = optionsRef.children;
        options.forEach(option => {
            option.addEventListener("click", this.onNumOfWordsChange);
        });

        this.setActiveWordColor();
    },
    methods: {
        ...mapActions('typingTest', ['changeNumOfWords']),

        onNumOfWordsChange(event) {
            let option = event.srcElement.innerHTML;
            if(this.numberOfWords == option) {
                return;
            }

            this.changeNumOfWords(option);
        },

        setActiveWordColor() {
            let optionsRef = this.$refs.options;
            let options = optionsRef.children;
            options.forEach(option => {
                if(option.innerHTML == this.numberOfWords) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.typing-test-setting {
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