export const ShamblingUndead = {
  name: "Shambling Undead",
  league: "Sylvanian Spotlight",
  rerollCost: 70000,
  image: "ShamblingUndead.png",
  
  positions: [
    {
      name: "Skeleton",
      cost: 40000,
      max: 16,
      stats: "5/3/4+/6+/8+",
      skills: "Regeneration, Thick Skull",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Zombie",
      cost: 40000,
      max: 16,
      stats: "4/3/4+/6+/9+",
      skills: "Eye Gouge, Regeneration, Unsteady",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "D", "S"]
      }
    },
    {
      name: "Ghoul",
      cost: 75000,
      max: 2,
      stats: "7/3/3+/3+/8+",
      skills: "Dodge, Regeneration",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
      }
    },
    {
      name: "Wight",
      cost: 95000,
      max: 2,
      stats: "6/3/3+/5+/9+",
      skills: "Block, Regeneration, Tackle, Thick Skull",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "P"]
      }
    },
    {
      name: "Mummy",
      cost: 125000,
      max: 2,
      stats: "3/5/5+/6+/10+",
      skills: "Mighty Blow, Regeneration",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Shambling-Undead-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
