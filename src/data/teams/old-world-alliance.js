export const OldWorldAlliance = {
  name: "Old World Alliance",
  league: "Old World Classic",
  rerollCost: 70000,
  image: "OldWorldAlliance.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/9+",
      skills: "-",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Halfling",
      cost: 30000,
      max: 5,
      stats: "5/2/3+/4+/7+",
      skills: "Dodge, Right Stuff, Stunty",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G", "S"]
      }
    },
    {
      name: "Catcher",
      cost: 75000,
      max: 1,
      stats: "8/3/3+/4+/8+",
      skills: "Catch, Dodge",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Dwarf Blocker",
      cost: 70000,
      max: 3,
      stats: "4/3/4+/5+/10+",
      skills: "Block, Defensive, Thick Skull",
      skillAccess: {
        primary: ["D", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Thrower",
      cost: 75000,
      max: 1,
      stats: "6/3/3+/3+/9+",
      skills: "Pass, Sure Hands",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Runner",
      cost: 80000,
      max: 1,
      stats: "6/3/3+/4+/9+",
      skills: "Sprint, Sure Hands, Thick Skull",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["S"]
      }
    },
    {
      name: "Human Blitzer",
      cost: 85000,
      max: 1,
      stats: "7/3/3+/4+/9+",
      skills: "Block, Tackle",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    },
    {
      name: "Dwarf Blitzer",
      cost: 100000,
      max: 1,
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
      max: 1,
      stats: "5/3/4+/5+/9+",
      skills: "Block, Dauntless, Frenzy, Hatred (Troll), Thick Skull",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["D"]
      }
    },
    {
      name: "Ogre",
      cost: 140000,
      max: 1,
      stats: "5/5/4+/5+/10+",
      skills: "Bone Head, Loner (3+), Mighty Blow, Thick Skull, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G"]
      }
    },
    {
      name: "Treeman",
      cost: 120000,
      max: 1,
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
