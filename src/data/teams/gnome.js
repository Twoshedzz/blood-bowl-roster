export const Gnome = {
  name: "Gnome",
  league: "Halfling Thimble Cup or Woodland League",
  rerollCost: 50000,
  image: "Gnomes.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 40000,
      max: 16,
      stats: "5/2/3+/4+/7+",
      skills: "Jump Up, Right Stuff, Stunty, Wrestle",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Fox",
      cost: 50000,
      max: 2,
      stats: "7/2/2+/-/6+",
      skills: "Dodge, My Ball, Sidestep, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Illusionist",
      cost: 50000,
      max: 2,
      stats: "5/2/3+/3+/7+",
      skills: "Jump Up, Stunty, Trickster, Wrestle",
      skillAccess: {
        primary: ["A", "P"],
        secondary: ["D", "G"]
      }
    },
    {
      name: "Beastmaster",
      cost: 55000,
      max: 2,
      stats: "5/2/3+/4+/8+",
      skills: "Guard, Jump Up, Stunty, Wrestle",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Treeman",
      cost: 120000,
      max: 2,
      stats: "2/6/5+/5+/11+",
      skills: "Mighty Blow, Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate, Timmm-ber!",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};
