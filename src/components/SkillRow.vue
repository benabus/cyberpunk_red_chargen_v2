<script setup lang="ts">
import { Skill } from '@/classes/Skill';
defineProps<{
	skill: Skill
	stat: number
}>()
</script>

<template>
	<tr>
		<td class="border p-1 text-sm">{{ skill.name }} ({{ skill.stat }})</td>
		<td class="border p-1 text-center">{{ skill.lvl }}</td>
		<td class="border p-1 text-center">{{ stat }}</td>
		<td class="border p-1 text-center font-bold">{{ skill.lvl + stat }}</td>
	</tr>
</template>
