# Scripts

Utility scripts for the Blood Bowl Roster Builder.

## Star Player Scraper

### Prerequisites

Install the required dependencies:

```bash
npm install cheerio axios
```

### Usage

Run the scraper to fetch all star player data from bloodbowlbase.ru:

```bash
node scripts/scrape-star-players.js
```

### What it does

1. Fetches data for all ~60 star players from bloodbowlbase.ru
2. Extracts:
   - Player name
   - Hiring cost (in gold pieces)
   - Stats (MA/ST/AG/PA/AV)
   - Skills and traits
   - "Plays For" (leagues/teams)
   - Special rules
3. Saves results to:
   - `src/data/star-players/scraped-data.json` - Full data
   - `src/data/star-players/scrape-summary.json` - Summary stats

### Rate Limiting

The scraper includes a 500ms delay between requests to be respectful to the website.
Total scraping time: ~30-60 seconds.

### After Scraping

1. **Review the data**: Open `scraped-data.json` and check for any "Data not found" entries
2. **Manual cleanup**: The website structure may vary, so some entries might need manual correction
3. **Format conversion**: Convert the JSON data to proper JavaScript modules matching the team data structure
4. **Integration**: Add the star player selection UI to the roster builder

### Troubleshooting

If the scraper fails or returns incomplete data:

1. Check if the website structure has changed
2. Visit a few star player pages manually to verify the HTML structure
3. Update the CSS selectors in the scraper script
4. Some data might need to be added manually from the official Blood Bowl rulebook

### Example Output

```json
{
  "slug": "griff-oberwald",
  "name": "Griff Oberwald",
  "cost": 320000,
  "stats": "7/4/2+/2+/9+",
  "skills": "Block, Dodge, Fend, Sprint, Sure Hands",
  "playsFor": ["Old World Classic"],
  "specialRule": "Consummate Professional: Once per game..."
}
```
