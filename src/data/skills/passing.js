// Passing Skills for Blood Bowl 2025
export const PASSING_SKILLS = {
  "Accurate": {
    name: "Accurate",
    category: "Passing",
    type: "Active",
    description: "When this player performs a Pass Action which is a Quick Pass or a Short Pass, this player may apply a +1 modifier to the Passing Ability Test."
  },
  
  "Cannoneer": {
    name: "Cannoneer",
    category: "Passing",
    type: "Active",
    description: "When this player performs a Pass Action which is a Long Pass or a Long Bomb, this player may apply a +1 modifier to the Passing Ability Test."
  },
  
  "Cloud Burster": {
    name: "Cloud Burster",
    category: "Passing",
    type: "Active",
    description: "When this player performs a Pass Action, opposition players may not attempt to Intercept the ball."
  },
  
  "Dump-off": {
    name: "Dump-off",
    category: "Passing",
    type: "Active",
    description: "Whenever an opposition player attempts to perform a Block Action against this player, or a Special Action that targets this player directly, this player may use this Skill. When they do, this player may immediately perform a Quick Pass before the Action targeting them is resolved. This Quick Pass cannot cause a Turnover, but otherwise follows all the normal rules for making a Quick Pass. Once the Quick Pass has been resolved, this Action targeting this player continues."
  },
  
  "Give and Go": {
    name: "Give and Go",
    category: "Passing",
    type: "Active",
    description: "If this player performs a Pass Action that is a Quick Pass, or performs a Hand-off Action, then, so long as a Turnover isn't caused, their activation does not end once the Pass or Hand-off is resolved. Instead, they may continue with their Move Action using any movement they have remaining."
  },
  
  "Hail Mary Pass": {
    name: "Hail Mary Pass",
    category: "Passing",
    type: "Active",
    description: "When this player performs a Pass Action or a Throw Bomb Special Action, they may declare any square on the pitch as the target square rather than using the Range Ruler. Make a Passing Ability Test as normal treating the throw as a Long Bomb, and treating any result of an Accurate Pass as an Inaccurate Pass. A Hail Mary Pass cannot be Intercepted."
  },
  
  "Leader": {
    name: "Leader",
    category: "Passing",
    type: "Passive",
    description: "A team that has one or more players with this Skill on the pitch at the start of a half may gain a single extra Team Re-roll - this is called a Leader Re-roll. A team can only use a Leader Re-roll if they have a player with the Leader Skill on the pitch, and if all players with this Skill are removed from play, either as a Casualty or by being Sent-off, before the Leader Re-roll is used then it is lost.\n\nA Leader Re-roll follows all of the usual rules for standard Team Re-rolls, with the exception that it cannot be lost as a result of a Halfling Master Chef."
  },
  
  "Nerves of Steel": {
    name: "Nerves of Steel",
    category: "Passing",
    type: "Active",
    description: "This player may ignore any modifiers for being Marked when making an Agility Test to Catch the ball, or when making a Passing Ability Test to Pass the ball."
  },
  
  "On the Ball": {
    name: "On the Ball",
    category: "Passing",
    type: "Active",
    description: "When an opposition player performs a Pass Action, after the target square has been declared but before the Passing Ability Test is rolled, this player may move up to 3 squares, following all the usual rules for a Move Action, with the exception that they cannot Rush. Should this player Fall Over during this move, then their move immediately ends and the Pass Action resumes. If multiple players have this Skill, then they may all use it during the same Pass Action, though they must do so one at a time, and if one of them Falls Over before the others have had the chance to move, then they may not do so.\n\nAdditionally, during the Start of Drive Sequence, after the Kick Deviates but before the Kick-off Event is rolled, a single Open player on the receiving team with this Skill may move up to 3 squares, following all the usual rules for a Move Action, with the exception that they cannot Rush. A player may not use this Skill if a Touchback is caused and may not move into the opposition half. Should this player Fall Over whilst using this Skill, their movement immediately ends and the Kick-off Event is rolled."
  },
  
  "Pass": {
    name: "Pass",
    category: "Passing",
    type: "Active",
    description: "This player may re-roll any failed Passing Ability Test when performing a Pass Action."
  },
  
  "Punt": {
    name: "Punt",
    category: "Passing",
    type: "Active",
    description: "This player may declare a Punt Special Action; only a single player may declare a Punt Special Action each Turn. When a player declares a Punt Special Action they are first allowed to make a Move Action, though they cannot continue to move after the Punt Special Action has been resolved.\n\nIf after their Move Action this player is in possession of the ball, they can Punt it downfield. Position the Throw-in Template over this player so it faces one of the two End Zones or either Sideline. Roll a D6 to determine the direction the ball is kicked, and then a second D6 to determine how many squares in that direction the ball will travel. If this player has the Kick Skill, they may re-roll either or both of these dice - though they must decide whether to re-roll the direction or not before rolling for the distance.\n\nIf the ball lands in a square containing a player, then they must attempt to Catch the ball, otherwise it will Bounce.\n\nWhen performing a Punt Special Action, no Turnover is caused if the ball comes to rest on the ground; however, if after the Punt Special Action is resolved the ball is in possession of an opposition player, or in the crowd, a Turnover is caused."
  },
  
  "Safe Pass": {
    name: "Safe Pass",
    category: "Passing",
    type: "Active",
    description: "If this player rolls a natural 1 when making a Passing Ability Test, then it will not result in a Fumbled Pass. Instead, the player retains possession of the ball and their activation immediately ends. No Turnover is caused."
  }
};
