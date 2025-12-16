export const Amazon = {
  name: "Amazon",
  league: "Lustrian Superleague",
  rerollCost: 60000,
  image: "Amazon.png",
  
  positions: [
    {
      name: "Lino",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/8+",
      skills: "Dodge",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Thrower",
      cost: 80000,
      max: 2,
      stats: "6/3/3+/3+/8+",
      skills: "Dodge, On the Ball, Pass, Safe Pass",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Blitzer",
      cost: 90000,
      max: 2,
      stats: "7/3/3+/4+/8+",
      skills: "Dodge, Hit and Run, Jump Up",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Blocker",
      cost: 110000,
      max: 2,
      stats: "6/4/3+/4+/9+",
      skills: "Defensive, Dodge",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/fr-FR/blood-bowl-amazon-team-2022" },
    { name: "Fireforge Games", url: "https://fireforge-games.com/fantasy-football/253-amazon-smashers.html" },
    { name: "Greebo Games", url: "https://greebo-games.com/karimat-amazons/35452-karimat-team-bundle.html" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/product/amazon-team-16-players/" }
  ]
};
