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
    background-color: var(--restart-button-background-color);
    margin: 2rem 0;
    cursor: pointer;
    color: #fff;
}

.restart-button i:hover {
    background-color: var(--restart-button-background-color-hover);
}
</style>