<script setup lang="ts">
import { ref, computed } from 'vue';
import { Stat, Role, CyberwareLocation, SkillList, RequiredSkills, SkillCategories, WeaponAttachments } from '@/data';
import { ClipChart } from "@/data/clip_chart";
import { Lifepath, Skill, Character } from '@/classes';
import type { WeaponAttachment, AmmoType } from '@/types'
import TextField from '@/components/TextField.vue'
import SkillTable from '@/components/SkillTable.vue'
import SkillRow from '@/components/SkillRow.vue'
import Modal from '@/components/Modal.vue'
import { AmmoTypes } from '@/data/ammo_types';


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

const weapon_attachment_modal_visible = ref(false)
const weapon_attachment_modal = ref<WeaponAttachment>({ name: '', description: '', cost: 0, eligible: [], attachment_slots: 0 })
function OpenAttachmentModal(attachment: WeaponAttachment) {
    weapon_attachment_modal.value = attachment;
    weapon_attachment_modal_visible.value = true;
}

const clip_chart = ref(ClipChart);
const ammo_types = computed(() => {
    let ammo_types: Record<string, AmmoType> = {}
    for (const ammo_type of AmmoTypes) {
        ammo_types[ammo_type.name] = ammo_type
    }
    return ammo_types;
})

const ammo_type_modal_visible = ref(false)
const ammo_type_modal = ref<AmmoType>({
    name: '',
    cost: 0,
    available_for: [],
    description: ''
})
function OpenAmmoTypeModal(ammoType: AmmoType) {
    ammo_type_modal.value = ammoType;
    ammo_type_modal_visible.value = true;
}

</script>

<template>
    <main class="container p-1 mx-auto">

        <TextField title="Handle" :value="char.handle" />
        <TextField title="Role" :value="char.role" />
        <TextField title="Rank" :value="char.role_ability_rank.toString()" />
        <TextField title="Notes" :value="char.notes" />

        <hr class="my-2" />

        <div class="font-bold">Stats</div>
        <div class="grid grid-cols-5 gap-1">
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
                            <th class="border text-xs p-1">Skill</th>
                            <th class="border text-xs p-1">LVL</th>
                            <th class="border text-xs p-1">STAT</th>
                            <th class="border text-xs p-1">BASE</th>
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
                    <th class="border text-xs p-1">Weapon</th>
                    <th class="border text-xs p-1">Description</th>
                    <th class="border text-xs p-1">Skill</th>
                    <th class="border text-xs p-1">Damage</th>
                    <th class="border text-xs p-1">Ammo</th>
                    <th class="border text-xs p-1">ROF</th>
                    <th class="border text-xs p-1">Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="weapon in char.weapons" :key="`weapon_${weapon.name}`">
                    <td class="border p-1">{{ weapon.name }}</td>
                    <td class="border p-1">
                        {{ weapon.description }}
                        <span v-if="weapon.quality">({{ weapon.quality.charAt(0).toUpperCase() +
            weapon.quality.slice(1).toLowerCase() }} quality)</span>
                    </td>
                    <td class="border p-1">{{ char.skills[weapon.skill].name }}</td>
                    <td class="border p-1">{{ weapon.damage }}</td>
                    <td v-if="weapon.ammo_type.length > 0" class="border p-1">
                        <div>{{ weapon.ammo_type.join(', ') }}</div>
                        <ul class="list-disc list-inside">

                            <li v-if="weapon.ammo_type.some(type => ['arrow', 'grenade', 'rocket'].includes(type.toLowerCase()))"
                                v-for="qty, ammo_name in weapon.ammo" :key="`ammo_agr_${ammo_name}`">
                                {{ qty }} <span class="underline decoration-dashed cursor-pointer"
                                    @click="OpenAmmoTypeModal(ammo_types[ammo_name])">{{
            ammo_name.split(" ")[0] }}</span> {{ weapon.ammo_type[0].toLowerCase() }}{{ qty > 1
            ? 's' :
            '' }}
                            </li>
                            <li v-else v-for="qty, ammo_name in weapon.ammo" :key="`ammo_${ammo_name}`">
                                {{ qty }} rounds of <span class="underline decoration-dashed cursor-pointer"
                                    @click="OpenAmmoTypeModal(ammo_types[ammo_name])">{{
            ammo_name }}</span>
                            </li>
                        </ul>
                        <Modal :visible="ammo_type_modal_visible" @close="ammo_type_modal_visible = false">
                            <div class="p-1">
                                <h2 class="text-lg font-bold">{{ ammo_type_modal.name }}</h2>
                                <p>{{ ammo_type_modal.description }}</p>
                                <button class="border rounded px-4"
                                    @click="ammo_type_modal_visible = false">Close</button>
                            </div>
                        </Modal>

                    </td>
                    <td v-else class="border p-1"></td>
                    <td class="border p-1">{{ weapon.rof }}</td>
                    <td class="border p-1">
                        <ul>
                            <li v-if="weapon.ammo_type.length > 0 && !weapon.ammo_type.includes('Arrow')">Standard Mag
                                Size: {{ clip_chart[weapon.getKey()].standard }}</li>
                            <li v-if="weapon.alt_fire && weapon.alt_fire.toLowerCase() != 'none'">
                                Alt Fire: {{ weapon.alt_fire }}
                            </li>
                            <li v-if="weapon.special_features && weapon.special_features.toLowerCase() != 'none'">
                                Special Features:
                                {{ weapon.special_features }}
                            </li>
                            <li v-if="weapon.attachments.length > 0">
                                Attachments:
                                <ul class="list-disc list-inside">
                                    <li v-for="attachment in weapon.attachments" class="cursor-pointer"
                                        @click="OpenAttachmentModal(attachment)" :key="`attachment_${attachment}`">
                                        <span class="underline decoration-dashed">{{ attachment.name }}</span>
                                        <span v-if="['Drum Magazine', 'Extended Magazine'].includes(attachment.name)">
                                            ({{ clip_chart[weapon.getKey()][attachment.name.split(" ")[0].toLowerCase()]
                                            }}
                                            rounds)
                                        </span>
                                    </li>
                                </ul>
                                <Modal :visible="weapon_attachment_modal_visible"
                                    @close="weapon_attachment_modal_visible = false">
                                    <div class="p-1">
                                        <h2 class="text-lg font-bold">{{ weapon_attachment_modal.name }}</h2>
                                        <p>{{ weapon_attachment_modal.description }}</p>
                                        <button class="border rounded px-4"
                                            @click="weapon_attachment_modal_visible = false">Close</button>
                                    </div>
                                </Modal>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>

        <br /><br /><br />

    </main>
</template>
