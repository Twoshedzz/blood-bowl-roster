import React, { useState, useMemo } from 'react';
import { Plus, Minus, Trash2, Eye, Printer, ArrowLeft } from 'lucide-react';

const STARTING_TREASURY = 1000000;

// Miniature purchase links for each team
const TEAM_MINIATURE_LINKS = {
  "Amazon": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/fr-FR/blood-bowl-amazon-team-2022" },
    { name: "Fireforge Games", url: "https://fireforge-games.com/fantasy-football/253-amazon-smashers.html" },
    { name: "Greebo Games", url: "https://greebo-games.com/karimat-amazons/35452-karimat-team-bundle.html" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/product/amazon-team-16-players/" }
  ],
  "Black Orc": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/etb-blood-bowl-black-orc-team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Hungry Troll", url: "https://hungrytrollminiatures.com/" }
  ],
  "Bretonnian": [
    { name: "Hungry Troll (Sacré Graal)", url: "https://hungrytrollminiatures.com/bretonia/333-bretonians-quest-box-metal.html" }
  ],
  "Chaos Chosen": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Chaos-Chosen-Team-2022" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ],
  "Chaos Dwarf": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Chaos-Dwarf-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Hungry Troll", url: "https://hungrytrollminiatures.com/" }
  ],
  "Chaos Renegade": [
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ],
  "Dark Elf": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Dark-Elf-Team-2023" },
    { name: "Fireforge Games", url: "https://fireforge-games.com/" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Dwarf": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Dwarf-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ],
  "Elf Union": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Elven-Union-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Gnome": [
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ],
  "Goblin": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/etb-blood-bowl-goblin-team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ],
  "Halfling": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/blood-bowl-halfling-team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ],
  "Human": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Human-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ],
  "Imperial Nobility": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Imperial-Nobility-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Khorne": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Khorne-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Lizardmen": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Lizardmen-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ],
  "Necromantic Horror": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Necromantic-Horror-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Norse": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Norse-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ],
  "Nurgle": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Nurgle-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Ogre": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Ogre-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ],
  "Old World Alliance": [
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ],
  "Orc": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Orc-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ],
  "Shambling Undead": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Shambling-Undead-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Skaven": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Skaven-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Willy Miniatures", url: "http://willyminiatures.com/" }
  ],
  "Snotling": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Snotling-Team-2021" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Tomb King": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Khemri-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Underworld Denizens": [
    { name: "Greebo Games", url: "https://greebo-games.com/netherus-underworld/35785-netherus-underwrold-team-bundle.html" },
    { name: "Goblin Guild", url: "https://goblinguildminiatures.com/en/green-ratz/14-green-ratz-team-underworld.html" },
    { name: "Punga Miniatures", url: "https://pungaminiatures.com/underworld" }
  ],
  "Vampire": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Vampire-Team-2023" },
    { name: "Greebo Games", url: "https://greebo-games.com/" }
  ],
  "Wood Elf": [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Wood-Elf-Team-2022" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};

// Base inducements (cost can vary by team)
const getInducements = (teamName) => {
  const bribeCost = teamName === "Goblin" ? 50000 : 100000;
  return [
    {name:"Bribes", cost: bribeCost},
    {name:"Apothecary", cost:50000},
    {name:"Coaches", cost:10000},
    {name:"Cheerleaders", cost:10000},
    {name:"Fans", cost:10000},
    {name:"Kegs", cost:50000},
    {name:"Masterchef", cost:300000}
  ];
};

// Blood Bowl 2025 Edition team data: l=league, r=reroll cost, p=positions, n=name, c=cost, m=max, s=stats, k=skills
const T = {
  Amazon:{l:"Lustrian Superleague",r:60000,p:[{n:"Lino",c:50000,m:16,s:"6/3/3+/4+/8+",k:"Dodge"},{n:"Thrower",c:80000,m:2,s:"6/3/3+/3+/8+",k:"Dodge, On the Ball, Pass, Safe Pass"},{n:"Blitzer",c:90000,m:2,s:"7/3/3+/4+/8+",k:"Dodge, Hit and Run, Jump Up"},{n:"Blocker",c:110000,m:2,s:"6/4/3+/4+/9+",k:"Defensive, Dodge"}]},
  "Black Orc":{l:"Badlands Brawl",r:60000,p:[{n:"Goblin",c:45000,m:16,s:"6/2/3+/4+/8+",k:"Dodge, Right Stuff, Stunty, Thick Skull"},{n:"Black Orc",c:90000,m:6,s:"4/4/4+/5+/10+",k:"Brawler, Grab"},{n:"Troll",c:115000,m:1,s:"4/5/5+/5+/10+",k:"Always Hungry, Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate"}]},
  Bretonnian:{l:"Old World Classic",r:60000,p:[{n:"Squire",c:50000,m:16,s:"6/3/3+/4+/8+",k:"Wrestle"},{n:"Catcher",c:85000,m:2,s:"7/3/3+/4+/9+",k:"Catch, Dauntless, Nerves of Steel"},{n:"Thrower",c:80000,m:2,s:"6/3/3+/3+/9+",k:"Dauntless, Nerves of Steel, Pass"},{n:"Grail Knight",c:95000,m:2,s:"7/3/3+/4+/10+",k:"Block, Dauntless, Steady Footing"}]},
  "Chaos Chosen":{l:"Chaos Clash",r:50000,p:[{n:"Beastman",c:55000,m:16,s:"6/3/3+/3+/9+",k:"Horns, Thick Skull"},{n:"Chosen",c:100000,m:4,s:"5/4/3+/5+/10+",k:"Arm Bar"},{n:"Troll",c:115000,m:1,s:"4/5/5+/5+/10+",k:"Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate"},{n:"Ogre",c:140000,m:1,s:"5/5/4+/5+/10+",k:"Bone Head, Loner (4+), Mighty Blow, Thick Skull, Throw Team-mate"},{n:"Minotaur",c:150000,m:1,s:"5/5/4+/6+/9+",k:"Frenzy, Horns, Loner (4+), Mighty Blow, Thick Skull, Unchannelled Fury"}]},
  "Chaos Dwarf":{l:"Badlands Brawl or Chaos Clash",r:70000,p:[{n:"Hobgoblin",c:40000,m:16,s:"6/3/3+/4+/8+",k:"-"},{n:"Stabba",c:60000,m:2,s:"6/3/3+/5+/8+",k:"Shadowing, Stab"},{n:"Blocker",c:70000,m:4,s:"4/3/4+/6+/10+",k:"Block, Iron Hard Skin, Thick Skull"},{n:"Flamer",c:80000,m:2,s:"5/3/4+/6+/10+",k:"Brawler, Breathe Fire, Disturbing Presence, Thick Skull"},{n:"Bull Centaur",c:130000,m:2,s:"6/4/4+/6+/10+",k:"Sprint, Sure Feet, Thick Skull, Unsteady"},{n:"Minotaur",c:150000,m:1,s:"5/5/4+/6+/9+",k:"Frenzy, Horns, Loner (4+), Mighty Blow, Thick Skull, Unchannelled Fury"}]},
  "Chaos Renegade":{l:"Chaos Clash",r:70000,p:[{n:"Lineman",c:50000,m:16,s:"6/3/3+/4+/9+",k:"Animosity (all)"},{n:"Goblin",c:40000,m:1,s:"3/2/3+/4+/8+",k:"Animosity (all), Dodge, Right Stuff, Stunty"},{n:"Orc",c:50000,m:1,s:"5/3/3+/4+/10+",k:"Animosity (all)"},{n:"Skaven",c:50000,m:1,s:"7/3/3+/4+/8+",k:"Animosity (all)"},{n:"DarkElf",c:65000,m:1,s:"6/3/2+/3+/9+",k:"Animosity (all)"},{n:"Thrower",c:75000,m:1,s:"6/3/3+/3+/9+",k:"Animosity (all), Pass, Sure Hands"},{n:"Troll",c:115000,m:1,s:"4/5/5+/5+/10+",k:"Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate"},{n:"Ogre",c:140000,m:1,s:"5/5/4+/5+/10+",k:"Bone Head, Loner (4+), Thick Skull, Throw Team-mate"},{n:"Minotaur",c:150000,m:1,s:"5/5/4+/6+/9+",k:"Frenzy, Horns, Loner (4+), Mighty Blow, Thick Skull, Unchannelled Fury"},{n:"RatOgre",c:150000,m:1,s:"6/5/4+/6+/9+",k:"Animal Savagery, Frenzy, Loner (4+), Mighty Blow, Prehensile Tail"}]},
  "Dark Elf":{l:"Elven Kingdoms League",r:50000,p:[{n:"Lineman",c:65000,m:16,s:"6/3/2+/3+/9+",k:"-"},{n:"Runner",c:80000,m:2,s:"7/3/2+/3+/8+",k:"Dump-Off, Punt"},{n:"Assassin",c:90000,m:2,s:"7/3/2+/4+/8+",k:"Hit and Run, Shadowing, Stab"},{n:"Blitzer",c:105000,m:2,s:"7/3/2+/3+/9+",k:"Block"},{n:"Witch Elf",c:110000,m:2,s:"7/3/2+/4+/8+",k:"Dodge, Frenzy, Jump Up"}]},
  Dwarf:{l:"Worlds Edge Superleague",r:60000,p:[{n:"Lineman",c:70000,m:16,s:"4/3/4+/5+/10+",k:"Block, Defensive, Thick Skull"},{n:"Runner",c:80000,m:2,s:"6/3/3+/4+/9+",k:"Sprint, Sure Hands, Thick Skull"},{n:"Blitzer",c:100000,m:2,s:"5/3/4+/4+/10+",k:"Block, Diving Tackle, Tackle, Thick Skull"},{n:"Troll Slayer",c:95000,m:2,s:"5/3/4+/5+/9+",k:"Block, Dauntless, Frenzy, Hatred (Troll), Thick Skull"},{n:"Deathroller",c:170000,m:1,s:"5/7/5+/-/11+",k:"Break Tackle, Dirty Player, Juggernaut, Loner (4+), Mighty Blow, No Ball, Secret Weapon, Stand Firm"}]},
  "Elf Union":{l:"Elven Kingdoms League",r:50000,p:[{n:"Lineman",c:65000,m:16,s:"6/3/2+/3+/8+",k:"Fumblerooski"},{n:"Thrower",c:75000,m:2,s:"6/3/2+/2+/8+",k:"Hail Mary Pass, Pass"},{n:"Catcher",c:100000,m:2,s:"8/3/2+/4+/8+",k:"Catch, Diving Catch, Nerves of Steel"},{n:"Blitzer",c:115000,m:2,s:"7/3/2+/3+/9+",k:"Block, Sidestep"}]},
  Gnome:{l:"Halfling Thimble Cup or Woodland League",r:50000,p:[{n:"Lineman",c:40000,m:16,s:"5/2/3+/4+/7+",k:"Jump Up, Right Stuff, Stunty, Wrestle"},{n:"Fox",c:50000,m:2,s:"7/2/2+/-/6+",k:"Dodge, My Ball, Sidestep, Stunty"},{n:"Illusionist",c:50000,m:2,s:"5/2/3+/3+/7+",k:"Jump Up, Stunty, Trickster, Wrestle"},{n:"Beastmaster",c:55000,m:2,s:"5/2/3+/4+/8+",k:"Guard, Jump Up, Stunty, Wrestle"},{n:"Treeman",c:120000,m:2,s:"2/6/5+/5+/11+",k:"Mighty Blow, Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate, Timmm-ber!"}]},
  Goblin:{l:"Badlands Brawl or Underworld Challenge",r:60000,p:[{n:"Lineman",c:40000,m:16,s:"6/2/3+/4+/8+",k:"Dodge, Right Stuff, Stunty"},{n:"Loony",c:40000,m:1,s:"6/2/3+/-/8+",k:"Chainsaw, No Ball, Secret Weapon, Stunty"},{n:"Bomma",c:45000,m:1,s:"6/2/3+/4+/8+",k:"Bombardier, Dodge, Secret Weapon, Stunty"},{n:"Ooligan",c:60000,m:1,s:"6/2/3+/5+/8+",k:"Dirty Player, Disturbing Presence, Dodge, Right Stuff, Stunty, Taunt"},{n:"Doom Diver",c:65000,m:1,s:"6/2/3+/6+/8+",k:"Dodge, Right Stuff, Stunty, Swoop"},{n:"Fanatic",c:70000,m:1,s:"3/7/3+/-/8+",k:"Ball & Chain, No Ball, Secret Weapon, Stunty"},{n:"Pogoer",c:75000,m:1,s:"7/2/3+/4+/8+",k:"Dodge, Pogo Stick, Stunty"},{n:"Troll",c:115000,m:2,s:"4/5/5+/5+/10+",k:"Always Hungry, Mighty Blow (+1), Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate"}]},
  Halfling:{l:"Halfling Thimble Cup or Woodland League",r:60000,p:[{n:"Lineman",c:30000,m:16,s:"5/2/3+/4+/7+",k:"Dodge, Right Stuff, Stunty"},{n:"Hefty",c:50000,m:2,s:"5/2/3+/3+/8+",k:"Dodge, Fend, Stunty"},{n:"Catcher",c:55000,m:2,s:"5/2/3+/5+/7+",k:"Catch, Dodge, Right Stuff, Sprint, Stunty"},{n:"Treeman",c:120000,m:2,s:"2/6/5+/5+/11+",k:"Mighty Blow (+1), Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate, Timmm-ber!"}]},
  Human:{l:"Old World Classic",r:50000,p:[{n:"Lineman",c:50000,m:16,s:"6/3/3+/4+/9+",k:"-"},{n:"Halfling",c:30000,m:3,s:"5/2/3+/4+/7+",k:"Dodge, Right Stuff, Stunty"},{n:"Catcher",c:75000,m:2,s:"8/3/3+/4+/8+",k:"Catch, Dodge"},{n:"Thrower",c:75000,m:2,s:"6/3/3+/3+/9+",k:"Pass, Sure Hands"},{n:"Blitzer",c:85000,m:2,s:"7/3/3+/4+/9+",k:"Block, Tackle"},{n:"Ogre",c:140000,m:1,s:"5/5/4+/5+/10+",k:"Bone Head, Loner (3+), Mighty Blow, Thick Skull, Throw Team-mate"}]},
  "Imperial Nobility":{l:"Old World Classic",r:60000,p:[{n:"Retainer",c:45000,m:16,s:"6/3/3+/4+/8+",k:"Fend"},{n:"Thrower",c:75000,m:2,s:"6/3/3+/2+/9+",k:"Give and Go, Pass, Pro"},{n:"Bodyguard",c:85000,m:4,s:"5/3/3+/4+/9+",k:"Stand Firm, Wrestle"},{n:"Blitzer",c:90000,m:2,s:"7/3/3+/4+/9+",k:"Block, Catch, Pro"},{n:"Ogre",c:140000,m:1,s:"5/5/4+/5+/10+",k:"Bone Head, Loner (3+), Mighty Blow, Thick Skull, Throw Team-mate"}]},
  Khorne:{l:"Chaos Clash",r:60000,p:[{n:"Marauder",c:50000,m:16,s:"6/3/3+/4+/8+",k:"Frenzy"},{n:"Khorngor",c:70000,m:2,s:"6/3/3+/4+/9+",k:"Horns, Juggernaut, Jump Up, Thick Skull"},{n:"Bloodseeker",c:105000,m:4,s:"5/4/4+/6+/10+",k:"Frenzy"},{n:"Bloodspawn",c:160000,m:1,s:"5/5/4+/6+/9+",k:"Claws, Frenzy, Loner (4+), Mighty Blow, Unchannelled Fury"}]},
  Lizardmen:{l:"Lustrian Superleague",r:70000,p:[{n:"Skink",c:60000,m:16,s:"8/2/3+/4+/8+",k:"Dodge, Stunty"},{n:"Chameleon",c:70000,m:2,s:"7/2/3+/3+/8+",k:"Dodge, On The Ball, Shadowing, Stunty"},{n:"Saurus",c:90000,m:6,s:"6/4/5+/6+/10+",k:"Juggernaut, Unsteady"},{n:"Krox",c:140000,m:1,s:"6/5/5+/6+/10+",k:"Bone Head, Loner (4+), Mighty Blow, Prehensile Tail, Thick Skull"}]},
  "Necromantic Horror":{l:"Sylvannian Spotlight",r:70000,p:[{n:"Zombie",c:40000,m:16,s:"4/3/4+/6+/9+",k:"Eye Gouge, Regeneration, Unsteady"},{n:"Ghoul",c:75000,m:2,s:"7/3/3+/3+/8+",k:"Dodge, Regeneration"},{n:"Wraith",c:85000,m:2,s:"6/3/3+/-/9+",k:"Block, Foul Appearance, No Hands, Regeneration, Sidestep"},{n:"Flesh Golem",c:110000,m:2,s:"4/4/4+/6+/10+",k:"Regeneration, Stand Firm, Thick Skull, Unsteady"},{n:"Werewolf",c:120000,m:2,s:"8/3/3+/3+/9+",k:"Claws, Frenzy, Regeneration"}]},
  Norse:{l:"Chaos Clash or Old World Classic",r:60000,p:[{n:"Raider",c:50000,m:16,s:"6/3/3+/4+/8+",k:"Block, Drunkard, Thick Skull, Unsteady"},{n:"Boar",c:20000,m:2,s:"5/1/3+/-/6+",k:"Dodge, No Ball, Pick-me-up, Stunty, Titchy"},{n:"Berserker",c:90000,m:2,s:"6/3/3+/5+/8+",k:"Block, Frenzy, Jump Up"},{n:"Valkyrie",c:95000,m:2,s:"7/3/3+/3+/8+",k:"Catch, Dauntless, Pass, Strip Ball"},{n:"Ulfwerner",c:105000,m:2,s:"6/4/4+/6+/9+",k:"Frenzy, Unsteady"},{n:"Yhetee",c:140000,m:1,s:"5/5/4+/6+/9+",k:"Claws, Disturbing Presence, Frenzy, Loner (4+), Unchannelled Fury"}]},
  Nurgle:{l:"Chaos Clash",r:60000,p:[{n:"Rotter",c:40000,m:16,s:"5/3/4+/6+/9+",k:"Decay, Plague Ridden"},{n:"Pestigor",c:70000,m:2,s:"6/3/3+/4+/9+",k:"Horns, Plague Ridden, Regeneration, Steady Footing, Thick Skull"},{n:"Bloater",c:110000,m:4,s:"4/4/4+/6+/10+",k:"Disturbing Presence, Foul Appearance, Plague Ridden, Regeneration, Stand Firm, Unsteady"},{n:"Rotspawn",c:140000,m:1,s:"4/5/5+/6+/10+",k:"Disturbing Presence, Foul Appearance, Loner (4+), Mighty Blow, Pick-me-up, Plague Ridden, Really Stupid, Regeneration, Tentacles"}]},
  Ogre:{l:"Badlands Brawl or Worlds Edge Superleague",r:70000,p:[{n:"Gnoblar",c:15000,m:16,s:"5/1/3+/4+/6+",k:"Dodge, Right Stuff, Sidestep, Stunty, Titchy"},{n:"Ogre",c:140000,m:5,s:"5/5/4+/5+/10+",k:"Bone Head, Mighty Blow, Thick Skull, Throw Team-mate"},{n:"Punter",c:145000,m:1,s:"5/5/4+/4+/10+",k:"Bone Head, Kick Team-mate, Mighty Blow, Thick Skull"}]},
  "Old World Alliance":{l:"Old World Classic",r:70000,p:[{n:"Lineman",c:50000,m:16,s:"6/3/3+/4+/9+",k:"-"},{n:"Halfling",c:30000,m:5,s:"5/2/3+/4+/7+",k:"Dodge, Right Stuff, Stunty"},{n:"Catcher",c:75000,m:1,s:"8/3/3+/4+/8+",k:"Catch, Dodge"},{n:"Dwarf Blocker",c:70000,m:3,s:"4/3/4+/5+/10+",k:"Block, Defensive, Thick Skull"},{n:"Thrower",c:75000,m:1,s:"6/3/3+/3+/9+",k:"Pass, Sure Hands"},{n:"Runner",c:80000,m:1,s:"6/3/3+/4+/9+",k:"Sprint, Sure Hands, Thick Skull"},{n:"Human Blitzer",c:85000,m:1,s:"7/3/3+/4+/9+",k:"Block, Tackle"},{n:"Dwarf Blitzer",c:100000,m:1,s:"5/3/4+/4+/10+",k:"Block, Diving Tackle, Tackle, Thick Skull"},{n:"Troll Slayer",c:95000,m:1,s:"5/3/4+/5+/9+",k:"Block, Dauntless, Frenzy, Hatred (Troll), Thick Skull"},{n:"Ogre",c:140000,m:1,s:"5/5/4+/5+/10+",k:"Bone Head, Loner (3+), Mighty Blow, Thick Skull, Throw Team-mate"},{n:"Treeman",c:120000,m:1,s:"2/6/5+/5+/11+",k:"Mighty Blow, Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate, Timmm-ber!"}]},
  Orc:{l:"Badlands Brawl",r:60000,p:[{n:"Lineman",c:50000,m:16,s:"5/3/3+/4+/10+",k:"-"},{n:"Goblin",c:40000,m:4,s:"6/2/3+/3+/8+",k:"Dodge, Right Stuff, Stunty"},{n:"Thrower",c:75000,m:2,s:"6/3/3+/3+/9+",k:"Pass, Sure Hands"},{n:"Blitzer",c:85000,m:2,s:"6/3/3+/4+/10+",k:"Block, Break Tackle"},{n:"Big Un",c:95000,m:2,s:"5/4/4+/6+/10+",k:"Mighty Blow, Taunt, Thick Skull, Unsteady"},{n:"Troll",c:115000,m:1,s:"4/5/5+/5+/10+",k:"Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate"}]},
  "Shambling Undead":{l:"Sylvanian Spotlight",r:70000,p:[{n:"Skeleton",c:40000,m:16,s:"5/3/4+/6+/8+",k:"Regeneration, Thick Skull"},{n:"Zombie",c:40000,m:16,s:"4/3/4+/6+/9+",k:"Eye Gouge, Regeneration, Unsteady"},{n:"Ghoul",c:75000,m:2,s:"7/3/3+/3+/8+",k:"Dodge, Regeneration"},{n:"Wight",c:95000,m:2,s:"6/3/3+/5+/9+",k:"Block, Regeneration, Tackle, Thick Skull"},{n:"Mummy",c:125000,m:2,s:"3/5/5+/6+/10+",k:"Mighty Blow, Regeneration"}]},
  Skaven:{l:"Underworld Challenge",r:50000,p:[{n:"Clanrat",c:50000,m:16,s:"7/3/3+/4+/8+",k:"-"},{n:"Thrower",c:80000,m:2,s:"7/3/3+/2+/8+",k:"Pass, Sure Hands"},{n:"Gutter",c:85000,m:2,s:"9/2/2+/4+/8+",k:"Dodge, Stab"},{n:"Blitzer",c:90000,m:2,s:"8/3/3+/4+/9+",k:"Block, Strip Ball"},{n:"Rat Ogre",c:150000,m:1,s:"6/5/4+/6+/9+",k:"Animal Savagery, Frenzy, Loner (4+), Mighty Blow, Prehensile Tail"}]},
  Snotling:{l:"Underworld Challenge",r:70000,p:[{n:"Lineman",c:15000,m:16,s:"5/1/3+/4+/6+",k:"Dodge, Insignificant, Right Stuff, Sidestep, Stunty, Titchy"},{n:"Hoppa",c:20000,m:2,s:"6/1/3+/4+/6+",k:"Dodge, Pogo, Right Stuff, Sidestep, Stunty"},{n:"Runna",c:20000,m:2,s:"6/1/3+/4+/6+",k:"Dodge, Right Stuff, Sidestep, Sprint, Stunty"},{n:"Flinga",c:30000,m:2,s:"5/1/3+/4+/6+",k:"Bombardier, Dodge, Right Stuff, Secret Weapon, Sidestep, Stunty, Titchy"},{n:"Pump Wagon",c:100000,m:2,s:"5/5/5+/6+/9+",k:"Dirty Player, Juggernaut, Mighty Blow, Really Stupid, Stand Firm"},{n:"Troll",c:115000,m:2,s:"4/5/5+/5+/10+",k:"Always Hungry, Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate"}]},
  "Tomb King":{l:"Sylvannian Spotlight",r:60000,p:[{n:"Lineman",c:40000,m:16,s:"5/3/4+/6+/8+",k:"Regeneration, Thick Skull"},{n:"Thrower",c:65000,m:2,s:"6/3/4+/3+/9+",k:"Pass, Regeneration, Sure Hands, Thick Skull"},{n:"Blitzer",c:85000,m:2,s:"6/3/4+/5+/9+",k:"Block, Regeneration, Thick Skull"},{n:"Tomb Guardian",c:115000,m:4,s:"4/5/5+/6+/10+",k:"Brawler, Decay, Regeneration"}]},
  "Underworld Denizens":{l:"Underworld Challenge",r:70000,p:[{n:"Goblin",c:40000,m:16,s:"6/2/3+/4+/8+",k:"Dodge, Right Stuff, Stunty"},{n:"Snotling",c:15000,m:6,s:"5/1/3+/4+/6+",k:"Dodge, Insignificant, Right Stuff, Sidestep, Stunty, Titchy"},{n:"Clanrat",c:50000,m:3,s:"7/3/3+/4+/8+",k:"Animosity (Goblin)"},{n:"Thrower",c:80000,m:1,s:"7/3/3+/2+/8+",k:"Animosity (Goblin), Pass, Sure Hands"},{n:"Gutter",c:85000,m:1,s:"9/2/2+/4+/8+",k:"Animosity (Goblin), Dodge, Stab"},{n:"Blitzer",c:90000,m:1,s:"8/3/3+/4+/9+",k:"Animosity (Goblin), Block, Strip Ball"},{n:"Troll",c:115000,m:1,s:"4/5/5+/5+/10+",k:"Always Hungry, Loner (4+), Mighty Blow, Projectile Vomit, Really Stupid, Regeneration, Throw Team-mate"},{n:"Rat Ogre",c:150000,m:1,s:"6/5/4+/6+/9+",k:"Animal Savagery, Frenzy, Loner (4+), Mighty Blow, Prehensile Tail"}]},
  Vampire:{l:"Sylvannian Spotlight",r:60000,p:[{n:"Thrall",c:40000,m:16,s:"6/3/3+/4+/8+",k:"-"},{n:"Runner",c:100000,m:2,s:"8/3/2+/3+/8+",k:"Bloodlust (2+), Hypnotic Gaze, Regeneration"},{n:"Thrower",c:110000,m:2,s:"6/4/2+/2+/9+",k:"Bloodlust (2+), Hypnotic Gaze, Pass, Regeneration"},{n:"Blitzer",c:110000,m:2,s:"6/4/2+/4+/9+",k:"Bloodlust (3+), Hypnotic Gaze, Juggernaut, Regeneration"},{n:"Vargheist",c:150000,m:1,s:"5/5/4+/6+/10+",k:"Bloodlust (3+), Claws, Frenzy, Loner (4+), Regeneration"}]},
  "Wood Elf":{l:"Elven Kingdoms League or Woodland League",r:50000,p:[{n:"Lineman",c:65000,m:16,s:"7/3/2+/3+/8+",k:"-"},{n:"Thrower",c:85000,m:2,s:"7/3/2+/2+/8+",k:"Pass, Safe Pair of Hands"},{n:"Catcher",c:90000,m:2,s:"8/2/2+/3+/8+",k:"Catch, Dodge, Sprint"},{n:"Wardancer",c:130000,m:2,s:"8/3/2+/3+/8+",k:"Block, Dodge, Leap"},{n:"Treeman",c:120000,m:1,s:"2/6/5+/5+/11+",k:"Loner (4+), Mighty Blow, Stand Firm, Strong Arm, Take Root, Thick Skull, Throw Team-mate"}]}
};

export default function BloodBowlRoster() {
  const [selectedTeam, setSelectedTeam] = useState("Human");
  const [purchasedPlayers, setPurchasedPlayers] = useState([]);
  const [inducements, setInducements] = useState({});
  const [viewMode, setViewMode] = useState('build');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const teamData = T[selectedTeam];
  const INDUCEMENTS = getInducements(selectedTeam);

  const totalSpent = useMemo(() => {
    let cost = 0;
    purchasedPlayers.forEach(p => cost += p.c);
    const rerollCount = inducements["Rerolls"] || 0;
    cost += rerollCount * teamData.r;
    INDUCEMENTS.forEach(ind => {
      const count = inducements[ind.name] || 0;
      cost += count * ind.cost;
    });
    return cost;
  }, [purchasedPlayers, inducements, teamData]);

  const remaining = STARTING_TREASURY - totalSpent;

  const purchasePlayer = (position) => {
    if (remaining < position.c) return;
    const currentCount = purchasedPlayers.filter(p => p.n === position.n).length;
    if (currentCount >= position.m) return;
    const newPlayer = { ...position, id: Date.now() + Math.random() };
    setPurchasedPlayers([...purchasedPlayers, newPlayer]);
    console.log('Player purchased:', newPlayer, 'Total players:', purchasedPlayers.length + 1);
  };

  const removePlayer = (playerId) => {
    setPurchasedPlayers(purchasedPlayers.filter(p => p.id !== playerId));
  };

  const updateInducement = (indName, delta) => {
    setInducements(prev => {
      const current = prev[indName] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [indName]: newValue };
    });
  };

  const handleTeamChange = (team) => {
    // Always reset roster when changing teams
    setSelectedTeam(team);
    setPurchasedPlayers([]);
    setInducements({});
  };

  const resetRoster = () => {
    setPurchasedPlayers([]);
    setInducements({});
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newPlayers = [...purchasedPlayers];
    const draggedPlayer = newPlayers[draggedIndex];
    newPlayers.splice(draggedIndex, 1);
    newPlayers.splice(index, 0, draggedPlayer);
    
    setPurchasedPlayers(newPlayers);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handlePrint = () => window.print();

  const formatCost = (cost) => cost.toLocaleString() + " gp";

  const getPositionCount = (posName) => purchasedPlayers.filter(p => p.n === posName).length;

  const getInducementsList = () => {
    const list = [];
    const rerolls = inducements["Rerolls"] || 0;
    if (rerolls > 0) list.push(`Rerolls: ${rerolls}`);
    INDUCEMENTS.forEach(ind => {
      const count = inducements[ind.name] || 0;
      if (count > 0) list.push(`${ind.name}: ${count}`);
    });
    return list;
  };

  // Roster Grid View Mode
  if (viewMode === 'roster') {
    return (
      <div className="min-h-screen p-3" style={{ 
        background: 'linear-gradient(135deg, #F5EDE0 0%, #E8DDD0 50%, #DDD2C5 100%)',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Roboto+Condensed:wght@400;700&display=swap');
          * { font-family: 'Roboto Condensed', sans-serif; }
          h1, h2, h3, button { font-family: 'Teko', sans-serif; letter-spacing: 0.5px; }
        `}</style>

        <div className="max-w-[1800px] mx-auto">
          <div className="mb-3 flex gap-3">
            <button 
              onClick={() => setViewMode('build')}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-base flex items-center gap-2 transition-colors border border-blue-900"
            >
              <ArrowLeft size={18} />
              BACK
            </button>
            <button 
              onClick={() => setViewMode('view')}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold text-base flex items-center gap-2 transition-colors border border-blue-900"
            >
              <Printer size={18} />
              PRINT
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-red-600">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-blue-800">
              <div>
                <h1 className="text-3xl font-bold text-red-600">{selectedTeam}</h1>
                <p className="text-sm text-blue-900">{teamData.l}</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-blue-800 rounded px-3 py-1 border border-yellow-400 text-center">
                  <div className="text-yellow-400 text-xs font-bold">VALUE</div>
                  <div className="text-white text-base font-bold">{formatCost(totalSpent)}</div>
                </div>
                <div className="bg-blue-800 rounded px-3 py-1 border border-yellow-400 text-center">
                  <div className="text-yellow-400 text-xs font-bold">PLAYERS</div>
                  <div className="text-white text-base font-bold">{purchasedPlayers.length}</div>
                </div>
                <div className="bg-green-700 rounded px-3 py-1 border border-yellow-400 text-center">
                  <div className="text-yellow-400 text-xs font-bold">LEFT</div>
                  <div className={`text-base font-bold ${remaining < 0 ? 'text-red-300' : 'text-white'}`}>
                    {formatCost(remaining)}
                  </div>
                </div>
              </div>
            </div>

            {purchasedPlayers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">No players in roster yet</p>
                <button 
                  onClick={() => setViewMode('build')}
                  className="mt-3 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold text-base transition-colors border border-blue-900"
                >
                  START BUILDING
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="mb-2 text-sm text-blue-900 font-semibold">
                  💡 Drag rows to reorder players
                </div>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-red-600">
                      <th className="text-left p-2 text-white font-bold border border-blue-900">#</th>
                      <th className="text-left p-2 text-white font-bold border border-blue-900">POSITION</th>
                      <th className="text-center p-2 text-white font-bold border border-blue-900">MA</th>
                      <th className="text-center p-2 text-white font-bold border border-blue-900">ST</th>
                      <th className="text-center p-2 text-white font-bold border border-blue-900">AG</th>
                      <th className="text-center p-2 text-white font-bold border border-blue-900">PA</th>
                      <th className="text-center p-2 text-white font-bold border border-blue-900">AV</th>
                      <th className="text-left p-2 text-white font-bold border border-blue-900">SKILLS</th>
                      <th className="text-right p-2 text-white font-bold border border-blue-900">COST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchasedPlayers.map((player, idx) => {
                      const stats = player.s.split('/');
                      return (
                        <tr 
                          key={player.id} 
                          draggable
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDragEnd={handleDragEnd}
                          className={`transition-colors cursor-move ${
                            draggedIndex === idx 
                              ? 'bg-yellow-200 opacity-50' 
                              : 'bg-blue-100 hover:bg-blue-200'
                          }`}
                          style={{ userSelect: 'none' }}
                        >
                          <td className="p-1.5 text-blue-900 font-bold border border-blue-200 text-sm">{idx + 1}</td>
                          <td className="p-1.5 text-blue-900 font-semibold border border-blue-200">{player.n}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[0]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[1]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[2]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[3]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[4]}</td>
                          <td className="p-1.5 text-gray-700 text-xs border border-blue-200 leading-tight">{player.k || '-'}</td>
                          <td className="p-1.5 text-right text-blue-900 font-bold border border-blue-200 text-sm">{formatCost(player.c)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {getInducementsList().length > 0 && (
              <div className="mt-3 bg-blue-800 rounded p-2 border border-yellow-400">
                <h3 className="text-base font-bold text-white mb-2">INDUCEMENTS</h3>
                <div className="grid grid-cols-4 gap-2">
                  {getInducementsList().map((item, idx) => (
                    <div key={idx} className="text-white text-xs">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Print View Mode
  if (viewMode === 'view') {
    return (
      <div className="min-h-screen bg-white p-8">
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { margin: 0; padding: 20px; }
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto">
          <div className="no-print mb-6 flex gap-4">
            <button 
              onClick={() => setViewMode('build')}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <Printer size={20} />
              Print/PDF
            </button>
          </div>

          <div className="border border-gray-800 p-6">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-2">{selectedTeam}</h1>
              <p className="text-xl text-gray-600">{teamData.l} League</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="border border-gray-800 p-3">
                <div className="text-sm font-semibold text-gray-600">Team Value</div>
                <div className="text-2xl font-bold">{formatCost(totalSpent)}</div>
              </div>
              <div className="border border-gray-800 p-3">
                <div className="text-sm font-semibold text-gray-600">Players</div>
                <div className="text-2xl font-bold">{purchasedPlayers.length}</div>
              </div>
              <div className="border border-gray-800 p-3">
                <div className="text-sm font-semibold text-gray-600">Treasury</div>
                <div className="text-2xl font-bold">{formatCost(remaining)}</div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-800 pb-2">Roster</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-800">
                    <th className="text-left p-2 font-bold">#</th>
                    <th className="text-left p-2 font-bold">Position</th>
                    <th className="text-left p-2 font-bold">MA/ST/AG/PA/AV</th>
                    <th className="text-left p-2 font-bold">Skills</th>
                    <th className="text-right p-2 font-bold">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasedPlayers.map((player, idx) => (
                    <tr key={player.id} className="border-b border-gray-400">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2 font-semibold">{player.n}</td>
                      <td className="p-2 font-mono text-sm">{player.s}</td>
                      <td className="p-2 text-sm">{player.k || '-'}</td>
                      <td className="p-2 text-right">{formatCost(player.c)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {getInducementsList().length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-800 pb-2">Inducements</h2>
                <ul className="list-disc list-inside space-y-1">
                  {getInducementsList().map((item, idx) => (
                    <li key={idx} className="text-lg">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="font-bold mb-2 text-lg">Team Re-rolls</h3>
                <div className="border border-gray-800 h-24"></div>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Fan Factor</h3>
                <div className="border border-gray-800 h-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-0" style={{ 
      background: 'linear-gradient(135deg, #F5EDE0 0%, #E8DDD0 50%, #DDD2C5 100%)',
      fontFamily: '"Teko", "Bebas Neue", sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Roboto+Condensed:wght@400;700&display=swap');
        * { font-family: 'Roboto Condensed', sans-serif; }
        h1, h2, h3, button { font-family: 'Teko', sans-serif; letter-spacing: 0.5px; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-[1800px] mx-auto">
        {/* Header with Title and Reset - Full width, no borders */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-white tracking-wide" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
              BLOOD BOWL ROSTER BUILDER
            </h1>
            <button 
              onClick={resetRoster}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-lg transition-colors whitespace-nowrap border border-blue-900"
            >
              RESET ROSTER
            </button>
          </div>
        </div>

        {/* Team Selection and Treasury - On beige background */}
        <div className="px-3 py-3">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex-1 max-w-md">
              <select 
                value={selectedTeam}
                onChange={(e) => handleTeamChange(e.target.value)}
                className="w-full p-3 pr-10 bg-blue-900 text-white border border-yellow-400 rounded text-xl font-bold cursor-pointer hover:bg-blue-800 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '24px 24px'
                }}
              >
                {Object.keys(T).sort().map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 items-center">
              <div className="bg-blue-800 rounded px-4 py-2 border border-yellow-400 text-center">
                <div className="text-yellow-400 text-xs font-bold">STARTING TREASURY</div>
                <div className="text-white text-xl font-bold">{formatCost(STARTING_TREASURY)}</div>
              </div>
              <div className="bg-red-700 rounded px-4 py-2 border border-yellow-400 text-center">
                <div className="text-yellow-400 text-xs font-bold">SPENT</div>
                <div className="text-white text-xl font-bold">{formatCost(totalSpent)}</div>
              </div>
              <div className="bg-green-700 rounded px-4 py-2 border border-yellow-400 text-center">
                <div className="text-yellow-400 text-xs font-bold">REMAINING</div>
                <div className={`text-xl font-bold ${remaining < 0 ? 'text-red-300' : 'text-white'}`}>
                  {formatCost(remaining)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-blue-900 text-sm font-semibold">
            {teamData.l} • Reroll Cost: {formatCost(teamData.r)}
          </div>
        </div>

        <div className="px-2">{/* Wrapper for spacing on sides */}

        <div className="grid grid-cols-12 gap-3">
          {/* Available Positions - 30% (4 columns) */}
          <div className="col-span-4">
            <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-red-600">
              <h2 className="text-2xl font-bold text-red-600 mb-2 pb-1 border-b border-blue-800">AVAILABLE POSITIONS</h2>
              <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-2" style={{scrollbarWidth: 'thin'}}>
                {teamData.p.map((pos, idx) => {
                  const count = getPositionCount(pos.n);
                  const canBuy = remaining >= pos.c && count < pos.m;
                  return (
                    <div key={idx} className="bg-blue-100 rounded p-2 border border-blue-200 hover:border-red-600 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-blue-900 truncate">{pos.n}</h3>
                            <span className="text-gray-600 text-xs whitespace-nowrap">
                              ({count}/{pos.m})
                            </span>
                          </div>
                          <div className="text-gray-700 font-mono text-xs mt-0.5">
                            {pos.s}
                          </div>
                          <div className="text-gray-600 text-xs mt-0.5 line-clamp-2">
                            {pos.k || '-'}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-blue-800 font-bold text-sm mb-1">{formatCost(pos.c)}</div>
                          <button
                            onClick={() => purchasePlayer(pos)}
                            disabled={!canBuy}
                            className={`px-3 py-1 rounded font-bold text-sm transition-all border ${
                              canBuy 
                                ? 'bg-blue-700 hover:bg-blue-600 text-white cursor-pointer border-blue-900' 
                                : 'bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500'
                            }`}
                          >
                            <Plus size={16} className="inline" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Current Roster - 45% (5 columns) */}
          <div className="col-span-5">
            <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-blue-800">
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-red-600">
                <h2 className="text-2xl font-bold text-blue-800">PLAYERS ({purchasedPlayers.length})</h2>
                <button 
                  onClick={() => setViewMode('roster')}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-sm transition-colors border border-blue-900"
                >
                  <Eye size={16} className="inline mr-1" />
                  VIEW ROSTER
                </button>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-2" style={{scrollbarWidth: 'thin'}}>
                {purchasedPlayers.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">No players purchased yet</div>
                ) : (
                  purchasedPlayers.map((player, idx) => (
                    <div key={player.id} className="bg-blue-100 rounded p-2 border border-blue-200 hover:border-blue-600 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-sm font-bold">#{idx + 1}</span>
                            <h3 className="text-lg font-bold text-blue-900 truncate">{player.n}</h3>
                          </div>
                          <div className="text-gray-700 font-mono text-xs mt-0.5">
                            {player.s}
                          </div>
                          <div className="text-gray-600 text-xs mt-0.5 line-clamp-2">
                            {player.k || '-'}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-blue-800 font-bold text-sm mb-1">{formatCost(player.c)}</div>
                          <button
                            onClick={() => removePlayer(player.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-sm transition-all border border-red-800"
                          >
                            <Trash2 size={16} className="inline" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Inducements - 25% (3 columns) */}
          <div className="col-span-3">
            <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-blue-800">
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-red-600">
                <h2 className="text-base font-bold text-blue-800 leading-tight">INDUCEMENTS</h2>
                <button 
                  onClick={() => setViewMode('view')}
                  className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-xs transition-colors border border-blue-900"
                >
                  <Printer size={14} className="inline" />
                </button>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-1" style={{scrollbarWidth: 'thin'}}>
                {/* Rerolls */}
                <div className="bg-blue-100 rounded p-2 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-blue-900 font-bold text-sm">Rerolls</div>
                    <div className="text-xs text-gray-600">{formatCost(teamData.r)}</div>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <button
                      onClick={() => updateInducement("Rerolls", -1)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold border border-red-800"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-blue-900 font-bold text-lg">{inducements["Rerolls"] || 0}</span>
                    <button
                      onClick={() => updateInducement("Rerolls", 1)}
                      className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded text-xs font-bold border border-blue-900"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Other Inducements */}
                {INDUCEMENTS.map((ind) => (
                  <div key={ind.name} className="bg-blue-100 rounded p-2 border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-blue-900 font-bold text-xs leading-tight">{ind.name}</div>
                      <div className="text-xs text-gray-600 whitespace-nowrap">{formatCost(ind.cost)}</div>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <button
                        onClick={() => updateInducement(ind.name, -1)}
                        className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold border border-red-800"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-blue-900 font-bold">{inducements[ind.name] || 0}</span>
                      <button
                        onClick={() => updateInducement(ind.name, 1)}
                        className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded text-xs font-bold border border-blue-900"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Miniature Purchase Links */}
        {TEAM_MINIATURE_LINKS[selectedTeam] && (
          <div className="mt-3 bg-blue-50 rounded-lg p-3 shadow-xl border border-blue-800">
            <h2 className="text-xl font-bold text-blue-800 mb-2 pb-1 border-b border-red-600">
              WHERE TO BUY MINIATURES FOR {selectedTeam.toUpperCase()}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TEAM_MINIATURE_LINKS[selectedTeam].map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 hover:bg-blue-600 text-white rounded p-2 text-center font-bold text-sm transition-colors border border-yellow-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}

        </div>{/* End wrapper for spacing */}
      </div>
    </div>
  );
}