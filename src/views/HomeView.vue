<script setup lang="ts">
import { ref, computed } from 'vue';
import { Stat, Role, CyberwareLocation, SkillList, RequiredSkills, SkillCategories } from '@/data';
import { Lifepath, Skill, Character } from '@/classes';
import TextField from '@/components/TextField.vue'
import SkillTable from '@/components/SkillTable.vue'




const char = ref(new Character())
const hit_points = computed(() => {
    return 10 + (5 * Math.ceil((char.value.stats.BODY + char.value.stats.WILL) / 2))
})
const severe_wound_threshold = computed(() => {
    return Math.ceil(hit_points.value / 2)
})
const death_save = computed(() => {
    return char.value.stats.BODY;
})
const humanity = computed(() => {
    return char.value.stats.EMP * 10;
})

</script>

<template>
    <main class="container p-4 mx-auto">

        <TextField title="Handle" :value="char.handle" />
        <TextField title="Role" :value="char.role" />
        <TextField title="Rank" :value="char.role_ability_rank.toString()" />
        <TextField title="Notes" :value="char.notes" />

        <hr class="my-2" />

        <div class="font-bold">Stats</div>
        <div class="grid grid-cols-5 gap-4">
            <TextField v-for="stat of Object.keys(char.stats)" :title="stat" :value="char.stats[stat].toString()" />
        </div>

        <hr class="my-2" />

        <TextField title="Humanity" :value="humanity" />
        <TextField title="Hit Points" :value="hit_points.toString()" />
        <TextField title="Severely Wounded" :value="severe_wound_threshold" />
        <TextField title="Death Save" :value="death_save" />

        <hr class="my-2" />

        <div class="">
            <div class="border columns-3">
                <div class="" v-for="category in Object.keys(SkillCategories)">
                    <SkillTable :category :char="char" />
                </div>
            </div>
        </div>

    </main>
</template>
