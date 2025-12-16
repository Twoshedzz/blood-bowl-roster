# Testing Guide

This project uses [Vitest](https://vitest.dev/) for unit testing with React Testing Library.

## Running Tests

```bash
# Run tests in watch mode (interactive)
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

## Test Coverage

### Team Data Tests (1340 tests)
Located in `src/data/teams/__tests__/teams.test.js`

**Validates:**
- All 29 teams have required properties
- Team names match their keys
- Reroll costs are valid numbers and multiples of 1000
- Each team has at least one position
- Image filenames are valid
- Miniature links are properly formatted

**Position Validation:**
- All positions have required properties (name, cost, max, stats, skills, skillAccess)
- Costs are valid and multiples of 1000
- Max values are between 1-16
- Stats follow correct format (X/X/X+/X+/X+)
- Skill access has valid primary and secondary categories

### Leagues Data Tests (14 tests)
Located in `src/data/__tests__/leagues.test.js`

**Validates:**
- All 10 leagues are defined
- Every team is assigned to at least one league
- No duplicate teams within leagues
- All league entries reference valid teams

**Helper Functions:**
- `getTeamLeagues()` - Returns leagues for a team
- `isTeamInLeague()` - Checks if team is in specific league
- `getLeagueTeams()` - Returns all teams in a league

### Constants Tests (8 tests)
Located in `src/data/__tests__/constants.test.js`

**Validates:**
- Starting treasury is 1,000,000
- Max players is 16
- Teams without apothecary are correctly defined
- `getInducements()` returns valid inducement structure
- Apothecary is excluded for undead teams

### Skills Tests (9 tests)
Located in `src/data/__tests__/skills.test.js`

**Validates:**
- All 5 skill categories exist (G, A, S, P, M)
- Each category has skills
- No duplicate skills within categories
- Known skills are in correct categories:
  - General (G): Block, Sure Hands, Fend
  - Agility (A): Catch, Dodge, Diving Catch
  - Strength (S): Mighty Blow, Guard
  - Passing (P): Accurate, Pass
  - Mutation (M): Big Hand, Extra Arms

## Test Structure

```
src/
├── data/
│   ├── __tests__/
│   │   ├── constants.test.js
│   │   ├── leagues.test.js
│   │   └── skills.test.js
│   └── teams/
│       └── __tests__/
│           └── teams.test.js
└── test/
    └── setup.js
```

## Adding New Tests

When adding a new team:
1. Tests will automatically validate the new team structure
2. Run `npm run test:run` to verify

When adding star players:
1. Create `src/data/star-players/__tests__/star-players.test.js`
2. Follow the same validation pattern as team tests

## Configuration

Test configuration is in `vite.config.js`:
- Uses `happy-dom` for browser environment simulation
- Global test utilities enabled
- Setup file: `src/test/setup.js`

## Benefits

✅ **Data Integrity**: Ensures all 29 teams have consistent structure
✅ **Refactoring Confidence**: Catch breaking changes immediately
✅ **Documentation**: Tests serve as usage examples
✅ **Future Development**: Safe to add star players and new features
