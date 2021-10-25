<template>
    <div class="restart-button">
        <i class="el-icon-refresh-right" @click="$emit('click')"></i>
    </div>
</template>

<style lang="scss" scoped>
.restart-button i {
    font-size: 30px;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: rgb(22, 58, 58);
    margin-top: 60px;
    cursor: pointer;
}

.restart-button i:hover {
    background-color: rgb(22, 58, 58, 0.5);
}
</style>