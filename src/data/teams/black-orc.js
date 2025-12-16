export const BlackOrc = {
  name: "Black Orc",
  league: "Badlands Brawl",
  rerollCost: 60000,
  image: "BlackOrcs.png",
  
  positions: [
    {
      name: "Goblin",
      cost: 45000,
      max: 16,
      stats: "6/2/3+/4+/8+",
      skills: "Dodge, Right Stuff, Stunty, Thick Skull",
      skillAccess: {
        primary: ["A", "D"],
        secondary: ["G", "P", "S"]
      }
    },
    {
      name: "Black Orc",
      cost: 90000,
      max: 6,
      stats: "4/4/4+/5+/10+",
      skills: "Brawler, Grab",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "D"]
      }
    },
    {
      name: "Troll",
      cost: 115000,
      max: 1,
      stats: "4/5/5+/5+/10+",
      skills: "Always Hungry, Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/etb-blood-bowl-black-orc-team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Hungry Troll", url: "https://hungrytrollminiatures.com/" }
  ]
};
