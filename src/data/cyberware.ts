

export enum BodyLocation {
    Brain = "Brain",
    Ear = "Ear",
    LeftEye = "Left Eye",
    RightEye = "Right Eye",
    LeftArm = "Left Arm",
    RightArm = "Right Arm",
    LeftLeg = "Left Leg",
    RightLeg = "Right Leg",

    Internal = "Internal",
    External = "External",
    Fashionware = "Fashionware",
    Borgware = "Borgware"

}

export enum CyberwareType {
    Fashionware = "Fashionware",
    Neuralware = "Neuralware",
    Cyberoptics = "Cyberoptics",
    Cyberaudio = "Cyberaudio",
    InternalBodyCyberware = "Internal Body Cyberware",
    ExternalBodyCyberware = "External Body Cyberware",
    Cyberlimbs = "Cyberlimbs",
    Borgware = "Borgware",
    Chipware = "Chipware",
    Speedware = "Speedware",
}

export type FoundationalCyberware = "Neural Link" | "Cybereye" | "Cyberaudio Suite" | "Cyberarm" | "Cyberleg" | "Chipware Socket" | "Meat";

export class Cyberware {
    name: string;
    type: CyberwareType;
    description: string = "";
    cost: number = 0;
    humanity_loss: number = 0;
    body_location: string[] = [];
    install_location: string = "";
    slots_required: number = 1;
    slots_available: number = 0;
    required_cyberware: string = "";
    slotted_options: Cyberware[] = [];
    must_be_paired: boolean = false;
    can_install_in_meat: boolean = false;
    max_installs: number = 0;
    placeholder: boolean = false;
    constructor({
        name,
        type,
        cost = 0,
        description = "",
        humanity_loss = 0,
        body_location = [],
        install_location = "",
        slots_required = 1,
        slots_available = 0,
        required_cyberware = "",
        slotted_options = [],
        must_be_paired = false,
        can_install_in_meat = false,
        max_installs = 0,
        placeholder = false
    }: {
        name: string,
        type: CyberwareType,
        description?: string,
        cost?: number,
        humanity_loss?: number,
        body_location?: string[],
        install_location?: string,
        slots_required?: number,
        slots_available?: number,
        required_cyberware?: string,
        slotted_options?: Cyberware[],
        must_be_paired?: boolean,
        can_install_in_meat?: boolean,
        max_installs?: number,
        placeholder?: boolean
    }) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.cost = cost;
        this.humanity_loss = humanity_loss;
        this.body_location = body_location;
        this.install_location = install_location;
        this.slots_required = slots_required;
        this.slots_available = slots_available;
        this.required_cyberware = required_cyberware;
        this.slotted_options = [...slotted_options];
        // this.slotted_options = slotted_options;
        this.must_be_paired = must_be_paired;
        this.can_install_in_meat = can_install_in_meat;
        this.max_installs = max_installs;
        this.placeholder = placeholder;
    }

    getHumanityLoss(): number {
        let humanityLoss = this.humanity_loss;
        humanityLoss += this.slotted_options.reduce((acc, option) => {
            return acc + option.getHumanityLoss();
        }, 0);
        return humanityLoss
    }
    getOpenSlots(): number {
        let slots = this.slots_available;
        slots -= this.slotted_options.reduce((acc, option) => {
            return acc + option.slots_required;
        }, 0);
        return slots
    }
    pushOption(option: Cyberware) {
        if (this.getOpenSlots() < option.slots_required) {
            throw new Error("Not enough slots available for this option")
        }
        this.slotted_options.push(option);
    }
    findCyberwareInSlots(name: string): Cyberware[] {
        let cyberware_list: Cyberware[] = [];
        for (let item of this.slotted_options) {
            if (item.name === name) {
                cyberware_list.push(item);
            }
            cyberware_list = cyberware_list.concat(item.findCyberwareInSlots(name));
        }
        return cyberware_list;
    }
    totalCost(): number {
        let cost = this.cost;
        cost += this.slotted_options.reduce((acc, option) => {
            return acc + option.totalCost();
        }, 0);
        return cost
    }
}

