export const Orc = {
  name: "Orc",
  league: "Badlands Brawl",
  rerollCost: 60000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  hasTeamCaptain: true,
  image: "Orcs.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 50000,
      max: 16,
      stats: "5/3/3+/4+/10+",
      skills: "-",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Goblin",
      cost: 40000,
      max: 4,
      stats: "6/2/3+/3+/8+",
      skills: "Dodge, Right Stuff, Stunty",
      skillAccess: {
        primary: ["A", "D"],
        secondary: ["G", "P", "S"]
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
      stats: "6/3/3+/4+/10+",
      skills: "Block, Break Tackle",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "P"]
      }
    },
    {
      name: "Big Un",
      cost: 95000,
      max: 2,
      stats: "5/4/4+/6+/10+",
      skills: "Mighty Blow, Taunt, Thick Skull, Unsteady",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Troll",
      cost: 115000,
      max: 1,
      stats: "4/5/5+/5+/10+",
      skills: "Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Orc-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ]
};
