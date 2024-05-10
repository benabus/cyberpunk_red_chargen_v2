import { LifepathTable } from "@/classes/Lifepath";

const starting_table = new LifepathTable({
    name: "What kind of corp do you work for?",
    rows: [
        { value: 'Financial' },
        { value: 'Media and Communications' },
        { value: 'Cybertech and Medical Technologies' },
        { value: 'Pharmaceuticals and Biotech' },
        { value: 'Food, Clothing, or other General Consumables' },
        { value: 'Energy Production' },
        { value: 'Personal Electronics and Robotics' },
        { value: 'Corporate Services' },
        { value: 'Consumer Services' },
        { value: 'Real Estate and Construction' },
    ]
});

const division = new LifepathTable({
    name: "What division do you work in?",
    rows: [
        { value: 'Procurement' },
        { value: 'Manufacturing' },
        { value: 'Research and Development' },
        { value: 'Human Resources' },
        { value: 'Public Affairs/Publicity/Advertising' },
        { value: 'Mergers and Acquisitions' },
    ]
});
starting_table.setNextTable(division);

const goodbad = new LifepathTable({
    name: "How Good or Bad is Your Corp?",
    rows: [
        { value: `Always working for good, fully supporting ethical practices.` },
        { value: `Operates as a fair and honest business all the time.` },
        { value: `Will occasionally slip and do unethical things, but it's rare.` },
        { value: `Willing to bend the rules to get what it needs.` },
        { value: `Ruthless and profit-centered, willing to do some bad things.` },
        { value: `Totally evil. Will engage in illegal, unethical business all the time.` },
    ]
});
division.setNextTable(goodbad);

const wherebased = new LifepathTable({
    name: "Where is Your Corp Based?",
    rows: [
        { value: `One city` },
        { value: `Several cities` },
        { value: `Statewide` },
        { value: `National` },
        { value: `International, offices in a few major cities` },
        { value: `International, offices everywhere` },
    ]
});
goodbad.setNextTable(wherebased);

export default starting_table;