export const ChaosChosen = {
  name: "Chaos Chosen",
  league: "Chaos Clash",
  rerollCost: 50000,

  cheapBribes: false,
  cheapMasterChef: false,
  hasApothecary: true,
  image: "ChaosChosen.png",
  
  positions: [
    {
      name: "Beastman",
      cost: 55000,
      max: 16,
      stats: "6/3/3+/3+/9+",
      skills: "Horns, Thick Skull",
      skillAccess: {
        primary: ["G", "M"],
        secondary: ["A", "D", "P", "S"]
      }
    },
    {
      name: "Chosen",
      cost: 100000,
      max: 4,
      stats: "5/4/3+/5+/10+",
      skills: "Arm Bar",
      skillAccess: {
        primary: ["G", "M", "S"],
        secondary: ["A", "D"]
      }
    },
    {
      name: "Troll",
      cost: 115000,
      max: 1,
      stats: "4/5/5+/5+/10+",
      skills: "Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G", "P"]
      }
    },
    {
      name: "Ogre",
      cost: 140000,
      max: 1,
      stats: "5/5/4+/5+/10+",
      skills: "Bone Head, Loner (4+), Mighty Blow, Thick Skull, Throw Team-mate",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G"]
      }
    },
    {
      name: "Minotaur",
      cost: 150000,
      max: 1,
      stats: "5/5/4+/6+/9+",
      skills: "Frenzy, Horns, Loner (4+), Mighty Blow, Thick Skull, Unchannelled Fury",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Chaos-Chosen-Team-2022" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ]
};
