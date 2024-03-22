<script setup lang="ts">
import { Skill } from '@/classes/Skill';
defineProps<{
	skill: Skill
	stat: number
}>()
</script>

<template>
	<tr>
		<td class="border text-sm">{{ skill.name }} ({{ skill.stat }})</td>
		<td class="border text-center">{{ skill.lvl }}</td>
		<td class="border text-center">{{ stat }}</td>
		<td class="border text-center font-bold">{{ skill.lvl + stat }}</td>
	</tr>
</template>
