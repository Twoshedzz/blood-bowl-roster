export const Vampire = {
  name: "Vampire",
  league: "Sylvannian Spotlight",
  rerollCost: 60000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: false,
  image: "Vampire.png",
  
  positions: [
    {
      name: "Thrall",
      cost: 40000,
      max: 16,
      stats: "6/3/3+/4+/8+",
      skills: "-",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Runner",
      cost: 100000,
      max: 2,
      stats: "8/3/2+/3+/8+",
      skills: "Bloodlust (2+), Hypnotic Gaze, Regeneration",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["P", "S"]
      }
    },
    {
      name: "Thrower",
      cost: 110000,
      max: 2,
      stats: "6/4/2+/2+/9+",
      skills: "Bloodlust (2+), Hypnotic Gaze, Pass, Regeneration",
      skillAccess: {
        primary: ["G", "P", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Blitzer",
      cost: 110000,
      max: 2,
      stats: "6/4/2+/4+/9+",
      skills: "Bloodlust (3+), Hypnotic Gaze, Juggernaut, Regeneration",
      skillAccess: {
        primary: ["A", "G", "S"],
        secondary: []
      }
    },
    {
      name: "Vargheist",
      cost: 150000,
      max: 1,
      stats: "5/5/4+/6+/10+",
      skills: "Bloodlust (3+), Claws, Frenzy, Loner (4+), Regeneration",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Vampire-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
