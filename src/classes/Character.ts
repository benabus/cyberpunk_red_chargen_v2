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
import type { setOriginalNode } from "typescript";
import type { LifepathTable } from "./Lifepath";
import { Solo as SoloLifepath, Exec as ExecLifepath } from "@/data/role_lifepath_tables";


import { faker } from '@faker-js/faker';

import StatTables from "@/data/edge_runnner_stat_tables";
import SkillTables from "@/data/edge_runner_skill_tables";

import EquipmentTables from "@/data/role_equipment";


const role_lifepath_table: Record<Role, LifepathTable | undefined> = {
    Solo: SoloLifepath,
    Fixer: undefined,
    Netrunner: undefined,
    Civilian: undefined,
    Rockerboy: undefined,
    Tech: undefined,
    Medtech: undefined,
    Media: undefined,
    Exec: ExecLifepath,
    Lawman: undefined,
    Nomad: undefined,

}

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
export type CreationMethod = "complete" | "edgerunner" | "street rat";

export class Character {
    skill_points = 86
    character_rank = "starting"
    cash = 0;

    handle: string = "Unknown";
    first_name: string = "";
    last_name: string = "";
    role: Role = Role.Civilian;
    role_ability_rank: number = 4;
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

    creation_method: CreationMethod = "street rat"

    lifepath: Lifepath = new Lifepath();
    role_lifepath: Lifepath | undefined = undefined;

    constructor({ creation_method = "street rat", role = Role.Civilian }: { creation_method?: CreationMethod, role?: Role } = {}) {
        this.reset({ creation_method, role })
    }

    reset({ creation_method, role }: { creation_method: CreationMethod, role: Role }) {
        this.creation_method = creation_method || "street rat";
        this.setRole(role);

        for (const stat of Object.values(Stat)) {
            this.stats[stat] = 0;
        }
        for (const skill of SkillList) {
            this.skills[skill.getKey()] = skill;
        }
        this.lifepath.setStartingTable(CulturalOriginTable);

        this.resetArmor();
        this.resetWeapons();
        this.resetGear();
        this.resetCyberware();
        this.resetLifepath();
        this.resetCyberware();

        this.cash = Starting_Cash[this.creation_method];
    }

    randomizeName() {
        // let a = faker.word.adjective();
        let n = faker.word.noun();
        this.handle = n[0].toUpperCase() + n.slice(1);
        this.first_name = faker.person.firstName();
        this.last_name = faker.person.lastName();
        this.notes = `${this.first_name} "${this.handle}" ${this.last_name}`;
    }

    getEquipmentFromTable() {
        if (Object.keys(EquipmentTables).includes(this.role)) {
            const table = EquipmentTables[this.role];
            const weapons = [...RangedWeapons, ...MeleeWeapons];
            for (let options of table) {
                options.sort(() => Math.random() - 0.5);
                const item = options[0];
                let loop = 1;
                if (item.quantity && item.quantity > 1) {
                    loop = item.quantity;
                }
                for (let i = 0; i < loop; i++) {
                    if (item.type === "weapon") {
                        const weapon = weapons.find(weapon => weapon.name === item.name);
                        if (weapon) {
                            let settings = { ...weapon }
                            if (item.ammo) {
                                for (let i = 0; i < item.ammo.length; i += 2) {
                                    settings["ammo"][item.ammo[i]] = item.ammo[i + 1]
                                }
                            };
                            this.weapons.push(new Weapon(settings));
                        }
                    }
                    else if (item.type === "armor") {
                        const armor = ArmorList.find(armor => armor.armor_type === item.name);
                        if (armor) {
                            if (item.location === "body") {
                                this.armor.body = armor;
                            }
                            else if (item.location === "head") {
                                this.armor.head = armor;
                            }
                            else if (item.location === "shield") {
                                this.armor.shield = armor;
                            }
                        }
                    }
                    else if (item.type === "gear") {
                        const gear = Object.values(Gear).find((gearItem) => gearItem.name === item.name);
                        if (gear) {
                            this.gear.push(gear);
                        }
                    }
                    else if (item.type == "cyberware") {
                        const cyberware = CyberwareList.find(cyberware => cyberware.name === item.name);
                        if (cyberware) {
                            this.installCyberware({ cyberware: new Cyberware({ ...cyberware }), free: true });
                        }
                    }
                }

            }
            // else if (item.type === "armor") {
            //     if (item.armor_type === "Bodyweight Suit") {
            //         this.armor.body = item;
            //     }
            //     else {
            //         this.armor.head = item;
            //     }
            // }
            // else if (item.type === "gear") {
            //     this.gear.push(item);
            // }
            // else if (item.type === "cyberware") {
            //     this.installCyberware({ cyberware: new Cyberware({ ...item }) });
            // }

        }
        else {
            throw new Error(`Could not find equipment table for role: ${this.role}`);
        }
    }

