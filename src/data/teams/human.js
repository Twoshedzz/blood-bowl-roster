export const Human = {
  name: "Human",
  league: "Old World Classic",
  rerollCost: 50000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  hasTeamCaptain: true,
  image: "Human.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/9+",
      skills: "-",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S", "P"]
      }
    },
    {
      name: "Halfling",
      cost: 30000,
      max: 3,
      stats: "5/2/3+/4+/7+",
      skills: "Dodge, Right Stuff, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Catcher",
      cost: 75000,
      max: 2,
      stats: "8/3/3+/4+/8+",
      skills: "Catch, Dodge",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Thrower",
      cost: 75000,
      max: 2,
      stats: "6/3/3+/3+/9+",
      skills: "Pass, Sure Hands",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Blitzer",
      cost: 85000,
      max: 2,
      stats: "7/3/3+/4+/9+",
      skills: "Block, Tackle",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Ogre",
      cost: 140000,
      max: 1,
      stats: "5/5/4+/5+/10+",
      skills: "Bone Head, Loner (3+), Mighty Blow, Thick Skull, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Human-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ]
};
