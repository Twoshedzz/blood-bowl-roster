export const Halfling = {
  name: "Halfling",
  league: "Halfling Thimble Cup or Woodland League",
  rerollCost: 60000,
  image: "Halflings.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 30000,
      max: 16,
      stats: "5/2/3+/4+/7+",
      skills: "Dodge, Right Stuff, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Hefty",
      cost: 50000,
      max: 2,
      stats: "5/2/3+/3+/8+",
      skills: "Dodge, Fend, Stunty",
      skillAccess: {
        primary: ["A", "P"],
        secondary: ["G", "S"]
      }
    },
    {
      name: "Catcher",
      cost: 55000,
      max: 2,
      stats: "5/2/3+/5+/7+",
      skills: "Catch, Dodge, Right Stuff, Sprint, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Treeman",
      cost: 120000,
      max: 2,
      stats: "2/6/5+/5+/11+",
      skills: "Mighty Blow (+1), Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate, Timmm-ber!",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/blood-bowl-halfling-team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};