// const placeholders = [
//     {
//         name: "Fashionware",
//         type: CyberwareType.Fashionware,
//         description: "Fashionware is a catch-all term for cosmetic and aesthetic cyberware.",
//         body_location: [BodyLocation.Fashionware],
//         slots_available: 7,
//         placeholder: true
//     },
//     {
//         name: "Borgware",
//         type: CyberwareType.Borgware,
//         description: "Borgware is a catch-all term for cyberware that replaces or enhances a body part.",
//         body_location: [BodyLocation.Borgware],
//         slots_available: 7,
//         placeholder: true
//     },
//     {
//         name: "Internal Body Cyberware",
//         type: CyberwareType.InternalBodyCyberware,
//         description: "Internal Body Cyberware is a catch-all term for cyberware that is installed inside the body.",
//         body_location: [BodyLocation.Internal],
//         slots_available: 7,
//         placeholder: true
//     },
//     {
//         name: "External Body Cyberware",
//         type: CyberwareType.ExternalBodyCyberware,
//         description: "External Body Cyberware is a catch-all term for cyberware that is installed outside the body.",
//         body_location: [BodyLocation.External],
//         slots_available: 7,
//         placeholder: true
//     },
// ]

const fashionware = [

    {
        name: "Biomonitor",
        type: CyberwareType.Fashionware,
        description: "Subdermal implant which generates a constant LED readout of pulse, temperature, respiration, blood sugar, etc. You can link your Biomonitor to your Agent to allow it to track your wellness.",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        required_cyberware: "Fashionware",
        max_installs: 1,
    },
    {
        name: "Chemskin",
        type: CyberwareType.Fashionware,
        description: "Dyes and pigments infused into the skin to permanently change its hue, the applications of which can range from hiding blemishes to the desire for neon-green skin. Pigments can optionally be temperature-sensitive or reactant to hormone changes in the body. A user with Chemskin and Techhair adds +2 to their Personal Grooming Skill for having both. (This bonus only applies once)",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        required_cyberware: "Fashionware",
        max_installs: 1,
    },
    {
        name: "EMP Threading",
        type: CyberwareType.Fashionware,
        description: "Popularized by the media sensation UR, these thin silver lines run in circuit-like patterns across the body. Many people believe they act as a 'Faraday cage' to protect you from radiation and EMP effects but so far there's no scientific backing to these claims. But they sure do look cool. Most people wear EMP Threading as a fashion statement.",
        cost: 10,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        required_cyberware: "Fashionware",
        max_installs: 1,
    },
    {
        name: "Light Tattoo",
        type: CyberwareType.Fashionware,
        description: "Subdermal patches store light and project colored tattoos under the skin. The larger the piece, the more installations of this fashionware you need to complete it. A user with a three or more Light Tattoo installations adds +2 to their Wardrobe & Style Skill. (This bonus only applies once.)",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        required_cyberware: "Fashionware",
    },
    {
        name: "Shift Tacts",
        type: CyberwareType.Fashionware,
        description: "Color-changing lenses implanted into the eye. Several patterns are also available. Lenses can optionally be temperature-sensitive or reactant to hormone changes in the body. Only one choice of color and pattern can be made, but the user can deactivate the color change at any time desired without an Action.",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        required_cyberware: "Fashionware",
        max_installs: 1,
    },
    {
        name: "Skinwatch",
        type: CyberwareType.Fashionware,
        description: "Subdermal implant generates a constant LED readout of the current time and date visible through the skin.",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        required_cyberware: "Fashionware",
        max_installs: 1,
    },
    {
        name: "Techhair",
        type: CyberwareType.Fashionware,
        description: "Color-light-emitting artificial hair. Hair can optionally be temperature sensitive, motorized to extend/retract, or reactant to hormone changes in the body. A user with Chemskin and Techhair adds +2 to their Personal Grooming Skill for having both. (This bonus only applies once.)",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        required_cyberware: "Fashionware",
        max_installs: 1,
    }
];