    getStatPoints(): number {
        return Stat_Points[this.character_rank];
    }
    getRemainingStatPoints(): number {
        let remaining_points = this.getStatPoints();
        for (const stat of Object.keys(this.stats)) {
            if (!(['INT', 'REF', 'DEX', 'TECH', 'COOL', 'WILL', 'LUCK', 'MOVE', 'BODY', 'EMP'].includes(stat))) {
                continue;
            }

            remaining_points -= this.stats[stat];
        }
        return remaining_points;
    }

    //  ######  ##    ## ########  ######## ########  ##      ##    ###    ########  ######## 
    // ##    ##  ##  ##  ##     ## ##       ##     ## ##  ##  ##   ## ##   ##     ## ##       
    // ##         ####   ##     ## ##       ##     ## ##  ##  ##  ##   ##  ##     ## ##       
    // ##          ##    ########  ######   ########  ##  ##  ## ##     ## ########  ######   
    // ##          ##    ##     ## ##       ##   ##   ##  ##  ## ######### ##   ##   ##       
    // ##    ##    ##    ##     ## ##       ##    ##  ##  ##  ## ##     ## ##    ##  ##       
    //  ######     ##    ########  ######## ##     ##  ###  ###  ##     ## ##     ## ######## 

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
        cyberware = new Cyberware({ ...cyberware });
        this.canInstallCyberware({ cyberware, free, returning: false })

        const max_installs = cyberware.max_installs;
        const current_installs = this.findCyberware(cyberware.name).length;
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

