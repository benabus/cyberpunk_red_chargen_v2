import { Role, Stat, CyberwareLocation, SkillList, RequiredSkills, SkillCategories, MeleeWeapons, RangedWeapons } from "@/data";
import { Skill, Weapon, Lifepath } from ".";
import { random_key } from "@/utilities";

const Stat_Points: Record<string, number> = {
    "minor supporting": 50,
    "starting": 62,
    "major supporting": 70,
    "minor hero": 75,
    "major hero": 80
}

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

    constructor() {
        for (const stat of Object.values(Stat)) {
            this.stats[stat] = 0;
        }
        for (const skill of SkillList) {
            this.skills[skill.key()] = skill;
        }
        this.weapons.push(this.getRandomWeapon());

        this.randomize()
    }
    getRandomWeapon = (): Weapon => {
        const allWeapons: Weapon[] = [...Object.values(MeleeWeapons), ...Object.values(RangedWeapons)];
        const randomIndex = Math.floor(Math.random() * allWeapons.length);
        return allWeapons[randomIndex];
    };
    randomize_skills() {
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
    randomize_stats() {
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
        this.randomize_stats();
        this.randomize_skills();
    }
}