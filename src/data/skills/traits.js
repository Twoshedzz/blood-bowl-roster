// Common Traits for Blood Bowl 2025
export const COMMON_TRAITS = {
  "Right Stuff": {
    name: "Right Stuff",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "This player can be thrown by a team-mate with the Throw Team-mate Trait, even if this player is Prone."
  },
  
  "Stunty": {
    name: "Stunty",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "When this player attempts to Dodge, they do not suffer any negative modifiers to their Agility Test for being Marked by opposition players.\n\nAdditionally, this player applies a -1 modifier to the Agility Test when attempting to Intercept the ball.\n\nA player with this Trait is more prone to injury and so if an Injury Roll is made for them, roll on the Stunty Injury Table instead."
  },
  
  "Loner": {
    name: "Loner",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "Whenever this player wishes to use a Team Re-roll, they must roll a D6. If they roll equal to or higher than the number shown in brackets, then they may use the Team Re-roll as normal. If they roll lower than the number shown in brackets, then they may not re-roll the dice and the Team Re-roll is lost just as if it had been used."
  },
  
  "Throw Team-mate": {
    name: "Throw Team-mate",
    category: "Trait",
    type: "Active",
    description: "This player may declare the Throw Team-mate Action as described in the rulebook."
  },
  
  "Regeneration": {
    name: "Regeneration",
    category: "Trait",
    type: "Passive",
    description: "Whenever this player suffers a Casualty, before making the Casualty Roll for them, roll a D6. On a 1‑3, this player suffers the Casualty; make the Casualty Roll as normal. On a 4+, this player regenerates and ignores the Casualty (though any Star Player Points earned for causing the Casualty are still earned) and is instead placed in their team's Reserves Box."
  },
  
  "Decay": {
    name: "Decay",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "Apply a +1 modifier to any Casualty Roll made against this player."
  },
  
  "Take Root": {
    name: "Take Root",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "Whenever this player is activated, after declaring their Action, if they are Standing they must roll a D6. On a 2+, the player may perform the declared Action as normal. On a 1, the player becomes Rooted. Whilst Rooted, a player cannot perform Move Actions, may not Follow-up after performing a Block Action, cannot be Pushed Back, and may not leave their current square for any reason, with the exception of being Knocked Out or suffering a Casualty."
  },
  
  "Always Hungry": {
    name: "Always Hungry",
    category: "Trait",
    type: "Active",
    mandatory: true,
    description: "Whenever this player performs a Throw Team-mate Action, before making the Passing Ability Test, they must roll a D6. On a 2+, they may continue with the Throw Team-mate Action as normal. On a 1, the player will attempt to eat their team-mate - they must roll a further D6. On a 2+, the team-mate will squirm free and the Throw Team-mate Action will automatically result in a Fumbled Throw. On a 1, the player will eat their team-mate."
  },
  
  "Bone Head": {
    name: "Bone Head",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "Whenever this player is activated, after declaring their Action they must roll a D6. On a 2+, the player may perform the declared Action as normal. On a 1, the player becomes Distracted."
  },
  
  "Really Stupid": {
    name: "Really Stupid",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "Whenever this player is activated, after declaring their Action, they must roll a D6. They may apply a +2 modifier to the roll if they have any Standing team-mates who are not Distracted, and do not have the Really Stupid Trait, adjacent to them. On a 4+, the player may perform the declared Action as normal. On a 1‑3, this player becomes Distracted."
  },
  
  "Secret Weapon": {
    name: "Secret Weapon",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "At the end of a Drive in which this player took part, even if they are not on the pitch at the end of the Drive, they are Sent-off for committing a Foul."
  },
  
  "Titchy": {
    name: "Titchy",
    category: "Trait",
    type: "Passive",
    mandatory: true,
    description: "A player with this Trait may apply a +1 modifier to the Agility Test when attempting to Dodge. However, when an opposition player attempts to Dodge into a square within this player's Tackle Zone, this player will not apply a -1 modifier to the opposition player's Agility Test for Marking the opposition player."
  },
  
  "Plague Ridden": {
    name: "Plague Ridden",
    category: "Trait",
    type: "Passive",
    description: "Once per game, when a player with this Trait causes a Casualty against an opposition player as a result of a Block Action, and that player suffers a Dead result on their Casualty Roll and is not saved by an Apothecary, you may immediately add one new Lineman player from your team's Team Roster to your Reserves Box. This may cause your team to have more than 16 players for the remainder of the game.\n\nDuring the Post-game Sequence, this player may be hired in the same manner as any Journeyman players.\n\nThis Trait cannot be used against Big Guy players, or any player with the Decay, Regeneration or Stunty Traits."
  },
  
  "Pick-Me-Up": {
    name: "Pick-Me-Up",
    category: "Trait",
    type: "Active",
    description: "At the end of each of the opposition's Turns, roll a D6 for each Prone team-mate within 3 squares of one or more Standing players with this Trait. On a 5+, the Prone player may immediately stand up. Should a player with this Trait stand up as a result of a team-mate using this Trait, they may not also use this Trait during the same Turn."
  }
};
