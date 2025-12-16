# Blood Bowl Roster - Refactoring Summary

## What Was Done

Successfully refactored the Blood Bowl Roster codebase to make it much easier to add new teams and star players in the future.

### Before Refactoring
- **1 massive file**: `blood-bowl-roster.jsx` was 1919 lines long
- **Hardcoded data**: ~1500 lines of team data embedded in the component
- **Cryptic property names**: `T`, `r`, `l`, `p`, `n`, `c`, `m`, `s`, `k`
- **Three separate data structures** that needed to stay in sync:
  - `POSITION_SKILL_ACCESS`
  - `TEAM_MINIATURE_LINKS`
  - `T` (main team data)

### After Refactoring
- **34 new data files** organized by purpose
- **~500 lines removed** from main component
- **Clear, readable property names**: `rerollCost`, `league`, `positions`, `name`, `cost`, `max`, `stats`, `skills`
- **One source of truth** per team - all data in one file

## New File Structure

```
src/
├── blood-bowl-roster.jsx        (now ~450 lines - much cleaner!)
├── data/
│   ├── constants.js              (game constants & helper functions)
│   ├── skills.js                 (all Blood Bowl skills by category)
│   ├── leagues.js                (league groupings for star player access)
│   ├── teams/
│   │   ├── index.js              (exports all teams & helper functions)
│   │   ├── amazon.js
│   │   ├── black-orc.js
│   │   ├── bretonnian.js
│   │   ├── chaos-chosen.js
│   │   ├── chaos-dwarf.js
│   │   ├── chaos-renegade.js
│   │   ├── dark-elf.js
│   │   ├── dwarf.js
│   │   ├── elf-union.js
│   │   ├── gnome.js
│   │   ├── goblin.js
│   │   ├── halfling.js
│   │   ├── human.js
│   │   ├── imperial-nobility.js
│   │   ├── khorne.js
│   │   ├── lizardmen.js
│   │   ├── necromantic-horror.js
│   │   ├── norse.js
│   │   ├── nurgle.js
│   │   ├── ogre.js
│   │   ├── old-world-alliance.js
│   │   ├── orc.js
│   │   ├── shambling-undead.js
│   │   ├── skaven.js
│   │   ├── snotling.js
│   │   ├── tomb-king.js
│   │   ├── underworld-denizens.js
│   │   ├── vampire.js
│   │   └── wood-elf.js
│   └── star-players/
│       └── README.md             (ready for star player implementation)
```

## Example: Adding a New Team

### Before (in one massive file):
```javascript
const T = {
  // ... 1500 lines of other teams ...
  "New Team": {l:"Some League",r:60000,p:[{n:"Lineman",c:50000,m:16,s:"6/3/3+/4+/9+",k:"Block"}]}
};
const POSITION_SKILL_ACCESS = {
  // ... remember to add here too ...
  "New Team": { "Lineman": { primary: ["G"], secondary: ["A", "S"] } }
};
const TEAM_MINIATURE_LINKS = {
  // ... and here ...
  "New Team": [{ name: "Supplier", url: "..." }]
};
```

### After (one focused file):
Create `src/data/teams/new-team.js`:
```javascript
export const NewTeam = {
  name: "New Team",
  league: "Some League",
  rerollCost: 60000,
  image: "NewTeam.png",
  
  positions: [
    {
      name: "Lineman",
      cost: 50000,
      max: 16,
      stats: "6/3/3+/4+/9+",
      skills: "Block",
      skillAccess: {
        primary: ["G"],
        secondary: ["A", "S"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Supplier", url: "..." }
  ]
};
```

Then add one line to `src/data/teams/index.js`:
```javascript
import { NewTeam } from './new-team.js';
// ... add to TEAMS object
```

## Benefits

✅ **Easy to add new teams** - Create one file, add one import  
✅ **Readable code** - Clear property names instead of single letters  
✅ **No sync issues** - All team data in one place  
✅ **Better Git diffs** - Changes to one team don't affect others  
✅ **Easier testing** - Can test individual team data files  
✅ **Ready for star players** - Structure designed with expansion in mind  
✅ **Maintainable** - Find any team's data in seconds  

## Star Players (Next Step)

The refactoring sets you up perfectly for star players! You can now easily:

1. Check what leagues a team belongs to: `getTeamLeagues("Human")`
2. Get all teams in a league: `getLeagueTeams("Old World Classic")`
3. Filter star players by league/team when building rosters

The `src/data/star-players/` directory has a README with the recommended structure.

## Testing

✅ Build succeeds: `npm run build`  
✅ No linter errors  
✅ All 29 teams refactored  
✅ Main component reduced from 1919 to ~450 lines  

---

**Branch**: `refactor/team-data-structure`  
**Status**: ✅ Complete and tested
