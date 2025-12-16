import { describe, it, expect } from 'vitest';
import { SKILLS_BY_CATEGORY } from '../skills';

describe('Skills Data', () => {
  it('should have all expected skill categories', () => {
    const expectedCategories = ['G', 'A', 'S', 'P', 'M'];
    const categories = Object.keys(SKILLS_BY_CATEGORY);
    
    expectedCategories.forEach(cat => {
      expect(categories).toContain(cat);
    });
  });

  it('should have skills in each category', () => {
    Object.entries(SKILLS_BY_CATEGORY).forEach(([category, skills]) => {
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThan(0);
    });
  });

  it('should not have duplicate skills within a category', () => {
    Object.entries(SKILLS_BY_CATEGORY).forEach(([category, skills]) => {
      const uniqueSkills = new Set(skills);
      expect(uniqueSkills.size).toBe(skills.length);
    });
  });

  it('should have valid skill names (non-empty strings)', () => {
    Object.entries(SKILLS_BY_CATEGORY).forEach(([category, skills]) => {
      skills.forEach(skill => {
        expect(typeof skill).toBe('string');
        expect(skill.length).toBeGreaterThan(0);
      });
    });
  });

  it('General category should include common skills', () => {
    const generalSkills = SKILLS_BY_CATEGORY.G;
    expect(generalSkills).toContain('Block');
    expect(generalSkills).toContain('Sure Hands');
    expect(generalSkills).toContain('Fend');
  });

  it('Agility category should include agility skills', () => {
    const agilitySkills = SKILLS_BY_CATEGORY.A;
    expect(agilitySkills).toContain('Catch');
    expect(agilitySkills).toContain('Diving Catch');
    expect(agilitySkills).toContain('Dodge');
  });

  it('Strength category should include strength skills', () => {
    const strengthSkills = SKILLS_BY_CATEGORY.S;
    expect(strengthSkills).toContain('Mighty Blow');
    expect(strengthSkills).toContain('Guard');
  });

  it('Passing category should include passing skills', () => {
    const passingSkills = SKILLS_BY_CATEGORY.P;
    expect(passingSkills).toContain('Accurate');
    expect(passingSkills).toContain('Pass');
  });

  it('Mutation category should include mutation skills', () => {
    const mutationSkills = SKILLS_BY_CATEGORY.M;
    expect(mutationSkills).toContain('Big Hand');
    expect(mutationSkills).toContain('Extra Arms');
  });
});
