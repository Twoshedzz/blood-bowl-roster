export const Skaven = {
  name: "Skaven",
  league: "Underworld Challenge",
  rerollCost: 50000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "Skaven.png",
  
  positions: [
    {
      name: "Clanrat",
      cost: 50000,
      max: 16,
      stats: "7/3/3+/4+/8+",
      skills: "-",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "M", "S"]
      }
    },
    {
      name: "Thrower",
      cost: 80000,
      max: 2,
      stats: "7/3/3+/2+/8+",
      skills: "Pass, Sure Hands",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["A", "M", "S"]
      }
    },
    {
      name: "Gutter",
      cost: 85000,
      max: 2,
      stats: "9/2/2+/4+/8+",
      skills: "Dodge, Stab",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["M", "S"]
      }
    },
    {
      name: "Blitzer",
      cost: 90000,
      max: 2,
      stats: "8/3/3+/4+/9+",
      skills: "Block, Strip Ball",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "M", "P"]
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
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Skaven-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ]
};
