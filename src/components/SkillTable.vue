<script setup lang="ts">
import { Skill, Character } from '@/classes';
import SkillRow from './SkillRow.vue';
import { computed } from 'vue';
import { SkillCategories } from '@/data';

const props = defineProps<{
    category: string;
    char: Character;
}>();

const { char, category } = props;

const filtered_skills = computed(() => {
    let skills: Skill[] = []
    for (const skill_key in char.skills) {
        const skill = char.skills[skill_key];
        if (SkillCategories[category].includes(skill.name)) {
            skills.push(skill)
        }
    }
    return skills;
})
</script>

<template>
    <table class="w-full">
        <tr class="">
            <th class="border text-xs p-1">{{ category }} Skills</th>
            <th class="border text-xs p-1">LVL</th>
            <th class="border text-xs p-1">STAT</th>
            <th class="border text-xs p-1">BASE</th>
        </tr>
        <SkillRow v-for="skill of filtered_skills" class="" :skill="skill" :stat="char.stats[skill.stat]" />
    </table>
</template>
