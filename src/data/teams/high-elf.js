export const HighElf = {
  name: "High Elf",
  league: "Elven Kingdoms League",
  rerollCost: 50000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "HighElf.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 65000,
      max: 16,
      stats: "6/3/2+/3+/9+",
      skills: "-",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
      }
    },
    {
      name: "Thrower",
      cost: 100000,
      max: 2,
      stats: "6/3/2+/2+/9+",
      skills: "Cloud Burster, Pass, Safe Pass",
      skillAccess: {
        primary: ["A", "G", "P"],
        secondary: ["S"]
      }
    },
    {
      name: "Catcher",
      cost: 90000,
      max: 4,
      stats: "8/3/2+/3+/8+",
      skills: "Catch",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Blitzer",
      cost: 100000,
      max: 2,
      stats: "7/3/2+/4+/9+",
      skills: "Block",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-High-Elf-Team" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
