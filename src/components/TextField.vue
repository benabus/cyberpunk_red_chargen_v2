<script setup lang="ts">
defineProps<{
    title: string,
    value: string | number,
    titleClass?: string,
    valueClass?: string,
}>()
</script>

<template>
    <div class="font-bold">
        <div :class="titleClass" class="text-xs">{{ title }}</div>
        <div :class="valueClass" class="" v-if="value">{{ value }}</div>
        <div :class="valueClass" class="" v-else>-</div>
    </div>
</template>
