import React, { useState } from 'react';
import {
  X, Shield, Award, Trophy, Users, Calendar, Clock,
  CheckCircle2, Star, Sparkles, ChevronRight, User, Flame,
  Check, ArrowRight, Zap, Target, BookOpen, AlertCircle
} from 'lucide-react';

export interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  citizenName: string;
  onUpdateCitizenName?: (newName: string) => void;
  currentDistrict?: string;
  currentWorld?: string;
  coins?: number;
  outfit?: string;
}

interface ClanChallenge {
  id: string;
  title: string;
  category: string;
  completedDate: string;
  description: string;
  repXpEarned: number;
  coinReward: number;
  badgeReward: string;
  status: 'completed' | 'in_progress';
  progress?: number;
  maxProgress?: number;
}

interface GuildEvent {
  id: string;
  title: string;
  datetime: string;
  startsIn: string;
  location: string;
  requiredRepLevel: number;
  prizePool: string;
  description: string;
  tag: string;
  isRegistered: boolean;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  citizenName,
  onUpdateCitizenName,
  currentDistrict = 'Abuja Metropolis Central Capital',
  currentWorld = 'Abuja Metropolis',
  coins = 1250,
  outfit = 'Royal Emerald Jalabiyya',
}) => {
  const [activeTab, setActiveTab] = useState<'guild' | 'challenges' | 'events' | 'identity'>('guild');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(citizenName);
  const [nameSaveFeedback, setNameSaveFeedback] = useState(false);

  // Guild Reputation State (User Level & Progress)
  const [guildRepLevel, setGuildRepLevel] = useState(8);
  const [currentRepXp, setCurrentRepXp] = useState(8650);
  const maxRepXp = 10000;
  const guildName = 'Al-Fursan Vanguard';
  const guildTag = 'FURSAN';
  const guildRankTitle = 'Exalted Emir';

  // Completed & In-Progress Clan Challenges
  const [challenges, setChallenges] = useState<ClanChallenge[]>([
    {
      id: 'c1',
      title: 'Grand Umayyad Mosque Restoration',
      category: 'Civic Engineering',
      completedDate: 'Oct 14, 2026',
      description: 'Coordinated 50 guild artisans to transport quarry stone and install hand-cut geometric ceramic tiles for the central courtyard.',
      repXpEarned: 1250,
      coinReward: 500,
      badgeReward: 'Master Builder Sigil',
      status: 'completed',
      progress: 50,
      maxProgress: 50,
    },
    {
      id: 'c2',
      title: 'Silk Route Escort: Isfahan to Damascus',
      category: 'Expedition & Escort',
      completedDate: 'Oct 12, 2026',
      description: 'Defended a 12-caravan mercantile convoy across the desert trade corridor, securing valuable spices, silks, and manuscripts.',
      repXpEarned: 1800,
      coinReward: 750,
      badgeReward: 'Silk Caravan Veteran',
      status: 'completed',
      progress: 12,
      maxProgress: 12,
    },
    {
      id: 'c3',
      title: 'Al-Andalus Citadel Vault Defense',
      category: 'Clan Stronghold',
      completedDate: 'Oct 09, 2026',
      description: 'Maintained continuous perimeter surveillance along the outer battlements of the Alhambra for 24 cycles without breach.',
      repXpEarned: 1400,
      coinReward: 600,
      badgeReward: 'Nasrid Shield',
      status: 'completed',
      progress: 24,
      maxProgress: 24,
    },
    {
      id: 'c4',
      title: 'Sankore University Manuscript Archiving',
      category: 'Cultural Preservation',
      completedDate: 'Oct 05, 2026',
      description: 'Catalogued and illuminated 100 astronomical and legal codices in the ancient library vaults of Timbuktu.',
      repXpEarned: 950,
      coinReward: 400,
      badgeReward: 'Sankore Scholar',
      status: 'completed',
      progress: 100,
      maxProgress: 100,
    },
    {
      id: 'c5',
      title: 'Makkah Global Ramadan Charity Convoy',
      category: 'Sadaqah & Community',
      completedDate: 'Active Milestone',
      description: 'Distribute 5,000 Ramadan nutrition parcels to traveling pilgrim camps across the holy basin.',
      repXpEarned: 2500,
      coinReward: 1000,
      badgeReward: 'Bountiful Crescent Banner',
      status: 'in_progress',
      progress: 4320,
      maxProgress: 5000,
    },
    {
      id: 'c6',
      title: 'Frontier Citadels Survey (Timbuktu to Tunis)',
      category: 'Metropolis Scouting',
      completedDate: 'Active Milestone',
      description: 'Survey and unlock radar beacon blips at all 12 newly discovered metropolitan districts.',
      repXpEarned: 1600,
      coinReward: 700,
      badgeReward: 'Sahara Pathfinder',
      status: 'in_progress',
      progress: 9,
      maxProgress: 12,
    },
  ]);

  // Upcoming Guild-Exclusive Events
  const [events, setEvents] = useState<GuildEvent[]>([
    {
      id: 'ev1',
      title: 'Siege of the Alhambra Fortress',
      datetime: 'Today · 21:00 UTC',
      startsIn: '2h 45m',
      location: 'Granada Alhambra Palace Gardens',
      requiredRepLevel: 5,
      prizePool: '100,000 Coins + Sovereign Nasrid Armour',
      description: 'Guild vs Guild tactical citadel assault. Defend the Royal Torre de la Vela against rival clans in an epic 50v50 siege.',
      tag: 'FORTRESS SIEGE',
      isRegistered: true,
    },
    {
      id: 'ev2',
      title: 'Naqsh-e Jahan Midnight Grand Joust',
      datetime: 'Tomorrow · 19:30 UTC',
      startsIn: '26h 15m',
      location: 'Isfahan Naqsh-e Jahan Royal Plaza',
      requiredRepLevel: 7,
      prizePool: '50,000 Coins + Royal Turquoise Arabian Steed',
      description: 'Equine mounted precision championship across the ceremonial fountains of the Safavid Empire.',
      tag: 'ELITE JOUST',
      isRegistered: false,
    },
    {
      id: 'ev3',
      title: 'Sankore Manuscript Relic Hunt',
      datetime: 'Saturday · 16:00 UTC',
      startsIn: '3 Days',
      location: 'Timbuktu Sankore Ancient Academy',
      requiredRepLevel: 4,
      prizePool: 'Legendary Ancient Astrolabe Codex',
      description: 'Solve cryptographic astronomical riddles hidden inside mud-brick minarets and courtyard arches.',
      tag: 'RELIC EXPEDITION',
      isRegistered: false,
    },
    {
      id: 'ev4',
      title: 'Grand Dhow Regatta Championship',
      datetime: 'Sunday · 14:00 UTC',
      startsIn: '4 Days',
      location: 'Doha Pearl Bay to Muscat Mutrah Waters',
      requiredRepLevel: 6,
      prizePool: '75,000 Coins + Gilded Dhow Yacht',
      description: 'Maritime navigation race across open waters and coastal watchtowers under changing tidal winds.',
      tag: 'MARITIME REGATTA',
      isRegistered: false,
    },
  ]);

  if (!isOpen) return null;

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    if (onUpdateCitizenName) {
      onUpdateCitizenName(nameInput.trim());
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('baraka_citizen_name', nameInput.trim());
    }
    setIsEditingName(false);
    setNameSaveFeedback(true);
    setTimeout(() => setNameSaveFeedback(false), 2500);
  };

  const handleToggleEventRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, isRegistered: !e.isRegistered }
          : e
      )
    );
  };

  const handleContributeToChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId && c.status === 'in_progress' && c.progress !== undefined) {
          const nextProg = Math.min(c.maxProgress || 5000, c.progress + 150);
          const isDone = nextProg >= (c.maxProgress || 5000);
          if (isDone) {
            setCurrentRepXp((xp) => xp + c.repXpEarned);
          }
          return {
            ...c,
            progress: nextProg,
            status: isDone ? 'completed' : 'in_progress',
            completedDate: isDone ? 'Just Now' : c.completedDate,
          };
        }
        return c;
      })
    );
  };

  const completedChallenges = challenges.filter((c) => c.status === 'completed');
  const inProgressChallenges = challenges.filter((c) => c.status === 'in_progress');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn select-none font-sora">
      <div className="bg-[#10141f] border border-emerald-500/40 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 flex items-center justify-center text-black font-black text-lg shadow-lg">
              <Shield className="w-6 h-6 text-black fill-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black uppercase text-white tracking-wider">
                  CITIZEN PROFILE & GUILD REPUTATION
                </h3>
                <span className="text-[9px] font-hud bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold uppercase">
                  LEVEL {guildRepLevel}
                </span>
              </div>
              <span className="text-[10px] font-hud text-zinc-400">
                GUILD: <span className="text-emerald-400 font-bold">{guildName}</span> · CLAN ID: <span className="text-zinc-300 font-mono">#{guildTag}-084</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Identity Banner Card */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950/60 via-black/80 to-[#10141f] border-b border-white/10 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400/60 flex items-center justify-center text-emerald-400 font-black text-xl shadow-inner shrink-0 relative">
                <span>{citizenName.charAt(0).toUpperCase()}</span>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#10141f] flex items-center justify-center text-[8px] text-black font-black">
                  ✓
                </span>
              </div>

              <div>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      maxLength={24}
                      className="bg-black/80 border border-emerald-400 rounded-xl px-2.5 py-1 text-xs font-black uppercase text-white outline-none w-44"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="px-2 py-1 text-zinc-400 hover:text-white text-[10px] font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black uppercase text-white tracking-wide">
                      {citizenName}
                    </span>
                    <button
                      onClick={() => {
                        setNameInput(citizenName);
                        setIsEditingName(true);
                      }}
                      className="text-[10px] font-hud text-zinc-400 hover:text-emerald-400 underline cursor-pointer uppercase"
                    >
                      Edit
                    </button>
                    {nameSaveFeedback && (
                      <span className="text-[10px] font-bold text-emerald-400 animate-fadeIn">
                        Saved ✓
                      </span>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] font-hud text-zinc-300">
                  <span className="text-emerald-400 font-bold uppercase">{guildRankTitle}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400 truncate max-w-[170px] sm:max-w-none">{currentDistrict}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-amber-400 font-bold font-hud">{coins.toLocaleString()} Coins</span>
                </div>
              </div>
            </div>

            {/* Quick Level Badge & Perk Tag */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10 shrink-0">
              <span className="text-[10px] font-hud text-zinc-400 uppercase tracking-widest">
                Guild Standing
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-400 font-hud uppercase tracking-wider">
                Rank #3 · Sovereign Vanguard
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Strip */}
        <div className="flex items-center gap-1.5 p-2 bg-black/60 border-b border-white/10 shrink-0 overflow-x-auto">
          {[
            { id: 'guild', label: 'Guild Reputation', icon: Shield, badge: `Lvl ${guildRepLevel}` },
            { id: 'challenges', label: 'Clan Challenges', icon: Target, badge: `${completedChallenges.length} Done` },
            { id: 'events', label: 'Guild Events', icon: Calendar, badge: `${events.length} Upcoming` },
            { id: 'identity', label: 'Citizen Identity', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-lg scale-100'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-emerald-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[8.5px] font-hud font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/20 text-black' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs text-zinc-300">
          
          {/* ============================================================= */}
          {/* TAB 1: GUILD REPUTATION TRACKING SYSTEM                       */}
          {/* ============================================================= */}
          {activeTab === 'guild' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Level Progress Gauge */}
              <div className="bg-black/60 border border-emerald-500/30 p-4 sm:p-5 rounded-2xl relative overflow-hidden space-y-3 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-hud text-zinc-400 uppercase tracking-widest block">
                      Reputation Progression
                    </span>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
                        Reputation Level {guildRepLevel}: {guildRankTitle}
                      </h4>
                      <span className="text-[9px] font-hud font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        TIER IV
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-hud text-zinc-400 uppercase tracking-widest block">
                      Next Rank Target
                    </span>
                    <span className="text-xs font-black text-amber-400 font-hud">
                      {currentRepXp.toLocaleString()} / {maxRepXp.toLocaleString()} REP XP
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${(currentRepXp / maxRepXp) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-hud text-zinc-400">
                    <span>Lvl {guildRepLevel} Initiated</span>
                    <span className="text-emerald-400 font-bold">
                      {Math.round(((maxRepXp - currentRepXp) / 1000) * 1000)} XP to Level {guildRepLevel + 1} (Grand Vizier)
                    </span>
                    <span>Lvl {guildRepLevel + 1}</span>
                  </div>
                </div>
              </div>

              {/* Guild Perks Unlocked at Current Reputation */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> ACTIVE GUILD REPUTATION PRIVILEGES
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      title: 'Souq Bazaar Trade Discount',
                      value: '-20% Merchant Prices',
                      desc: 'Save on spices, robes, and caravan goods across all Souq Al-Baraka stalls.',
                      icon: '🏛️',
                      unlocked: true,
                    },
                    {
                      title: 'Fast-Travel Citadel Teleport',
                      value: 'Zero Travel Cooldown',
                      desc: 'Instant warp between all 12 major metropolitan citadels and sanctuaries.',
                      icon: '⚡',
                      unlocked: true,
                    },
                    {
                      title: 'Clan Tournament Prize Multiplier',
                      value: '+25% Bonus Coins',
                      desc: 'Earn amplified coin payouts in daily quiz bowls and guild skirmishes.',
                      icon: '🏆',
                      unlocked: true,
                    },
                    {
                      title: 'Exclusive Sovereign Steed Access',
                      value: 'Gilded Royal Mount',
                      desc: 'Unlocks high-speed Arabian steed and customized luxury metro sedan.',
                      icon: '🐎',
                      unlocked: true,
                    },
                  ].map((perk, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-black/50 border border-white/10 rounded-xl flex items-start gap-3 hover:border-emerald-500/40 transition-colors"
                    >
                      <span className="text-xl shrink-0">{perk.icon}</span>
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-white uppercase text-[11px]">{perk.title}</span>
                          <span className="text-[9px] font-hud text-emerald-400 font-black shrink-0">
                            {perk.value}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-0.5 leading-snug">{perk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clan Quick Stats Strip */}
              <div className="grid grid-cols-3 gap-2 bg-black/40 border border-white/10 p-3 rounded-2xl">
                <div className="text-center">
                  <span className="text-[9px] font-hud text-zinc-400 uppercase block">Completed Clan Tasks</span>
                  <span className="text-base font-black text-emerald-400 font-hud">{completedChallenges.length} Completed</span>
                </div>
                <div className="text-center border-x border-white/10">
                  <span className="text-[9px] font-hud text-zinc-400 uppercase block">Clan Contribution</span>
                  <span className="text-base font-black text-white font-hud">12,450 XP</span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] font-hud text-zinc-400 uppercase block">Guild Members</span>
                  <span className="text-base font-black text-amber-400 font-hud">48 / 50 Active</span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* TAB 2: CURRENT CLAN CHALLENGES COMPLETED                      */}
          {/* ============================================================= */}
          {activeTab === 'challenges' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Header summary */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    CLAN EXPEDITION & WARFARE CHALLENGES
                  </h4>
                  <span className="text-[10px] font-hud text-zinc-400">
                    {completedChallenges.length} CHALLENGES COMPLETED · {inProgressChallenges.length} IN PROGRESS
                  </span>
                </div>
              </div>

              {/* In Progress Section */}
              {inProgressChallenges.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> ACTIVE IN-PROGRESS CHALLENGES
                  </span>

                  {inProgressChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="p-3.5 bg-black/60 border border-amber-500/40 rounded-2xl space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black uppercase text-white tracking-wide">
                              {challenge.title}
                            </span>
                            <span className="text-[8.5px] font-hud font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded">
                              {challenge.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{challenge.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-emerald-400 font-hud block">
                            +{challenge.repXpEarned} REP XP
                          </span>
                          <span className="text-[9px] font-hud text-amber-400 font-bold block">
                            +{challenge.coinReward} Coins
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar with Contribution Action */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-[9px] font-hud text-zinc-400 mb-1">
                            <span>Clan Progress</span>
                            <span className="text-white font-bold">
                              {challenge.progress?.toLocaleString()} / {challenge.maxProgress?.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full transition-all"
                              style={{
                                width: `${Math.min(
                                  100,
                                  ((challenge.progress || 0) / (challenge.maxProgress || 1)) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => handleContributeToChallenge(challenge.id)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-[10px] rounded-xl transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
                        >
                          Contribute +150
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Completed Challenges List */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> RECENTLY COMPLETED CLAN CHALLENGES ({completedChallenges.length})
                </span>

                {completedChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-3.5 bg-emerald-950/20 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-400 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-black uppercase text-white tracking-wide">
                            {challenge.title}
                          </span>
                          <span className="text-[8.5px] font-hud text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold uppercase">
                            COMPLETED · {challenge.completedDate}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-zinc-300 mt-1 leading-snug">{challenge.description}</p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10 shrink-0">
                      <span className="text-xs font-black text-emerald-400 font-hud">
                        +{challenge.repXpEarned} REP XP
                      </span>
                      <span className="text-[10px] font-hud text-amber-300 font-bold">
                        {challenge.badgeReward}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* TAB 3: UPCOMING GUILD-EXCLUSIVE EVENTS                        */}
          {/* ============================================================= */}
          {activeTab === 'events' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">
                  UPCOMING GUILD-EXCLUSIVE TOURNAMENTS & SUMMITS
                </h4>
                <span className="text-[10px] font-hud text-zinc-400">
                  RESERVED FOR CITIZENS AFFILIATED WITH REPUTABLE CLANS
                </span>
              </div>

              <div className="space-y-3">
                {events.map((event) => {
                  const isEligible = guildRepLevel >= event.requiredRepLevel;
                  return (
                    <div
                      key={event.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        event.isRegistered
                          ? 'bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                          : 'bg-black/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-white/10">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-hud bg-white/10 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                            {event.tag}
                          </span>
                          <h5 className="text-xs sm:text-sm font-black uppercase text-white tracking-wide">
                            {event.title}
                          </h5>
                          {event.isRegistered && (
                            <span className="text-[8.5px] font-hud bg-emerald-500 text-black font-black px-2 py-0.5 rounded-full uppercase">
                              RSVP CONFIRMED ✓
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-hud text-emerald-400 shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-bold uppercase">Starts in {event.startsIn}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-300 mt-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-[10px] font-hud bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <div>
                          <span className="text-zinc-500 block uppercase">Location & Arena</span>
                          <span className="text-zinc-200 font-bold">{event.location}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase">Prize Pool & Bounty</span>
                          <span className="text-amber-400 font-black">{event.prizePool}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-hud text-zinc-400">
                            Required Standing:{' '}
                            <span className={isEligible ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                              Rep Level {event.requiredRepLevel}+
                            </span>
                          </span>
                          {isEligible ? (
                            <span className="text-[9px] font-hud text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
                              ELIGIBLE ✓
                            </span>
                          ) : (
                            <span className="text-[9px] font-hud text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded font-bold">
                              REQUIRES LVL {event.requiredRepLevel}
                            </span>
                          )}
                        </div>

                        <button
                          disabled={!isEligible}
                          onClick={() => handleToggleEventRsvp(event.id)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            !isEligible
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                              : event.isRegistered
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500 hover:bg-red-500/20 hover:border-red-500 hover:text-red-300'
                              : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-md active:scale-95'
                          }`}
                        >
                          {event.isRegistered ? 'Registered (Cancel RSVP)' : 'RSVP & Join Roster'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* TAB 4: CITIZEN IDENTITY & ATTRIBUTES                          */}
          {/* ============================================================= */}
          {activeTab === 'identity' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-black/50 border border-white/10 p-3.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-hud text-zinc-400 uppercase">Citizen Unique ID</span>
                  <span className="text-sm font-black text-white font-mono block">#CIT-84920</span>
                </div>
                <div className="bg-black/50 border border-white/10 p-3.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-hud text-zinc-400 uppercase">Active World Affiliation</span>
                  <span className="text-sm font-black text-emerald-400 block">{currentWorld}</span>
                </div>
                <div className="bg-black/50 border border-white/10 p-3.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-hud text-zinc-400 uppercase">Equipped Modest Outfit</span>
                  <span className="text-sm font-black text-white block">{outfit}</span>
                </div>
                <div className="bg-black/50 border border-white/10 p-3.5 rounded-2xl space-y-1">
                  <span className="text-[9px] font-hud text-zinc-400 uppercase">Treasury Balance</span>
                  <span className="text-sm font-black text-amber-400 font-hud block">{coins.toLocaleString()} Baraka Coins</span>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Guild Oath & Code of Honour
                </span>
                <p className="text-[11px] text-zinc-300 leading-relaxed italic">
                  "As a member of Al-Fursan Vanguard, I pledge to defend the sanctity of the sanctuaries, preserve historic knowledge, and extend hospitality and fair commerce across all fifteen metropolises."
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-black/70 flex items-center justify-between text-xs shrink-0">
          <span className="text-[10px] font-hud text-zinc-400">
            PRESS <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">G</kbd> OR TAP CITIZEN HUD TO OPEN
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[11px] rounded-xl tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg"
          >
            Back to City
          </button>
        </div>

      </div>
    </div>
  );
};
