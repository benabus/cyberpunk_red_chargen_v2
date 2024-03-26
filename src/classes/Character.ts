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

type WeaponType = "melee" | "ranged" | "exotic";

export class Character {
    skill_points = 86
    character_rank = "starting"

    handle: string = "Unknown";
    role: Role = Role.Civilian;
    role_ability_rank: number = 0;
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

    lifepath: Lifepath | undefined

    constructor() {
        for (const stat of Object.values(Stat)) {
            this.stats[stat] = 0;
        }
        for (const skill of SkillList) {
            this.skills[skill.getKey()] = skill;
        }
        this.weapons.push(this.getRandomWeapon(["ranged"]));
        // this.weapons.push(RangedWeapons[5])
        // let attachment = WeaponAttachments["drum_magazine"];
        // try {
        //     this.weapons[0].addAttachment(attachment);
        // } catch (e) {
        //     console.log(e);
        // }
        this.randomizeArmor()
        this.randomize()
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
    getRandomWeapon(weaponTypes?: WeaponType[] | undefined): Weapon {
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
        const randomIndex = Math.floor(Math.random() * allWeapons.length);
        return allWeapons[randomIndex];
    };
    randomizeArmor() {
        this.armor.body = this.getRandomArmor();
        this.armor.head = this.getRandomArmor();
        if (this.armor.body != "None" && this.armor.body.armor_type === "Bodyweight Suit") {
            const bodyweight_suit = ArmorList.find(armor => armor.armor_type === "Bodyweight Suit");
            this.armor.head = bodyweight_suit || "None";
        }
        // this.armor.shield = this.getRandomArmor("shield only");
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