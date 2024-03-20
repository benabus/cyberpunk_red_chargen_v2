<script setup lang="ts">
import {ref, computed} from 'vue';
import TextField from './TextField.vue'

enum Role {
  Solo = "Solo",
  Fixer = "Fixer",
  Netrunner = "Netrunner",
  Civilian = "Civilian",
  Rockerboy = "Rockerboy",
  Tech = "Tech",
  Medtech = "Medtech",
  Media = "Media",
  Exec = "Exec",
  Lawman = "Lawman",
  Nomad = "Nomad",
}

enum Stat {
  INT = "INT",
  REF = "REF",
  DEX = "DEX",
  TECH = "TECH",
  COOL = "COOL",
  WILL = "WILL",
  LUCK = "LUCK",
  MOVE = "MOVE",
  BODY = "BODY",
  EMP = "EMP",
}

class Skill {
  name: string;
  stat: Stat;
  lvl: number;
  description: string | undefined;
  x2: boolean;
  
  constructor( name: string, stat: Stat, x2: boolean = false, lvl: number | undefined = 0, description?: string | undefined ){
    this.name = name;
    this.stat = stat;
    this.lvl = lvl;
    this.x2 = x2;
    this.description = description;
  }
  key(): string{
    return this.name.toLocaleLowerCase().replace(/\W/g, '_');
  }
}


const skill_list: [string, Stat, boolean?][] = [
  ["Concentration", Stat.WILL ],
  ["Conceal/Reveal Object", Stat.INT ],
  ["Lip Reading", Stat.INT ],
  ["Perception", Stat.INT ],
  ["Tracking", Stat.INT ],
  ["Athletics", Stat.DEX ],
  ["Contortionist", Stat.DEX ],
  ["Dance", Stat.DEX ],
  ["Endurance", Stat.WILL ],
  ["Resist Torture/Drugs", Stat.WILL ],
  ["Stealth", Stat.DEX ],
  ["Drive Land Vehicle", Stat.REF ],
  ["Pilot Air Vehicle", Stat.REF, true ],
  ["Pilot Sea Vehicle", Stat.REF ],
  ["Riding", Stat.REF ],
  ["Accounting", Stat.INT ],
  ["Animal Handling", Stat.INT ],
  ["Bureaucracy", Stat.INT ],
  ["Business", Stat.INT ],
  ["Composition", Stat.INT ],
  ["Criminology", Stat.INT ],
  ["Cryptography", Stat.INT ],
  ["Deduction", Stat.INT ],
  ["Education", Stat.INT ],
  ["Gamble", Stat.INT ],
  ["Language - Streetslang", Stat.INT ],
  ["Library Search", Stat.INT ],
  ["Local Expert", Stat.INT ],
  ["Science", Stat.INT ],
  ["Tactics", Stat.INT ],
  ["Wilderness Survival", Stat.INT ],
  ["Brawling", Stat.DEX ],
  ["Evasion", Stat.DEX ],
  ["Martial Arts", Stat.DEX, true ],
  ["Melee Weapon", Stat.DEX ],
  ["Acting", Stat.COOL ],
  ["Play Instrument", Stat.TECH ],
  ["Archery", Stat.REF ],
  ["Autofire", Stat.REF, true ],
  ["Handgun", Stat.REF ],
  ["Heavy Weapons", Stat.REF, true ],
  ["Shoulder Arms", Stat.REF ],
  ["Bribery", Stat.COOL ],
  ["Conversation", Stat.EMP ],
  ["Human Perception", Stat.EMP ],
  ["Interrogation", Stat.COOL ],
  ["Persuasion", Stat.COOL ],
  ["Personal Grooming", Stat.COOL ],
  ["Streetwise", Stat.COOL ],
  ["Trading", Stat.COOL ],
  ["Wardrobe & Style", Stat.COOL ],
  ["Air Vehicle Tech", Stat.TECH ],
  ["Basic Tech", Stat.TECH ],
  ["Cybertech", Stat.TECH ],
  ["Demolitions", Stat.TECH, true ],
  ["Electronics/Security Tech", Stat.TECH, true ],
  ["First Aid", Stat.TECH ],
  ["Forgery", Stat.TECH ],
  ["Land Vehicle Tech", Stat.TECH ],
  ["Paint/Draw/Sculpt", Stat.TECH ],
  ["Paramedic", Stat.TECH, true ],
  ["Photography/Film", Stat.TECH ],
  ["Pick Lock", Stat.TECH ],
  ["Pick Pocket", Stat.TECH ],
  ["Sea Vehicle Tech", Stat.TECH ],
  ["Weaponstech", Stat.TECH ],
]

