<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    bottomBorder?: boolean;
}>();

const bottomBorder = ref(props.bottomBorder ?? false);


</script>
<template>

    <div class="flex pl-4 py-2 notch font-bold" :class="bottomBorder ? '' : 'border-b-0'">
        <slot></slot>
    </div>
</template>