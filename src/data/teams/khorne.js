export const Khorne = {
  name: "Khorne",
  league: "Chaos Clash",
  rerollCost: 60000,
  image: "Khorne.png",
  
  positions: [
    {
      name: "Marauder",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/8+",
      skills: "Frenzy",
      skillAccess: {
        primary: ["G", "M"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Khorngor",
      cost: 70000,
      max: 2,
      stats: "6/3/3+/4+/9+",
      skills: "Horns, Juggernaut, Jump Up, Thick Skull",
      skillAccess: {
        primary: ["G", "M", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Bloodseeker",
      cost: 105000,
      max: 4,
      stats: "5/4/4+/6+/10+",
      skills: "Frenzy",
      skillAccess: {
        primary: ["G", "M", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Bloodspawn",
      cost: 160000,
      max: 1,
      stats: "5/5/4+/6+/9+",
      skills: "Claws, Frenzy, Loner (4+), Mighty Blow, Unchannelled Fury",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Khorne-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
