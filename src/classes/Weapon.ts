
export class Weapon {
    name!: string
    dmg!: string
    ammo: number | undefined
    rof: number = 1
    notes: string = ""
    constructor(name: string, dmg: string = "1d6") {
        this.name = name
        this.dmg = dmg
    }
}

