// Blood Bowl Team Draft Rules and Budget Information
// Based on Blood Bowl 2025 Edition rules

export const TEAM_DRAFT_RULES = {
  // Budget
  budget: {
    default: 1000000, // Default starting budget in gold pieces
    description: "The Team Draft Budget is the amount of gold pieces your team has to spend when building your team. When starting a team during League Play, you will usually have a Team Draft Budget of 1,000,000 gold pieces - this is the most common value for a rookie team."
  },

  // Player requirements
  players: {
    minimum: 11,
    maximum: 16,
    description: "A team must have at least 11 players on their Team Draft List when it is first drafted. A team may never have more than 16 players on their Team Draft List.",
    note: "In League Play you may find your team in a situation where they have less than 11 players due to injuries or deaths. This is allowed, though not ideal."
  },

  // Player positions and their roles
  positions: {
    "Lineman": {
      name: "Lineman",
      description: "The backbone of any team. All teams will have at least one player with the Lineman position, which they will be allowed to take 0-16 of.",
      typical: "0-16"
    },
    "Thrower": {
      name: "Thrower",
      description: "The Thrower will often act as the team's captain, calling the plays on the pitch and directing the flow of the game. They will also be responsible for delivering those precision passes to their team-mates."
    },
    "Catcher": {
      name: "Catcher",
      description: "It is the job of the Catcher to get on the end of a pass and Catch the ball before running it into the End Zone to score a Touchdown."
    },
    "Runner": {
      name: "Runner",
      description: "Some teams prefer to employ a Runner rather than Throwers or Catchers, relying on speed rather than risking passing the ball over the opposition."
    },
    "Blitzer": {
      name: "Blitzer",
      description: "Often used on offence, a Blitzer is tasked with breaking through the opposition line and creating holes for their team-mates to run through."
    },
    "Blocker": {
      name: "Blocker",
      description: "Tough, defensive players, a Blocker will often be found anchoring the lines and using their physicality to smash the opposition into the turf."
    },
    "Big Guy": {
      name: "Big Guy",
      description: "Many teams will employ a Big Guy; a larger than life player that is used as a battering ram to crush opposition defensive lines. The likes of Trolls, Ogres and Minotaurs would fall into this category."
    },
    "Special": {
      name: "Special",
      description: "Not every player will fit into one of the above categories, and those unique individuals are referred to as Special players. Whether they enjoy the use of secret weapons, or have a particular gift in another area of the game, they are all classed the same."
    }
  },

  // Team Re-rolls
  rerolls: {
    maximum: 8,
    description: "Any team may purchase Team Re-rolls, the cost of which may vary and will be outlined in each team's specific Team Roster. Teams may purchase a maximum of 8 Team Re-rolls.",
    leaguePlay: {
      purchaseLaterMultiplier: 2,
      note: "In League Play, if a team wishes to purchase a Team Re-roll during the course of a league rather than at the start, then it will cost double the usual amount of gold pieces."
    }
  },

  // Sideline Staff
  sidelineStaff: {
    assistantCoaches: {
      name: "Assistant Coaches",
      cost: 10000,
      maximum: 6,
      description: "Assistant Coaches benefit a team during the Brilliant Coaching result on the Kick-off Event Table.",
      effect: "Helps during Brilliant Coaching kick-off event"
    },
    cheerleaders: {
      name: "Cheerleaders",
      cost: 10000,
      maximum: 6,
      description: "Cheerleaders will benefit their team during the Cheering Fans result on the Kick-off Event Table.",
      effect: "Helps during Cheering Fans kick-off event"
    },
    apothecary: {
      name: "Apothecary",
      cost: 50000,
      maximum: 1,
      description: "Most teams may hire an Apothecary who can attempt to patch up an injured player during the game. Whether or not a team can or cannot hire an Apothecary will be listed in its Team Roster.",
      effect: "Can attempt to patch up injured players during the game",
      note: "A team can only ever have a single Apothecary. Check team roster to see if your team can hire one."
    }
  },

  // Dedicated Fans
  dedicatedFans: {
    default: 1,
    maximum: 3, // At team creation; can go higher in league play
    cost: 5000, // Cost per improvement
    maxInLeague: 7,
    minimumInLeague: 1,
    description: "Every team will be followed by a number of fanatical supporters. When you draft a team, it will automatically have a Dedicated Fans Characteristic of 1 (representing 1,000 Dedicated Fans).",
    purchaseDescription: "You may improve the Dedicated Fans Characteristic of your team up to a maximum of 3 at the cost of 5,000 gold pieces per Dedicated Fan improvement.",
    leagueNote: "In League Play, your Dedicated Fans Characteristic can change after each game depending on the result, though it can never rise above 7 or fall below 1."
  },

  // Treasury
  treasury: {
    description: "After you have drafted your team, any gold pieces left over are recorded in your team's Treasury.",
    exhibitionPlay: "In Exhibition Play and Matched Play games, this has no effect and so in those game types it's always best to spend all of your gold pieces if possible.",
    leaguePlay: "In League Play, this is where you record the amount of gold pieces your team amasses during the course of the league. Winnings are added to your Treasury and should you decide to purchase more players, Team Re-rolls or Sideline Staff, you will do so from your Treasury."
  },

  // Team Value
  teamValue: {
    tv: {
      name: "Team Value (TV)",
      description: "A team's Team Value (TV) is worked out by adding up the Current Value of all the players on the team, plus the cost of any Sideline Staff and Team Re-rolls the team has.",
      excludes: "Dedicated Fans and gold pieces in a team's Treasury are not included when working out a team's Team Value.",
      calculation: "Sum of: Player values + Sideline Staff costs + Team Re-roll costs"
    },
    ctv: {
      name: "Current Team Value (CTV)",
      description: "A team's Current Team Value (CTV) is only used in League Play, and is equal to the team's Team Value minus the Current Value of any players that are unable to play in the next game.",
      usedIn: "League Play only",
      calculation: "Team Value - Value of players missing next game (injured/dead)"
    }
  }
};

// Helper function to get cost information
export const getCost = (item) => {
  switch(item) {
    case 'assistantCoach':
      return TEAM_DRAFT_RULES.sidelineStaff.assistantCoaches.cost;
    case 'cheerleader':
      return TEAM_DRAFT_RULES.sidelineStaff.cheerleaders.cost;
    case 'apothecary':
      return TEAM_DRAFT_RULES.sidelineStaff.apothecary.cost;
    case 'dedicatedFan':
      return TEAM_DRAFT_RULES.dedicatedFans.cost;
    default:
      return 0;
  }
};

// Helper function to get maximum limits
export const getMaximum = (item) => {
  switch(item) {
    case 'players':
      return TEAM_DRAFT_RULES.players.maximum;
    case 'rerolls':
      return TEAM_DRAFT_RULES.rerolls.maximum;
    case 'assistantCoaches':
      return TEAM_DRAFT_RULES.sidelineStaff.assistantCoaches.maximum;
    case 'cheerleaders':
      return TEAM_DRAFT_RULES.sidelineStaff.cheerleaders.maximum;
    case 'apothecary':
      return TEAM_DRAFT_RULES.sidelineStaff.apothecary.maximum;
    case 'dedicatedFans':
      return TEAM_DRAFT_RULES.dedicatedFans.maximum;
    default:
      return 0;
  }
};

// Helper function to get position descriptions
export const getPositionInfo = (positionName) => {
  return TEAM_DRAFT_RULES.positions[positionName] || null;
};
