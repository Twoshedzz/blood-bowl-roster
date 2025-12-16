export const NecromanticHorror = {
  name: "Necromantic Horror",
  league: "Sylvannian Spotlight",
  rerollCost: 70000,
  image: "Necromantic.png",
  
  positions: [
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
      name: "Wraith",
      cost: 85000,
      max: 2,
      stats: "6/3/3+/-/9+",
      skills: "Block, Foul Appearance, No Hands, Regeneration, Sidestep",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Flesh Golem",
      cost: 110000,
      max: 2,
      stats: "4/4/4+/6+/10+",
      skills: "Regeneration, Stand Firm, Thick Skull, Unsteady",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A", "M"]
      }
    },
    {
      name: "Werewolf",
      cost: 120000,
      max: 2,
      stats: "8/3/3+/3+/9+",
      skills: "Claws, Frenzy, Regeneration",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["M", "S"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Necromantic-Horror-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
