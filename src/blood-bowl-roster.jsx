import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Minus, Trash2, Eye, Printer, ArrowLeft, Share2, Check } from 'lucide-react';

// Import refactored data
import { STARTING_TREASURY, MAX_PLAYERS, getInducements, TEAMS_WITHOUT_APOTHECARY } from './data/constants';
import { SKILLS_BY_CATEGORY } from './data/skills';
import { TEAMS, TEAM_NAMES, getPositionSkillAccess } from './data/teams/index';

// ALL OLD DATA STRUCTURES REMOVED - NOW IMPORTED FROM data/ FOLDER
// All team data, skills, and constants have been refactored into separate modules for easier maintenance
// See: src/data/teams/, src/data/skills.js, src/data/constants.js, src/data/leagues.js

/* Previous structure had ~1500 lines of hardcoded data here including:
   - SKILLS_BY_CATEGORY
   - POSITION_SKILL_ACCESS
   - TEAM_MINIATURE_LINKS
   - getInducements()
   - T (team data object)
   
   All now properly organized in separate, easy-to-maintain files!
*/

export default function BloodBowlRoster() {
  const [selectedTeam, setSelectedTeam] = useState("Human");
  const [purchasedPlayers, setPurchasedPlayers] = useState([]);
  const [inducements, setInducements] = useState({Fans: 1}); // Start with 1 free dedicated fan
  const [viewMode, setViewMode] = useState('build');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [playMode, setPlayMode] = useState('league'); // 'league' or 'tournament'
  const [startingTreasury, setStartingTreasury] = useState(STARTING_TREASURY);
  const [isEditingTreasury, setIsEditingTreasury] = useState(false);
  const [playerSkills, setPlayerSkills] = useState({}); // { playerId: { primary: [], secondary: [] } }
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [shorteningUrl, setShorteningUrl] = useState(false);
  const [shortenError, setShortenError] = useState(false);

  // Load team from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamData = params.get('team');
    if (teamData) {
      try {
        const decoded = JSON.parse(atob(teamData));
        setSelectedTeam(decoded.team);
        setPurchasedPlayers(decoded.players || []);
        setInducements(decoded.inducements || {Fans: 1});
        setPlayerSkills(decoded.skills || {});
        setStartingTreasury(decoded.treasury || STARTING_TREASURY);
        setPlayMode(decoded.playMode || 'league');
      } catch (e) {
        console.error('Failed to load team from URL:', e);
      }
    }
  }, []);

  // Generate shareable URL
  const generateShareUrl = async () => {
    const teamState = {
      team: selectedTeam,
      players: purchasedPlayers,
      inducements,
      skills: playerSkills,
      treasury: startingTreasury,
      playMode
    };
    const encoded = btoa(JSON.stringify(teamState));
    const longUrl = `${window.location.origin}${window.location.pathname}?team=${encoded}`;
    
    // Show modal immediately with long URL
    setShareUrl(longUrl);
    setShowShareModal(true);
    setCopied(false);
    setShorteningUrl(true);
    setShortenError(false);
    
    // Try to shorten the URL
    try {
      const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
      const data = await response.json();
      
      if (data.shorturl) {
        setShareUrl(data.shorturl);
      } else {
        setShortenError(true);
      }
    } catch (error) {
      console.error('Failed to shorten URL:', error);
      setShortenError(true);
    } finally {
      setShorteningUrl(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

// Team background images - using public folder (move images to public/images/)
const BASE_URL = import.meta.env.BASE_URL;
const TEAM_BACKGROUNDS = {
  "Amazon": `${BASE_URL}images/Amazon.png`,
  "Black Orc": `${BASE_URL}images/BlackOrcs.png`,
  "Bretonnian": `${BASE_URL}images/Bretonnians.png`,
  "Chaos Chosen": `${BASE_URL}images/ChaosChosen.png`,
  "Chaos Dwarf": `${BASE_URL}images/ChaosDwarfs.png`,
  "Chaos Renegade": `${BASE_URL}images/ChaosRenegade.png`,
  "Dark Elf": `${BASE_URL}images/DarkElves.png`,
  "Dwarf": `${BASE_URL}images/Dwarves.png`,
  "Elf Union": `${BASE_URL}images/ElvenUnion.png`,
  "Gnome": `${BASE_URL}images/Gnomes.png`,
  "Goblin": `${BASE_URL}images/Goblins.png`,
  "Halfling": `${BASE_URL}images/Halflings.png`,
  "Human": `${BASE_URL}images/Human.png`,
  "Imperial Nobility": `${BASE_URL}images/ImperialNobility.png`,
  "Khorne": `${BASE_URL}images/Khorne.png`,
  "Lizardmen": `${BASE_URL}images/Lizardmen.png`,
  "Necromantic Horror": `${BASE_URL}images/Necromantic.png`,
  "Norse": `${BASE_URL}images/Norse.png`,
  "Nurgle": `${BASE_URL}images/Nurgle.png`,
  "Ogre": `${BASE_URL}images/Ogres.png`,
  "Old World Alliance": `${BASE_URL}images/OldWorldAlliance.png`,
  "Orc": `${BASE_URL}images/Orcs.png`,
  "Shambling Undead": `${BASE_URL}images/ShamblingUndead.png`,
  "Skaven": `${BASE_URL}images/Skaven.png`,
  "Snotling": `${BASE_URL}images/Snotling.png`,
  "Tomb King": `${BASE_URL}images/Tombkings.png`,
  "Underworld Denizens": `${BASE_URL}images/UnderworldDenizens.png`,
  "Vampire": `${BASE_URL}images/Vampire.png`,
  "Wood Elf": `${BASE_URL}images/Woodelf.png`
};

  const teamData = TEAMS[selectedTeam];
  const INDUCEMENTS = getInducements(selectedTeam);

  const totalSpent = useMemo(() => {
    let cost = 0;
    purchasedPlayers.forEach(p => cost += p.cost);
    const rerollCount = inducements["Rerolls"] || 0;
    cost += rerollCount * teamData.rerollCost;
    INDUCEMENTS.forEach(ind => {
      const count = inducements[ind.name] || 0;
      // First dedicated fan is free, so subtract 1 from count before calculating cost
      const chargeableCount = ind.name === "Fans" ? Math.max(0, count - 1) : count;
      cost += chargeableCount * ind.cost;
    });
    return cost;
  }, [purchasedPlayers, inducements, teamData]);

  // Calculate team value (includes skill costs)
  const teamValue = useMemo(() => {
    let value = totalSpent;
    // Add skill costs
    purchasedPlayers.forEach(player => {
      const skills = playerSkills[player.id];
      if (skills) {
        value += skills.primary.length * 20000; // Primary skills: 20k
        value += skills.secondary.length * 40000; // Secondary skills: 40k
      }
    });
    return value;
  }, [totalSpent, purchasedPlayers, playerSkills]);

  const remaining = startingTreasury - totalSpent;

  const calcTotalSpentFrom = (players, indState) => {
    let cost = 0;
    players.forEach((p) => {
      cost += p.cost;
    });

    const rerollCount = indState["Rerolls"] || 0;
    cost += rerollCount * teamData.rerollCost;

    INDUCEMENTS.forEach((ind) => {
      const count = indState[ind.name] || 0;
      // First dedicated fan is free, so subtract 1 from count before calculating cost
      const chargeableCount = ind.name === "Fans" ? Math.max(0, count - 1) : count;
      cost += chargeableCount * ind.cost;
    });

    return cost;
  };

  const purchasePlayer = (position) => {
    // Use a functional update so rapid clicks can't overspend.
    setPurchasedPlayers((prevPlayers) => {
      if (prevPlayers.length >= MAX_PLAYERS) return prevPlayers;

      const spentNow = calcTotalSpentFrom(prevPlayers, inducements);
      const remainingNow = startingTreasury - spentNow;
      if (remainingNow < position.cost) return prevPlayers;

      const currentCount = prevPlayers.filter((p) => p.name === position.name).length;
      if (currentCount >= position.max) return prevPlayers;

      const newPlayer = { ...position, id: Date.now() + Math.random() };
      return [...prevPlayers, newPlayer];
    });
  };

  const removePlayer = (playerId) => {
    setPurchasedPlayers(purchasedPlayers.filter(p => p.id !== playerId));
  };

  const updateInducement = (indName, delta) => {
    if (!delta) return;

    setInducements((prev) => {
      const current = prev[indName] || 0;
      const minAllowed = indName === "Fans" ? 1 : 0; // Can't go below 1 for Fans (the free starting fan)
      const maxAllowed =
        indName === "Apothecary"
          ? (TEAMS_WITHOUT_APOTHECARY.has(selectedTeam) ? 0 : 1)
          : indName === "Fans"
          ? 3
          : Number.POSITIVE_INFINITY;
      const newValue = Math.max(minAllowed, Math.min(maxAllowed, current + delta));
      if (newValue === current) return prev;

      // Enforce budget for increases (prevents overspend on rapid clicks).
      if (newValue > current) {
        const unitCost =
          indName === "Rerolls"
            ? teamData.rerollCost
            : (INDUCEMENTS.find((ind) => ind.name === indName)?.cost ?? 0);
        
        // Calculate actual chargeable count difference (accounting for free first fan)
        const currentChargeable = indName === "Fans" ? Math.max(0, current - 1) : current;
        const newChargeable = indName === "Fans" ? Math.max(0, newValue - 1) : newValue;
        const costIncrease = (newChargeable - currentChargeable) * unitCost;

        const spentNow = calcTotalSpentFrom(purchasedPlayers, prev);
        if (spentNow + costIncrease > startingTreasury) {
          return prev;
        }
      }

      return { ...prev, [indName]: newValue };
    });
  };

  // Safety: if team disallows apothecary, force it back to 0.
  useEffect(() => {
    if (!TEAMS_WITHOUT_APOTHECARY.has(selectedTeam)) return;
    setInducements((prev) => {
      if (!prev.Apothecary) return prev;
      const { Apothecary, ...rest } = prev;
      return rest;
    });
  }, [selectedTeam]);

  const handleTeamChange = (team) => {
    // Always reset roster when changing teams
    setSelectedTeam(team);
    setPurchasedPlayers([]);
    setInducements({Fans: 1}); // Start with 1 free dedicated fan
  };

  const handlePlayModeChange = (mode) => {
    setPlayMode(mode);
    if (mode === 'league') {
      setStartingTreasury(STARTING_TREASURY); // Lock to 1M in league mode
    }
  };

  const resetRoster = () => {
    setPurchasedPlayers([]);
    setInducements({Fans: 1}); // Start with 1 free dedicated fan
    setStartingTreasury(STARTING_TREASURY);
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

  const handleTreasuryChange = (e) => {
    // Remove all non-digit characters
    const value = e.target.value.replace(/\D/g, '');
    const numValue = parseInt(value) || 0;
    setStartingTreasury(numValue);
  };

  const handleTreasuryBlur = () => {
    setIsEditingTreasury(false);
  };

  const handleTreasuryClick = () => {
    if (playMode === 'tournament') {
      setIsEditingTreasury(true);
    }
  };

  const addSkillToPlayer = (playerId, skill, isPrimary) => {
    setPlayerSkills(prev => {
      const playerSkillData = prev[playerId] || { primary: [], secondary: [] };
      const category = isPrimary ? 'primary' : 'secondary';
      
      // Check if skill already exists
      if (playerSkillData.primary.includes(skill) || playerSkillData.secondary.includes(skill)) {
        return prev;
      }
      
      return {
        ...prev,
        [playerId]: {
          ...playerSkillData,
          [category]: [...playerSkillData[category], skill]
        }
      };
    });
  };

  const removeSkillFromPlayer = (playerId, skill) => {
    setPlayerSkills(prev => {
      const playerSkillData = prev[playerId];
      if (!playerSkillData) return prev;
      
      return {
        ...prev,
        [playerId]: {
          primary: playerSkillData.primary.filter(s => s !== skill),
          secondary: playerSkillData.secondary.filter(s => s !== skill)
        }
      };
    });
  };

  const openSkillModal = (playerId) => {
    setSelectedPlayerId(playerId);
    setShowSkillModal(true);
  };

  const closeSkillModal = () => {
    setShowSkillModal(false);
    setSelectedPlayerId(null);
  };

  const handlePrint = () => window.print();

  const formatCost = (cost) => cost.toLocaleString() + " gp";

  const getPositionCount = (posName) => purchasedPlayers.filter(p => p.name === posName).length;

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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Desktop layout (above 640px) */
        .mobile-grid {
          display: grid;
          grid-template-columns: 4fr 5fr 3fr;
          gap: 0.75rem;
        }
        
        /* Tablet/Mobile layout (640px and below) */
        @media (max-width: 640px) {
          .mobile-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.75rem;
            background-image: none !important;
          }
          
          .positions-col {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          
          .players-col {
            grid-column: 2 !important;
            grid-row: 1 !important;
          }
          
          .inducements-col {
            grid-column: 1 / -1 !important;
            grid-row: 2 !important;
          }
        }
        
        /* Small mobile layout (390px and below) - single column, smaller fonts */
        @media (max-width: 390px) {
          .mobile-grid {
            grid-template-columns: 1fr !important;
          }
          
          .positions-col {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          
          .players-col {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          
          .inducements-col {
            grid-column: 1 !important;
            grid-row: 3 !important;
          }
          
          h1 { font-size: 1.5rem !important; }
          h2 { font-size: 1.25rem !important; }
          h3 { font-size: 1rem !important; }
          .text-2xl { font-size: 1.25rem !important; }
          .text-xl { font-size: 1.125rem !important; }
          .text-lg { font-size: 1rem !important; }
          button { font-size: 0.875rem !important; padding: 0.25rem 0.5rem !important; }
        }
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
            <button 
              onClick={generateShareUrl}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-base flex items-center gap-2 transition-colors border border-blue-900"
            >
              <Share2 size={18} />
              SHARE
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-red-600">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-blue-800">
              <div>
                <h1 className="text-3xl font-bold text-red-600">{selectedTeam}</h1>
                <p className="text-sm text-blue-900">{teamData.league}</p>
              </div>
              <div className="flex gap-3">
                <div className="bg-purple-700 rounded px-3 py-1 border border-yellow-400 text-center">
                  <div className="text-yellow-400 text-xs font-bold">TEAM VALUE</div>
                  <div className="text-white text-base font-bold">{teamValue.toLocaleString()}</div>
                </div>
                <div className="bg-blue-800 rounded px-3 py-1 border border-yellow-400 text-center">
                  <div className="text-yellow-400 text-xs font-bold">PLAYERS</div>
                  <div className="text-white text-base font-bold">{purchasedPlayers.length}</div>
                </div>
                <div className="bg-green-700 rounded px-3 py-1 border border-yellow-400 text-center">
                  <div className="text-yellow-400 text-xs font-bold">LEFT</div>
                  <div className={`text-base font-bold ${remaining < 0 ? 'text-red-600' : 'text-white'}`}>
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
                  ðŸ’¡ Drag rows to reorder players
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
                      <th className="text-left p-2 text-white font-bold border border-blue-900">ADDED SKILLS</th>
                      <th className="text-center p-2 text-white font-bold border border-blue-900">ADD</th>
                      <th className="text-right p-2 text-white font-bold border border-blue-900">COST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchasedPlayers.map((player, idx) => {
                      const stats = player.stats.split('/');
                      const addedSkills = playerSkills[player.id] || { primary: [], secondary: [] };
                      const allAddedSkills = [...addedSkills.primary, ...addedSkills.secondary];
                      
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
                          <td className="p-1.5 text-blue-900 font-semibold border border-blue-200">{player.name}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[0]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[1]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[2]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[3]}</td>
                          <td className="p-1.5 text-center text-gray-700 font-mono border border-blue-200">{stats[4]}</td>
                          <td className="p-1.5 text-gray-700 text-xs border border-blue-200 leading-tight">{player.skills || '-'}</td>
                          <td className="p-1.5 text-gray-700 text-xs border border-blue-200">
                            {allAddedSkills.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {addedSkills.primary.map((skill, i) => (
                                  <span key={i} className="bg-blue-700 text-white px-1 rounded text-xs font-bold">
                                    {skill}
                                  </span>
                                ))}
                                {addedSkills.secondary.map((skill, i) => (
                                  <span key={i} className="bg-green-600 text-white px-1 rounded text-xs font-bold">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            ) : '-'}
                          </td>
                          <td className="p-1.5 text-center border border-blue-200">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openSkillModal(player.id);
                              }}
                              className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-white rounded text-xs font-bold border border-blue-900"
                            >
                              +
                            </button>
                          </td>
                          <td className="p-1.5 text-right text-blue-900 font-bold border border-blue-200 text-sm">
                            {formatCost(player.cost + (addedSkills.primary.length * 20000) + (addedSkills.secondary.length * 40000))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="mt-3 bg-blue-800 rounded p-3 border border-yellow-400">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold text-lg">TEAM VALUE (TV):</span>
                    <span className="text-white font-bold text-xl">{teamValue.toLocaleString()}</span>
                  </div>
                </div>
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

        {/* Skill Modal */}
        {showSkillModal && selectedPlayerId && (() => {
          const player = purchasedPlayers.find(p => p.id === selectedPlayerId);
          if (!player) return null;
          
          const positionSkills = getPositionSkillAccess(selectedTeam, player.name);
          if (!positionSkills) {
            return (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeSkillModal}>
                <div className="bg-white rounded-lg p-6 max-w-md" onClick={(e) => e.stopPropagation()}>
                  <h2 className="text-xl font-bold text-red-600 mb-4">Skill Access Not Available</h2>
                  <p className="text-gray-700 mb-4">
                    Skill access data for {selectedTeam} - {player.name} is not yet configured.
                  </p>
                  <button
                    onClick={closeSkillModal}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          }
          
          const addedSkills = playerSkills[selectedPlayerId] || { primary: [], secondary: [] };
          const basicSkills = player.skills ? player.skills.split(',').map(s => s.trim()) : [];
          
          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeSkillModal}>
              <div className="bg-blue-50 rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-800">
                    Add Skills to {player.name}
                  </h2>
                  <button
                    onClick={closeSkillModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    Ã—
                  </button>
                </div>
                
                <div className="mb-4 p-3 bg-blue-100 rounded border border-blue-300">
                  <h3 className="font-bold text-blue-900 mb-2">Current Added Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {addedSkills.primary.map((skill, i) => (
                      <span key={i} className="bg-blue-700 text-white px-2 py-1 rounded text-sm flex items-center gap-2 font-bold">
                        {skill}
                        <button
                          onClick={() => removeSkillFromPlayer(selectedPlayerId, skill)}
                          className="hover:text-red-200 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {addedSkills.secondary.map((skill, i) => (
                      <span key={i} className="bg-green-600 text-white px-2 py-1 rounded text-sm flex items-center gap-2 font-bold">
                        {skill}
                        <button
                          onClick={() => removeSkillFromPlayer(selectedPlayerId, skill)}
                          className="hover:text-red-200 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {addedSkills.primary.length === 0 && addedSkills.secondary.length === 0 && (
                      <span className="text-gray-600 italic">No skills added yet</span>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Primary Skills */}
                  <div>
                    <h3 className="text-lg font-bold text-blue-700 mb-2 pb-1 border-b-2 border-blue-700">
                      Primary Skills (Adds 20k team value)
                    </h3>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addSkillToPlayer(selectedPlayerId, e.target.value, true);
                          e.target.value = '';
                        }
                      }}
                      className="w-full p-2 border-2 border-blue-700 rounded bg-blue-50 text-blue-900 font-semibold"
                    >
                      <option value="">-- Select Primary Skill --</option>
                      {positionSkills.primary.map(category => 
                        SKILLS_BY_CATEGORY[category].map(skill => {
                          const isAdded = addedSkills.primary.includes(skill) || addedSkills.secondary.includes(skill);
                          const isBasic = basicSkills.includes(skill);
                          const isDisabled = isAdded || isBasic;
                          return (
                            <option 
                              key={skill} 
                              value={skill}
                              disabled={isDisabled}
                            >
                              {skill} ({category}) {isAdded ? 'âœ“ Added' : isBasic ? 'âœ“ Basic' : ''}
                            </option>
                          );
                        })
                      )}
                    </select>
                  </div>
                  
                  {/* Secondary Skills */}
                  <div>
                    <h3 className="text-lg font-bold text-green-700 mb-2 pb-1 border-b-2 border-green-700">
                      Secondary Skills (Adds 40k team value)
                    </h3>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addSkillToPlayer(selectedPlayerId, e.target.value, false);
                          e.target.value = '';
                        }
                      }}
                      className="w-full p-2 border-2 border-green-700 rounded bg-green-50 text-green-900 font-semibold"
                    >
                      <option value="">-- Select Secondary Skill --</option>
                      {positionSkills.secondary.map(category => 
                        SKILLS_BY_CATEGORY[category].map(skill => {
                          const isAdded = addedSkills.primary.includes(skill) || addedSkills.secondary.includes(skill);
                          const isBasic = basicSkills.includes(skill);
                          const isDisabled = isAdded || isBasic;
                          return (
                            <option 
                              key={skill} 
                              value={skill}
                              disabled={isDisabled}
                            >
                              {skill} ({category}) {isAdded ? 'âœ“ Added' : isBasic ? 'âœ“ Basic' : ''}
                            </option>
                          );
                        })
                      )}
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeSkillModal}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded font-bold"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
            <div className="bg-blue-50 rounded-lg p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                  <Share2 size={24} />
                  Share Your Team
                </h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">
                Copy this link to share your <strong>{selectedTeam}</strong> team with others:
              </p>
              
              {shorteningUrl && (
                <div className="bg-blue-100 border-2 border-blue-300 rounded p-3 mb-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                    <span className="text-blue-700 font-semibold">Creating short link...</span>
                  </div>
                </div>
              )}
              
              <div className="bg-white border-2 border-blue-300 rounded p-3 mb-4 break-all font-mono text-sm">
                {shareUrl}
              </div>
              
              {shortenError && (
                <div className="bg-yellow-100 border border-yellow-400 rounded p-2 mb-4 text-sm text-yellow-800">
                  ⚠️ Couldn't create short link. Using full URL instead.
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className={`flex-1 px-4 py-3 rounded font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-700 hover:bg-blue-600 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={20} />
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded font-bold text-lg"
                >
                  Close
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
                <p className="text-sm text-blue-900">
                  <strong>💡 Tip:</strong> Anyone with this link can view and edit this team. The link contains all your team data, so no login is required!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Print View Mode
  if (viewMode === 'view') {
    return (
      <div className="min-h-screen bg-white p-8">
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
        
        /* Desktop layout (above 640px) */
        .mobile-grid {
          display: grid;
          grid-template-columns: 4fr 5fr 3fr;
          gap: 0.75rem;
        }
        
        /* Tablet/Mobile layout (640px and below) */
        @media (max-width: 640px) {
          .mobile-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.75rem;
            background-image: none !important;
          }
          
          .positions-col {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          
          .players-col {
            grid-column: 2 !important;
            grid-row: 1 !important;
          }
          
          .inducements-col {
            grid-column: 1 / -1 !important;
            grid-row: 2 !important;
          }
        }
        
        /* Small mobile layout (390px and below) - single column, smaller fonts */
        @media (max-width: 390px) {
          .mobile-grid {
            grid-template-columns: 1fr !important;
          }
          
          .positions-col {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          
          .players-col {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          
          .inducements-col {
            grid-column: 1 !important;
            grid-row: 3 !important;
          }
          
          h1 { font-size: 1.5rem !important; }
          h2 { font-size: 1.25rem !important; }
          h3 { font-size: 1rem !important; }
          .text-2xl { font-size: 1.25rem !important; }
          .text-xl { font-size: 1.125rem !important; }
          .text-lg { font-size: 1rem !important; }
          button { font-size: 0.875rem !important; padding: 0.25rem 0.5rem !important; }
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
            <button 
              onClick={generateShareUrl}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <Share2 size={20} />
              Share Team
            </button>
          </div>

          <div className="border border-gray-800 p-6">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-2">{selectedTeam}</h1>
              <p className="text-xl text-gray-600">{teamData.league} League</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="border border-gray-800 p-3">
                <div className="text-sm font-semibold text-gray-600">Team Value</div>
                <div className="text-2xl font-bold">{teamValue.toLocaleString()}</div>
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
                  {purchasedPlayers.map((player, idx) => {
                    const addedSkills = playerSkills[player.id] || { primary: [], secondary: [] };
                    const allAddedSkills = [...addedSkills.primary, ...addedSkills.secondary];
                    
                    return (
                    <tr key={player.id} className="border-b border-gray-400">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2 font-semibold">{player.name}</td>
                      <td className="p-2 font-mono text-sm">{player.stats}</td>
                      <td className="p-2 text-sm">
                        {player.skills || '-'}
                        {allAddedSkills.length > 0 && (
                          <span className="font-bold">
                            {player.skills ? ', ' : ''}
                            {allAddedSkills.join(', ')}
                          </span>
                        )}
                      </td>
                      <td className="p-2 text-right">{formatCost(player.cost)}</td>
                    </tr>
                    );
                  })}
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
        
        
        /* Custom scrollbar styling */
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(191, 219, 254, 0.3);
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #93c5fd rgba(191, 219, 254, 0.3);
        }
        /* Desktop layout (above 640px) */
        .mobile-grid {
          display: grid;
          grid-template-columns: 4fr 5fr 3fr;
          gap: 0.75rem;
        }
        
        /* Tablet/Mobile layout (640px and below) */
        @media (max-width: 640px) {
          .mobile-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.75rem;
            background-image: none !important;
          }
          
          .positions-col {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          
          .players-col {
            grid-column: 2 !important;
            grid-row: 1 !important;
          }
          
          .inducements-col {
            grid-column: 1 / -1 !important;
            grid-row: 2 !important;
          }
        }
        
        /* Small mobile layout (390px and below) - single column, smaller fonts */
        @media (max-width: 390px) {
          .mobile-grid {
            grid-template-columns: 1fr !important;
          }
          
          .positions-col {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          
          .players-col {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          
          .inducements-col {
            grid-column: 1 !important;
            grid-row: 3 !important;
          }
          
          h1 { font-size: 1.5rem !important; }
          h2 { font-size: 1.25rem !important; }
          h3 { font-size: 1rem !important; }
          .text-2xl { font-size: 1.25rem !important; }
          .text-xl { font-size: 1.125rem !important; }
          .text-lg { font-size: 1rem !important; }
          button { font-size: 0.875rem !important; padding: 0.25rem 0.5rem !important; }
        }
      `}</style>

      <div className="max-w-[1800px] mx-auto">
        {/* Header with Title and Reset - Full width, no borders */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-4xl font-bold text-white tracking-wide" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
              BLOOD BOWL ROSTER BUILDER
            </h1>
            <div className="flex items-center gap-3">
              {/* League/Tournament Toggle */}
              <div className="flex items-center gap-2 bg-blue-900 px-3 py-2 rounded border border-yellow-400">
                <span className={`text-sm font-bold transition-colors ${playMode === 'league' ? 'text-yellow-400' : 'text-blue-300'}`}>
                  LEAGUE
                </span>
                <button
                  onClick={() => handlePlayModeChange(playMode === 'league' ? 'tournament' : 'league')}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    playMode === 'tournament' ? 'bg-green-600' : 'bg-gray-400'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                      playMode === 'tournament' ? 'transform translate-x-7' : ''
                    }`}
                  />
                </button>
                <span className={`text-sm font-bold transition-colors ${playMode === 'tournament' ? 'text-yellow-400' : 'text-blue-300'}`}>
                  TOURNAMENT
                </span>
              </div>
              <button 
                onClick={resetRoster}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-lg transition-colors whitespace-nowrap border border-blue-900"
              >
                RESET ROSTER
              </button>
            </div>
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
                {TEAM_NAMES.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 items-center">
              <div 
                className={`bg-blue-100 rounded px-4 py-2 border-2 text-center transition-all ${
                  playMode === 'tournament' ? 'border-blue-400 cursor-pointer hover:border-blue-600 hover:bg-blue-200' : 'border-blue-300 cursor-not-allowed'
                }`}
                onClick={handleTreasuryClick}
                title={playMode === 'league' ? 'Fixed at 1,000,000 gp in League mode' : 'Click to edit'}
              >
                <div className="text-blue-600 text-xs font-bold flex items-center justify-center gap-1">
                  STARTING TREASURY {playMode === 'league' ? '🔒' : '✏️'}
                </div>
                {isEditingTreasury ? (
                  <input
                    type="text"
                    value={startingTreasury.toLocaleString()}
                    onChange={handleTreasuryChange}
                    onBlur={handleTreasuryBlur}
                    autoFocus
                    className="text-blue-900 text-xl font-bold bg-white text-center w-32 border border-blue-400 rounded px-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsEditingTreasury(false);
                      }
                    }}
                  />
                ) : (
                  <div className="text-blue-900 text-xl font-bold">{formatCost(startingTreasury)}</div>
                )}
              </div>
              <div className="bg-blue-100 rounded px-4 py-2 border-2 border-blue-300 text-center">
                <div className="text-red-600 text-xs font-bold">SPENT</div>
                <div className="text-gray-900 text-xl font-bold">{formatCost(totalSpent)}</div>
              </div>
              <div className="bg-blue-100 rounded px-4 py-2 border-2 border-blue-300 text-center">
                <div className="text-green-700 text-xs font-bold">REMAINING</div>
                <div className={`text-xl font-bold ${remaining < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatCost(remaining)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-blue-900 text-sm font-semibold">
            {teamData.league} • Reroll Cost: {formatCost(teamData.rerollCost)}
          </div>
        </div>

        <div className="px-2">{/* Wrapper for spacing on sides */}

        <div className="mobile-grid" style={{backgroundImage: TEAM_BACKGROUNDS[selectedTeam] ? `url(${TEAM_BACKGROUNDS[selectedTeam]})` : "none", backgroundRepeat: "no-repeat", backgroundPosition: "center bottom", backgroundSize: "auto 60%", minHeight: "calc(100vh - 220px)"}}>
          {/* Available Positions - 30% (4 columns) */}
          <div className="positions-col">
            <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">AVAILABLE POSITIONS</h2>
              <div className="text-sm text-blue-900 font-semibold mb-2 pb-1 border-b border-blue-800">{selectedTeam} team</div>
              <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scroll">
                {teamData.positions.map((pos, idx) => {
                  const count = getPositionCount(pos.name);
                  const canBuy = remaining >= pos.cost && count < pos.max && purchasedPlayers.length < MAX_PLAYERS;
                  return (
                    <div key={idx} className="bg-blue-100 rounded p-2 border border-blue-200 hover:border-blue-800 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-blue-900 truncate">{pos.name}</h3>
                            <span className="text-gray-600 text-xs whitespace-nowrap">
                              ({count}/{pos.max})
                            </span>
                          </div>
                          <div className="text-gray-700 font-mono text-xs mt-0.5">
                            {pos.stats}
                          </div>
                          <div className="text-gray-600 text-xs mt-0.5 line-clamp-2">
                            {pos.skills || '-'}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-blue-800 font-bold text-sm mb-1">{formatCost(pos.cost)}</div>
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
          <div className="players-col">
            <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-blue-800">
              <div className="flex justify-between items-center mb-2 pb-1 border-b border-blue-800">
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-2">PLAYERS ({purchasedPlayers.length})</h2>
                  <div className="text-sm text-blue-900 font-semibold">Team Value: {teamValue.toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setViewMode('roster')}
                    className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-base transition-colors border border-blue-900"
                  >
                    <Eye size={18} className="inline mr-1" />
                    VIEW ROSTER
                  </button>
                  <button 
                    onClick={generateShareUrl}
                    className="px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded font-bold text-base transition-colors border border-blue-900"
                  >
                    <Share2 size={18} className="inline mr-1" />
                    SHARE
                  </button>
                </div>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scroll">
                {purchasedPlayers.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">No players purchased yet</div>
                ) : (
                  purchasedPlayers.map((player, idx) => {
                    const addedSkills = playerSkills[player.id] || { primary: [], secondary: [] };
                    const hasAddedSkills = addedSkills.primary.length > 0 || addedSkills.secondary.length > 0;
                    
                    return (
                    <div key={player.id} className="bg-blue-100 rounded p-2 border border-blue-200 hover:border-blue-600 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-sm font-bold">#{idx + 1}</span>
                            <h3 className="text-lg font-bold text-blue-900 truncate">{player.name}</h3>
                          </div>
                          <div className="text-gray-700 font-mono text-xs mt-0.5">
                            {player.stats}
                          </div>
                          <div className="text-gray-600 text-xs mt-0.5 line-clamp-2">
                            {player.skills || '-'}
                          </div>
                          {hasAddedSkills && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {addedSkills.primary.map((skill, i) => (
                                <span key={`p-${i}`} className="bg-blue-700 text-white px-1 rounded text-xs font-bold">
                                  {skill}
                                </span>
                              ))}
                              {addedSkills.secondary.map((skill, i) => (
                                <span key={`s-${i}`} className="bg-green-600 text-white px-1 rounded text-xs font-bold">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-blue-800 font-bold text-sm mb-1">{formatCost(player.cost)}</div>
                          <button
                            onClick={() => removePlayer(player.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-sm transition-all border border-red-800"
                          >
                            <Trash2 size={16} className="inline" />
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Inducements - 25% (3 columns) */}
          <div className="inducements-col">
            <div className="bg-blue-50 rounded-lg p-3 shadow-xl border border-blue-800">
              <div className="mb-2 pb-1 border-b border-blue-800">
                <h2 className="text-2xl font-bold text-blue-800">INDUCEMENTS</h2>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 custom-scroll">
                {/* Rerolls */}
                <div className="bg-blue-100 rounded p-2 border border-blue-200 hover:border-blue-600 transition-colors">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-blue-900 truncate">Rerolls</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-blue-800 font-bold text-sm">{formatCost(teamData.rerollCost)}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-900 font-bold text-xl">{inducements["Rerolls"] || 0}</div>
                    <div className="flex gap-1 justify-end" style={{minWidth: '90px'}}>
                      {(inducements["Rerolls"] || 0) > 0 && (
                        <button
                          onClick={() => updateInducement("Rerolls", -1)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-sm transition-all border border-red-800"
                        >
                          <Minus size={16} className="inline" />
                        </button>
                      )}
                      <button
                        onClick={() => updateInducement("Rerolls", 1)}
                        disabled={remaining < teamData.rerollCost}
                        className={`px-3 py-1 rounded font-bold text-sm transition-all border ${
                          remaining >= teamData.rerollCost
                            ? 'bg-blue-700 hover:bg-blue-600 text-white cursor-pointer border-blue-900'
                            : 'bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500'
                        }`}
                      >
                        <Plus size={16} className="inline" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Other Inducements */}
                {INDUCEMENTS.map((ind) => (
                  <div key={ind.name} className="bg-blue-100 rounded p-2 border border-blue-200 hover:border-blue-600 transition-colors">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h3 className="text-lg font-bold text-blue-900 truncate">{ind.name}</h3>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-blue-800 font-bold text-sm">{formatCost(ind.cost)}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-blue-900 font-bold text-xl">{inducements[ind.name] || 0}</div>
                      <div className="flex gap-1 justify-end" style={{minWidth: '90px'}}>
                        {(inducements[ind.name] || 0) > (ind.name === 'Fans' ? 1 : 0) && (
                          <button
                            onClick={() => updateInducement(ind.name, -1)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-sm transition-all border border-red-800"
                          >
                            <Minus size={16} className="inline" />
                          </button>
                        )}
                        <button
                          onClick={() => updateInducement(ind.name, 1)}
                          disabled={remaining < ind.cost || (ind.name === 'Apothecary' && (inducements[ind.name] || 0) >= 1) || (ind.name === 'Fans' && (inducements[ind.name] || 0) >= 3)}
                          className={`px-3 py-1 rounded font-bold text-sm transition-all border ${
                            remaining >= ind.cost && !(ind.name === 'Apothecary' && (inducements[ind.name] || 0) >= 1) && !(ind.name === 'Fans' && (inducements[ind.name] || 0) >= 3)
                              ? 'bg-blue-700 hover:bg-blue-600 text-white cursor-pointer border-blue-900'
                              : 'bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500'
                          }`}
                        >
                          <Plus size={16} className="inline" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Miniature Purchase Links */}
        {teamData.miniatureLinks && (
          <div className="mt-3 bg-blue-50 rounded-lg p-3 shadow-xl border border-blue-800">
            <h2 className="text-xl font-bold text-blue-800 mb-2 pb-1 border-b border-blue-800">
              WHERE TO BUY MINIATURES FOR {selectedTeam.toUpperCase()} TEAMS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {teamData.miniatureLinks.map((link, idx) => (
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