const neuralware = [

    {
        name: "Neural Link",
        type: CyberwareType.Neuralware,
        description: "Wired artificial nervous system, required to use Neuralware, and Subdermal Grips. System has 5 Option Slots for Neuralware options.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        slots_required: 0,
        slots_available: 5,
        can_install_in_meat: true,
        max_installs: 1,
    },
    {
        name: "Braindance Recorder",
        type: CyberwareType.Neuralware,
        description: "Neuralware Option. Share your story from your point of view! Records braindance content to a standard Memory Chip or a linked Agent. Braindances can be viewed using a Braindance Viewer. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        required_cyberware: "Neural Link",
        max_installs: 1,
    },
    {
        name: "Chipware Socket",
        type: CyberwareType.Neuralware,
        description: "Neuralware Option. A single socket installed in the back of the neck that allows quick installation of a single piece of Chipware, of which there are many varieties. Installing or uninstalling a single piece of Chipware from a Chipware Socket is an Action. The first time you install a piece of Chipware you've never used before, you always accrue Humanity Loss. Re-installing Chipware you've already used doesn't do this. Chipware does not take up a Neural Link Option Slot. Multiple sockets may be installed, but each must be paid for individually. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        slots_available: 1,
        required_cyberware: "Neural Link",
    },
    {
        name: "Interface Plugs",
        type: CyberwareType.Neuralware,
        description: "Neuralware Option. Plugs in the wrist or head that allow user to jack into and make use of Smartguns, Cyberdecks, heavy machinery, and drive vehicles with no hands! Multiple installations allow user to be plugged into multiple things at the same time. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        required_cyberware: "Neural Link",
    },
    {
        name: "Kerenzikov",
        type: CyberwareType.Speedware,
        description: "Neuralware Option. Always-on Speedware that provides consistently improved reaction time. User adds +2 to their Initiative Rolls. Only a single piece of Speedware can be installed into a user at a time. Requires Neural Link.",
        cost: 500,
        humanity_loss: 14,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        required_cyberware: "Neural Link",
        max_installs: 1,
    },
    {
        name: "Sandevistan",
        type: CyberwareType.Speedware,
        description: "Neuralware Option. Speedware that provides short boosts of highly improved reaction time. When activated as an Action, the user adds +3 to any Initiative Roll they make in the next minute, after which Sandevistan cannot be activated again for an hour. Only a single piece of Speedware can be installed into a user at a time. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        required_cyberware: "Neural Link",
        max_installs: 1,
    },
    // Chipware options
    {
        name: "Chemical Analyzer",
        type: CyberwareType.Chipware,
        description: "While installed into a Chipware Socket, allows user to test substances to find their precise chemical composition as an Action, identifying most substances instantly from a wide database of samples. Requires Chipware Socket.",
        cost: 500,
        humanity_loss: 3,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        required_cyberware: "Chipware Socket",
    },
    {
        name: "Memory Chip",
        type: CyberwareType.Chipware,
        description: "The standard for data storage. While installed into a Chipware socket, the user's cyberware can store data on it or access data stored on it. Requires Chipware Socket.",
        cost: 10,
        humanity_loss: 0,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        required_cyberware: "Chipware Socket",
    },
    {
        name: "Olfactory Boost",
        type: CyberwareType.Chipware,
        description: "While installed into a Chipware Socket, the user's sense of smell is boosted, allowing them to use the Tracking Skill to track scent in addition to visual clues. Requires Chipware Socket.",
        cost: 100,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        required_cyberware: "Chipware Socket",
    },
    {
        name: "Pain Editor",
        type: CyberwareType.Chipware,
        description: "While installed into a Chipware Socket, a Pain Editor shuts off the user's pain receptors dynamically, allowing them to ignore the effects of the Seriously Wounded Wound State. Requires Chipware Socket.",
        cost: 1000,
        humanity_loss: 14,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        required_cyberware: "Chipware Socket",
    },
    {
        name: "Skill Chip",
        type: CyberwareType.Chipware,
        description: "While installed into a Chipware Socket, a Skill Chip makes the Skill it was made for trained for the user at +3, unless the user's Skill was already trained higher than +3, in which case it does nothing. Skill Chips for (x2) cost Skills are 1,000eb, chips for all other skills are 500eb. Requires Chipware Socket.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        required_cyberware: "Chipware Socket",
    },
    {
        name: "Tactile Boost",
        type: CyberwareType.Chipware,
        description: "While installed into a Chipware Socket, it boosts the user's sense of touch, allowing them to detect motion within 20m/yds of them, as long as their hand is touching a surface. While in use as a motion detector, that hand can't be used to do anything else. Requires Chipware Socket.",
        cost: 100,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        required_cyberware: "Chipware Socket",
    }
];
const cyberoptics = [
    {
        name: "Cybereye",
        type: CyberwareType.Cyberoptics,
        description: "All following options are installed in an artificial eye that replaces a meat one. Each Cybereye has 3 Option Slots for Cybereye Options. Some options must be paired to work properly (purchased twice and installed in two different Cybereyes on a user. Humanity Loss is calculated separately for each purchase).",
        cost: 100,
        humanity_loss: 7,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Clinic",
        slots_available: 3,
        can_install_in_meat: true
    },
    {
        name: "Anti-Dazzle",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. User is immune to blindness or other effects caused by dangerous flashes of light, like those of a flashbang. Requires two Cybereyes and must be paired.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Mall",
        required_cyberware: "Cybereye",
        must_be_paired: true,
    },
    {
        name: "Chyron",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Projects a tiny subscreen into user's normal field of vision for messages, video, etc. from a user's other cyberware or electronics. Picture in a picture for real life. Requires a Cybereye.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Mall",
        required_cyberware: "Cybereye",
    },

    {
        name: "Color Shift",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Cosmetic upgrade allows unlimited color and pattern changes to be made as an Action. Eye can optionally be temperature sensitive or reactant to hormone changes in the body. Requires a Cybereye.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Mall",
        required_cyberware: "Cybereye",
    },
    {
        name: "Dartgun",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Dartgun Exotic Weapon, with only a single shot in the clip, concealed inside the Cybereye. Requires a Cybereye and takes 3 Option Slots.",
        cost: 500,
        humanity_loss: 2,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Clinic",
        slots_required: 3,
        required_cyberware: "Cybereye",
    },
    {
        name: "Image Enhance",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. User adds +2 to their Perception, Lip Reading, and Conceal/Reveal Object Skills for Checks which include sight. Requires two Cybereyes and must be paired. Multiple installations of this option provide user no additional benefit.",
        cost: 500,
        humanity_loss: 3,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Mall",
        required_cyberware: "Cybereye",
        must_be_paired: true,
    },
    {
        name: "Tactile Boost",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. User adds +2 to their Perception, Lip Reading, and Conceal/Reveal Object Skills for Checks which include sight. Requires two Cybereyes and must be paired. Multiple installations of this option provide user no additional benefit.",
        cost: 100,
        humanity_loss: 7,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Mall",
        required_cyberware: "Cybereye",
        must_be_paired: true,
    },
    {
        name: "Low Light/Infrared/UV",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Reduces penalties imposed by darkness and other intangible obscurment, like smoke, fog, etc. to 0. User can distinguish hot meat from cold metal but cannot see through anything that could provide cover. Requires two Cybereyes, must be paired, and takes 2 Option Slots per Cybereye.",
        cost: 500,
        humanity_loss: 3,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Mall",
        slots_required: 2,
        required_cyberware: "Cybereye",
        must_be_paired: true,
    },


    {
        name: "MicroOptics",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Microscope providing user up to 400x magnification. Requires a Cybereye.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Clinic",
        required_cyberware: "Cybereye",
    },
    {
        name: "MicroVideo",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Camera in eye records video and audio to a standard Memory Chip or a linked Agent. Requires a Cybereye and takes 2 Option Slots.",
        cost: 500,
        humanity_loss: 2,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Clinic",
        slots_required: 2,
        required_cyberware: "Cybereye",
    },
    {
        name: "Radiation Detector",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Radiation readings within 100m/yds of the user are displayed in user's vision hovering over their source in the form of a blue glow. Requires a Cybereye.",
        cost: 1000,
        humanity_loss: 3,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Clinic",
        required_cyberware: "Cybereye",
    },
    {
        name: "Targeting Scope",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. User gets a +1 to their Check when making an Aimed Shot. Multiple installations of this option provide user no additional benefit. Requires a Cybereye.",
        cost: 500,
        humanity_loss: 3,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Clinic",
        required_cyberware: "Cybereye",
    },
    {
        name: "TeleOptics",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. User can see detail up to 800m/yds away. When attacking a target 51m/yds or further away with either a weapon's single shot firing mode or an Aimed Shot, you can add a +1 to your Check. Multiple installations of this option provide user no additional benefit. Does not stack with Sniping Scope Weapon Attachment. Requires a Cybereye.",
        cost: 500,
        humanity_loss: 3,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Clinic",
        required_cyberware: "Cybereye",
    },
    {
        name: "Virtuality",
        type: CyberwareType.Cyberoptics,
        description: "Cybereye Option. Projects cyberspace imagery over user's view of the world. Never forget your Virtuality Goggles again. Requires two Cybereyes and must be paired.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.LeftEye, BodyLocation.RightEye],
        install_location: "Mall",
        required_cyberware: "Cybereye",
        must_be_paired: true,
    }
];

