// Agility Skills for Blood Bowl 2025
export const AGILITY_SKILLS = {
  "Catch": {
    name: "Catch",
    category: "Agility",
    type: "Active",
    description: "This player may re-roll any failed Agility Test when attempting to Catch the ball."
  },
  
  "Diving Catch": {
    name: "Diving Catch",
    category: "Agility",
    type: "Active",
    description: "This player may attempt to Catch the ball if it lands in a square in their Tackle Zone as a result of a Pass, Throw-in or Kick-off. They may not use this Skill to attempt to Catch the ball if it lands in a square in their Tackle Zone as a result of a Bounce.\n\nAdditionally, this player may apply a +1 modifier to their Agility Test when attempting to Catch the ball as part of a Pass Action if they are in the target square."
  },
  
  "Diving Tackle": {
    name: "Diving Tackle",
    category: "Agility",
    type: "Active",
    description: "When an opposition player attempts to leave this player's Tackle Zone as a result of a Dodge, Leap or Jump, and an Agility test has been rolled and any modifiers and re-rolls have been applied, this player may use this Skill. Immediately apply a -2 modifier to the opposition player's Agility Test and place this player Prone in the square the opposition player vacated.\n\nIf a player tries to leave the Tackle Zone of multiple players with this Skill at the same time, only one of those players may use this Skill."
  },
  
  "Dodge": {
    name: "Dodge",
    category: "Agility",
    type: "Active",
    description: "Once per Turn, this player may re-roll a single Agility Test when attempting to Dodge. Additionally, this Skill will impact the Stumble result when an opposition player performs a Block Action against this player."
  },
  
  "Defensive": {
    name: "Defensive",
    category: "Agility",
    type: "Active",
    description: "During your opponent's Turns, opposition players Marked by this player cannot use the Guard or Put the Boot In Skills."
  },
  
  "Hit and Run": {
    name: "Hit and Run",
    category: "Agility",
    type: "Active",
    description: "When a player with this Skill performs a Block Action or a Stab Special Action, after fully resolving the Action, they may immediately move one free square ignoring Tackle Zones, so long as they are still Standing. The player must ensure that after this free move they are not Marked by or Marking any opposition players.\n\nA player with this Skill cannot also have the Frenzy Skill."
  },
  
  "Jump Up": {
    name: "Jump Up",
    category: "Agility",
    type: "Active",
    description: "This Skill can be used whilst a player is Prone. A Prone player with this Skill can stand up for free without having to spend 3 squares of movement to do so.\n\nAdditionally, a Prone player with this Skill can declare a Block Action whilst Prone. If they do, they must make an Agility Test, applying a +1 modifier to the result. If the Agility Test is passed, they may immediately stand up and perform the Block Action. If the Agility Test is failed, then the player remains Prone and their activation immediately ends."
  },
  
  "Leap": {
    name: "Leap",
    category: "Agility",
    type: "Active",
    description: "During their Move Action, a player with this Skill can attempt to Leap over a single adjacent square regardless of what is in the square. Leaping works the same way as Jumping, with the exception that the Leaping player may reduce the negative modifiers they would receive by Leaping by 1, to a minimum of -1.\n\nA player with this Skill cannot also have the Pogo Trait."
  },
  
  "Safe Pair of Hands": {
    name: "Safe Pair of Hands",
    category: "Agility",
    type: "Active",
    description: "If this player would be Knocked Down, Fall Over or be Placed Prone whilst in possession of the ball then, before they become Prone, they may place the ball in any adjacent unoccupied square to the square they will become Prone in instead of Bouncing the ball as normal."
  },
  
  "Sidestep": {
    name: "Sidestep",
    category: "Agility",
    type: "Active",
    description: "Whenever this player is Pushed Back for any reason, then instead of the opposing Coach choosing where this player is Pushed Back to, this player's Coach may choose any adjacent unoccupied square for this player to be Pushed Back into instead. If there are no adjacent unoccupied squares, then this Skill cannot be used."
  },
  
  "Sprint": {
    name: "Sprint",
    category: "Agility",
    type: "Active",
    description: "When this player performs a Move Action they may attempt to Rush one additional time than they would normally be allowed to."
  },
  
  "Sure Feet": {
    name: "Sure Feet",
    category: "Agility",
    type: "Active",
    description: "Once per Turn, this player may re-roll a single D6 when attempting to Rush."
  }
};
