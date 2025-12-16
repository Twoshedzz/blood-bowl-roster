export const Norse = {
  name: "Norse",
  league: "Chaos Clash or Old World Classic",
  rerollCost: 60000,
  image: "Norse.png",
  
  positions: [
    {
      name: "Raider",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/8+",
      skills: "Block, Drunkard, Thick Skull, Unsteady",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Boar",
      cost: 20000,
      max: 2,
      stats: "5/1/3+/-/6+",
      skills: "Dodge, No Ball, Pick-me-up, Stunty, Titchy",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Berserker",
      cost: 90000,
      max: 2,
      stats: "6/3/3+/5+/8+",
      skills: "Block, Frenzy, Jump Up",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Valkyrie",
      cost: 95000,
      max: 2,
      stats: "7/3/3+/3+/8+",
      skills: "Catch, Dauntless, Pass, Strip Ball",
      skillAccess: {
        primary: ["A", "G", "P"],
        secondary: ["S"]
      }
    },
    {
      name: "Ulfwerner",
      cost: 105000,
      max: 2,
      stats: "6/4/4+/6+/9+",
      skills: "Frenzy, Unsteady",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Yhetee",
      cost: 140000,
      max: 1,
      stats: "5/5/4+/6+/9+",
      skills: "Claws, Disturbing Presence, Frenzy, Loner (4+), Unchannelled Fury",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Norse-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};
