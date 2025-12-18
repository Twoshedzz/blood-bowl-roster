# Star Players Data Structure

This directory will contain star player data for the Blood Bowl roster builder.

## Data Structure

Each star player has:
- **name**: Player name
- **cost**: Hiring fee in gold pieces
- **stats**: Player statistics (MA/ST/AG/PA/AV)
- **skills**: Starting skills and traits
- **playsFor**: Array of leagues/special rules they can play for
- **specialRule**: Unique ability with name and description

## Example Structure

```javascript
export const GriffOberwald = {
  name: "Griff Oberwald",
  cost: 320000,
  stats: "7/4/2+/2+/9+",
  skills: "Block, Dodge, Fend, Sprint, Sure Hands",
  playsFor: ["Old World Classic"],
  specialRule: {
    name: "Consummate Professional",
    description: "Once per game, Griff may re-roll any dice roll he has made."
  }
};
```

## Scraping Data

To fetch star player data from bloodbowlbase.ru:

```bash
# Install dependencies first
npm install cheerio axios

# Run scraper
npm run scrape:starplayers
```

This will create:
- `scraped-data.json` - Raw scraped data
- `scrape-summary.json` - Scraping statistics

## Integration with Leagues

Star players use the same league system as teams (from `src/data/leagues.js`).

**League-based access:**
```javascript
playsFor: ["Old World Classic"]  // Any team in this league can hire
```

**Special rule access:**
```javascript
playsFor: ["Favoured of Khorne"]  // Only teams with this special rule
```

## Helper Functions (To Be Implemented)

```javascript
// Get star players available to a team
getAvailableStarPlayers(teamName)

// Filter by league
getStarPlayersByLeague(leagueName)

// Check if team can hire a star player
canTeamHireStarPlayer(teamName, starPlayerName)
```

## Implementation Status

- ✅ Data structure designed
- ✅ Scraper script created
- ⏳ Data scraping (run script)
- ⏳ Data cleanup and formatting
- ⏳ Create individual star player modules
- ⏳ Create index file with exports
- ⏳ Add helper functions
- ⏳ Integrate into roster builder UI

