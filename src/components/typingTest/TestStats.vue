<template>
    <div class="test-stats">
        <div v-if="testType === 'Word'">{{ currentWord + '/' + totalWords }}</div>
        <div v-if="testType === 'Time'">Time</div>
        <div>{{ testType }}</div>
    </div>
</template>

<script>
export default {
    props: {
        testType: {
            type: String,
            required: true,
        },
        currentWord: {
            type: Number,
            required: true,
        },
        totalWords: {
            type: Number,
            required: true,
        }
    },
}
</script>

<style scoped lang="scss">
.test-stats {
    display: flex;
    color: #fff;

    div {
        font-family: "Roboto", sans-serif;
        font-size: 1.4vw;
        padding: 0 15px;
        letter-spacing: 1.5pt;
    }
}
</style>