interface Armor {
    armor_type: string;
    description: string;
    sp: number;
    penalty: { stat: string, penalty: number }[];
    cost: number;
}

const armor_descriptions: Record<string, string> = {
    Leathers: "Thin leather with reinforced pads at shoulders, hips, and gut. Favored by Nomads and other 'punks who ride bikes. This also includes all those road-warrior wannabes wearing open-butt chaps and random sports equipment.",
    "Kevlar®": "The favored protection for the past 90 years. To quote DuPont: Kevlar® is a heat-resistant, synthetic, lightweight fiber that delivers high tensile strength that brings improved protection and performance across a range of industries and applications. Like when people are trying to stab or shoot you. Can be made into clothes, vests, jackets, business suits, and even bikinis.",
    "Light Armorjack": "A combination of Kevlar® and plastic meshes inserted into the weave of the fabric. Armorjack provides superior protection, especially against high-velocity bullets.",
    "Bodyweight Suit": "Skinsuit with impact absorbing, sintered armorgel layered in key body areas. Surprisingly, they are also breathable and quite comfortable. Besides giving you a measure of protection, a Bodyweight Suit also has a place to store your Cyberdeck and supports your Interface Plugs so they stay out of the way while you're busy brain-burning that fool who just dared to pop a Hellhound on you. Many Netrunners wear clothing over their Bodyweight Suits, but plenty don't. It's a matter of personal style. Unlike other armor, a Bodyweight Suit isn't bought in two pieces, and must always be worn on both your body and head location. Each location has its own SP11. When repaired, both pieces are repaired at the same time. You can't wear more than one Bodyweight Suit. Wearing a Bodyweight Suit adds one Hardware only Option Slot to a Cyberdeck connected to it. Hardware installed in the Bodyweight Suit cannot be accessed if the armor isn't worn and can only take up 1 Option Slot.",
    "Medium Armorjack": "Heavier Armorjack, with solid plastic plating, reinforced with thicker Kevlar® mesh. Typical Street wear, this combines decent protection with a decent ost.",
    "Heavy Armorjack": "The thickest Armorjack, combining denser Kevlar® and a layered mix of plastic and mesh weaves. It stops all but the heaviest attacks, but costs a pretty eb.",
    Flak: "This is the 21st century version of the time-honored flak vest and pants with metal plates designed to provide protection from high explosive weaponry, artillery, grenades, shotguns, and anti-personnel mines. Modern flak will also stop many of the higher caliber rounds from automatic rifles.",
    "Metalgear®": "You know how Evil Empire Storm Troopers just seem to stand there and take the hit? Metalgear® is the Dark Future equivalent of that type of armor: solid metal and plastic plates on a mesh body cover. Metalgear® will stop almost anything, but you're going to be easier to hit than a one-legged bantha in a potho race.",
    "Bulletproof Shield": "A transparent polycarbonate shield that can protect you in a firefight. See Using a Shield in the Friday Night Firefight Section (pg. 183). 10 HP which is reduced by damage. No penalty, but one arm is always in use."
};
const armor_list: Armor[] = [
    {
        armor_type: "Leathers",
        description: armor_descriptions["Leathers"],
        sp: 4,
        penalty: [],
        cost: 20,
    },
    {
        armor_type: "Kevlar®",
        description: armor_descriptions["Kevlar®"],
        sp: 7,
        penalty: [],
        cost: 50,
    },
    {
        armor_type: "Light Armorjack",
        description: armor_descriptions["Light Armorjack"],
        sp: 11,
        penalty: [],
        cost: 100,
    },
    {
        armor_type: "Bodyweight Suit",
        description: armor_descriptions["Bodyweight Suit"],
        sp: 11,
        penalty: [],
        cost: 1000,
    },
    {
        armor_type: "Medium Armorjack",
        description: armor_descriptions["Medium Armorjack"],
        sp: 12,
        penalty: [
            { stat: "REF", penalty: -2 },
            { stat: "DEX", penalty: -2 },
            { stat: "MOVE", penalty: -2 },
        ],
        cost: 100,
    },
    {
        armor_type: "Heavy Armorjack",
        description: armor_descriptions["Heavy Armorjack"],
        sp: 13,
        penalty: [
            { stat: "REF", penalty: -2 },
            { stat: "DEX", penalty: -2 },
            { stat: "MOVE", penalty: -2 },
        ],
        cost: 500,
    },
    {
        armor_type: "Flak",
        description: armor_descriptions["Flak"],
        sp: 15,
        penalty: [
            { stat: "REF", penalty: -4 },
            { stat: "DEX", penalty: -4 },
            { stat: "MOVE", penalty: -4 },
        ],
        cost: 500,
    },
    {
        armor_type: "Metalgear®",
        description: armor_descriptions["Metalgear®"],
        sp: 18,
        penalty: [
            { stat: "REF", penalty: -4 },
            { stat: "DEX", penalty: -4 },
            { stat: "MOVE", penalty: -4 },
        ],
        cost: 5000,
    },
    {
        armor_type: "Bulletproof Shield",
        description: armor_descriptions["Bulletproof Shield"],
        sp: 10,
        penalty: [],
        cost: 100,
    },
];

export { armor_list as ArmorList }
export type { Armor }