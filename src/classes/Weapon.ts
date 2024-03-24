

export class Weapon {
    name: string;
    skill: string;
    damage: string;
    rof: number;
    concealed: boolean;
    cost: number;
    num_hands: number = 1;
    description: string = "";
    variants: string[] = [];
    alt_fire: string = "none";
    special_features: string = "none";
    mag_size: number = 0;
    ammo_type: string;
    quality: string = "standard";
    quality_variants: Record<string, string> = {};

    constructor({
        name,
        skill,
        damage,
        rof,
        concealed,
        cost,
        variants = [],
        description = "",
        alt_fire = "none",
        special_features = "none",
        num_hands = 1,
        mag_size = 0,
        ammo_type = "None",
        quality = "standard",
        quality_variants = {}
    }: {
        name: string,
        skill: string,
        damage: string,
        rof: number,
        concealed: boolean,
        cost: number,
        variants?: string[],
        description?: string,
        alt_fire?: string,
        special_features?: string,
        num_hands?: number,
        mag_size?: number,
        ammo_type?: string,
        quality?: string,
        quality_variants?: Record<string, string>
    }) {
        this.name = name;
        this.skill = skill;
        this.damage = damage;
        this.rof = rof;
        this.concealed = concealed;
        this.cost = cost;
        this.description = description;
        this.variants = variants;
        if (variants.length > 0 && !description) {
            const randomIndex = Math.floor(Math.random() * variants.length);
            this.description = variants[randomIndex];
        }
        this.alt_fire = alt_fire;
        this.special_features = special_features;
        this.num_hands = num_hands;
        this.mag_size = mag_size;
        this.ammo_type = ammo_type;
        this.quality = quality || ["poor", "standard", "excellent"][Math.floor(Math.random() * 3)];
        this.quality_variants = quality_variants;
        const variantKeys = Object.keys(this.quality_variants);
        if (variantKeys.length > 0 && !description) {
            const qualityKey = this.quality.toLowerCase();
            if (qualityKey in this.quality_variants) {
                this.description = this.quality_variants[qualityKey];
            } else {
                const randomIndex = Math.floor(Math.random() * variantKeys.length);
                this.description = this.quality_variants[variantKeys[randomIndex]];
            }
        }
    }

    selectRandomOption() {
        const randomIndex = Math.floor(Math.random() * this.variants.length);
        this.description = this.variants[randomIndex];
    }
}
