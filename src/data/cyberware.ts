

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
    constructor(
        public name: string,
        public type: CyberwareType,
        public description: string,
        public cost: number,
        public humanity_loss: number,
        public body_location: string[],
        public install_location: string,
        public slots_required: number,
        public slots_available: number,
        public required_cyberware: string,
        public slotted_options: Cyberware[],
        public must_be_paired: boolean,
        public can_install_in_meat: boolean
    ) { }
    getHumanityLoss(): number {
        let humanityLoss = this.humanity_loss;
        humanityLoss += this.slotted_options.reduce((acc, option) => {
            return acc + option.getHumanityLoss();
        }, 0);
        return humanityLoss
    }
}



const fashionware = [
    {
        name: "Biomonitor",
        type: CyberwareType.Fashionware,
        description: "Subdermal implant which generates a constant LED readout of pulse, temperature, respiration, blood sugar, etc. You can link your Biomonitor to your Agent to allow it to track your wellness.",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Chemskin",
        type: CyberwareType.Fashionware,
        description: "Dyes and pigments infused into the skin to permanently change its hue, the applications of which can range from hiding blemishes to the desire for neon-green skin. Pigments can optionally be temperature-sensitive or reactant to hormone changes in the body. A user with Chemskin and Techhair adds +2 to their Personal Grooming Skill for having both. (This bonus only applies once)",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "EMP Threading",
        type: CyberwareType.Fashionware,
        description: "Popularized by the media sensation UR, these thin silver lines run in circuit-like patterns across the body. Many people believe they act as a 'Faraday cage' to protect you from radiation and EMP effects but so far there’s no scientific backing to these claims. But they sure do look cool. Most people wear EMP Threading as a fashion statement.",
        cost: 10,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Light Tattoo",
        type: CyberwareType.Fashionware,
        description: "Subdermal patches store light and project colored tattoos under the skin. The larger the piece, the more installations of this fashionware you need to complete it. A user with a three or more Light Tattoo installations adds +2 to their Wardrobe & Style Skill. (This bonus only applies once.)",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Shift Tacts",
        type: CyberwareType.Fashionware,
        description: "Color-changing lenses implanted into the eye. Several patterns are also available. Lenses can optionally be temperature-sensitive or reactant to hormone changes in the body. Only one choice of color and pattern can be made, but the user can deactivate the color change at any time desired without an Action.",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Skinwatch",
        type: CyberwareType.Fashionware,
        description: "Subdermal implant generates a constant LED readout of the current time and date visible through the skin.",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Techhair",
        type: CyberwareType.Fashionware,
        description: "Color-light-emitting artificial hair. Hair can optionally be temperature sensitive, motorized to extend/retract, or reactant to hormone changes in the body. A user with Chemskin and Techhair adds +2 to their Personal Grooming Skill for having both. (This bonus only applies once.)",
        cost: 100,
        humanity_loss: 0,
        body_location: [BodyLocation.Fashionware],
        install_location: "Mall",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
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
        required_cyberware: "",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: true
    },
    {
        name: "Braindance Recorder",
        type: CyberwareType.Neuralware,
        description: "Neuralware Option. Share your story from your point of view! Records braindance content to a standard Memory Chip or a linked Agent. Braindances can be viewed using a Braindance Viewer. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        slots_required: 1,
        slots_available: 0,
        required_cyberware: "Neural Link",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Chipware Socket",
        type: CyberwareType.Neuralware,
        description: "Neuralware Option. A single socket installed in the back of the neck that allows quick installation of a single piece of Chipware, of which there are many varieties. Installing or uninstalling a single piece of Chipware from a Chipware Socket is an Action. The first time you install a piece of Chipware you've never used before, you always accrue Humanity Loss. Re-installing Chipware you've already used doesn't do this. Chipware does not take up a Neural Link Option Slot. Multiple sockets may be installed, but each must be paid for individually. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        slots_required: 1,
        slots_available: 1, // Chipware doesn't take up Neural Link Option Slot
        required_cyberware: "Neural Link",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Interface Plugs",
        type: CyberwareType.Neuralware,
        description: "Neuralware Option. Plugs in the wrist or head that allow user to jack into and make use of Smartguns, Cyberdecks, heavy machinery, and drive vehicles with no hands! Multiple installations allow user to be plugged into multiple things at the same time. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        slots_required: 1,
        slots_available: 0, // Chipware doesn't take up Neural Link Option Slot
        required_cyberware: "Neural Link",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Kerenzikov",
        type: CyberwareType.Speedware,
        description: "Neuralware Option. Always-on Speedware that provides consistently improved reaction time. User adds +2 to their Initiative Rolls. Only a single piece of Speedware can be installed into a user at a time. Requires Neural Link.",
        cost: 500,
        humanity_loss: 14,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        slots_required: 1,
        slots_available: 0, // Chipware doesn't take up Neural Link Option Slot
        required_cyberware: "Neural Link",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Sandevistan",
        type: CyberwareType.Speedware,
        description: "Neuralware Option. Speedware that provides short boosts of highly improved reaction time. When activated as an Action, the user adds +3 to any Initiative Roll they make in the next minute, after which Sandevistan cannot be activated again for an hour. Only a single piece of Speedware can be installed into a user at a time. Requires Neural Link.",
        cost: 500,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "Clinic",
        slots_required: 1,
        slots_available: 0, // Chipware doesn't take up Neural Link Option Slot
        required_cyberware: "Neural Link",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
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
        slots_required: 1,
        slots_available: 0, // Each Chipware option takes up its own slot
        required_cyberware: "Chipware Socket",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Memory Chip",
        type: CyberwareType.Chipware,
        description: "The standard for data storage. While installed into a Chipware socket, the user's cyberware can store data on it or access data stored on it. Requires Chipware Socket.",
        cost: 10,
        humanity_loss: 0,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        slots_required: 1,
        slots_available: 0, // Each Chipware option takes up its own slot
        required_cyberware: "Chipware Socket",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    },
    {
        name: "Olfactory Boost",
        type: CyberwareType.Chipware,
        description: "While installed into a Chipware Socket, the user's sense of smell is boosted, allowing them to use the Tracking Skill to track scent in addition to visual clues. Requires Chipware Socket.",
        cost: 100,
        humanity_loss: 7,
        body_location: [BodyLocation.Brain],
        install_location: "N/A",
        slots_required: 1,
        slots_available: 0, // Each Chipware option takes up its own slot
        required_cyberware: "Chipware Socket",
        slotted_options: [],
        must_be_paired: false,
        can_install_in_meat: false
    }
];


let all_cyberware: Cyberware[] = []
for (let item of fashionware) {
    all_cyberware.push(new Cyberware(item.name, item.type, item.description, item.cost, item.humanity_loss, item.body_location, item.install_location, item.slots_required, item.slots_available, item.required_cyberware, item.slotted_options, item.must_be_paired, item.can_install_in_meat))
}
for (let item of neuralware) {
    all_cyberware.push(new Cyberware(item.name, item.type, item.description, item.cost, item.humanity_loss, item.body_location, item.install_location, item.slots_required, item.slots_available, item.required_cyberware, item.slotted_options, item.must_be_paired, item.can_install_in_meat))
}

export { all_cyberware as cyberware }