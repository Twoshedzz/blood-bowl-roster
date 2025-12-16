# Star Players

This directory is ready for star player data.

## Structure

Each star player file should export an object with:
- `name`: Star player name
- `cost`: Hiring cost
- `stats`: Stats string (e.g., "6/3/3+/4+/9+")
- `skills`: Array of skills
- `availableFor`: Object with leagues and/or specific teams
  - `leagues`: Array of league names
  - `teams`: Array of specific team names (optional)

## Example

```javascript
export const Morg = {
  name: "Morg 'n' Thorg",
  cost: 430000,
  stats: "6/6/3+/4+/10+",
  skills: ["Block", "Mighty Blow", "Thick Skull", "Throw Team-mate"],
  availableFor: {
    leagues: [
      "Old World Classic",
      "Badlands Brawl",
      "Chaos Clash"
      // ... etc
    ]
  }
};
```

This structure makes it easy to filter star players by league or team when building rosters.
