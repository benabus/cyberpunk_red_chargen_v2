<script setup lang="ts">
import { ref, computed } from 'vue';
import { Stat, Role, CyberwareLocation, SkillList, RequiredSkills, SkillCategories } from '@/data';
import { Lifepath, Skill, Character } from '@/classes';
import TextField from '@/components/TextField.vue'
import SkillTable from '@/components/SkillTable.vue'
import SkillRow from '@/components/SkillRow.vue'


/**
 * Valid Skill Sort Methods:
 *  level - level of the skill
 *  alphabetical - alphabetical order
 *  group - group by category
 *  base - stat + level
 */
const sort_method = ref('base'); // Initializes reactive variable for sorting method, default 'base'.
// Function to divide a skills array into three chunks.
const createSkillsChunks = (skills: Skill[]) => {
    const chunkSize = Math.ceil(skills.length / 3); // Calculates size of each chunk.
    return [0, 1, 2].map(i => skills.slice(i * chunkSize, (i + 1) * chunkSize)); // Creates three chunks.
};
const skillChunks = computed(() => {
    // Sort skills alphabetically as a baseline.
    const alphabetical_skills = Object.values(char.value.skills).sort((a, b) => a.name.localeCompare(b.name))
    if (sort_method.value === 'base') {
        // Sorts skills by 'base' (stat + level) after initial alphabetical sort, then chunks.
        return createSkillsChunks(Object.values(alphabetical_skills).sort((a, b) => {
            const a_base = a.lvl + char.value.stats[a.stat] // Calculates 'base' for skill a.
            const b_base = b.lvl + char.value.stats[b.stat] // Calculates 'base' for skill b.
            return b_base - a_base // Descending sort.
        }));
    } else if (sort_method.value === 'level') {
        // Sorts skills by level, then chunks.
        return createSkillsChunks(Object.values(alphabetical_skills).sort((a, b) => b.lvl - a.lvl));
    } else if (sort_method.value === 'alphabetical') {
        // Uses the initial alphabetical sort, then chunks.
        return createSkillsChunks(alphabetical_skills);
    } else {
        // If no valid sort method is provided, returns an empty array.
        return [];
    }
})

// Derived Statistics
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


const char = ref(new Character()) // Initializes reactive variable for character.

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
            <TextField v-for="stat of Object.keys(char.stats)" :title="stat" :key="`stat_block_${stat}`"
                :value="char.stats[stat].toString()" />
        </div>

        <hr class="my-2" />

        <TextField title="Humanity" :value="humanity" />
        <TextField title="Hit Points" :value="hit_points.toString()" />
        <TextField title="Severely Wounded" :value="severe_wound_threshold" />
        <TextField title="Death Save" :value="death_save" />

        <hr class="my-2" />
        <div class="my-2">
            Sorting by: <select v-model="sort_method">
                <option value="alphabetical">Alphabetical</option>
                <option value="base">Base</option>
                <option value="group">Group</option>
                <option value="level">Level</option>
            </select>
        </div>

        <div class="">
            <div class="border columns-3 space-y-4">
                <template v-if="sort_method === 'group'">
                    <SkillTable v-for="category in Object.keys(SkillCategories)" :key="`skill_cat_${category}`"
                        :category :char="char" />
                </template>
                <template v-else>
                    <table class="w-full" v-for="(chunks, index) in skillChunks" :key="`skill_chunk_${index}`">
                        <tr>
                            <th class="border text-xs">Skill</th>
                            <th class="border text-xs">LVL</th>
                            <th class="border text-xs">STAT</th>
                            <th class="border text-xs">BASE</th>
                        </tr>
                        <SkillRow v-for="skill in chunks" :key="`skill_${skill.name}`" :skill="skill"
                            :stat="char.stats[skill.stat]" />
                    </table>
                </template>
            </div>
        </div>
        <hr class="my-2" />

        Weapons:
        <table class="w-full">
            <thead>
                <tr>
                    <th class="border text-xs">Weapon</th>
                    <th class="border text-xs">Description</th>
                    <th class="border text-xs">Skill</th>
                    <th class="border text-xs">Damage</th>
                    <th class="border text-xs">Ammo</th>
                    <th class="border text-xs">ROF</th>
                    <th class="border text-xs">Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="weapon in char.weapons" :key="`weapon_${weapon.name}`">
                    <td class="border">{{ weapon.name }}</td>
                    <td class="border">
                        {{ weapon.description }}
                        <span v-if="weapon.quality">({{ weapon.quality.charAt(0).toUpperCase() +
            weapon.quality.slice(1).toLowerCase() }} quality)</span>
                    </td>
                    <td class="border">{{ char.skills[weapon.skill].name }}</td>
                    <td class="border">{{ weapon.damage }}</td>
                    <td v-if="weapon.mag_size > 1" class="border">
                        1 x {{ weapon.mag_size }} round mag {{ weapon.ammo_type }}
                    </td>
                    <td v-else class="border"></td>
                    <td class="border">{{ weapon.rof }}</td>
                    <td class="border">
                        <ul>
                            <li v-if="weapon.alt_fire && weapon.alt_fire.toLowerCase() != 'none'">
                                Alt Fire: {{ weapon.alt_fire }}
                            </li>
                            <li v-if="weapon.special_features && weapon.special_features.toLowerCase() != 'none'">
                                Special Features:
                                {{ weapon.special_features }}
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>

        <br /><br /><br />
    </main>
</template>
