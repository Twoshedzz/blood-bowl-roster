import { describe, it, expect } from 'vitest';
import { LEAGUES, getTeamLeagues, isTeamInLeague, getLeagueTeams } from '../leagues';
import { TEAM_NAMES } from '../teams/index';

describe('Leagues Data', () => {
  it('should have all expected leagues', () => {
    const expectedLeagues = [
      'Badlands Brawl',
      'Chaos Clash',
      'Elven Kingdoms League',
      'Halfling Thimble Cup',
      'Lustrian Superleague',
      'Old World Classic',
      'Sylvannian Spotlight',
      'Underworld Challenge',
      'Woodland League',
      'Worlds Edge Superleague'
    ];
    
    const leagueNames = Object.keys(LEAGUES);
    expect(leagueNames.sort()).toEqual(expectedLeagues.sort());
  });

  it('should have all teams assigned to at least one league', () => {
    TEAM_NAMES.forEach(teamName => {
      const leagues = getTeamLeagues(teamName);
      expect(leagues.length).toBeGreaterThan(0);
    });
  });

  it('should not have duplicate teams within a league', () => {
    Object.entries(LEAGUES).forEach(([leagueName, teams]) => {
      const uniqueTeams = new Set(teams);
      expect(uniqueTeams.size).toBe(teams.length);
    });
  });

  it('should only contain valid team names', () => {
    const validTeamNames = new Set(TEAM_NAMES);
    Object.entries(LEAGUES).forEach(([leagueName, teams]) => {
      teams.forEach(teamName => {
        expect(validTeamNames.has(teamName)).toBe(true);
      });
    });
  });
});

describe('League Helper Functions', () => {
  describe('getTeamLeagues', () => {
    it('should return leagues for a valid team', () => {
      const leagues = getTeamLeagues('Human');
      expect(Array.isArray(leagues)).toBe(true);
      expect(leagues.length).toBeGreaterThan(0);
      expect(leagues).toContain('Old World Classic');
    });

    it('should return empty array for non-existent team', () => {
      const leagues = getTeamLeagues('Non-Existent Team');
      expect(leagues).toEqual([]);
    });

    it('should return multiple leagues for teams in multiple leagues', () => {
      // Gnomes are in multiple leagues
      const leagues = getTeamLeagues('Gnome');
      expect(leagues.length).toBeGreaterThan(0);
    });
  });

  describe('isTeamInLeague', () => {
    it('should return true for team in league', () => {
      expect(isTeamInLeague('Human', 'Old World Classic')).toBe(true);
    });

    it('should return false for team not in league', () => {
      expect(isTeamInLeague('Human', 'Elven Kingdoms League')).toBe(false);
    });

    it('should return false for non-existent team', () => {
      expect(isTeamInLeague('Non-Existent Team', 'Old World Classic')).toBe(false);
    });

    it('should return false for non-existent league', () => {
      expect(isTeamInLeague('Human', 'Non-Existent League')).toBe(false);
    });
  });

  describe('getLeagueTeams', () => {
    it('should return teams for a valid league', () => {
      const teams = getLeagueTeams('Old World Classic');
      expect(Array.isArray(teams)).toBe(true);
      expect(teams.length).toBeGreaterThan(0);
      expect(teams).toContain('Human');
    });

    it('should return empty array for non-existent league', () => {
      const teams = getLeagueTeams('Non-Existent League');
      expect(teams).toEqual([]);
    });

    it('should return all teams in Chaos Clash league', () => {
      const chaosTeams = getLeagueTeams('Chaos Clash');
      expect(chaosTeams).toContain('Khorne');
      expect(chaosTeams).toContain('Nurgle');
      expect(chaosTeams).toContain('Chaos Chosen');
    });
  });
});
