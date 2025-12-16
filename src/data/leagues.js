// League groupings for teams
// This will be useful for star player access and filtering
export const LEAGUES = {
  "Badlands Brawl": [
    "Black Orc",
    "Goblin",
    "Ogre",
    "Orc"
  ],
  "Chaos Clash": [
    "Chaos Chosen",
    "Chaos Dwarf",
    "Chaos Renegade",
    "Khorne",
    "Norse",
    "Nurgle"
  ],
  "Elven Kingdoms League": [
    "Dark Elf",
    "Elf Union",
    "Wood Elf"
  ],
  "Halfling Thimble Cup": [
    "Gnome",
    "Halfling"
  ],
  "Lustrian Superleague": [
    "Amazon",
    "Lizardmen"
  ],
  "Old World Classic": [
    "Bretonnian",
    "Human",
    "Imperial Nobility",
    "Norse",
    "Old World Alliance"
  ],
  "Sylvannian Spotlight": [
    "Necromantic Horror",
    "Shambling Undead",
    "Tomb King",
    "Vampire"
  ],
  "Underworld Challenge": [
    "Goblin",
    "Skaven",
    "Snotling",
    "Underworld Denizens"
  ],
  "Woodland League": [
    "Gnome",
    "Halfling",
    "Wood Elf"
  ],
  "Worlds Edge Superleague": [
    "Dwarf",
    "Ogre"
  ]
};

// Helper function to get all leagues a team belongs to
export const getTeamLeagues = (teamName) => {
  const leagues = [];
  for (const [leagueName, teams] of Object.entries(LEAGUES)) {
    if (teams.includes(teamName)) {
      leagues.push(leagueName);
    }
  }
  return leagues;
};

// Helper function to check if a team is in a specific league
export const isTeamInLeague = (teamName, leagueName) => {
  return LEAGUES[leagueName]?.includes(teamName) || false;
};

// Get all teams in a league
export const getLeagueTeams = (leagueName) => {
  return LEAGUES[leagueName] || [];
};
