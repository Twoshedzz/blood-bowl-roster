export const Dwarf = {
  name: "Dwarf",
  league: "Worlds Edge Superleague",
  rerollCost: 60000,

  cheapBribes: true,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "Dwarves.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 70000,
      max: 16,
      stats: "4/3/4+/5+/10+",
      skills: "Block, Defensive, Thick Skull",
      skillAccess: {
        primary: ["D", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Runner",
      cost: 80000,
      max: 2,
      stats: "6/3/3+/4+/9+",
      skills: "Sprint, Sure Hands, Thick Skull",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["S"]
      }
    },
    {
      name: "Blitzer",
      cost: 100000,
      max: 2,
      stats: "5/3/4+/4+/10+",
      skills: "Block, Diving Tackle, Tackle, Thick Skull",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["P"]
      }
    },
    {
      name: "Troll Slayer",
      cost: 95000,
      max: 2,
      stats: "5/3/4+/5+/9+",
      skills: "Block, Dauntless, Frenzy, Hatred (Troll), Thick Skull",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["D"]
      }
    },
    {
      name: "Deathroller",
      cost: 170000,
      max: 1,
      stats: "5/7/5+/-/11+",
      skills: "Break Tackle, Dirty Player, Juggernaut, Loner (4+), Mighty Blow, No Ball, Secret Weapon, Stand Firm",
      skillAccess: {
        primary: ["D", "S"],
        secondary: ["G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Dwarf-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};
