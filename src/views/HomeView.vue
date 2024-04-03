<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Stat,
    Role,
    CyberwareLocation,
    SkillList,
    RequiredSkills,
    SkillCategories,
    WeaponAttachments,
    ClipChart,
    AmmoTypes
} from '@/data';
import { Lifepath, Skill, Character } from '@/classes';
import type { WeaponAttachment, AmmoType, Armor } from '@/types'
import TextFieldRow from '@/components/TextFieldRow.vue'
import SkillTable from '@/components/SkillTable.vue'
import SkillRow from '@/components/SkillRow.vue'
import Modal from '@/components/Modal.vue'
import StatsBlock from '@/components/StatsBlock.vue'
import SkillsByGroup from '@/components/SkillsByGroup.vue'
import CPTable from '@/components/CPTable.vue';
import CPCell from '@/components/CPCell.vue';
import CPRow from '@/components/CPRow.vue';
import CPTitle from '@/components/CPTitle.vue';


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
    console.debug(skills.length)
    const chunkSize = Math.ceil(skills.length / 6); // Calculates size of each chunk.
    return [0, 1, 2, 3, 4, 5].map(i => skills.slice(i * chunkSize, (i + 1) * chunkSize)); // Creates three chunks.
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

const char_info = computed(() => {
    return {
        "Handle": char.value.handle,
        "Role": char.value.role,
        "Rank": char.value.role_ability_rank,
        "Notes": char.value.notes
    }
})

const derived_stats = computed(() => {
    const humanity = char.value.stats.EMP * 10;
    const hit_points = 10 + (5 * Math.ceil((char.value.stats.BODY + char.value.stats.WILL) / 2));
    const severe_wound_threshold = Math.ceil(hit_points / 2);
    const death_save = char.value.stats.BODY;
    return {
        "Humanity": `${humanity - char.value.getHumanityLoss()} of ${humanity}`,
        "Hit Points": hit_points,
        "Severely Wounded": severe_wound_threshold,
        "Death Save": death_save
    }
})

const stats_block = computed(() => {
    const stats: Record<string, number> = {}
    for (const stat in char.value.stats) {
        stats[stat] = char.value.stats[stat]
    }
    const current_humanity = (char.value.stats['EMP'] * 10) - char.value.getHumanityLoss();
    const emp = Math.floor(current_humanity / 10);
    stats['current_EMP'] = emp

    return stats
})


const char = ref(new Character()) // Initializes reactive variable for character.

