import { describe, it, expect } from 'vitest';
import { 
  STARTING_TREASURY, 
  MAX_PLAYERS, 
  TEAMS_WITHOUT_APOTHECARY, 
  getInducements 
} from '../constants';

describe('Constants', () => {
  it('should have correct starting treasury', () => {
    expect(STARTING_TREASURY).toBe(1000000);
  });

  it('should have correct max players', () => {
    expect(MAX_PLAYERS).toBe(16);
  });

  it('should have teams without apothecary', () => {
    expect(TEAMS_WITHOUT_APOTHECARY).toBeInstanceOf(Set);
    expect(TEAMS_WITHOUT_APOTHECARY.size).toBeGreaterThan(0);
    
    // Check some known teams without apothecary
    expect(TEAMS_WITHOUT_APOTHECARY.has('Shambling Undead')).toBe(true);
    expect(TEAMS_WITHOUT_APOTHECARY.has('Necromantic Horror')).toBe(true);
  });
});

describe('getInducements', () => {
  it('should return inducements for a valid team', () => {
    const inducements = getInducements('Human');
    expect(Array.isArray(inducements)).toBe(true);
    expect(inducements.length).toBeGreaterThan(0);
  });

  it('should include common inducements', () => {
    const inducements = getInducements('Human');
    const names = inducements.map(i => i.name);
    
    expect(names).toContain('Coaches');
    expect(names).toContain('Cheerleaders');
    expect(names).toContain('Fans');
  });

  it('should include Apothecary for teams that can have it', () => {
    const inducements = getInducements('Human');
    const names = inducements.map(i => i.name);
    expect(names).toContain('Apothecary');
  });

  it('should not include Apothecary for undead teams', () => {
    const inducements = getInducements('Shambling Undead');
    const names = inducements.map(i => i.name);
    expect(names).not.toContain('Apothecary');
  });

  it('should have valid inducement structure', () => {
    const inducements = getInducements('Human');
    
    inducements.forEach(inducement => {
      expect(inducement).toHaveProperty('name');
      expect(inducement).toHaveProperty('cost');
      expect(typeof inducement.name).toBe('string');
      expect(typeof inducement.cost).toBe('number');
      expect(inducement.cost).toBeGreaterThanOrEqual(0);
    });
  });
});
