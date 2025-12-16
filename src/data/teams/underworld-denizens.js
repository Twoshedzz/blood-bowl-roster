export const UnderworldDenizens = {
  name: "Underworld Denizens",
  league: "Underworld Challenge",
  rerollCost: 70000,
  image: "UnderworldDenizens.png",
  
  positions: [
    {
      name: "Goblin",
      cost: 40000,
      max: 16,
      stats: "6/2/3+/4+/8+",
      skills: "Dodge, Right Stuff, Stunty",
      skillAccess: {
        primary: ["A", "D", "M"],
        secondary: ["G", "P", "S"]
      }
    },
    {
      name: "Snotling",
      cost: 15000,
      max: 6,
      stats: "5/1/3+/4+/6+",
      skills: "Dodge, Insignificant, Right Stuff, Sidestep, Stunty, Titchy",
      skillAccess: {
        primary: ["A", "D", "M"],
        secondary: ["G"]
      }
    },
    {
      name: "Clanrat",
      cost: 50000,
      max: 3,
      stats: "7/3/3+/4+/8+",
      skills: "Animosity (Goblin)",
      skillAccess: {
        primary: ["D", "G", "M"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Thrower",
      cost: 80000,
      max: 1,
      stats: "7/3/3+/2+/8+",
      skills: "Animosity (Goblin), Pass, Sure Hands",
      skillAccess: {
        primary: ["G", "M", "P"],
        secondary: ["A", "D", "S"]
      }
    },
    {
      name: "Gutter",
      cost: 85000,
      max: 1,
      stats: "9/2/2+/4+/8+",
      skills: "Animosity (Goblin), Dodge, Stab",
      skillAccess: {
        primary: ["A", "D", "G", "M"],
        secondary: ["S"]
      }
    },
    {
      name: "Blitzer",
      cost: 90000,
      max: 1,
      stats: "8/3/3+/4+/9+",
      skills: "Animosity (Goblin), Block, Strip Ball",
      skillAccess: {
        primary: ["G", "M", "S"],
        secondary: ["A", "D"]
      }
    },
    {
      name: "Troll",
      cost: 115000,
      max: 1,
      stats: "4/5/5+/5+/10+",
      skills: "Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G", "P"]
      }
    },
    {
      name: "Rat Ogre",
      cost: 150000,
      max: 1,
      stats: "6/5/4+/6+/9+",
      skills: "Animal Savagery, Frenzy, Loner (4+), Mighty Blow, Prehensile Tail",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Greebo Games", url: "https://greebo-games.com/netherus-underworld/35785-netherus-underwrold-team-bundle.html" },
    { name: "Goblin Guild", url: "https://goblinguildminiatures.com/en/green-ratz/14-green-ratz-team-underworld.html" },
    { name: "Punga Miniatures", url: "https://pungaminiatures.com/underworld" }
  ]
};
