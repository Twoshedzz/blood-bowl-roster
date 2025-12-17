export const DarkElf = {
  name: "Dark Elf",
  league: "Elven Kingdoms League",
  rerollCost: 50000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "DarkElves.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 65000,
      max: 16,
      stats: "6/3/2+/3+/9+",
      skills: "-",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["D", "S"]
      }
    },
    {
      name: "Runner",
      cost: 80000,
      max: 2,
      stats: "7/3/2+/3+/8+",
      skills: "Dump-Off, Punt",
      skillAccess: {
        primary: ["A", "G", "P"],
        secondary: ["D", "S"]
      }
    },
    {
      name: "Assassin",
      cost: 90000,
      max: 2,
      stats: "7/3/2+/4+/8+",
      skills: "Hit and Run, Shadowing, Stab",
      skillAccess: {
        primary: ["A", "D"],
        secondary: ["G", "S"]
      }
    },
    {
      name: "Blitzer",
      cost: 105000,
      max: 2,
      stats: "7/3/2+/3+/9+",
      skills: "Block",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["D", "P", "S"]
      }
    },
    {
      name: "Witch Elf",
      cost: 110000,
      max: 2,
      stats: "7/3/2+/4+/8+",
      skills: "Dodge, Frenzy, Jump Up",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["D", "S"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Dark-Elf-Team-2023" },
    { name: "Fireforge Games", url: "https://fireforge-games.com/" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
