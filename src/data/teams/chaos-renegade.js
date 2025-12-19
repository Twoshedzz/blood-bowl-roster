export const ChaosRenegade = {
  name: "Chaos Renegades",
  league: "Chaos Clash",
  rerollCost: 70000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "ChaosRenegade.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/9+",
      skills: "Animosity (all)",
      skillAccess: {
        primary: ["D", "G", "M"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Goblin",
      cost: 40000,
      max: 1,
      stats: "3/2/3+/4+/8+",
      skills: "Animosity (all), Dodge, Right Stuff, Stunty",
      skillAccess: {
        primary: ["A", "D", "M"],
        secondary: ["G", "P"]
      }
    },
    {
      name: "Orc",
      cost: 50000,
      max: 1,
      stats: "5/3/3+/4+/10+",
      skills: "Animosity (all)",
      skillAccess: {
        primary: ["D", "G", "M"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Skaven",
      cost: 50000,
      max: 1,
      stats: "7/3/3+/4+/8+",
      skills: "Animosity (all)",
      skillAccess: {
        primary: ["D", "G", "M"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "DarkElf",
      cost: 65000,
      max: 1,
      stats: "6/3/2+/3+/9+",
      skills: "Animosity (all)",
      skillAccess: {
        primary: ["A", "D", "G", "M"],
        secondary: ["S"]
      }
    },
    {
      name: "Thrower",
      cost: 75000,
      max: 1,
      stats: "6/3/3+/3+/9+",
      skills: "Animosity (all), Pass, Sure Hands",
      skillAccess: {
        primary: ["D", "G", "M", "P"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Troll",
      cost: 115000,
      max: 1,
      stats: "4/5/5+/5+/10+",
      skills: "Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P", "M"]
      }
    },
    {
      name: "Ogre",
      cost: 140000,
      max: 1,
      stats: "5/5/4+/5+/10+",
      skills: "Bone Head, Loner (4+), Thick Skull, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "M"]
      }
    },
    {
      name: "Minotaur",
      cost: 150000,
      max: 1,
      stats: "5/5/4+/6+/9+",
      skills: "Frenzy, Horns, Loner (4+), Mighty Blow, Thick Skull, Unchannelled Fury",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "M"]
      }
    },
    {
      name: "RatOgre",
      cost: 150000,
      max: 1,
      stats: "6/5/4+/6+/9+",
      skills: "Animal Savagery, Frenzy, Loner (4+), Mighty Blow, Prehensile Tail",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "M"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};
