<script setup lang='ts'>
import { defineProps } from 'vue';
defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

</script>

<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
        <div @click="$emit('close')" class="fixed inset-0 bg-black opacity-50"></div>
        <div class="fixed bg-white rounded-lg p-6 m-6">
            <slot></slot>
            <button @click="$emit('close')" class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>
    </div>
</template>

<style>
/* Add your custom styles here */
</style>