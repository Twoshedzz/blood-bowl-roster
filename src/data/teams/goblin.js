export const Goblin = {
  name: "Goblin",
  league: "Badlands Brawl or Underworld Challenge",
  rerollCost: 60000,

  cheapBribes: true,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "Goblins.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 40000,
      max: 16,
      stats: "6/2/3+/4+/8+",
      skills: "Dodge, Right Stuff, Stunty",
      skillAccess: {
        primary: ["A", "D"],
        secondary: ["G", "P", "S"]
      }
    },
    {
      name: "Loony",
      cost: 40000,
      max: 1,
      stats: "6/2/3+/-/8+",
      skills: "Chainsaw, No Ball, Secret Weapon, Stunty",
      skillAccess: {
        primary: ["D"],
        secondary: ["A", "G", "S"]
      }
    },
    {
      name: "Bomma",
      cost: 45000,
      max: 1,
      stats: "6/2/3+/4+/8+",
      skills: "Bombardier, Dodge, Secret Weapon, Stunty",
      skillAccess: {
        primary: ["D", "P"],
        secondary: ["A", "G", "S"]
      }
    },
    {
      name: "Ooligan",
      cost: 60000,
      max: 1,
      stats: "6/2/3+/5+/8+",
      skills: "Dirty Player, Disturbing Presence, Dodge, Right Stuff, Stunty, Taunt",
      skillAccess: {
        primary: ["A", "D"],
        secondary: ["G", "S"]
      }
    },
    {
      name: "Doom Diver",
      cost: 65000,
      max: 1,
      stats: "6/2/3+/6+/8+",
      skills: "Dodge, Right Stuff, Stunty, Swoop",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Fanatic",
      cost: 70000,
      max: 1,
      stats: "3/7/3+/-/8+",
      skills: "Ball & Chain, No Ball, Secret Weapon, Stunty",
      skillAccess: {
        primary: ["D", "S"],
        secondary: ["A", "G"]
      }
    },
    {
      name: "Pogoer",
      cost: 75000,
      max: 1,
      stats: "7/2/3+/4+/8+",
      skills: "Dodge, Pogo Stick, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Troll",
      cost: 115000,
      max: 2,
      stats: "4/5/5+/5+/10+",
      skills: "Always Hungry, Mighty Blow (+1), Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/etb-blood-bowl-goblin-team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ]
};
