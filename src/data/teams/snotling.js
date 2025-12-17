export const Snotling = {
  name: "Snotling",
  league: "Underworld Challenge",
  rerollCost: 70000,

  cheapBribes: true,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "Snotling.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 15000,
      max: 16,
      stats: "5/1/3+/4+/6+",
      skills: "Dodge, Insignificant, Right Stuff, Sidestep, Stunty, Titchy",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "M"]
      }
    },
    {
      name: "Hoppa",
      cost: 20000,
      max: 2,
      stats: "6/1/3+/4+/6+",
      skills: "Dodge, Pogo, Right Stuff, Sidestep, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "M"]
      }
    },
    {
      name: "Runna",
      cost: 20000,
      max: 2,
      stats: "6/1/3+/4+/6+",
      skills: "Dodge, Right Stuff, Sidestep, Sprint, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "M"]
      }
    },
    {
      name: "Flinga",
      cost: 30000,
      max: 2,
      stats: "5/1/3+/4+/6+",
      skills: "Bombardier, Dodge, Right Stuff, Secret Weapon, Sidestep, Stunty, Titchy",
      skillAccess: {
        primary: ["P"],
        secondary: ["A", "D", "G"]
      }
    },
    {
      name: "Pump Wagon",
      cost: 100000,
      max: 2,
      stats: "5/5/5+/6+/9+",
      skills: "Dirty Player, Juggernaut, Mighty Blow, Really Stupid, Stand Firm",
      skillAccess: {
        primary: ["D", "S"],
        secondary: ["A", "G"]
      }
    },
    {
      name: "Troll",
      cost: 115000,
      max: 2,
      stats: "4/5/5+/5+/10+",
      skills: "Always Hungry, Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Snotling-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
