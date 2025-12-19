// Import all teams
import { Amazon } from './amazon.js';
import { BlackOrc } from './black-orc.js';
import { Bretonnian } from './bretonnian.js';
import { ChaosChosen } from './chaos-chosen.js';
import { ChaosDwarf } from './chaos-dwarf.js';
import { ChaosRenegade } from './chaos-renegade.js';
import { DarkElf } from './dark-elf.js';
import { Dwarf } from './dwarf.js';
import { ElfUnion } from './elf-union.js';
import { Gnome } from './gnome.js';
import { Goblin } from './goblin.js';
import { Halfling } from './halfling.js';
import { Human } from './human.js';
import { ImperialNobility } from './imperial-nobility.js';
import { Khorne } from './khorne.js';
import { Lizardmen } from './lizardmen.js';
import { NecromanticHorror } from './necromantic-horror.js';
import { Norse } from './norse.js';
import { Nurgle } from './nurgle.js';
import { Ogre } from './ogre.js';
import { OldWorldAlliance } from './old-world-alliance.js';
import { Orc } from './orc.js';
import { ShamblingUndead } from './shambling-undead.js';
import { Skaven } from './skaven.js';
import { Snotling } from './snotling.js';
import { TombKing } from './tomb-king.js';
import { UnderworldDenizens } from './underworld-denizens.js';
import { Vampire } from './vampire.js';
import { WoodElf } from './wood-elf.js';

// Export all teams as an object keyed by team name
// This allows easy lookup: TEAMS["Human"] or TEAMS[selectedTeam]
export const TEAMS = {
  "Amazon": Amazon,
  "Black Orc": BlackOrc,
  "Bretonnian": Bretonnian,
  "Chaos Chosen": ChaosChosen,
  "Chaos Dwarf": ChaosDwarf,
  "Chaos Renegade": ChaosRenegade,
  "Dark Elf": DarkElf,
  "Dwarf": Dwarf,
  "Elf Union": ElfUnion,
  "Gnome": Gnome,
  "Goblin": Goblin,
  "Halfling": Halfling,
  "Human": Human,
  "Imperial Nobility": ImperialNobility,
  "Khorne": Khorne,
  "Lizardmen": Lizardmen,
  "Necromantic Horror": NecromanticHorror,
  "Norse": Norse,
  "Nurgle": Nurgle,
  "Ogre": Ogre,
  "Old World Alliance": OldWorldAlliance,
  "Orc": Orc,
  "Shambling Undead": ShamblingUndead,
  "Skaven": Skaven,
  "Snotling": Snotling,
  "Tomb Kings": TombKing,
  "Underworld Denizens": UnderworldDenizens,
  "Vampire": Vampire,
  "Wood Elf": WoodElf,
};

// Get team names in alphabetical order for dropdown
export const TEAM_NAMES = Object.keys(TEAMS).sort();

// Helper function to get a team by name
export const getTeam = (teamName) => TEAMS[teamName];

// Helper function to get position skill access
export const getPositionSkillAccess = (teamName, positionName) => {
  const team = TEAMS[teamName];
  if (!team) return null;
  
  const position = team.positions.find(pos => pos.name === positionName);
  return position?.skillAccess || null;
};
