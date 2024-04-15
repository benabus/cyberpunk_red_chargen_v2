import { LifepathTable, LifepathRow } from "@/classes/Lifepath";
import type { LifepathRow_Object } from "@/classes/Lifepath";

export { cultural_origin as CulturalOriginTable }

const cultural_origin = new LifepathTable({
    name: "Cultural Origin", rows: [
        { value: "North American" },
        { value: "South/Central American" },
        { value: "Western European" },
        { value: "Eastern European" },
        { value: "Middle Eastern/North African" },
        { value: "Sub-Saharan African" },
        { value: "South Asian" },
        { value: "South East Asian" },
        { value: "East Asian" },
        { value: "Oceania/Pacific Islander" },
    ]
});

const north_american_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Chinese" },
        { value: "Cree" },
        { value: "Creole" },
        { value: "English" },
        { value: "French" },
        { value: "Navajo" },
        { value: "Spanish" },
    ]
});
const south_central_american_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Creole" },
        { value: "English" },
        { value: "German" },
        { value: "Guarani" },
        { value: "Mayan" },
        { value: "Portuguese" },
        { value: "Quechua" },
        { value: "Spanish" },
    ]
});
const western_european_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Dutch" },
        { value: "English" },
        { value: "French" },
        { value: "German" },
        { value: "Italian" },
        { value: "Norwegian" },
        { value: "Portuguese" },
        { value: "Spanish" },
    ]
});
const eastern_european_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "English" },
        { value: "Finnish" },
        { value: "Polish" },
        { value: "Romanian" },
        { value: "Russian" },
        { value: "Ukrainian" },
    ]
});
const middle_eastern_north_african_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Arabic" },
        { value: "Berber" },
        { value: "English" },
        { value: "Farsi" },
        { value: "French" },
        { value: "Hebrew" },
        { value: "Turkish" },
    ]
});
const sub_saharan_african_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Arabic" },
        { value: "English" },
        { value: "French" },
        { value: "Hausa" },
        { value: "Lingala" },
        { value: "Oromo" },
        { value: "Portuguese" },
        { value: "Swahili" },
        { value: "Twi" },
        { value: "Yoruba" },
    ]
});
const south_asian_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Bengali" },
        { value: "Dari" },
        { value: "English" },
        { value: "Hindi" },
        { value: "Nepali" },
        { value: "Sinhalese" },
        { value: "Tamil" },
        { value: "Urdu" },
    ]
});
const south_east_asian_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Arabic" },
        { value: "Burmese" },
        { value: "English" },
        { value: "Filipino" },
        { value: "Hindi" },
        { value: "Indonesian" },
        { value: "Khmer" },
        { value: "Malayan" },
        { value: "Vietnamese" },
    ]
});
const east_asian_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "Cantonese Chinese" },
        { value: "English" },
        { value: "Japanese" },
        { value: "Korean" },
        { value: "Mandarin Chinese" },
        { value: "Mongolian" },
    ]
});
const oceania_pacific_islander_languages = new LifepathTable({
    name: "Language", rows: [
        { value: "English" },
        { value: "French" },
        { value: "Hawaiian" },
        { value: "Maori" },
        { value: "Pama-Nyungan" },
        { value: "Tahitian" },
    ]
});
cultural_origin.rows[0].next_table = north_american_languages;
cultural_origin.rows[1].next_table = south_central_american_languages;
cultural_origin.rows[2].next_table = western_european_languages;
cultural_origin.rows[3].next_table = eastern_european_languages;
cultural_origin.rows[4].next_table = middle_eastern_north_african_languages;
cultural_origin.rows[5].next_table = sub_saharan_african_languages;
cultural_origin.rows[6].next_table = south_asian_languages;
cultural_origin.rows[7].next_table = south_east_asian_languages;
cultural_origin.rows[8].next_table = east_asian_languages;
cultural_origin.rows[9].next_table = oceania_pacific_islander_languages;


const personality = new LifepathTable({
    name: "What are you like?",
    description: `This is what you're like as a person. Are you the kind of Character that stands away from the pack, aloof and calculating? A party animal who loves to get messed up? The stable and competent professional who always has a plan?`,
    rows: [
        { value: "Shy and secretive" },
        { value: "Rebellious, antisocial, and violent" },
        { value: "Arrogant, proud, and aloof" },
        { value: "Moody, rash, and headstrong" },
        { value: "Picky, fussy, and nervous" },
        { value: "Stable and serious" },
        { value: "Silly and fluff-headed" },
        { value: "Sneaky and deceptive" },
        { value: "Intellectual and detached" },
        { value: "Friendly and outgoing" },
    ]
});
cultural_origin.setNextTable(personality);


const clothing_style = new LifepathTable({
    name: "Clothing Style",
    description: `In Cyberpunk, what you look like is (to The Street) a snapshot of who you are. Your clothes, hairstyles and even personal touches can determine how people will relate to you, for good or for bad. Remember: an Exec wearing Street Casual, a rainbow mohawk, and ritual scars is probably not going to get that promotion they wanted. 
    Note that your clothing style is more about the style of clothes you favor, not the individual items. You could wear a tailored business suit jacket, a rawhide fringed Nomad jacket, a high-tech light collared urban flash jacket, or even a torn and ripped leather jacket with gang colors all over the back. Each one is the same item of clothing (jacket), but defined by the style of jacket your Character favors.`,
    rows: [
        { value: "Generic Chic (Standard, Colorful, Modular)" },
        { value: "Leisurewear (Comfort, Agility, Athleticism)" },
        { value: "Urban Flash (Flashy, Technological, Streetwear)" },
        { value: "Businesswear (Leadership, Presence, Authority)" },
        { value: "High Fashion (Exclusive, Designer, Couture)" },
        { value: "Bohemian (Folksy, Retro, Free-spirited)" },
        { value: "Bag Lady Chic (Homeless, Ragged, Vagrant)" },
        { value: "Gang Colors (Dangerous, Violent, Rebellious)" },
        { value: "Nomad Leathers (Western, Rugged, Tribal)" },
        { value: "Asia Pop (Bright, Costume-like, Youthful)" },
    ]
});
personality.setNextTable(clothing_style);

const hairstyle = new LifepathTable({
    name: "Hairstyle",
    description: `Your hairstyle can be a defining characteristic of your character. It can reflect your personality, cultural background, or simply be a fashion statement. Choose the hairstyle that best suits your character.`,
    rows: [
        { value: "Mohawk" },
        { value: "Long and ratty" },
        { value: "Short and spiked" },
        { value: "Wild and all over" },
        { value: "Bald" },
        { value: "Striped" },
        { value: "Wild colors" },
        { value: "Neat and short" },
        { value: "Short and curly" },
        { value: "Long and straight" },
    ]
});
clothing_style.setNextTable(hairstyle);
