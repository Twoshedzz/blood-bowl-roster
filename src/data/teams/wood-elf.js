export const WoodElf = {
  name: "Wood Elf",
  league: "Elven Kingdoms League or Woodland League",
  rerollCost: 50000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "Woodelf.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 65000,
      max: 16,
      stats: "7/3/2+/3+/8+",
      skills: "-",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Thrower",
      cost: 85000,
      max: 2,
      stats: "7/3/2+/2+/8+",
      skills: "Pass, Safe Pair of Hands",
      skillAccess: {
        primary: ["A", "G", "P"],
        secondary: ["S"]
      }
    },
    {
      name: "Catcher",
      cost: 90000,
      max: 2,
      stats: "8/2/2+/3+/8+",
      skills: "Catch, Dodge, Sprint",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
      }
    },
    {
      name: "Wardancer",
      cost: 130000,
      max: 2,
      stats: "8/3/2+/3+/8+",
      skills: "Block, Dodge, Leap",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
      }
    },
    {
      name: "Treeman",
      cost: 120000,
      max: 1,
      stats: "2/6/5+/5+/11+",
      skills: "Loner (4+), Mighty Blow, Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Wood-Elf-Team-2022" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};
