
class Lifepath {
    // affectation = ""
    // cultural_origins = ""
    // personality = ""
    // clothing_style = ""
    // value_most = ""
    // feelings_about_people = ""
    // most_valued_person = ""
    // most_valued_possession = ""
    // family_background = ""
    // childhood_environment = ""
    // family_crisis = ""
    // life_goals = ""
    // friends: string[] = []
    // love_affairs: string[] = []
    // enemies: {
    //     who: string,
    //     cause: string,
    //     what_can_they_throw: string,
    //     what_happens: string
    // }[] = []
    // role_specific: string[] = []

    path: LifepathRow[] = [];
    starting_table: LifepathTable | undefined = undefined;

    walkPath() {
        if (!this.starting_table) {
            throw new Error("No starting table defined");
        }
        this.starting_table.walkPath(this);
    }
    pushRow(row: LifepathRow) {
        this.path.push(row);
    }

    printPath() {
        console.log(this)
        this.path.forEach((row) => {
            console.log(row + "")
        });
    }
    constructor({ starting_table }: { starting_table?: LifepathTable }) {
        this.starting_table = starting_table;
    }
}



class LifepathTable {
    start = false;
    end = false;
    rows: LifepathRow[] = [];
    name = "";
    next_table: LifepathTable | undefined = undefined;
    repeat: number = 1;

    constructor({ name, start, end, repeat = 1, rows }: { name: string, start?: boolean, end?: boolean, repeat?: number | string, rows?: LifepathRow[] }) {
        this.name = name;
        this.start = start || false;
        this.end = end || false;
        if (repeat === "d10-7") {
            this.repeat = Math.floor(Math.random() * 10) - 7;
        }
        else {
            this.repeat = repeat as number;
        }
        if (rows) {
            this.addRows(rows);
        }
    }
    addRow(row: LifepathRow) {
        row.table = this.name;
        this.rows.push(row);
    }
    addRows(rows: LifepathRow[]) {
        rows.forEach((row) => {
            this.addRow(row);
        });
    }
    setNextTable(table: LifepathTable) {
        this.next_table = table;
    }
    getRandomRow() {
        return this.rows[Math.floor(Math.random() * this.rows.length)];
    }
    walkPath(path: Lifepath) {
        for (let i = 0; i < this.repeat; i++) {
            let row = this.getRandomRow();
            row.walkPath(path);
        }
        if (this.next_table) {
            this.next_table.walkPath(path);
        }
    }


}

class LifepathRow {
    table: string = "";
    value: string = "";
    description: string = "";
    next_table: LifepathTable | undefined = undefined;

    constructor({ table, value, description, next_table }: { table?: string, value: string, description?: string, next_table?: LifepathTable }) {
        this.value = value;
        this.table = table || this.table;
        this.description = description || this.description;
        this.next_table = next_table || undefined;
    }

    walkPath(path: Lifepath) {
        path.pushRow(new LifepathRow({ ...this }));
        if (this.next_table) {
            this.next_table.walkPath(path);
        }
    }
    toString() {
        return `${this.table} : ${this.value} : ${this.description}`;
    }
}




const table1 = new LifepathTable({
    name: "table1", start: true, rows: [
        new LifepathRow({ value: "row1" }),
        new LifepathRow({ value: "row2" }),
        new LifepathRow({ value: "row3" }),
    ]
});
const table2 = new LifepathTable({
    name: "table2", rows: [
        new LifepathRow({ value: "row4" }),
        new LifepathRow({ value: "row5", next_table: table1 }),
        new LifepathRow({ value: "row6" }),
    ]
});
table1.setNextTable(table2);
const table3 = new LifepathTable({
    name: "table3", rows: [
        new LifepathRow({ value: "row7" }),
        new LifepathRow({ value: "row8" }),
        new LifepathRow({ value: "row9" }),
    ]
});
table2.setNextTable(table3);

const lifepath = new Lifepath({ starting_table: table1 });

export { Lifepath, LifepathTable, LifepathRow, lifepath }