export const Lizardmen = {
  name: "Lizardmen",
  league: "Lustrian Superleague",
  rerollCost: 70000,
  image: "Lizardmen.png",
  
  positions: [
    {
      name: "Skink",
      cost: 60000,
      max: 16,
      stats: "8/2/3+/4+/8+",
      skills: "Dodge, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "P"]
      }
    },
    {
      name: "Chameleon",
      cost: 70000,
      max: 2,
      stats: "7/2/3+/3+/8+",
      skills: "Dodge, On The Ball, Shadowing, Stunty",
      skillAccess: {
        primary: ["A", "P"],
        secondary: ["D", "G"]
      }
    },
    {
      name: "Saurus",
      cost: 90000,
      max: 6,
      stats: "6/4/5+/6+/10+",
      skills: "Juggernaut, Unsteady",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Krox",
      cost: 140000,
      max: 1,
      stats: "6/5/5+/6+/10+",
      skills: "Bone Head, Loner (4+), Mighty Blow, Prehensile Tail, Thick Skull",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Lizardmen-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ]
};
