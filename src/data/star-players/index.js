// Star Players data - imported from scraped JSON
import scrapedData from './scraped-data.json';

// Convert scraped data to star players object
export const STAR_PLAYERS = {};

scrapedData.forEach(player => {
  if (player.name && player.cost > 0) {
    STAR_PLAYERS[player.name] = {
      name: player.name,
      cost: player.cost,
      stats: player.stats,
      skills: player.skills,
      playsFor: player.playsFor || [],
      acceptToPlayFor: player.acceptToPlayFor || [],
      specialRule: player.specialRule || { name: '', description: '' }
    };
  }
});

// Get all star player names sorted alphabetically
export const STAR_PLAYER_NAMES = Object.keys(STAR_PLAYERS).sort();

/**
 * Get star players available to a specific team
 * @param {string} teamName - Name of the team
 * @returns {Array} Array of star player objects available to this team
 */
export function getAvailableStarPlayers(teamName) {
  const availablePlayers = [];
  
  Object.values(STAR_PLAYERS).forEach(player => {
    let canHire = false;
    
    // Check if player can be hired by this team
    // Method 1: "Any team" can be hired by anyone
    if (player.playsFor.some(league => league && league.toLowerCase() === 'any team')) {
      canHire = true;
    }
    
    // Method 2: Team is explicitly in "acceptToPlayFor" list
    if (!canHire && player.acceptToPlayFor && player.acceptToPlayFor.length > 0) {
      canHire = player.acceptToPlayFor.includes(teamName);
    }
    
    // Method 3: For now, allow all star players for all teams (can be refined later)
    // This is a fallback to ensure players show up while we refine the logic
    if (!canHire && player.acceptToPlayFor && player.acceptToPlayFor.length === 0) {
      canHire = true;
    }
    
    if (canHire) {
      availablePlayers.push(player);
    }
  });
  
  return availablePlayers.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get a star player by name
 * @param {string} playerName - Name of the star player
 * @returns {Object|null} Star player object or null if not found
 */
export function getStarPlayer(playerName) {
  return STAR_PLAYERS[playerName] || null;
}

/**
 * Check if a team can hire a specific star player
 * @param {string} teamName - Name of the team
 * @param {string} starPlayerName - Name of the star player
 * @returns {boolean} True if team can hire this star player
 */
export function canTeamHireStarPlayer(teamName, starPlayerName) {
  const available = getAvailableStarPlayers(teamName);
  return available.some(p => p.name === starPlayerName);
}

