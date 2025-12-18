// Strength Skills for Blood Bowl 2025
export const STRENGTH_SKILLS = {
  "Arm Bar": {
    name: "Arm Bar",
    category: "Strength",
    type: "Active",
    description: "If an opposing player Falls Over as a result of attempting to Dodge, Leap or Jump away from a square in this player's Tackle Zone, this player may use this Skill. If they do, they may apply a +1 modifier to either the Armour Roll or Injury Roll. This modifier may be applied after the roll has been made. If this results in the opposing player becoming Casualty as a result of the Dodge, Leap or Jump away from the player with this Skill, then this player will count as having caused that Casualty and will receive Star Player Points as appropriate.\n\nIf a player tries to leave the Tackle Zone of multiple players with this Skill at the same time, only one of those players may use this Skill."
  },
  
  "Brawler": {
    name: "Brawler",
    category: "Strength",
    type: "Active",
    description: "When this player declares a Block Action, they may re-roll a single Both Down result."
  },
  
  "Break Tackle": {
    name: "Break Tackle",
    category: "Strength",
    type: "Active",
    description: "Once per Turn, when this player attempts to Dodge, they may apply a +1 modifier to the Agility Test if they have a Strength characteristic of 3 or lower, a +2 modifier to the Agility Test if they have a Strength Characteristic of 4, or a +3 modifier to the Agility Test if they have a Strength Characteristic of 5 or higher."
  },
  
  "Bullseye": {
    name: "Bullseye",
    category: "Strength",
    type: "Active",
    description: "When this player performs a Throw Team-mate Action, if the result of the throw is a Superb Throw then the thrown player will not Scatter before landing and will instead land in the target square.\n\nA player without the Throw Team-mate Trait cannot have this Skill."
  },
  
  "Grab": {
    name: "Grab",
    category: "Strength",
    type: "Active",
    description: "When this player declares a Block Action, if the opposition player is Pushed Back, then this player's Coach may choose any unoccupied square adjacent to the target for them to be Pushed Back into. If there are no adjacent unoccupied squares, then this Skill cannot be used.\n\nAdditionally, when this player performs a Block Action, opposition players cannot use the Sidestep Skill.\n\nA player with this Skill cannot have the Frenzy Skill."
  },
  
  "Guard": {
    name: "Guard",
    category: "Strength",
    type: "Active",
    description: "This player can provide Offensive and Defensive Assists when a player performs a Block Action regardless of how many opposition players are Marking this player."
  },
  
  "Juggernaut": {
    name: "Juggernaut",
    category: "Strength",
    type: "Active",
    description: "When this player declares a Blitz Action, they may treat any result of Both Down as Pushed Back during any Block Actions they perform during the Blitz Action.\n\nAdditionally, when this player performs a Block Action as part of a Blitz Action, opposition players cannot use the Fend, Stand Firm or Wrestle Skills."
  },
  
  "Mighty Blow": {
    name: "Mighty Blow",
    category: "Strength",
    type: "Active",
    description: "Whenever this player Knocks Down an opposition player during a Block Action, even if this player is also Knocked Down, they may apply a +1 modifier to either the Armour Roll or Injury Roll. This modifier may be applied after the roll has been made."
  },
  
  "Multiple Block": {
    name: "Multiple Block",
    category: "Strength",
    type: "Active",
    description: "When this player declares a Block Action, they may perform two Block Actions each targeting a different opposition player they are Marking. If they do, then this player will reduce their Strength Characteristic by 2 for the duration of the Block Actions. These Block Actions happen simultaneously, though you may wish to roll them separately for clarity. This means that if both Block Actions are resolved in full, even if one of them results in a Turnover. This player cannot Follow-up during either of these Block Actions.\n\nA player with this Skill cannot also have the Frenzy Skill."
  },
  
  "Stand Firm": {
    name: "Stand Firm",
    category: "Strength",
    type: "Active",
    description: "When this player would be Pushed Back during a Block Action, including during a Chain Push, they can choose to not be Pushed Back and instead remain in their current square. Using this Skill will not prevent a player with the Frenzy Skill from performing a second Block Action, so long as this player is still Standing."
  },
  
  "Strong Arm": {
    name: "Strong Arm",
    category: "Strength",
    type: "Active",
    description: "When this player performs a Throw Team-mate Action, this player may apply a +1 modifier to the Passing Ability Test.\n\nA player without the Throw Team-mate Trait cannot have this Skill."
  },
  
  "Thick Skull": {
    name: "Thick Skull",
    category: "Strength",
    type: "Passive",
    description: "When an Injury Roll is made for this player, they will only be Knocked-out on the roll of a 9; a roll of an 8 will be treated as a Stunned result. If this player also has the Stunty Trait, then they will only be Knocked-out on the roll of an 8; a roll of a 7 will be treated as a Stunned result."
  }
};
