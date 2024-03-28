<script setup lang="ts">
import TextField from '@/components/TextField.vue'
import { computed } from 'vue'
// import type { Stat } from '@/types'

const props = defineProps<{
    stats: Record<string, number>
}>()

const updated_stats = computed(() => {
    let stats = Object.entries(props.stats).reduce((acc, [key, value]) => {
        acc[key] = value.toString()
        return acc
    }, {} as Record<string, string>)

    stats["EMP"] = `${props.stats["current_EMP"]} of ${props.stats["EMP"]}`
    delete stats["current_EMP"]
    stats["LUCK"] = `${props.stats["LUCK"]} of ${props.stats["LUCK"]}`
    return stats
})

</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10">
        <TextField title-class="text-right" value-class="text-center" class="notch px-1 pb-3" v-for="value, stat in updated_stats" :title="stat" :key="`stat_block_${stat}`" :value="value.toString()" />
    </div>
</template>