const weapon_attachment_modal_visible = ref(false)
const weapon_attachment_modal = ref<WeaponAttachment>({ name: '', description: '', cost: 0, eligible: [], attachment_slots: 0 })
function OpenAttachmentModal(attachment: WeaponAttachment) {
    weapon_attachment_modal.value = attachment;
    weapon_attachment_modal_visible.value = true;
}
const armor_modal_visible = ref(false)
const armor_modal = ref<Armor>({ armor_type: '', sp: 0, penalty: [], cost: 0, description: "" })
function OpenArmorModal(armor: Armor) {
    armor_modal.value = armor;
    armor_modal_visible.value = true;
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

const cash = ref(char.value.cash);

</script>
<style>
.notch {
    overflow: hidden;
    border: 4px solid red;
    /* padding: 1rem; */
    border-top-width: 8px;
    position: relative;
}

.notch.border-b-0 {
    border-bottom-width: 0;
}

.notch:before {
    content: "";
    position: absolute;
    top: -1em;
    left: -1em;
    width: 2em;
    height: 2em;
    background-color: red;
    transform: rotate(45deg);

}

.skills .columns-1 {
    column-rule: 4px solid white;
}
</style>
<template>
    <main class="container p-4 mx-auto">

        <TextFieldRow :values="char_info" />

        <hr class="my-2" />

        <CPTitle>Stats</CPTitle>
        <StatsBlock :stats="stats_block" />

        <hr class="my-2" />

        <TextFieldRow :values="derived_stats" />

        <hr class="my-2" />


        <div class="skills">
            <CPTitle>
                <div class="mr-4">Skills</div>
                <div class="font-normal">
                    Sorting by: <select v-model="sort_method">
                        <option value="alphabetical">Alphabetical</option>
                        <option value="base">Base</option>
                        <option value="group">Group</option>
                        <option value="level">Level</option>
                    </select>
                </div>
            </CPTitle>
            <div class=" sm:columns-2 md:columns-3 columns-1 gap-1 bg-red-500 p-1">
                <template v-if="sort_method === 'group'">
                    <SkillsByGroup :char="char" />
                </template>
                <template v-else>
                    <SkillTable v-for="(chunk, index) in skillChunks" :key="`skill_chunk_${index}`" :chunk :char />
                </template>
            </div>
        </div>
        <hr class="my-2" />

        <CPTable title="Weapons" :headers="['Weapon', 'Description', 'Skill', 'Damage', 'Ammo', 'ROF', 'Notes', 'Cost']">
            <CPRow v-if="char.weapons.length <= 0">
                <td colspan="7" class="text-center">No Weapons</td>
            </CPRow>
            <CPRow v-for="weapon in char.weapons" :key="`weapon_${weapon.name}`">
                <CPCell>{{ weapon.name }}</CPCell>
                <CPCell>
                    {{ weapon.description }}
                    <span v-if="weapon.quality">({{ weapon.quality.charAt(0).toUpperCase() + weapon.quality.slice(1).toLowerCase() }} quality)</span>
                </CPCell>
                <CPCell>{{ char.skills[weapon.skill].name }}</CPCell>
                <CPCell class="text-center">{{ weapon.damage }}</CPCell>
                <CPCell v-if="weapon.ammo_type.length > 0">
                    <div>{{ weapon.ammo_type.join(', ') }}</div>
                    <ul class="list-disc list-inside">

                        <li v-if="weapon.ammo_type.some(type => ['arrow', 'grenade', 'rocket'].includes(type.toLowerCase()))" v-for="qty, ammo_name in weapon.ammo" :key="`ammo_agr_${ammo_name}`">
                            {{ qty }} <span class="underline decoration-dashed cursor-pointer" @click="OpenAmmoTypeModal(ammo_types[ammo_name])">{{ ammo_name.split(" ")[0] }}</span> {{ weapon.ammo_type[0].toLowerCase() }}{{ qty > 1 ? 's' : '' }}
                        </li>
                        <li v-else v-for="qty, ammo_name in weapon.ammo" :key="`ammo_${ammo_name}`">
                            {{ qty }} rounds of <span class="underline decoration-dashed cursor-pointer" @click="OpenAmmoTypeModal(ammo_types[ammo_name])">{{ ammo_name }}</span>
                        </li>
                    </ul>
                </CPCell>
                <CPCell v-else></CPCell>
                <CPCell class="text-center">{{ weapon.rof }}</CPCell>
                <CPCell>
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
                                <li v-for="attachment in weapon.attachments" class="cursor-pointer" @click="OpenAttachmentModal(attachment)" :key="`attachment_${attachment}`">
                                    <span class="underline decoration-dashed">{{ attachment.name }}</span>
                                    <span v-if="['Drum Magazine', 'Extended Magazine'].includes(attachment.name)">
                                        ({{ clip_chart[weapon.getKey()][attachment.name.split(" ")[0].toLowerCase()]
                                        }}
                                        rounds)
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </CPCell>
                <CPCell class="text-right">{{ weapon.cost }}eb</CPCell>
            </CPRow>
        </CPTable>
        <Modal :visible="weapon_attachment_modal_visible" @close="weapon_attachment_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ weapon_attachment_modal.name }}</h2>
                <p>{{ weapon_attachment_modal.description }}</p>
                <button class="border rounded px-4" @click="weapon_attachment_modal_visible = false">Close</button>
            </div>
        </Modal>
        <Modal :visible="ammo_type_modal_visible" @close="ammo_type_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ ammo_type_modal.name }}</h2>
                <p>{{ ammo_type_modal.description }}</p>
                <button class="border rounded px-4" @click="ammo_type_modal_visible = false">Close</button>
            </div>
        </Modal>


        <hr class="my-2" />

        <CPTable title="Armor" :headers="['Location', 'Armor', 'SP', 'Penalty', 'Cost']">
            <CPRow v-for="armor, location in char.armor" :key="`armor_${location}`">
                <CPCell>{{ location }}</CPCell>
                <CPCell>
                    <span v-if="armor != 'None'" class="underline decoration-dashed cursor-pointer" @click="OpenArmorModal(armor)">{{ armor.armor_type }}</span>
                    <span v-else>None</span>
                </CPCell>
                <CPCell>{{ armor == "None" ? "" : armor.sp }}</CPCell>
                <CPCell>{{ armor == "None" ? "" : armor.penalty.length <= 0 ? "None" : armor.penalty.map(penalty => `${penalty.stat}: ${penalty.penalty}`).join(", ") }}</CPCell>
                <CPCell class="text-right">{{ armor == "None" ? "" : `${armor.cost}eb` }}</CPCell>
            </CPRow>
        </CPTable>
        <Modal :visible="armor_modal_visible" @close="armor_modal_visible = false">
            <div class="p-1">
                <h2 class="text-lg font-bold">{{ armor_modal.armor_type }}</h2>
                <p>{{ armor_modal.description }}</p>
                <button class="border rounded px-4" @click="armor_modal_visible = false">Close</button>
            </div>
        </Modal>
        <hr class="my-2" />

        <CPTable title="Gear" :headers="['Item', 'Description', 'Cost']">
            <CPRow v-if="char.gear.length <= 0">
                <td colspan="3" class="text-center">No Gear</td>
            </CPRow>
            <CPRow v-for="gear in char.gear" :key="`gear_${gear.name}`">
                <CPCell>{{ gear.name }}</CPCell>
                <CPCell>{{ gear.description }}</CPCell>
                <CPCell class="text-right">{{ gear.cost }}eb </CPCell>
            </CPRow>
        </CPTable>

        <hr class="my-2" />
        <TextFieldRow :values="{ 'Cash': cash.toString() + 'eb' }" />

        <br /><br /><br />

    </main>
</template>
