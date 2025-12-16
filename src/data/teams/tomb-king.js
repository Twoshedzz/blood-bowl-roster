export const TombKing = {
  name: "Tomb King",
  league: "Sylvannian Spotlight",
  rerollCost: 60000,
  image: "Tombkings.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 40000,
      max: 16,
      stats: "5/3/4+/6+/8+",
      skills: "Regeneration, Thick Skull",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "D", "S"]
      }
    },
    {
      name: "Thrower",
      cost: 65000,
      max: 2,
      stats: "6/3/4+/3+/9+",
      skills: "Pass, Regeneration, Sure Hands, Thick Skull",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["A", "D", "S"]
      }
    },
    {
      name: "Blitzer",
      cost: 85000,
      max: 2,
      stats: "6/3/4+/5+/9+",
      skills: "Block, Regeneration, Thick Skull",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "D"]
      }
    },
    {
      name: "Tomb Guardian",
      cost: 115000,
      max: 4,
      stats: "4/5/5+/6+/10+",
      skills: "Brawler, Decay, Regeneration",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Khemri-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
