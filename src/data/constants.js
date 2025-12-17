// Game constants
export const STARTING_TREASURY = 1000000;
export const MAX_PLAYERS = 16;

// Teams that cannot purchase apothecaries
export const TEAMS_WITHOUT_APOTHECARY = new Set([
  "Nurgle",
  "Shambling Undead",
  "Necromantic Horror",
  "Tomb King",
  "Tomb Kings", // Common pluralization
]);

// Base inducements function
export const getInducements = (teamName) => {
  let bribeCost = 100000;
  
  if (teamName === "Goblin") {
    bribeCost = 50000;
  } else if (teamName === "Dwarf") {
    bribeCost = 50000; // Dwarf teams have "Bribery and Corruption" special rule
  }
  
  const base = [
    { name: "Bribes", cost: bribeCost },
    { name: "Apothecary", cost: 50000 },
    { name: "Coaches", cost: 10000 },
    { name: "Cheerleaders", cost: 10000 },
    { name: "Fans", cost: 5000 },
    { name: "Kegs", cost: 50000 },
    { name: "Masterchef", cost: 300000 }
  ];

  if (TEAMS_WITHOUT_APOTHECARY.has(teamName)) {
    return base.filter((ind) => ind.name !== "Apothecary");
  }

  return base;
};
