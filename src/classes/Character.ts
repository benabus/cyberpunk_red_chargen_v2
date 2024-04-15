import {
    Role,
    Stat,
    // CyberwareLocation,
    SkillList,
    RequiredSkills,
    SkillCategories,
    MeleeWeapons,
    RangedWeapons,
    WeaponAttachments,
    ArmorList,
    Gear,
    CyberwareType,
    BodyLocation,
    Cyberware as CyberwareList
} from "@/data";
import { Skill, Weapon, Lifepath, Cyberware } from ".";
import type { Armor, GearItem } from "@/types";
import { random_key } from "@/utilities";
import { CulturalOriginTable } from "@/data/lifepath_tables";

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
    gear: GearItem[] = []
    housing: string = ""
    rent: number = 0
    lifestyle: string = ""
    fashion: string = ""

    reputation: number = 0
    reputation_events: string[] = []

    cyberware: Record<string, Cyberware | undefined> = {}

    creation_method: CreationMethod = "complete"

    lifepath: Lifepath = new Lifepath();

    constructor({ creation_method = "complete" }: { creation_method?: CreationMethod } = {}) {
        this.creation_method = creation_method || "complete";
        this.cash = Starting_Cash[this.creation_method];

        for (const stat of Object.values(Stat)) {
            this.stats[stat] = 0;
        }
        for (const skill of SkillList) {
            this.skills[skill.getKey()] = skill;
        }

        this.resetCyberware();
        this.lifepath.setStartingTable(CulturalOriginTable);

        // const neural_link = CyberwareList.find(cyberware => cyberware.name === "Neural Link") as Cyberware;
        // const chipware_socket = CyberwareList.find(cyberware => cyberware.name === "Chipware Socket") as Cyberware;
        // this.installCyberware({ cyberware: neural_link });
        // this.installCyberware({ cyberware: chipware_socket });

        // try {
        //     let cyberware_prototype = CyberwareList.find(cyberware => cyberware.name === "Cybereye");
        //     if (cyberware_prototype !== undefined) {
        //         const cyberware = new Cyberware({ ...cyberware_prototype })
        //         this.installCyberware({ cyberware: cyberware });
        //     }

        //     cyberware_prototype = CyberwareList.find(cyberware => cyberware.name === "Cybereye");
        //     if (cyberware_prototype !== undefined) {
        //         const cyberware = new Cyberware({ ...cyberware_prototype })
        //         this.installCyberware({ cyberware: cyberware });
        //     }

        //     // cyberware_prototype = CyberwareList.find(cyberware => cyberware.name === "Cybereye");
        //     // if (cyberware_prototype !== undefined) {
        //     //     const cyberware = new Cyberware({ ...cyberware_prototype })
        //     //     this.installCyberware({ cyberware: cyberware });
        //     // }

        //     cyberware_prototype = CyberwareList.find(cyberware => cyberware.name === "Dartgun");
        //     if (cyberware_prototype !== undefined) {
        //         const cyberware = new Cyberware({ ...cyberware_prototype })
        //         this.installCyberware({ cyberware: cyberware });
        //     }


        //     cyberware_prototype = CyberwareList.find(cyberware => cyberware.name === "Anti-Dazzle");
        //     if (cyberware_prototype !== undefined) {
        //         const cyberware = new Cyberware({ ...cyberware_prototype })
        //         this.installCyberware({ cyberware: cyberware });
        //     }

        // } catch (e) {
        //     console.error(e.message)
        // }

        // cyberware_prototype = CyberwareList.find(cyberware => cyberware.name === "Cybereye");
        // if (cyberware_prototype !== undefined) {
        //     const cyberware = new Cyberware({ ...cyberware_prototype })
        //     this.installCyberware({ cyberware: cyberware });
        // }

        // console.debug(this.cyberware)

        // const cybereyeR = new Cyberware(CyberwareList.find(cyberware => cyberware.name === "Cybereye") as Cyberware);
        // for (let i = 0; i < 100; i++) {
        //     try {
        //         const random_cyberware = CyberwareList[Math.floor(Math.random() * CyberwareList.length)];
        //         this.installCyberware({ cyberware: random_cyberware });
        //     } catch (e) {
        //         console.error(e + "")
        //     }
        // }

        this.randomizeStats();
        this.randomizeSkills();

        // this.randomizeArmor();
        // this.randomizeWeapons();
        // this.randomizeGear();

        // this.randomizeCyberware();


    }

    resetCyberware() {
        let total_value_of_cyberware = 0;
        for (const cyberware of Object.values(this.cyberware)) {
            total_value_of_cyberware += cyberware?.totalCost() || 0;
        }
        this.cash += total_value_of_cyberware;
        for (const location of Object.values(BodyLocation)) {
            this.cyberware[location] = undefined;
        }
        // these are basic placeholders locations that don't have foundational cyberware
        this.cyberware["Internal"] = new Cyberware({
            name: "Internal Body Cyberware",
            type: CyberwareType.InternalBodyCyberware,
            body_location: [BodyLocation.Internal],
            slots_available: 7,
            placeholder: true
        });
        this.cyberware["External"] = new Cyberware({
            name: "External Body Cyberware",
            type: CyberwareType.ExternalBodyCyberware,
            body_location: [BodyLocation.External],
            slots_available: 7,
            placeholder: true
        });
        this.cyberware["Fashionware"] = new Cyberware({
            name: "Fashionware",
            type: CyberwareType.Fashionware,
            body_location: [BodyLocation.Fashionware],
            slots_available: 7,
            placeholder: true
        });
        this.cyberware["Borgware"] = new Cyberware({
            name: "Borgware",
            type: CyberwareType.Borgware,
            body_location: [BodyLocation.Borgware],
            slots_available: 7,
            placeholder: true
        });

    }

    //TODO: Doesn't handle cyberware with requirements that aren't slotted directly into the requirement (e.g. Sensor Array)
    //TODO: Throw error if the cyberware would reduce humanity below 0
    installCyberware({ cyberware, free = false }: { cyberware: Cyberware, free?: boolean }) {
        // this.cyberware[location] = cyberware;

        if (cyberware.type === CyberwareType.Speedware && this.hasSpeedware()) {
            throw new Error(`Cannot install ${cyberware.name}.  Only one piece of speedware is allowed.`);
        }
        const max_installs = cyberware.max_installs;
        const current_installs = this.findCyberware(cyberware.name).length;
        if (max_installs > 0 && current_installs >= max_installs) {
            throw new Error(`Cannot install ${cyberware.name}.  Can install a maximum of ${max_installs}.`);
        }

        const possible_locations = cyberware.body_location;
        const required_cyberware_names = cyberware.required_cyberware.split("/");
        const required_slots = cyberware.slots_required;

        let required_cyberware: Cyberware[] = [];
        let required_cyberware_name = ""

        while (required_cyberware_names.length > 0 && required_cyberware.length <= 0) {
            required_cyberware_name = required_cyberware_names.shift() || "";
            if (required_cyberware_name == "Meat") {
                required_cyberware_name = "";
            }
            required_cyberware = this.findCyberware(required_cyberware_name);
        }

        required_cyberware = this.findCyberware(required_cyberware_name);

        if (required_cyberware_name != "" && required_cyberware.length <= 0) {
            throw new Error(`Cannot install ${cyberware.name} without ${required_cyberware_name}`);
        }
        if (cyberware.must_be_paired && required_cyberware.length < 2) {
            throw new Error(`Cannot install ${cyberware.name} without 2x ${required_cyberware_name}`);
        }

        //if there are requirements and they've been installed
        if (required_cyberware_name != "" && required_cyberware.length > 0) {
            const available_foundational_cyberware = required_cyberware.filter(cyberware => {
                const available_slot_count = cyberware.getOpenSlots();
                return available_slot_count >= required_slots
            });
            if (available_foundational_cyberware.length <= 0 || (cyberware.must_be_paired && available_foundational_cyberware.length <= 1)) {
                throw new Error(`Cannot install ${cyberware.name}.  Foundational cyberware doesn't have enough open slots.`);
            }
            if (this.cash < cyberware.cost) {
                throw new Error(`Cannot install ${cyberware.name}.  Not enough cash.`);
            }

            available_foundational_cyberware.sort(() => Math.random() - 0.5);
            available_foundational_cyberware[0].pushOption(cyberware);
            if (!free) {
                this.cash -= cyberware.cost;
            }
            if (cyberware.must_be_paired) {
                available_foundational_cyberware[1].pushOption(cyberware);
                if (!free) {
                    this.cash -= cyberware.cost;
                }
            }
            return;
        }

        //if there's no requirements, try to install it as a foundational cyberware
        possible_locations.sort(() => Math.random() - 0.5);
        for (let random_location of possible_locations) {
            let current_cyberware_in_location = this.cyberware[random_location];
            if (current_cyberware_in_location === undefined && cyberware.can_install_in_meat) {
                if (this.cash < cyberware.cost) {
                    throw new Error(`Cannot install ${cyberware.name}.  Not enough cash.`);
                }
                this.cyberware[random_location] = cyberware;
                if (!free) {
                    this.cash -= cyberware.cost;
                }
                if (cyberware.name == "Cyberarm") {
                    const standard_hand = CyberwareList.find(cyberware => cyberware.name === "Standard Hand") as Cyberware;
                    this.installCyberware({ cyberware: standard_hand, free: true });
                }
                if (cyberware.name == "Cyberleg") {
                    const standard_foot = CyberwareList.find(cyberware => cyberware.name === "Standard Foot") as Cyberware;
                    this.installCyberware({ cyberware: standard_foot, free: true });
                }
                return;
            } else if (current_cyberware_in_location === undefined && !cyberware.can_install_in_meat) {
                throw new Error(`Cannot install ${cyberware.name} in meat`);
            }
        }

        throw new Error(`Cannot install ${cyberware.name}.  No locations available.`);
    }
    hasSpeedware(): boolean {
        const neural_link = this.findCyberware("Neural Link");
        for (const cyberware of neural_link) {
            if (cyberware.slotted_options) {
                for (const option of cyberware.slotted_options) {
                    if (option.type === CyberwareType.Speedware) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    findCyberware(cyberware_name: string): Cyberware[] {
        let cyberware_list: Cyberware[] = [];
        for (const location of Object.keys(this.cyberware)) {
            const cyberware = this.cyberware[location];
            if (cyberware === undefined) {
                continue;
            } else if (cyberware.name === cyberware_name) {
                cyberware_list.push(cyberware);
            }
            cyberware_list = cyberware_list.concat(cyberware.findCyberwareInSlots(cyberware_name));
        }
        return cyberware_list;
    }
    randomizeCyberware() {
        this.resetCyberware();
        const loops = 50;
        for (let i = 0; i < loops; i++) {
            try {
                const random_cyberware = CyberwareList[Math.floor(Math.random() * CyberwareList.length)];
                this.installCyberware({ cyberware: new Cyberware({ ...random_cyberware }) });
            } catch (e) {
                console.warn(`Could not add cyberware: ${e}`)
            }
        }

        // const cyberarm = CyberwareList.find(cyberware => cyberware.name === "Cyberarm") as Cyberware;
        // this.installCyberware({ cyberware: cyberarm });
        // const rippers = CyberwareList.find(cyberware => cyberware.name === "Rippers") as Cyberware;
        // this.installCyberware({ cyberware: rippers });

    }


    getHumanityLoss(): number {
        let humanity_loss = 0;

        for (const location of Object.keys(this.cyberware)) {
            const cyberware = this.cyberware[location];
            if (cyberware === undefined) {
                continue;
            } else if (Array.isArray(cyberware)) {
                for (const item of cyberware) {
                    humanity_loss += item.getHumanityLoss();
                }
            } else {
                humanity_loss += cyberware.getHumanityLoss();
            }
        }

        return humanity_loss;
    }
    getRandomGearItem({ max_cost = this.cash }: { max_cost?: number } = {}) {
        const gear = Object.values(Gear).filter(gear => gear.cost <= max_cost);
        const randomIndex = Math.floor(Math.random() * gear.length);
        return gear[randomIndex];
    }
    getRandomArmor({ armorType = "all", max_cost = this.cash }: { armorType?: "all" | "include shield" | "shield only"; max_cost?: number } = {}): Armor | "None" {
        let availableArmor: (Armor | "None")[] = ["None"];
        if (armorType === "all" || armorType === "include shield") {
            availableArmor.push(...ArmorList.filter(armor => armor.armor_type !== "Bulletproof Shield"));
        }
        if (armorType === "shield only" || armorType === "include shield") {
            availableArmor.push(...ArmorList.filter(armor => armor.armor_type === "Bulletproof Shield"));
        }
        availableArmor = availableArmor.filter(armor => armor == "None" || armor.cost <= max_cost);
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
            body_armor = this.getRandomArmor({ max_cost: cash - armor_cost });
            armor_cost += body_armor == "None" ? 0 : body_armor.cost;
            if (body_armor != "None" && body_armor.armor_type === "Bodyweight Suit") {
                head_armor = body_armor
            }
            else {
                do {
                    head_armor = this.getRandomArmor({ max_cost: cash - armor_cost });
                } while (head_armor != "None" && head_armor.armor_type === "Bodyweight Suit")
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
    }
    randomizeGear() {
        while (this.cash > 0) {
            const rand = Math.random();
            if (rand < 0.25) {
                break;
            }
            try {
                const gearItem: GearItem = this.getRandomGearItem({ max_cost: this.cash });
                this.gear.push(gearItem);
                this.cash -= gearItem.cost;
                console.log("gear cost", gearItem.cost, gearItem.name)
            } catch (e) {
                console.log(`Could not add any gear: ${e}`)
                break;
            }
        }
    }
    resetSkills() {
        for (const skill of Object.values(this.skills)) {
            skill.lvl = 0;
        }
    }
    randomizeSkills() {
        this.resetSkills();

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
    resetLifepath() {
        this.lifepath = new Lifepath();
        this.lifepath.setStartingTable(CulturalOriginTable);
    }
    walkLifepath() {
        this.lifepath.walkPath();
    }
}