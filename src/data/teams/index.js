// Import all teams
import { Amazon } from './amazon';
import { BlackOrc } from './black-orc';
import { Bretonnian } from './bretonnian';
import { ChaosChosen } from './chaos-chosen';
import { ChaosDwarf } from './chaos-dwarf';
import { ChaosRenegade } from './chaos-renegade';
import { DarkElf } from './dark-elf';
import { Dwarf } from './dwarf';
import { ElfUnion } from './elf-union';
import { Gnome } from './gnome';
import { Goblin } from './goblin';
import { Halfling } from './halfling';
import { Human } from './human';
import { ImperialNobility } from './imperial-nobility';
import { Khorne } from './khorne';
import { Lizardmen } from './lizardmen';
import { NecromanticHorror } from './necromantic-horror';
import { Norse } from './norse';
import { Nurgle } from './nurgle';
import { Ogre } from './ogre';
import { OldWorldAlliance } from './old-world-alliance';
import { Orc } from './orc';
import { ShamblingUndead } from './shambling-undead';
import { Skaven } from './skaven';
import { Snotling } from './snotling';
import { TombKing } from './tomb-king';
import { UnderworldDenizens } from './underworld-denizens';
import { Vampire } from './vampire';
import { WoodElf } from './wood-elf';

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
  "Tomb King": TombKing,
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
