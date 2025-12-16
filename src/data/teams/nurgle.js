export const Nurgle = {
  name: "Nurgle",
  league: "Chaos Clash",
  rerollCost: 60000,
  image: "Nurgle.png",
  
  positions: [
    {
      name: "Rotter",
      cost: 40000,
      max: 16,
      stats: "5/3/4+/6+/9+",
      skills: "Decay, Plague Ridden",
      skillAccess: {
        primary: ["G", "M"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Pestigor",
      cost: 70000,
      max: 2,
      stats: "6/3/3+/4+/9+",
      skills: "Horns, Plague Ridden, Regeneration, Steady Footing, Thick Skull",
      skillAccess: {
        primary: ["G", "M", "S"],
        secondary: ["A", "P"]
      }
    },
    {
      name: "Bloater",
      cost: 110000,
      max: 4,
      stats: "4/4/4+/6+/10+",
      skills: "Disturbing Presence, Foul Appearance, Plague Ridden, Regeneration, Stand Firm, Unsteady",
      skillAccess: {
        primary: ["G", "M", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Rotspawn",
      cost: 140000,
      max: 1,
      stats: "4/5/5+/6+/10+",
      skills: "Disturbing Presence, Foul Appearance, Loner (4+), Mighty Blow, Pick-me-up, Plague Ridden, Really Stupid, Regeneration, Tentacles",
      skillAccess: {
        primary: ["M", "S"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Nurgle-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ]
};