enum CyberwareLocation {
  Cyberears = "Cyberaudio Suite",
  RCybereye = "Right Cybereye",
  LCybereye = "Left Cybereye",
  RCyberarm = "Right Cyberarm",
  LCyberarm = "Left Cyberarm",
  NeuralLink = "Neural Link",
  RCyberleg = "Right Cyberleg",
  LCyberleg = "Left Cyberleg",
  Internal = "Internal",
  External = "External",
  Fashionware = "Fashionware",
  Borgware = "Borgware"
}

class Weapon {
  name!: string
  dmg!: string
  ammo: number | undefined
  rof: number = 1
  notes: string = ""
  constructor(name: string, dmg: string = "1d6"){
    this.name = name
    this.dmg = dmg
  }
}

class Character {
  handle: string = "Unknown";
  role: Role = Role.Civilian;
  role_ability_rank: number = 0;
  notes: string = ""
  humanity: number = 0
  stats: Record<string, number> = {}
  skills: Record<string, Skill> = {}
  critical_injuries: string[] = []
  addictions: string[] = []
  armor = {
    head: { description: "", sp: 0, penalty: 0 },
    body: { description: "", sp: 0, penalty: 0 },
    shield: { description: "", sp: 0, penalty: 0 },
  }
  weapons: Weapon[] = []
  gear: string[] = []
  housing: string = ""
  rent: number = 0
  lifestyle: string = ""
  fashion: string = ""

  reputation: number = 0
  reputation_events: string[] = []

  cyberware: {
    location: CyberwareLocation,
    // foundational: boolean,
    // requirement: string,
    name: string,
    data: string,
    humanity_loss: number
  }[] = []

  lifepath: Lifepath | undefined

  constructor(){
    for( const stat of Object.values(Stat) )
    {
      this.stats[stat] = 0;
    }
    for( const skill of skill_list)
    {
      let name: string = skill[0];
      let stat: Stat = skill[1];
      let x2: boolean = skill[2]?true:false;
      let new_skill = new Skill(name, stat, x2);
      this.skills[new_skill.key()] = new_skill;
    }
  }
  randomize(){  }
}

class Lifepath {
  affectation = ""
  cultural_origins = ""
  personality = ""
  clothing_style = ""
  value_most = ""
  feelings_about_people = ""
  most_valued_person = ""
  most_valued_possession = ""
  family_background = ""
  childhood_environment = ""
  family_crisis = ""
  life_goals = ""
  friends: string[] = []
  love_affairs: string[] = []
  enemies: {
    who: string, 
    cause: string, 
    what_can_they_throw: string, 
    what_happens: string
  }[] = []
  role_specific: string[] = []
}

const char = ref(new Character())
const hit_points = computed(()=>{
  return 10 + (5 * Math.ceil((char.value.stats.BODY + char.value.stats.WILL) / 2))
})
const severe_wound_threshold = computed(()=>{
  return Math.ceil(hit_points.value / 2)
})
const death_save = computed(()=>{
  return char.value.stats.BODY;
})
const humanity = computed(()=>{
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

    <table class="">
      <tr class="">
        <th class="border text-sm">Skill (Stat)</th>
        <th class="border ">LVL</th>
        <th class="border ">Stat</th>
        <th class="border ">Base</th>
      </tr>
      <tr v-for="skill of char.skills" class="">
        <td class="border text-sm">{{ skill.name }} ({{ skill.stat }})</td>
        <td class="border text-center">{{ skill.lvl }}</td>
        <td class="border text-center">{{ char.stats[skill.stat] }}</td>
        <td class="border text-center">{{ skill.lvl + char.stats[skill.stat] }}</td>
      </tr>
    </table>
    

  </main>
</template>
