import {
    Role,
    Stat,
    CyberwareLocation,
    SkillList,
    RequiredSkills,
    SkillCategories,
    MeleeWeapons,
    RangedWeapons,
    WeaponAttachments,
    ArmorList
} from "@/data";
import { Skill, Weapon, Lifepath } from ".";
import type { Armor } from "@/types";
import { random_key } from "@/utilities";

const Stat_Points: Record<string, number> = {
    "minor supporting": 50,
    "starting": 62,
    "major supporting": 70,
    "minor hero": 75,
    "major hero": 80
}
const Starting_Cash: Record<CreationMethod, number> = {
    "edgerunner": 500,
    "street rat": 500,
    "complete": 2550
}

type WeaponType = "melee" | "ranged" | "exotic";
type CreationMethod = "complete" | "edgerunner" | "street rat";

export class Character {
    skill_points = 86
    character_rank = "starting"
    cash = 0;

    handle: string = "Unknown";
    role: Role = Role.Civilian;
    role_ability_rank: number = 1;
    notes: string = ""
    humanity: number = 0
    stats: Record<string, number> = {}
    skills: Record<string, Skill> = {}
    critical_injuries: string[] = []
    addictions: string[] = []
    armor: { head: Armor | "None", body: Armor | "None", shield: Armor | "None" } = {
        head: "None",
        body: "None",
        shield: "None"
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

    creation_method: CreationMethod = "complete"

    constructor({ creation_method = "complete" }: { creation_method?: CreationMethod } = {}) {
        this.creation_method = creation_method || "complete";
        this.cash = Starting_Cash[this.creation_method];

        for (const stat of Object.values(Stat)) {
            this.stats[stat] = 0;
        }
        for (const skill of SkillList) {
            this.skills[skill.getKey()] = skill;
        }
        // const weapon = this.getRandomWeapon(["ranged"]);
        // this.cash = this.cash - weapon.cost;
        // this.weapons.push(weapon);

        // this.weapons.push(this.getRandomWpeapon(["ranged"]));
        // this.weapons.push(this.getRandomWeapon(["ranged"]));
        // this.weapons.push(RangedWeapons[5])
        // let attachment = WeaponAttachments["drum_magazine"];
        // try {
        //     this.weapons[0].addAttachment(attachment);
        // } catch (e) {
        //     console.log(e);
        // }
        this.randomizeArmor()
        this.randomizeWeapons()
        this.randomize()
    }
    getHumanityLoss(): number {
        let humanity_loss = 1;
        for (const cyberware of this.cyberware) {
            humanity_loss += cyberware.humanity_loss;
        }
        return humanity_loss;
    }
    getRandomArmor(armorType: "all" | "include shield" | "shield only" = "all"): Armor | "None" {
        let availableArmor: (Armor | "None")[] = ["None"];
        if (armorType === "all" || armorType === "include shield") {
            availableArmor.push(...ArmorList.filter(armor => armor.armor_type !== "Bulletproof Shield"));
        }
        if (armorType === "shield only" || armorType === "include shield") {
            availableArmor.push(...ArmorList.filter(armor => armor.armor_type === "Bulletproof Shield"));
        }
        const randomIndex = Math.floor(Math.random() * availableArmor.length);
        return availableArmor[randomIndex];
    }
    getRandomWeapon({ weaponTypes, excluded_weapons, max_cost }: { weaponTypes?: WeaponType[] | undefined; excluded_weapons?: string[]; max_cost?: number } = {}): Weapon {
        if (weaponTypes === undefined) {
            weaponTypes = ["melee", "ranged"];
        }
        let allWeapons: Weapon[] = [];
        for (const weaponType of weaponTypes) {
            if (weaponType === "melee") {
                allWeapons.push(...Object.values(MeleeWeapons));
            } else if (weaponType === "ranged") {
                allWeapons.push(...Object.values(RangedWeapons));
            } else if (weaponType === "exotic") {
                // Add your exotic weapons here
            }
        }
        if (excluded_weapons !== undefined && excluded_weapons.length > 0) {
            allWeapons = allWeapons.filter(weapon => !excluded_weapons.includes(weapon.name));
        }
        if (max_cost !== undefined) {
            allWeapons = allWeapons.filter(weapon => weapon.cost <= max_cost);
        }
        if (allWeapons.length === 0) {
            throw new Error("No weapons available");
        }
        const randomIndex = Math.floor(Math.random() * allWeapons.length);
        return allWeapons[randomIndex];
    };
    randomizeArmor() {
        let cash = this.cash;
        let body_armor: Armor | "None" = "None";
        let head_armor: Armor | "None" = "None";
        // let shield: Armor | "None" = "None";

        let armor_cost = 0;
        do {
            armor_cost = 0;
            body_armor = this.getRandomArmor();
            armor_cost += body_armor == "None" ? 0 : body_armor.cost;
            if (body_armor != "None" && body_armor.armor_type === "Bodyweight Suit") {
                head_armor = body_armor
            }
            else {
                head_armor = this.getRandomArmor();
                armor_cost += head_armor == "None" ? 0 : head_armor.cost;
                // if (head_armor != "None" && head_armor.armor_type === "Bodyweight Suit") {
                //     body_armor = head_armor
                // }
            }
            // this.armor.shield = this.getRandomArmor("shield only");
            // cash -= shield == "None" ? 0 : shield.cost;
        } while (armor_cost > cash)

        this.armor.body = body_armor
        this.armor.head = head_armor
        // this.armor.shield = shield
        this.cash -= armor_cost
        console.log(armor_cost)
    }
    randomizeWeapons() {
        for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
            try {
                const weapon: Weapon = this.getRandomWeapon({ max_cost: this.cash });
                this.weapons.push(weapon);
                this.cash -= weapon.cost;
                console.log("weapon cost", weapon.cost, weapon.name)
            } catch (e) {
                console.log(`Could not add any weapons: ${e}`)
            }
        }
        // try {
        //     let weapon: Weapon = this.getRandomWeapon({ max_cost: cash });
        //     this.weapons.push(weapon);
        //     this.cash -= weapon.cost;
        //     console.log("weapon cost:", weapon.cost)
        // } catch (e) {
        //     console.log(`Could not add any weapons: ${e}`)
        // }
    }
    randomizeSkills() {
        let skill_points = this.skill_points
        let required_skills = [...RequiredSkills]
        for (const weapon of this.weapons) {
            const skill_name = this.skills[weapon.skill].name;
            required_skills.push(skill_name)
        }
        for (const key in this.skills) {
            if (required_skills.includes(this.skills[key].name)) {
                this.skills[key].lvl += 2;
                skill_points -= 2;
            }
        }
        while (skill_points > 0) {
            const key = random_key(this.skills);
            const skill = this.skills[key];
            if (skill.lvl >= 6) {
                continue;
            }
            if (skill.x2) {
                if (skill_points < 2) {
                    continue;
                }
                skill_points -= 2;
            }
            else {
                skill_points -= 2;
            }
            skill.lvl += 1;
        }

    }
    randomizeStats() {
        let stat_points = Stat_Points[this.character_rank]
        for (const stat in this.stats) {
            this.stats[stat] = 2;
            stat_points -= 2;
        }

        while (stat_points > 0) {
            const stat = random_key(this.stats);
            if (this.stats[stat] >= 8) {
                continue;
            }
            this.stats[stat] += 1;
            stat_points -= 1;
        }
    }
    randomize() {
        this.randomizeStats();
        this.randomizeSkills();
    }
}