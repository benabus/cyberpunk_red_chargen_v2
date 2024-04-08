<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    headers: string[],
    title: string,
    randomize?: Function
}>()

const show_randomize_button = computed(() => {
    return props.randomize !== undefined
})

function randomize() {
    if (props.randomize !== undefined) {
        props.randomize()
    }
}

</script>
<style>
.notchbtn_cont {
    overflow: hidden;
    position: relative;
    background-color: red;
    padding: 3px 5px 4px 5px;
    height: calc(1.5em + 8px);
}


.notchbtn_cont:after {
    content: "";
    position: absolute;
    top: calc(-1.5em + 2px);
    left: calc(-2em);
    width: 2em;
    height: 3em;
    background-color: white;
    transform: rotate(45deg);

}

.notchbtn {
    overflow: hidden;
    height: 1.5em;
    position: relative;
}


.notchbtn:before {
    content: "";
    position: absolute;
    top: -1em;
    left: -2em;
    width: 2em;
    height: 2em;
    background-color: red;
    transform: rotate(45deg);

}
</style>

<template>
    <div class="notch border-8 border-red-500 border-solid flex justify-between">
        <div class="ml-4 my-2 font-bold">{{ title }}</div>
        <div class="mr-2 my-2" v-if="show_randomize_button">
            <div class="notchbtn_cont">
                <button @click="randomize()" class=" notchbtn bg-red-100 text-sm text-black active:bg-red-800 hover:bg-red-500 hover:text-white px-2 ">Randomize</button>
            </div>
        </div>
    </div>
    <table class="w-full">
        <thead>
            <tr class="text-xs bg-black text-white ">
                <th class="text-left border-x-4 border-red-500 p-1" v-for="column_header of headers">{{ column_header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>