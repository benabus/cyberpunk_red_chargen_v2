<script setup lang="ts">
import { computed } from 'vue'
import TextField from '@/components/TextField.vue'

const props = defineProps<{
    values: Record<string, string | number>,
}>()
const length = computed(() => {
    return Object.values(props.values).length;
})
const last = computed(() => {
    return Object.keys(props.values).pop();
})

function classes(key: string, value: string | number) {
    let classes = "p-4 ";
    classes += key != last.value ? ' border-red-500 border-r-4' : ' '
    classes += (typeof (value) == 'number' || key == 'Humanity') ? ' text-center' : ' '
    return classes;
}

</script>

<template>
    <div :class="`notch grid grid-cols-${length}`">
        <TextField v-for="value, key in values" :class="classes(key, value)" :title="key" :value="value" />
    </div>
</template>