        //if there are requirements and they've been installed
        if (required_cyberware_name != "" && required_cyberware.length > 0) {
            const available_foundational_cyberware = required_cyberware.filter(cyberware => {
                const available_slot_count = cyberware.getOpenSlots();
                return available_slot_count >= required_slots
            });
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
            this.cyberware[random_location] = cyberware;
            if (!free) {
                this.cash -= cyberware.cost;
            }
            if (cyberware.name == "Cyberarm") {
                const standard_hand = CyberwareList.find(cyberware => cyberware.name === "Standard Hand") as Cyberware;
                //this.installCyberware({ cyberware: new Cyberware({...standard_hand}), free: true });
                cyberware.pushOption(new Cyberware({ ...standard_hand }))
            }
            if (cyberware.name == "Cyberleg") {
                const standard_foot = CyberwareList.find(cyberware => cyberware.name === "Standard Foot") as Cyberware;
                // this.installCyberware({ cyberware: new Cyberware({...standard_foot}), free: true });
                cyberware.pushOption(new Cyberware({ ...standard_foot }))

            }
            return;

        }

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
    canInstallCyberware({ cyberware, free = false, returning = false }: { cyberware: Cyberware, free?: boolean, returning?: boolean }): boolean {
        // this.cyberware[location] = cyberware;

        if (cyberware.type === CyberwareType.Speedware && this.hasSpeedware()) {
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name}.  Only one piece of speedware is allowed.`);
        }
        const max_installs = cyberware.max_installs;
        const current_installs = this.findCyberware(cyberware.name).length;
        if (max_installs > 0 && current_installs >= max_installs) {
            if (returning) {
                return false;
            }
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
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name} without ${required_cyberware_name}`);
        }
        if (cyberware.must_be_paired && required_cyberware.length < 2) {
            if (returning) {
                return false;
            }
            throw new Error(`Cannot install ${cyberware.name} without 2x ${required_cyberware_name}`);
        }

        //if there are requirements and they've been installed
        if (required_cyberware_name != "" && required_cyberware.length > 0) {
            const available_foundational_cyberware = required_cyberware.filter(cyberware => {
                const available_slot_count = cyberware.getOpenSlots();
                return available_slot_count >= required_slots
            });
            if (available_foundational_cyberware.length <= 0 || (cyberware.must_be_paired && available_foundational_cyberware.length <= 1)) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name}.  Foundational cyberware doesn't have enough open slots.`);
            }
            if (!free && this.cash < cyberware.cost) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name}.  Not enough cash.`);
            }

            return true;
        }

        //if there's no requirements, try to install it as a foundational cyberware
        possible_locations.sort(() => Math.random() - 0.5);
        for (let random_location of possible_locations) {
            let current_cyberware_in_location = this.cyberware[random_location];
            if (current_cyberware_in_location === undefined && cyberware.can_install_in_meat) {
                if (this.cash < cyberware.cost) {
                    if (returning) {
                        return false;
                    }
                    throw new Error(`Cannot install ${cyberware.name}.  Not enough cash.`);
                }
                // this.cyberware[random_location] = cyberware;
                // if (!free) {
                //     this.cash -= cyberware.cost;
                // }
                // if (cyberware.name == "Cyberarm") {
                //     const standard_hand = CyberwareList.find(cyberware => cyberware.name === "Standard Hand") as Cyberware;
                //     this.installCyberware({ cyberware: standard_hand, free: true });
                // }
                // if (cyberware.name == "Cyberleg") {
                //     const standard_foot = CyberwareList.find(cyberware => cyberware.name === "Standard Foot") as Cyberware;
                //     this.installCyberware({ cyberware: standard_foot, free: true });
                // }
                return true;
            } else if (current_cyberware_in_location === undefined && !cyberware.can_install_in_meat) {
                if (returning) {
                    return false;
                }
                throw new Error(`Cannot install ${cyberware.name} in meat`);
            }
        }
        if (returning) {
            return false;
        }
        throw new Error(`Cannot install ${cyberware.name}.  No locations available.`);

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
    // findCyberwareById(cyberware_id: string): Cyberware | undefined {
    //     for (const location of Object.keys(this.cyberware)) {
    //         const cyberware = this.cyberware[location];
    //         if (cyberware === undefined) {
    //             continue;
    //         } else if (cyberware.id === cyberware_id) {
    //             return cyberware;
    //         }
    //         const found_cyberware = cyberware.findCyberwareInSlotsById(cyberware_id);
    //         if (found_cyberware !== undefined) {
    //             return found_cyberware;
    //         }
    //     }
    //     return undefined;
    // }
    uninstallCyberwareById(cyberware_id: string) {
        for (const location of Object.keys(this.cyberware)) {
            const cyberware = this.cyberware[location];
            if (cyberware === undefined) {
                continue;
            } else if (cyberware.id === cyberware_id) {
                this.cash += cyberware.cost;
                this.cash += cyberware.uninstallAllOptions()
                this.cyberware[location] = undefined;
                return;
            }
            else {
                this.cash += cyberware.uninstallOptionById(cyberware_id);
            }
        }
    }
    randomizeCyberware() {
        this.resetCyberware();
        if (this.creation_method == "complete") {
            const loops = 50;
            for (let i = 0; i < loops; i++) {
                try {
                    const random_cyberware = CyberwareList[Math.floor(Math.random() * CyberwareList.length)];
                    this.installCyberware({ cyberware: new Cyberware({ ...random_cyberware }) });
                } catch (e) {
                    console.warn(`Could not add cyberware: ${e}`)
                }
            }
        }
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
    resetArmor() {
        this.cash += this.armor.body == "None" ? 0 : this.armor.body.cost;
        if (this.armor.body == "None" || this.armor.body.armor_type != "Bodyweight Suit") {
            this.cash += this.armor.head == "None" ? 0 : this.armor.head.cost;
        }
        // this.cash += this.armor.shield == "None" ? 0 : this.armor.shield.cost;
        this.armor.body = "None";
        this.armor.head = "None";
        this.armor.shield = "None";
    }
    randomizeArmor() {
        this.resetArmor();
        let cash = this.cash;
        let body_armor: Armor | "None" = "None";
        let head_armor: Armor | "None" = "None";
        // let shield: Armor | "None" = "None";

        if (this.creation_method == "complete") {
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
    }
    resetWeapons() {
        for (const weapon of this.weapons) {
            this.cash += weapon.cost;
        }
        this.weapons = [];
    }
    randomizeWeapons() {
        this.resetWeapons();
        if (this.creation_method == "complete") {
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
    }
    resetGear() {
        for (const item in this.gear) {
            this.cash += this.gear[item].cost;
        }
        this.gear = [];
    }
    randomizeGear() {
        this.resetGear();
        if (this.creation_method == "complete") {
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
    }

    //  ######  ##    ## #### ##       ##        ######  
    // ##    ## ##   ##   ##  ##       ##       ##    ## 
    // ##       ##  ##    ##  ##       ##       ##       
    //  ######  #####     ##  ##       ##        ######  
    //       ## ##  ##    ##  ##       ##             ## 
    // ##    ## ##   ##   ##  ##       ##       ##    ## 
    //  ######  ##    ## #### ######## ########  ######  

    resetSkills() {
        for (const skill of Object.values(this.skills)) {
            skill.lvl = 0;
        }
    }
    randomizeSkills() {
        this.resetSkills();

        const role_skill_table = SkillTables[this.role as Role];
        let skill_points = this.skill_points
        // console.debug(this.creation_method);

        if (this.creation_method == "complete" || this.creation_method == "edgerunner") {
            let allowable_skills: string[] = [];

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

            if (this.creation_method == "complete") {
                for (const skill_name in role_skill_table) {
                    allowable_skills.push(Skill.genKey(skill_name))
                }
            }
            else {
                for (const skill_name in role_skill_table) {
                    allowable_skills.push(Skill.genKey(skill_name))
                }

            }

            while (skill_points > 0) {
                const key = allowable_skills[Math.floor(Math.random() * allowable_skills.length)];
                try {
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
                catch (e) {
                    console.error(`Could not find skill: ${key}`);
                    console.error(allowable_skills)
                    break;
                }
            }
            return
        }
        else {


            if (this.creation_method == "street rat") {
                for (const skill in role_skill_table) {
                    const key = Skill.genKey(skill);
                    try {
                        // console.debug(key, role_skill_table[skill], role_skill_table);
                        this.skills[key].lvl = role_skill_table[skill];
                    }
                    catch (e) {
                        console.error(`Could not find skill: ${skill} with key ${key}`);
                    }
                }
                return
            }
        }

        throw new Error("Could not randomize skills");
    }
    randomizeStats() {
        if (this.creation_method == "complete") {
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

            return
        }
        else {
            const stats = ['INT', 'REF', 'DEX', 'TECH', 'COOL', 'WILL', 'LUCK', 'MOVE', 'BODY', 'EMP'];
            const table = StatTables[this.role as Role];
            if (this.creation_method == "street rat") {
                const random_row = table[Math.floor(Math.random() * table.length)];
                for (let index in stats) {
                    this.stats[stats[index]] = random_row[index];
                }
                return
            }
            else if (this.creation_method == "edgerunner") {
                for (let index in stats) {
                    const random_row = table[Math.floor(Math.random() * table.length)];
                    this.stats[stats[index]] = random_row[index];
                }
                return;
            }
        }
        throw new Error("Could not randomize stats")
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
    setRole(role: Role) {
        this.role = role;
        this.role_lifepath = undefined;
        const role_start_table = role_lifepath_table[role];
        if (role_start_table != undefined) {
            this.role_lifepath = new Lifepath();
            this.role_lifepath.setStartingTable(role_start_table);
        }
    }
    walkRoleLifepath() {
        if (this.role_lifepath === undefined) {
            return;
        }
        this.role_lifepath.walkPath();
    }
}