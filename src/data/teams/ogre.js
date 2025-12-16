export const Ogre = {
  name: "Ogre",
  league: "Badlands Brawl or Worlds Edge Superleague",
  rerollCost: 70000,
  image: "Ogres.png",
  
  positions: [
    {
      name: "Gnoblar",
      cost: 15000,
      max: 16,
      stats: "5/1/3+/4+/6+",
      skills: "Dodge, Right Stuff, Sidestep, Stunty, Titchy",
      skillAccess: {
        primary: ["A"],
        secondary: ["D", "G"]
      }
    },
    {
      name: "Ogre",
      cost: 140000,
      max: 5,
      stats: "5/5/4+/5+/10+",
      skills: "Bone Head, Mighty Blow, Thick Skull, Throw Team-mate",
      skillAccess: {
        primary: ["S"],
        secondary: ["A", "G", "P"]
      }
    },
    {
      name: "Punter",
      cost: 145000,
      max: 1,
      stats: "5/5/4+/4+/10+",
      skills: "Bone Head, Kick Team-mate, Mighty Blow, Thick Skull",
      skillAccess: {
        primary: ["S", "P"],
        secondary: ["A", "G"]
      }
    }
  ],
  
  miniatureLinks: [
    { name: "Games Workshop", url: "https://www.games-workshop.com/en-US/Blood-Bowl-Ogre-Team-2020" },
    { name: "Greebo Games", url: "https://greebo-games.com/" },
    { name: "Impact Miniatures", url: "https://www.impactminiatures.com/" }
  ]
};
