<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    headers: string[],
    title: string
}>()
</script>

<template>
    <div class="notch border-8 border-red-500 border-solid">
        <div class="ml-4 my-2 font-bold">{{ title }}</div>
    </div>
    <table class="w-full">
        <thead>
            <tr class="text-xs bg-black text-white ">
                <th class="text-left border-x-4 border-red-500 p-1" v-for="column_header of headers">{{ column_header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>