const cyberaudio = [
    {
        name: "Cyberaudio Suite",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Suite is installed invisibly in the inner skull. System has 3 Option Slots for Cyberaudio Options. User can only have one Cyberaudio Suite installed.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Ear],
        install_location: "Clinic",
        slots_available: 3,
        can_install_in_meat: true,
        max_installs: 1,
    },
    {
        name: "Amplified Hearing",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. User adds +2 to their Perception Skill for Checks which include hearing. Requires a Cyberaudio Suite. Multiple installations of this option provide user no additional benefit.",
        cost: 100,
        humanity_loss: 3,
        body_location: [BodyLocation.Ear],
        install_location: "Mall",
        required_cyberware: "Cyberaudio Suite",
        max_installs: 1,
    },
    {
        name: "Audio Recorder",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. Records audio to a standard Memory Chip or a linked Agent. Requires a Cyberaudio Suite.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Clinic",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Bug Detector",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. Beeps when user is within 2m/yds of a tap, bug, or other listening device. Requires a Cyberaudio Suite.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Mall",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Homing Tracer",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. Can follow a linked tracer up to 1 mile away. Comes with a free button-sized linked tracer. Replacements are 50eb. Requires a Cyberaudio Suite.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Clinic",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Internal Agent",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. Fully functional Agent (See Gear Section pg. 352), controlled entirely via voice commands. Images are described, but output can be linked to a Cybereye with Chyron or a nearby screen if visual output is desired. The implanted Agent's Memory Chip cannot be removed without surgery. Requires a Cyberaudio Suite.",
        cost: 100,
        humanity_loss: 3,
        body_location: [BodyLocation.Ear],
        install_location: "Mall",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Level Damper",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. Automatic noise compensation. User is immune to deafness or other effects caused by dangerously loud noises, like those produced by a flashbang. Requires a Cyberaudio Suite.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Mall",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Radio Communicator",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. User can communicate via radio, 1-mile range. Requires a Cyberaudio Suite.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Mall",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Radio Scanner/Music Player",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. User can use an Action to scan all radio bands within a mile that are currently being used and tune into them. Music player can link to the Data Pool to listen to the hottest music or play directly from a Memory Chip. Understanding scrambled channels requires a Scrambler/Descrambler. Requires a Cyberaudio Suite.",
        cost: 50,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Clinic",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Radar Detector",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. Beeps if active radar beam is present within 100m/yds. Requires a Cyberaudio Suite.",
        cost: 500,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Clinic",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Scrambler/Descrambler",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. Allows user to scramble outgoing communications so they cannot be understood without a descrambler, which is also included at no extra charge. Requires a Cyberaudio Suite.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Ear],
        install_location: "Mall",
        required_cyberware: "Cyberaudio Suite",
    },
    {
        name: "Voice Stress Analyzer",
        type: CyberwareType.Cyberaudio,
        description: "Cyberaudio Option. User adds +2 to their Human Perception and Interrogation Skills User can activate a special lie-detecting function for a minute with an Action, during which time the GM rolls all your Character's Human Perception and Interrogation Checks privately, beeping once whenever it detects a lie, or whenever they desire after a failed roll. Beware of false positives and negatives. Requires a Cyberaudio Suite. Multiple installations of this option provide user no additional benefit.",
        cost: 100,
        humanity_loss: 3,
        body_location: [BodyLocation.Ear],
        install_location: "Mall",
        required_cyberware: "Cyberaudio Suite",
        max_installs: 1,
    }
];

