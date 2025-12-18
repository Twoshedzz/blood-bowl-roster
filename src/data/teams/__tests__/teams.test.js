import { describe, it, expect } from 'vitest';
import { TEAMS, TEAM_NAMES, getTeam, getPositionSkillAccess } from '../index';

describe('Team Data Structure', () => {
  it('should have 29 teams', () => {
    expect(Object.keys(TEAMS)).toHaveLength(29);
  });

  it('should have all team names in alphabetical order', () => {
    const sorted = [...TEAM_NAMES].sort();
    expect(TEAM_NAMES).toEqual(sorted);
  });

  describe('Each team', () => {
    Object.entries(TEAMS).forEach(([teamName, team]) => {
      describe(teamName, () => {
        it('should have required properties', () => {
          expect(team).toHaveProperty('name');
          expect(team).toHaveProperty('league');
          expect(team).toHaveProperty('rerollCost');
          expect(team).toHaveProperty('image');
          expect(team).toHaveProperty('positions');
          expect(team).toHaveProperty('miniatureLinks');
        });

        it('should have correct name', () => {
          expect(team.name).toBe(teamName);
        });

        it('should have valid reroll cost', () => {
          expect(typeof team.rerollCost).toBe('number');
          expect(team.rerollCost).toBeGreaterThan(0);
          expect(team.rerollCost % 1000).toBe(0); // Should be multiple of 1000
        });

        it('should have at least one position', () => {
          expect(Array.isArray(team.positions)).toBe(true);
          expect(team.positions.length).toBeGreaterThan(0);
        });

        it('should have valid image filename', () => {
          expect(team.image).toMatch(/\.png$/i);
        });

        it('should have miniature links array', () => {
          expect(Array.isArray(team.miniatureLinks)).toBe(true);
        });

        describe('Positions', () => {
          team.positions.forEach((position, idx) => {
            describe(`Position ${idx + 1}: ${position.name}`, () => {
              it('should have required properties', () => {
                expect(position).toHaveProperty('name');
                expect(position).toHaveProperty('cost');
                expect(position).toHaveProperty('max');
                expect(position).toHaveProperty('stats');
                expect(position).toHaveProperty('skills');
                expect(position).toHaveProperty('skillAccess');
              });

              it('should have valid name', () => {
                expect(typeof position.name).toBe('string');
                expect(position.name.length).toBeGreaterThan(0);
              });

              it('should have valid cost', () => {
                expect(typeof position.cost).toBe('number');
                expect(position.cost).toBeGreaterThanOrEqual(0);
                expect(position.cost % 1000).toBe(0); // Should be multiple of 1000
              });

              it('should have valid max', () => {
                expect(typeof position.max).toBe('number');
                expect(position.max).toBeGreaterThan(0);
                expect(position.max).toBeLessThanOrEqual(16);
              });

              it('should have valid stats format (X/X/X+/X+/X+)', () => {
                expect(position.stats).toMatch(/^\d+\/\d+\/\d+\+\/.+\/\d+\+$/);
              });

              it('should have skills string', () => {
                expect(typeof position.skills).toBe('string');
              });

              it('should have valid skillAccess', () => {
                expect(position.skillAccess).toHaveProperty('primary');
                expect(position.skillAccess).toHaveProperty('secondary');
                expect(Array.isArray(position.skillAccess.primary)).toBe(true);
                expect(Array.isArray(position.skillAccess.secondary)).toBe(true);
                
                // All skill categories should be single letters
                position.skillAccess.primary.forEach(cat => {
                  expect(cat).toMatch(/^[A-Z]$/);
                });
                position.skillAccess.secondary.forEach(cat => {
                  expect(cat).toMatch(/^[A-Z]$/);
                });
              });
            });
          });
        });

        describe('Miniature Links', () => {
          team.miniatureLinks.forEach((link, idx) => {
            it(`Link ${idx + 1} should have name and url`, () => {
              expect(link).toHaveProperty('name');
              expect(link).toHaveProperty('url');
              expect(typeof link.name).toBe('string');
              expect(typeof link.url).toBe('string');
              expect(link.url).toMatch(/^https?:\/\//);
            });
          });
        });
      });
    });
  });
});

describe('Team Helper Functions', () => {
  it('getTeam should return correct team', () => {
    const human = getTeam('Human');
    expect(human).toBeDefined();
    expect(human.name).toBe('Human');
  });

  it('getTeam should return undefined for non-existent team', () => {
    const nonExistent = getTeam('Non-Existent Team');
    expect(nonExistent).toBeUndefined();
  });

  it('getPositionSkillAccess should return skill access for valid team and position', () => {
    const skillAccess = getPositionSkillAccess('Human', 'Lineman');
    expect(skillAccess).toBeDefined();
    expect(skillAccess).toHaveProperty('primary');
    expect(skillAccess).toHaveProperty('secondary');
  });

  it('getPositionSkillAccess should return null for non-existent team', () => {
    const skillAccess = getPositionSkillAccess('Non-Existent Team', 'Lineman');
    expect(skillAccess).toBeNull();
  });

  it('getPositionSkillAccess should return null for non-existent position', () => {
    const skillAccess = getPositionSkillAccess('Human', 'Non-Existent Position');
    expect(skillAccess).toBeNull();
  });
});
