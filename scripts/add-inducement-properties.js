// Script to add cheapBribes, cheapMasterChef, hasApothecary to team files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map of team names to their inducement properties (from current T object)
const inducementProperties = {
  "Amazon": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Black Orc": { cheapBribes: true, cheapMasterChef: false, hasApothecary: true },
  "Bretonnian": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Chaos Chosen": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Chaos Dwarf": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Chaos Renegade": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Dark Elf": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Dwarf": { cheapBribes: true, cheapMasterChef: false, hasApothecary: true },
  "Elf Union": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Gnome": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Goblin": { cheapBribes: true, cheapMasterChef: false, hasApothecary: true },
  "Halfling": { cheapBribes: false, cheapMasterChef: true, hasApothecary: true },
  "Human": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Imperial Nobility": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Khorne": { cheapBribes: false, cheapMasterChef: false, hasApothecary: false },
  "Lizardmen": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Necromantic Horror": { cheapBribes: false, cheapMasterChef: false, hasApothecary: false },
  "Norse": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Nurgle": { cheapBribes: false, cheapMasterChef: false, hasApothecary: false },
  "Ogre": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Old World Alliance": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Orc": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Shambling Undead": { cheapBribes: false, cheapMasterChef: false, hasApothecary: false },
  "Skaven": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
  "Snotling": { cheapBribes: true, cheapMasterChef: false, hasApothecary: true },
  "Tomb King": { cheapBribes: false, cheapMasterChef: false, hasApothecary: false },
  "Underworld Denizens": { cheapBribes: true, cheapMasterChef: false, hasApothecary: true },
  "Vampire": { cheapBribes: false, cheapMasterChef: false, hasApothecary: false },
  "Wood Elf": { cheapBribes: false, cheapMasterChef: false, hasApothecary: true },
};

// Map team names to file names
const fileNameMap = {
  "Amazon": "amazon.js",
  "Black Orc": "black-orc.js",
  "Bretonnian": "bretonnian.js",
  "Chaos Chosen": "chaos-chosen.js",
  "Chaos Dwarf": "chaos-dwarf.js",
  "Chaos Renegade": "chaos-renegade.js",
  "Dark Elf": "dark-elf.js",
  "Dwarf": "dwarf.js",
  "Elf Union": "elf-union.js",
  "Gnome": "gnome.js",
  "Goblin": "goblin.js",
  "Halfling": "halfling.js",
  "Human": "human.js",
  "Imperial Nobility": "imperial-nobility.js",
  "Khorne": "khorne.js",
  "Lizardmen": "lizardmen.js",
  "Necromantic Horror": "necromantic-horror.js",
  "Norse": "norse.js",
  "Nurgle": "nurgle.js",
  "Ogre": "ogre.js",
  "Old World Alliance": "old-world-alliance.js",
  "Orc": "orc.js",
  "Shambling Undead": "shambling-undead.js",
  "Skaven": "skaven.js",
  "Snotling": "snotling.js",
  "Tomb King": "tomb-king.js",
  "Underworld Denizens": "underworld-denizens.js",
  "Vampire": "vampire.js",
  "Wood Elf": "wood-elf.js",
};

const teamsDir = path.join(__dirname, '..', 'src', 'data', 'teams');

// Process each team file
for (const [teamName, props] of Object.entries(inducementProperties)) {
  const fileName = fileNameMap[teamName];
  const filePath = path.join(teamsDir, fileName);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${fileName}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the position to insert the properties (after rerollCost line)
  const insertAfter = 'rerollCost: ';
  const rerollLine = content.split('\n').findIndex(line => line.includes(insertAfter));
  
  if (rerollLine === -1) {
    console.log(`⚠️  Could not find rerollCost in ${fileName}`);
    continue;
  }
  
  const lines = content.split('\n');
  const rerollLineContent = lines[rerollLine];
  const commaPos = rerollLineContent.indexOf(',');
  
  // Insert the new properties after the rerollCost line
  const newProperties = `
  cheapBribes: ${props.cheapBribes},
  cheapMasterChef: ${props.cheapMasterChef},
  hasApothecary: ${props.hasApothecary},`;
  
  lines.splice(rerollLine + 1, 0, newProperties);
  
  const newContent = lines.join('\n');
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  console.log(`✅ Updated ${fileName}`);
}

console.log('\n🎉 All team files updated with inducement properties!');