const internal_cyberware = [
    {
        name: "AudioVox",
        type: CyberwareType.InternalBodyCyberware,
        description: "Vocal synthesizer. User adds +2 to their Acting skill and also adds +2 to their Play Instrument Skill while singing. Multiple installations of this option provide user no additional benefit.",
        cost: 500,
        humanity_loss: 3,
        body_location: [BodyLocation.Internal],
        install_location: "Clinic",
        max_installs: 1,
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Contraceptive Implant",
        type: CyberwareType.InternalBodyCyberware,
        description: "Implant prevents undesired pregnancy.",
        cost: 10,
        humanity_loss: 0,
        body_location: [BodyLocation.Internal],
        install_location: "Mall",
        max_installs: 1,
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Enhanced Antibodies",
        type: CyberwareType.InternalBodyCyberware,
        description: "After stabilization, the user heals a number of Hit Points equal to twice their BODY for each day they spend resting, doing only light activity, and spending the majority of the day taking it easy until returning to full HP, instead of at their typical rate.",
        cost: 500,
        humanity_loss: 2,
        body_location: [BodyLocation.Internal],
        install_location: "Mall",
        required_cyberware: "Internal Body Cyberware",
    },

    {
        name: "Cybersnake",
        type: CyberwareType.ExternalBodyCyberware,
        description: "Horrifying throat/esophagus-mounted tentacle weapon. A Very Heavy Melee Weapon (4d6, 1 ROF) that can be successfully concealed without a Check.",
        cost: 1000,
        humanity_loss: 14,

        body_location: [BodyLocation.Internal],
        install_location: "Hospital",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Gills",
        type: CyberwareType.ExternalBodyCyberware,
        description: "User can breathe underwater.",
        cost: 1000,
        humanity_loss: 7,
        body_location: [BodyLocation.Internal],
        install_location: "Hospital",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Grafted Muscle and Bone Lace",
        type: CyberwareType.InternalBodyCyberware,
        description: "User increases their BODY by 2. This increase in BODY changes a Character's HP and Death Save. Multiple installments stack. This cannot increase the user's BODY to 11 or higher.",
        cost: 1000,
        humanity_loss: 14,
        body_location: [BodyLocation.Internal],
        install_location: "Hospital",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Independent Air Supply",
        type: CyberwareType.InternalBodyCyberware,
        description: "Contains 30 minutes of air, before the user needs to refill the tank from the ambient air, which takes an hour. Alternatively, replacing an empty tank with a full one (50eb), takes an Action.",
        cost: 1000,
        humanity_loss: 2,
        body_location: [BodyLocation.Internal],
        install_location: "Hospital",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Midnight Lady™ Sexual Implant",
        type: CyberwareType.InternalBodyCyberware,
        description: "Be a Venus, be the fire. Be desire.",
        cost: 100,
        humanity_loss: 7,
        body_location: [BodyLocation.Internal],
        install_location: "Clinic",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Mr. Studd™ Sexual Implant",
        type: CyberwareType.InternalBodyCyberware,
        description: "All night, every night. And they'll never know.",
        cost: 100,
        humanity_loss: 7,
        body_location: [BodyLocation.Internal],
        install_location: "Clinic",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Nasal Filters",
        type: CyberwareType.InternalBodyCyberware,
        description: "User is immune to the effects of toxic gases, fumes, and all similar dangers that must be inhaled to affect the user. User can deactivate nasal filters, if desired, without an Action.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Internal],
        install_location: "Clinic",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Radar/Sonar Implant",
        type: CyberwareType.InternalBodyCyberware,
        description: "Constantly scans terrain within 50m/yds of user, including underwater, for new threats. Scan does not include anything behind cover, like the contents of a room behind a closed door. User receives a beep from the GM along with the direction of its source whenever a new moving object is detected on the scan.",
        cost: 1000,
        humanity_loss: 7,
        body_location: [BodyLocation.Internal],
        install_location: "Clinic",
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Toxin Binders",
        type: CyberwareType.InternalBodyCyberware,
        description: "User adds +2 to their Resist Torture/Drugs Skill. Multiple installations of this option provide user no additional benefit.",
        cost: 100,
        humanity_loss: 2,
        body_location: [BodyLocation.Internal],
        install_location: "Clinic",
        max_installs: 1,
        required_cyberware: "Internal Body Cyberware",
    },
    {
        name: "Vampyres",
        type: CyberwareType.InternalBodyCyberware,
        description: "Fangs implanted in the user's mouth. An Excellent Quality Light Melee Weapon (1d6 damage, 2 ROF) that can be successfully concealed without a Check. A Vial of Poison or Biotoxin (purchased separately, see Gear List on pg. 355) can be safely stored and concealed in a compartment in the roof of the mouth near the fangs without a Check. The contents of the stored vial can then be applied to the Vampyres silently anytime without an Action. Each application uses an entire vial and lasts for 30 minutes. Installation of Vampyres includes a complete rework of the user's mouth which prevents the possibility of poisoning yourself accidentally with your fangs halfway through a slice of pizza or due to a bad Check.",
        cost: 500,
        humanity_loss: 14,
        body_location: [BodyLocation.Internal],
        install_location: "Clinic",
        required_cyberware: "Internal Body Cyberware",
    }
]


let all_cyberware: Cyberware[] = []
// for (let item of placeholders) {
//     all_cyberware.push(new Cyberware({ ...item }))
// }
for (let item of fashionware) {
    all_cyberware.push(new Cyberware({ ...item }))
}
for (let item of neuralware) {
    all_cyberware.push(new Cyberware({ ...item }))
}
for (let item of cyberoptics) {
    all_cyberware.push(new Cyberware({ ...item }))
}
for (let item of internal_cyberware) {
    all_cyberware.push(new Cyberware({ ...item }))
}

export { all_cyberware as cyberware }