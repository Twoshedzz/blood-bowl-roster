export const Bretonnian = {
  name: "Bretonnian",
  league: "Old World Classic",
  rerollCost: 60000,
  image: "Bretonnians.png",
  
  positions: [
    {
      name: "Squire",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/8+",
      skills: "Wrestle",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Catcher",
      cost: 85000,
      max: 2,
      stats: "7/3/3+/4+/9+",
      skills: "Catch, Dauntless, Nerves of Steel",
      skillAccess: {
        primary: ["A", "G"],
        secondary: ["S"]
      }
    },
    {
      name: "Thrower",
      cost: 80000,
      max: 2,
      stats: "6/3/3+/3+/9+",
      skills: "Dauntless, Nerves of Steel, Pass",
      skillAccess: {
        primary: ["G", "P"],
        secondary: ["A", "S"]
      }
    },
    {
      name: "Grail Knight",
      cost: 95000,
      max: 2,
      stats: "7/3/3+/4+/10+",
      skills: "Block, Dauntless, Steady Footing",
      skillAccess: {
        primary: ["G", "S"],
        secondary: ["A"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Hungry Troll (Sacré Graal)", url: "https://hungrytrollminiatures.com/bretonia/333-bretonians-quest-box-metal.html" }
  ]
};
