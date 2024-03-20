<script setup lang="ts">
defineProps<{ 
	title: string,
	value: string | number
}>()
</script>

<template>
	<div class="font-bold">
	      <span class="text-xs block">{{title}}</span>
	      <span v-if="value">{{ value }}</span>
		  <span v-else>-</span>
	    </div>
</template>
