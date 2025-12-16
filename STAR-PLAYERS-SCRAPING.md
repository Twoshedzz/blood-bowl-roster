# Star Players Data Scraping Guide

## Quick Start

### 1. Install Dependencies

First, install the scraping libraries:

```bash
npm install cheerio axios
```

### 2. Run the Scraper

Execute the scraper script:

```bash
npm run scrape:starplayers
```

Or directly:

```bash
node scripts/scrape-star-players.js
```

### 3. What Happens

The script will:
- Fetch data for **~60 star players** from [bloodbowlbase.ru](https://bloodbowlbase.ru/bb2025/starplayers/)
- Extract: name, cost, stats, skills, leagues, special rules
- Save to: `src/data/star-players/scraped-data.json`
- Take: ~30-60 seconds (with respectful 500ms delays between requests)

### 4. Review the Data

Open and check the scraped data:

```bash
cat src/data/star-players/scraped-data.json
```

Look for:
- ✅ Players with complete data (cost > 0, stats present)
- ⚠️ "Data not found" entries (need manual fixing)
- ❌ Error entries (failed to scrape)

### 5. Next Steps

After scraping:

1. **Clean the data** - Fix any "Data not found" entries
2. **Format conversion** - Convert JSON to JavaScript modules (like the team files)
3. **Create index file** - Export all star players
4. **Add tests** - Similar to team data tests
5. **Build UI** - Add star player selection to roster builder

## Example Output

```json
{
  "name": "Griff Oberwald",
  "cost": 320000,
  "stats": "7/4/2+/2+/9+",
  "skills": "Block, Dodge, Fend, Sprint, Sure Hands",
  "playsFor": ["Old World Classic"],
  "specialRule": "Consummate Professional: Once per game, Griff may re-roll..."
}
```

## Troubleshooting

### Issue: Missing or incomplete data

**Solution:** The website HTML structure might vary. You may need to:
1. Manually check a few player pages
2. Update the CSS selectors in `scripts/scrape-star-players.js`
3. Manually add missing data from the official rulebook

### Issue: Rate limiting or blocked

**Solution:** The script includes delays, but if you get blocked:
1. Increase the delay in the script (change `500` to `1000` or more)
2. Run the script at a different time
3. Use a VPN if necessary

### Issue: npm install fails

**Solution:** Make sure you have Node.js installed:
```bash
node --version  # Should be v18 or higher
npm --version
```

## File Structure

After scraping, you'll have:

```
src/data/star-players/
├── README.md (this was already there)
├── scraped-data.json (raw scraped data)
├── scrape-summary.json (statistics)
└── [future: individual JS files like griff-oberwald.js]
```

## Integration Plan

Once data is scraped and cleaned:

1. **Create modules** (similar to teams):
   ```javascript
   // src/data/star-players/griff-oberwald.js
   export const GriffOberwald = { ... };
   ```

2. **Create index file**:
   ```javascript
   // src/data/star-players/index.js
   export const STAR_PLAYERS = { ... };
   export const getAvailableStarPlayers = (teamName) => { ... };
   ```

3. **Add to roster builder UI**:
   - New "Star Players" tab
   - Filter by team's league
   - Show cost and special rules
   - Add to roster (separate from regular players)

## Questions?

Check the detailed documentation:
- `scripts/README.md` - Scraper documentation
- `src/data/star-players/star-players-structure.md` - Data structure details
