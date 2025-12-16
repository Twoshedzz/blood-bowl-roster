export const ImperialNobility = {
  name: "Imperial Nobility",
  league: "Old World Classic",
  rerollCost: 60000,
  image: "ImperialNobility.png",
  
  positions: [
    {
      name: "Retainer",
      cost: 45000,
      max: 16,
      stats: "6/3/3+/4+/8+",
      skills: "Fend",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Thrower",
      cost: 75000,
      max: 2,
      stats: "6/3/3+/2+/9+",
      skills: "Give and Go, Pass, Pro",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Bodyguard",
      cost: 85000,
      max: 4,
      stats: "5/3/3+/4+/9+",
      skills: "Stand Firm, Wrestle",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Blitzer",
      cost: 90000,
      max: 2,
      stats: "7/3/3+/4+/9+",
      skills: "Block, Catch, Pro",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
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
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Imperial-Nobility-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
