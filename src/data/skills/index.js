// Skills index - exports all skills organized by category
import { AGILITY_SKILLS } from './agility.js';
import { DEVIOUS_SKILLS } from './devious.js';
import { GENERAL_SKILLS } from './general.js';
import { MUTATION_SKILLS } from './mutation.js';
import { PASSING_SKILLS } from './passing.js';
import { STRENGTH_SKILLS } from './strength.js';
import { COMMON_TRAITS } from './traits.js';

// Combine all skills AND traits into a single object for easy lookup
export const ALL_SKILLS = {
  ...AGILITY_SKILLS,
  ...DEVIOUS_SKILLS,
  ...GENERAL_SKILLS,
  ...MUTATION_SKILLS,
  ...PASSING_SKILLS,
  ...STRENGTH_SKILLS,
  ...COMMON_TRAITS
};

// Export category-specific skills
export {
  AGILITY_SKILLS,
  DEVIOUS_SKILLS,
  GENERAL_SKILLS,
  MUTATION_SKILLS,
  PASSING_SKILLS,
  STRENGTH_SKILLS
};

// Export skills organized by category code (A, D, G, M, P, S)
export const SKILLS_BY_CATEGORY = {
  A: Object.keys(AGILITY_SKILLS),
  D: Object.keys(DEVIOUS_SKILLS),
  G: Object.keys(GENERAL_SKILLS),
  M: Object.keys(MUTATION_SKILLS),
  P: Object.keys(PASSING_SKILLS),
  S: Object.keys(STRENGTH_SKILLS)
};

// Helper function to get a skill by name
export const getSkill = (skillName) => {
  return ALL_SKILLS[skillName] || null;
};

// Helper function to get all skills in a category
export const getSkillsByCategory = (categoryCode) => {
  const skillNames = SKILLS_BY_CATEGORY[categoryCode] || [];
  return skillNames.map(name => ALL_SKILLS[name]);
};

// Helper function to check if a skill exists
export const skillExists = (skillName) => {
  return skillName in ALL_SKILLS;
};
