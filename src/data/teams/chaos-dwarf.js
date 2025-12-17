export const ChaosDwarf = {
  name: "Chaos Dwarf",
  league: "Badlands Brawl or Chaos Clash",
  rerollCost: 70000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "ChaosDwarfs.png",
  
  positions: [
    {
      name: "Hobgoblin",
      cost: 40000,
      max: 16,
      stats: "6/3/3+/4+/8+",
      skills: "-",
      skillAccess: {
        primary: ["D"],
        secondary: ["A", "G", "S"]
      }
    },
    {
      name: "Stabba",
      cost: 60000,
      max: 2,
      stats: "6/3/3+/5+/8+",
      skills: "Shadowing, Stab",
      skillAccess: {
        primary: ["D", "G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Blocker",
      cost: 70000,
      max: 4,
      stats: "4/3/4+/6+/10+",
      skills: "Block, Iron Hard Skin, Thick Skull",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "D", "M"]
      }
    },
    {
      name: "Flamer",
      cost: 80000,
      max: 2,
      stats: "5/3/4+/6+/10+",
      skills: "Brawler, Breathe Fire, Disturbing Presence, Thick Skull",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "D", "M"]
      }
    },
    {
      name: "Bull Centaur",
      cost: 130000,
      max: 2,
      stats: "6/4/4+/6+/10+",
      skills: "Sprint, Sure Feet, Thick Skull, Unsteady",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "D", "M"]
      }
    },
    {
      name: "Minotaur",
      cost: 150000,
      max: 1,
      stats: "5/5/4+/6+/9+",
      skills: "Frenzy, Horns, Loner (4+), Mighty Blow, Thick Skull, Unchannelled Fury",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Chaos-Dwarf-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Hungry Troll", url: "https://hungrytrollminiatures.com/" }
  ]
};
