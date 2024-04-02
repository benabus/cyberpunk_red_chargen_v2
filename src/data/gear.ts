const gear: Record<string, {
    name: string,
    cost: number,
    description: string
}> = {
    "agent": {
        name: "Agent",
        cost: 100,
        description: `Self-adaptive-AI powered smartphone; that "learns" how best to fit your needs simply by interacting with you. While not a true AI, it is more than capable of replacing any need for a secretary. When you sit back and allow your Agent to manage your life, everything is easier, including making sure you have time to do what you need to do (crimes, killing people, getting away with it, and so forth) instead of going to the store to get something you forgot. There are many reasons why almost everyone has one. Things your Agent can do:
        • Make phone calls in voice or video and record them, forward them, or send them to voicemail, which pretty much only Agents actually end up listening to nowadays.
        • Surf the Data Pool.
        • .Scan the Data Pool to locate a known location and bring up directions.
        • Keep your schedule for you and act independently on events, like ordering a gift and having it delivered to the recipient.
        • Maintain a personality complete with name, voice, and virtual body. Some particularly lonely individuals reprogram their Agents to act as surrogate lovers or friends.
        • Suggest clothes for you to buy.
        • Record audio and video to the Agent's standard Memory Chip.
        • Link to your Cyberware to share data storage with them and the Agent's Memory Chip.
        • Link to most appliances in your living space.
        • Monitor your use of easily acquired resources (Cheap, Everyday, or Costly) and automatically reorder them when you get low at market price.
        • Recommend a future course of action based on your personal goals. AI may suggest unwise actions.
        In addition to all this, an Agent gives the user +2 to their Library Search Skill and +2 to their Wardrobe & Style Skill, but only if you wear the clothes your Agent suggests for you, which change every season. Multiple Agents don't multiply these bonuses. `

    },
    "airhypo": {
        name: "Airhypo",
        cost: 50,
        description: "Easy to use drug distribution platform which uses a quick burst of compressed air to force a drug through the skin. Allows user to use an Action to administer a single dose of a desired drug to a willing target, or try to make a Melee Weapon Attack to administer a single dose to an unwilling target on a hit instead of dealing damage. Reloading the Airhypo with a dose of your desired drug isn't an Action. (See pg. 357 to score some street drugs)."
    },
    "anti_smog_breathing_mask": {
        name: "Anti-Smog Breathing Mask",
        cost: 20,
        description: "Useful for filtering out toxins and smoke from the local environment. User is immune to the effects of toxic gasses, fumes, and all similar dangers that must be inhaled to affect the user."
    },
    "audio_recorder": {
        name: "Audio Recorder",
        cost: 100,
        description: "Device records up to 24 hours of audio before its output fills up a standard Memory Chip stored in the device. "
    },
    "auto_level_dampening_ear_protectors": {
        name: "Auto Level Dampening Ear Protectors",
        cost: 1000,
        description: "Compact ear protection. When worn, user is immune to deafness or other effects caused by dangerously loud noises, like those produced by a flashbang."
    },
    "binoculars": {
        name: "Binoculars",
        cost: 50,
        description: "You look through them. They double or triple the size of what you are seeing."
    },
    "braindance_viewer": {
        name: "Braindance Viewer",
        cost: 1000,
        description: "Allows the user to experience braindance content. Braindances are digital recordings of an experience which you view through the eyes of the actor. The experience includes all the subject's senses, and you feel every emotion felt, for better or worse."
    },
    "bug_detector": {
        name: "Bug Detector",
        cost: 500,
        description: "Device beeps when user is within 2m/yds of a tap, bug, or other listening device."
    },
    "carryall": {
        name: "Carryall",
        cost: 20,
        description: "Heavy ripstop nylon bags of varying sizes, from messenger to nearly man-sized duffel bags."
    },
    "chemical_analyzer": {
        name: "Chemical Analyzer",
        cost: 1000,
        description: "Can test substances as an Action to find their precise chemical composition, identifying most substances instantly from a wide database of samples."
    },
    "computer": {
        name: "Computer",
        cost: 50,
        description: "Laptop or desktop computer, used mostly for comfortable word processing and surfing the Data Pool."
    },
    "cryopump": {
        name: "Cryopump",
        cost: 5000,
        description: "A Cryopump is a briefcase-sized tool containing a body bag hooked up to a powerful pump. Once willing/unconscious targets have been placed into the bag and hooked up to the pump as an Action, the pump forces a hyper-cooled chemical fluid into the bag, draining one of the Cryopump's charges per target put in stasis (one per person, if the Cryopump can accept multiple people). While in stasis, targets are unconscious and no longer roll any Death Saves for up to a week, as long as they remain inside the bag and the bag has at least 1 HP. A Character in a cryopump bag is considered to be behind a piece of cover that has 15 HP. The bag's transparent top and gloves molded into the lining allow the target to undergo surgery and be stabilized while in stasis, which is much less dangerous to the patient. A standard Cryopump has only 1 charge and can only hold a single roughly humansized target. Refueling a Cryopump costs 50eb (Costly) per charge. A Character who is not a Medtech cannot operate a Cryopump."
    },
    "cryotank": {
        name: "Cryotank",
        cost: 5000,
        description: "A Cryotank is a human-sized container which can hold a fully grown adult. Assuming the Medtech succeeds at a DV13 Medical Tech Check, the Cryotank keeps 1 person in stasis as long as desired. While in the Cryotank, they are considered to be unconscious, but they heal at double the normal rate as long as they remain inside the tank and the tank has at least 1 HP. A Character in a Cryotank is considered to be behind a piece of cover that has 30 HP. A Character who is not a Medtech cannot operate a Cryotank."
    },
    "cyberdeck_excellent_quality": {
        name: "Cyberdeck (Excellent Quality)",
        cost: 1000,
        description: "A high-end modular platform that Programs and Hardware are installed on for the purpose of Netrunning. This cyberdeck has 9 slots to install Programs and Hardware. Requires Interface Plugs and Neural Link for a Netrunner to operate. See Netrunning Section on pg. 195."
    },
    "cyberdeck_poor_quality": {
        name: "Cyberdeck (Poor Quality)",
        cost: 100,
        description: "A cheap modular platform that Programs and Hardware are installed on for the purpose of Netrunning. This cyberdeck has 5 slots to install Programs and Hardware. Requires Interface Plugs and Neural Link for a Netrunner to operate. See Netrunning Section on pg. 195."
    },
    "cyberdeck_standard_quality": {
        name: "Cyberdeck (Standard Quality)",
        cost: 500,
        description: "Modular platform that Programs and Hardware are installed on for the purpose of Netrunning. This cyberdeck has 7 slots to install Programs and Hardware. Requires Interface Plugs and Neural Link for a Netrunner to operate. See Netrunning Section on pg. 195."
    },
    "disposable_cell_phone": {
        name: "Disposable Cell Phone",
        cost: 50,
        description: "There are still billions of the things around. A good choice for Fixers and other people who don't want to be tracked."
    },
    "drum_synthesizer": {
        name: "Drum Synthesizer",
        cost: 500,
        description: "Flat plastic pads of varying sizes, linked by cables to a central processor. Can simulate almost any kind of drum. Requires some type of amplification to be heard.
    },
    "duct_tape": {
        name: "Duct Tape",
        cost: 20,
        description: "Comes in many colors and optionally can glow in the dark. Glowing duct tape is often used to mark tunnels, dead drops, or caches. It glows in the dark even if there has been no light exposure."
    },
    "electric_guitar_or_another_instrument": {
        name: "Electric Guitar or another Instrument",
        cost: 500,
        description: "Use your imagination. But remember that you will need an amp to be heard with any electronic-based instrument."
    },
    "flashlight": {
        name: "Flashlight",
        cost: 20,
        description: "Rechargeable. 100m/yd beam, lasts up to 10 hours on a charge."
    },
    "food_stick": {
        name: "Food Stick",
        cost: 10,
        description: "Grainy, dried food bar that comes in a variety of (awful) flavors. One meal."
    },
    "glow_paint": {
        name: "Glow Paint",
        cost: 20,
        description: "Glow in the dark paint for marking locations and creating art. Comes in a spray can. Also good for tagging."
    },
    "glow_stick": {
        name: "Glow Stick",
        cost: 10,
        description: "Light tube to illuminate a 4m/yd area for up to 10 hours. One use only."
    },
    "grapple_gun": {
        name: "Grapple Gun",
        cost: 100,
        description: "When wielded in a hand, user as an Action can fire a rocket propelled grapple that will attach securely to any 'thick' cover up to 30m/yds away. Line can only support two times the user's body weight, and has 10 HP. The user negates the normal movement penalty for climbing when they climb this line, and can retract the line without an Action, including as they climb. When used as a grapple, user can't hold anything in the hand used to wield the grapple gun. Ineffective as a weapon, and cannot be used to make the Grab Action."
    },
    "handcuffs": {
        name: "Handcuffs",
        cost: 50,
        description: "Book 'em, Danno. Can be broken easily if your BODY is higher than 10."
    },
    "homing_tracer": {
        name: "Homing Tracer",
        cost: 500,
        description: "Device can follow a linked tracer up to 1-mile away. Comes with a free button sized linked tracer. Replacement linked tracers are 50eb."
    },
    "inflatable_bed_sleep_bag": {
        name: "Inflatable Bed & Sleep-bag",
        cost: 20,
        description: `It's a self-inflating air mattress than comes packed with a thin sleeping bag. The whole thing folds to a 6"x6" package for easy storage.`
    },
    "kibble_pack": {
        name: "Kibble Pack",
        cost: 10,
        description: "One foil package of dry, pet food-like cereal or wafers equivalent to a single meal. Usually identified by number rather than the fake appetizing label and description."
    },
    "linear_frame_beta": {
        name: "Linear Frame ß (Beta)",
        cost: 5000,
        description: `Powered exoskeleton, giving the user even more tremendous strength.
        • User increases their BODY to 14 while plugged into the frame. This cannot increase the user's BODY to 15 or higher. This increase in BODY does not increase the user's HP or change their Death Save.
        • Requires 2 installation of Interface Plugs to operate.`
    },
    "linear_frame_sigma": {
        name: "Linear Frame Σ (Sigma)",
        cost: 1000,
        description: `Powered exoskeleton, giving the user tremendous strength.
        • User increases their BODY to 12 while plugged into the frame. This cannot increase the user's BODY to 13 or higher. This increase in BODY does not increase the user's HP or change their Death Save.
        • Requires 1 installations of Interface Plugs to operate.`
    },
    "lock_picking_set": {
        name: "Lock Picking Set",
        cost: 20,
        description: "A small pouch of tools for cracking mechanical locks."
    },
    "medscanner": {
        name: "Medscanner",
        cost: 1000,
        description: "Scanner with external probes and contacts that diagnoses injury and illness, assisting user in medical emergencies not requiring Surgery. User adds +2 to their First Aid and Paramedic Skills. This doesn't stack with itself."
    },
    "medtech_bag": {
        name: "Medtech Bag",
        cost: 100,
        description: "Medical toolkit that includes everything from dermal staplers to spray skin applicators to sterile scalpels. All you need to save lives using your skills and training."
    },
    "memory_chips": {
        name: "Memory Chips",
        cost: 10,
        description: "Thin wafers of doped plastic that store information in all forms. Some of these are larger than others."
    },
    "mre": {
        name: "MRE",
        cost: 10,
        description: "Self-heating plastic and foil meal bag. Add water, snap the tab on the top, and in 2 minutes you have something that resembles a single hot, nourishing meal."
    },
    "personal_carepak": {
        name: "Personal CarePak",
        cost: 20,
        description: "Toothpaste-loaded toothbrush, all body wet-wipes, depilatory paste, comb, etc."
    },
    "pocket_amplifier": {
        name: "Pocket Amplifier",
        cost: 50,
        description: "About the size of a large book, this rechargeable amplifier delivers sound up to 100m/yd for up to 6 hours. Can support two instruments."
    },
    "radar_detector": {
        name: "Radar Detector",
        cost: 500,
        description: "Device beeps if an active radar beam is present within 100m/yds."
    },
    "radio_communicator": {
        name: "Radio Communicator",
        cost: 100,
        description: "Earpiece allowing user to communicate via radio, 1-mile range."
    },
    "radio_scanner_music_player": {
        name: "Radio Scanner/ Music Player",
        cost: 50,
        description: "Music player can link to the Data Pool to listen to the hottest music, or play directly from a Memory Chip. User can also scan all radio bands within a mile that are currently being used and tune into them, though some channels might require a Descrambler to understand."
    },
    "road_flare": {
        name: "Road Flare",
        cost: 10,
        description: "Lights an area of 100m/yards for 1 hour. Different colors. One use."
    },
    "rope_60m_yds": {
        name: "Rope (60m/yds)",
        cost: 20,
        description: "Nylon rope. Can come in colors if desired. Holds up to 800lbs (360kg)."
    },
    "scrambler_descrambler": {
        name: "Scrambler/Descrambler",
        cost: 500,
        description: "Allows user to scramble outgoing communications so they cannot be understood without a descrambler, which is also included at no extra charge."
    },
    "smart_glasses": {
        name: "Smart Glasses",
        cost: 500,
        description: "Contains two option slots for Cybereye options. When worn, Smart Glasses give the user access to the benefits of these options. When cybereye options are installed into the glasses, they always count as if they were paired, and it costs the same as installing the option once in a cybereye. You can only wear a single pair at a time. Enthusiasts often replace the frames of their Smart Glasses with nicer ones, as they aren't the prettiest out of the box."
    },
    "tech_bag": {
        name: "Tech Bag",
        cost: 500,
        description: "Small bag of tools for fixing electronics and machines. Includes a Techtool, electrical parts like tape and wire wraps, asst. screws and bolts, plug in modules for repairs, heat torch, 2 small prybars, and hammer."
    },
    "techscanner": {
        name: "Techscanner",
        cost: 1000,
        description: "Scanner diagnoses a wide variety of machinery and electronics, assisting the user in repairs, or other technical work. User adds +2 to their Basic Tech, Cybertech, Land Vehicle Tech, Sea Vehicle Tech, Air Vehicle Tech, Electronics/Security Tech, and Weaponstech Skills. This doesn't stack with itself."
    },
    "techtool": {
        name: "Techtool",
        cost: 100,
        description: "An all-in-one tool. The various parts, including a small utility blade, pliers, various screwdrivers, files, and clippers all fold up into a compact and easy to carry package."
    },
    "tent_camping_equipment": {
        name: "Tent & Camping Equipment",
        cost: 50,
        description: "Small one-person tube tent with plastic stakes, one self-heating, rechargeable pot to boil water (takes 5 min to recharge, lasts 2 hours) and a cheap metal spork that couldn't hurt a fly."
    },
    "vial_of_biotoxin": {
        name: "Vial of Biotoxin",
        cost: 500,
        description: "An entire vial of biotoxin can be smeared on any Light Melee Weapon as an Action. For the next 30 minutes after application, instead of dealing the weapon's typical damage, anyone meat hit by the biotoxin-coated Light Melee Weapon must instead attempt to beat a DV15 Resist Torture/Drugs Check. Anyone who fails is dealt 3d6 damage directly to their HP. Their armor isn't ablated because it wasn't interacted with."
    },
    "vial_of_poison": {
        name: "Vial of Poison",
        cost: 100,
        description: "An entire vial of poison can be smeared on any Light Melee Weapon as an Action. For the next 30 minutes after application, instead of dealing the weapon's typical damage, anyone meat hit by the poisoned Light Melee Weapon must instead attempt to beat a DV13 Resist Torture/Drugs Check. Anyone who fails is dealt 2d6 damage directly to their HP. Their armor isn't ablated because it wasn't interacted with."
    },
    "video_camera": {
        name: "Video Camera",
        cost: 100,
        description: "When held in a hand, user can record up to 12 hours of video and audio before its output fills up a standard Memory Chip stored in the device."
    },
    "virtuality_goggles": {
        name: "Virtuality Goggles",
        cost: 100,
        description: "Headset that projects cyberspace imagery over your view of the world around you. Highly advised for Netrunners. See Netrunning Section on pg. 195 for more info."
    },
};
