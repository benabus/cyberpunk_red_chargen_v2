import { Stat } from "@/data";
export class Skill {
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