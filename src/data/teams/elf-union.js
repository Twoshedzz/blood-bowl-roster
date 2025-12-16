export const ElfUnion = {
  name: "Elf Union",
  league: "Elven Kingdoms League",
  rerollCost: 50000,
  image: "ElvenUnion.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 65000,
      max: 16,
      stats: "6/3/2+/3+/8+",
      skills: "Fumblerooski",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Thrower",
      cost: 75000,
      max: 2,
      stats: "6/3/2+/2+/8+",
      skills: "Hail Mary Pass, Pass",
      skillAccess: {
        primary: ["A", "G", "P"],
        secondary: ["S"]
      }
    },
    {
      name: "Catcher",
      cost: 100000,
      max: 2,
      stats: "8/3/2+/4+/8+",
      skills: "Catch, Diving Catch, Nerves of Steel",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Blitzer",
      cost: 115000,
      max: 2,
      stats: "7/3/2+/3+/9+",
      skills: "Block, Sidestep",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Elven-Union-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
