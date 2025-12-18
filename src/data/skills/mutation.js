// Mutation Skills for Blood Bowl 2025
export const MUTATION_SKILLS = {
  "Big Hand": {
    name: "Big Hand",
    category: "Mutation",
    type: "Active",
    description: "This player ignores all negative modifiers when attempting to pick up the ball."
  },
  
  "Claws": {
    name: "Claws",
    category: "Mutation",
    type: "Passive",
    description: "Whenever an Armour Roll is made for an opposition player that has been Knocked Down by this player during a Block Action, even if this player is also Knocked Down, then any roll of a natural 8+ on the Armour Roll will break the opposition player's armour regardless of their actual Armour Value."
  },
  
  "Disturbing Presence": {
    name: "Disturbing Presence",
    category: "Mutation",
    type: "Passive",
    mandatory: true,
    description: "Any opposition player that performs a Pass Action, Throw Team-mate Action or a Throw Bomb Special Action, or attempts to Intercept or Catch the ball, applies a -1 modifier to their Passing Ability Test or Agility Test for each player on your team with this Skill within 3 squares of them."
  },
  
  "Extra Arms": {
    name: "Extra Arms",
    category: "Mutation",
    type: "Active",
    description: "This player applies a +1 modifier to the Agility Test whenever they attempt to Catch, Pick Up or Intercept the ball."
  },
  
  "Foul Appearance": {
    name: "Foul Appearance",
    category: "Mutation",
    type: "Passive",
    mandatory: true,
    description: "Whenever an opposition player attempts to perform a Block Action against this player, or a Special Action that targets this player directly, they must roll a D6 before any other dice are rolled. On a 2+, the Block Action continues as normal. On a 1, the Block Action is immediately cancelled and the opposition player's activation immediately ends."
  },
  
  "Horns": {
    name: "Horns",
    category: "Mutation",
    type: "Active",
    description: "Whenever this player declares a Blitz Action, then they apply a +1 modifier to their Strength Characteristic for any Block Actions performed during that Blitz Action."
  },
  
  "Iron Hard Skin": {
    name: "Iron Hard Skin",
    category: "Mutation",
    type: "Passive",
    description: "Opposition players cannot apply any modifiers when making an Armour Roll against this player. Additionally, the Claws Skill cannot be used against this player."
  },
  
  "Monstrous Mouth": {
    name: "Monstrous Mouth",
    category: "Mutation",
    type: "Active",
    description: "When this player is activated, they may declare a Chomp Special Action; there is no limit to the number of players that can declare this Special Action each Turn. When this player declares a Chomp Special Action, they may select one Standing opposition player they are Marking and roll a D6. On a 1-2 nothing happens. On a 3+, the opposition player is considered to be Chomped. Whilst Chomped, the opposition player cannot leave the square they are in whilst this player remains Marking them. This condition ends immediately if this player is no longer Marking the opposition player for any reason.\n\nThis player may use the Chomp Special Action to replace the Block Action made as part of a Blitz Action if they wish.\n\nAdditionally, the Strip Ball Skill cannot be used against this player."
  },
  
  "Prehensile Tail": {
    name: "Prehensile Tail",
    category: "Mutation",
    type: "Active",
    description: "When an opposition player attempts to Dodge, Jump or Leap away from a square in this player's Tackle Zone, they apply an additional -1 modifier to the Agility Test.\n\nIf a player tries to leave the Tackle Zone of multiple players with this Skill at the same time, only one of those players may use this Skill."
  },
  
  "Tentacles": {
    name: "Tentacles",
    category: "Mutation",
    type: "Active",
    description: "When an opposition player attempts to Dodge, Jump or Leap away from a square in this player's Tackle Zone, this player may use this Skill. When a player uses this Skill they roll a D6 and add their Strength characteristic to the roll; they then subtract the Strength Characteristic of the opposition player from the result. If the result is 6 or higher, or the roll is a natural 6, then the opposition player does not leave the square they attempted to leave and their activation comes to an end. If the result is 5 or lower, or the roll is a natural 1, this Skill has no effect.\n\nIf a player tries to leave the Tackle Zone of multiple players with this Skill at the same time, only one of those players may use this Skill."
  },
  
  "Two Heads": {
    name: "Two Heads",
    category: "Mutation",
    type: "Active",
    description: "This player may apply a +1 modifier to the Agility Test whenever they attempt to Dodge."
  },
  
  "Very Long Legs": {
    name: "Very Long Legs",
    category: "Mutation",
    type: "Active",
    description: "This player may apply a +1 modifier to the Agility Test whenever they attempt to Leap or Jump, and may apply a +2 modifier to the Agility Test whenever they attempt to Intercept the ball.\n\nAdditionally, this player ignores the Cloud Burster Skill."
  }
};
