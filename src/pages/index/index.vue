<template>
    <view class="content">
        <image class="logo" src="@/assets/logo.png" />
        <view class="w-24">哈哈哈哈</view>
        <view class="text-area">
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">

const title = ref('Hello')



</script>

<style lang="scss">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $bg-color;
}

.logo {
    width: 200rpx;
    height: 200rpx;
    margin: 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    color: #8f8f94;
    font-size: 36rpx;
}
</style>
