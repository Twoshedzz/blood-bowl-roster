// General Skills for Blood Bowl 2025
export const GENERAL_SKILLS = {
  "Block": {
    name: "Block",
    category: "General",
    type: "Active",
    description: "A player with this Skill may choose not to be Knocked Down when a Both Down result is applied during a Block Action that they are part of."
  },
  
  "Dauntless": {
    name: "Dauntless",
    category: "General",
    type: "Active",
    description: "When a player with this Skill performs a Block Action against an opposition player with a higher Strength Characteristic (before any modifiers are applied to either player), this player may roll a D6 and add their own Strength Characteristic. If the result is higher than the opposition player's unmodified Strength Characteristic, then this player increases their unmodified Strength Characteristic to match the opposition player for the duration of the Block Action. Modifiers are then applied as normal.\n\nIf this player also has a Skill that allows them to perform multiple Block Actions, such as the Frenzy Skill, then they must make a separate roll for each Block Action."
  },
  
  "Fend": {
    name: "Fend",
    category: "General",
    type: "Active",
    description: "When a player with this Skill is Pushed Back as a result of a Block Action performed against them, then the opposition player may not Follow-up.\n\nThis Skill cannot be used against a player with the Ball & Chain Trait or against a player with the Juggernaut Skill that is performing a Blitz Action."
  },
  
  "Frenzy": {
    name: "Frenzy",
    category: "General",
    type: "Active",
    mandatory: true,
    description: "Every time this player performs a Block Action, if the target is Pushed Back, then this player must Follow-up if able. Additionally, if after the target is Pushed Back they are still Standing, then this player must perform a second Block Action targeting the same opposition player and must again Follow-up if the target is Pushed Back.\n\nIf this player is performing a Blitz Action, performing a second Block Action will also cost the player a square of movement. If this player has no movement left, then they must Rush. If this player cannot Rush then they cannot perform the second Block Action.\n\nA player with this Skill cannot have the Grab, Hit & Run or Multiple Block Skills."
  },
  
  "Kick": {
    name: "Kick",
    category: "General",
    type: "Active",
    description: "If this player is nominated as the kicking player, then when kicking Deviates this player's Coach may choose for it to only Deviate D3 squares rather than the usual D6."
  },
  
  "Pro": {
    name: "Pro",
    category: "General",
    type: "Active",
    description: "During this player's activation, they may attempt to re-roll a single dice. This can be a dice roll on its own, as part of a multiple dice roll or as a dice pool. To use this Skill, the player must roll a D6: on a 3+ the dice may be re-rolled, on a 1-2 the dice may not be re-rolled.\n\nThe Skill cannot be used to re-roll a dice made as part of an Armour Roll, Injury Roll, Casualty roll, a roll made outside of the player's activation, or any dice roll not made on the player's behalf (such as Argue the Call or if the Crowd Takes Action).\n\nOnce a player has attempted to use this Skill, they cannot use a re-roll from any other source to re-roll the dice."
  },
  
  "Steady Footing": {
    name: "Steady Footing",
    category: "General",
    type: "Active",
    description: "Whenever this player would be Knocked Down or Fall Over, roll a D6. On a 6, this player does not get Knocked Down or Fall Over. If this happens during their activation, they may continue their activation as normal and no Turnover will be caused."
  },
  
  "Strip Ball": {
    name: "Strip Ball",
    category: "General",
    type: "Active",
    description: "When this player performs a Block Action against an opposition player holding the ball, if an opposition player is Pushed Back then they will drop the ball in the square they are Pushed Back into, at which point it will Bounce from that square. This Bounce will happen before the opposition player becomes Prone (if applicable) but after this player chooses to Follow-up."
  },
  
  "Sure Hands": {
    name: "Sure Hands",
    category: "General",
    type: "Active",
    description: "This player may re-roll the D6 when attempting to pick up the ball, though not when making a Secure the Ball Action. Additionally, the Strip Ball Skill cannot be used against this player."
  },
  
  "Tackle": {
    name: "Tackle",
    category: "General",
    type: "Active",
    description: "When an opposition player attempts to Dodge away from a square in this player's Tackle Zone, they cannot use the Dodge Skill.\n\nAdditionally, when this player performs a Block Action against an opposition player, the opposition player does not count as having the Dodge Skill if a Stumble result is selected."
  },
  
  "Taunt": {
    name: "Taunt",
    category: "General",
    type: "Active",
    description: "When a player with this Skill is Pushed Back as a result of a Block Action performed against them, this player's Coach may choose to make the opposition player Follow-up.\n\nThis Skill cannot be used against an opposition player with the Take Root Trait that has become Rooted."
  },
  
  "Wrestle": {
    name: "Wrestle",
    category: "General",
    type: "Active",
    description: "When this player performs a Block Action, or is the target of a Block Action, if the Both Down result is applied, this player may choose to use this Skill. If they do, both players in the Block Action are Placed Prone, regardless of any other Skills they may possess."
  }
};
