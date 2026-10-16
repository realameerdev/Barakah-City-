import React, { useState } from 'react';
import { Compass, X, Navigation, MapPin, Search } from 'lucide-react';

interface ExpandedWorldMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerX: number;
  playerZ: number;
  currentDistrict: string;
  onFastTravel?: (targetX: number, targetZ: number, districtName: string) => void;
}

export interface DistrictZone {
  name: string;
  x: number;
  z: number;
  color: string;
  desc: string;
  category: 'city' | 'masjid' | 'academy' | 'heritage';
}

export const DISTRICT_ZONES: DistrictZone[] = [
  // Global Cities & Historic Metropolises
  { name: 'Abuja Metropolis Central Capital', x: 0, z: 0, color: '#10b981', desc: 'Federal capital center, broad avenues, civic plazas, and central boulevard.', category: 'city' },
  { name: 'Lagos Coastal City & Eko Haven', x: -175, z: 65, color: '#38bdf8', desc: 'Atlantic maritime trade gateway, Lekki coastal esplanade, and ocean breeze.', category: 'city' },
  { name: 'Kwara Cultural City & Ilorin Citadel', x: 55, z: 85, color: '#f59e0b', desc: 'Emirate heritage citadel, traditional pottery souq, and artisan weaving quarter.', category: 'city' },
  { name: 'Makkah Al-Mukarramah Sanctuary', x: 0, z: -85, color: '#fbbf24', desc: 'Spiritual sanctuary, grand congregational prayer terrace, and marble mihrab.', category: 'masjid' },
  { name: 'Al-Madinah Oasis & Palm Grove', x: -130, z: 90, color: '#10b981', desc: 'Serene date palm groves, green dome tranquility, and oasis fountains.', category: 'city' },
  { name: 'Cairo Historic Citadel & Nile Esplanade', x: 110, z: 120, color: '#eab308', desc: 'Sultan fortress minarets, Nile riverside promenade, and ancient trade gates.', category: 'city' },
  { name: 'Istanbul Bosphorus Imperial City', x: 120, z: -125, color: '#ec4899', desc: 'Ottoman dome skyline, Bosphorus shipping harbor, and historic Spice Souq.', category: 'city' },
  { name: 'Samarkand Silk Road Registan Citadel', x: -150, z: -85, color: '#06b6d4', desc: 'Turquoise majolica portals, celestial observatory, and Silk Road trade station.', category: 'city' },
  { name: 'Zanzibar Stone Town Ocean Haven', x: -175, z: -60, color: '#14b8a6', desc: 'Coral stone carved doors, Indian Ocean dhow piers, and tropical spice souq.', category: 'city' },
  { name: 'Muscat Gulf Citadel & Corniche', x: 150, z: 80, color: '#8b5cf6', desc: 'White fortress watchtowers, Gulf of Oman corniche, and frankincense bazaar.', category: 'city' },
  { name: 'Fez Ancient Medina & Qarawiyyin', x: -75, z: -150, color: '#047857', desc: 'Moroccan cedar courtyards, fountain mosaic zellige, and world oldest university district.', category: 'city' },
  { name: 'Cordoba Great Mosque & Guadalquivir', x: 75, z: -55, color: '#10b981', desc: 'Andalusian horseshoe arches, fragrant orange tree patios, and Roman stone bridge.', category: 'city' },
  { name: 'Baghdad Round City & Tigris Haven', x: -135, z: -35, color: '#0284c7', desc: 'Abbasid scientific center, Tigris riverfront promenade, and celestial observatories.', category: 'city' },
  { name: 'Kano Ancient Walls & Kurmi Souq', x: 2, z: 22, color: '#f59e0b', desc: 'Centuries-old indigo dye pits, Emirate royal palace gate, and Sahelian trade crossroads.', category: 'city' },
  { name: 'Dakar Atlantic Corniche & Teranga', x: 25, z: -165, color: '#06b6d4', desc: 'West African ocean bluff views, Grand Mosque of Dakar, and coastal sunset breeze.', category: 'city' },
  { name: 'Bukhara Silk Oasis & Kalyan Citadel', x: 135, z: 35, color: '#d97706', desc: 'Central Asian mud-brick madrassas, Kalyan minaret beacon, and turquoise domes.', category: 'city' },
  { name: 'Jerusalem Al-Quds Historic Haven', x: -80, z: 0, color: '#eab308', desc: 'Ancient stone alleys, olive tree courtyards, and golden dome vista.', category: 'city' },
  { name: 'Kuala Lumpur Minaret Towers City', x: -80, z: -65, color: '#a855f7', desc: 'Lush tropical greenery, modern Islamic architecture, and tranquil garden lakes.', category: 'city' },

  // Newly Expanded Colossal Metropolises & Frontier Citadels
  { name: 'Granada & Alhambra Palace Gardens', x: -360, z: -280, color: '#ef4444', desc: 'Nasrid red fortress towers, Moorish horseshoe arches, Generalife reflection canals, and cypress groves.', category: 'city' },
  { name: 'Isfahan Naqsh-e Jahan & Royal Turquoise Dome', x: 360, z: -260, color: '#0284c7', desc: 'Double-tiered Persian arcades, celestial turquoise tilework dome, and Ali Qapu royal terrace.', category: 'city' },
  { name: 'Damascus Ancient Umayyad Citadel & Barada Haven', x: -280, z: 320, color: '#f59e0b', desc: 'Golden mosaic courtyard facade, twin historic minarets, and Barada riverfront jasmine gardens.', category: 'city' },
  { name: 'Timbuktu Sankore University & Desert Citadel', x: -340, z: 420, color: '#d97706', desc: 'Stepped adobe minaret with projecting toron timber beams, Saharan gold caravans, and ancient library.', category: 'academy' },
  { name: 'Casablanca Ocean Mosque & Atlantic Pier', x: -460, z: 120, color: '#06b6d4', desc: 'Soaring 36m Atlantic minaret with Makkah laser beacon, ocean waves terrace, and coastal promenade.', category: 'city' },
  { name: 'Lahore Badshahi Imperial Citadel & Shalamar', x: 380, z: 320, color: '#dc2626', desc: 'Mughal red sandstone monumental gate, triple white marble onion domes, and tiered water gardens.', category: 'city' },
  { name: 'Shiraz Garden of Poets & Nasir al-Mulk', x: 290, z: -420, color: '#f43f5e', desc: 'Pink Mosque stained-glass kaleidoscope portals, Persian Eram rose gardens, and marble water fountain.', category: 'heritage' },
  { name: 'Tripoli Mediterranean Citadel & Red Castle', x: 80, z: -440, color: '#b45309', desc: 'Assaraya Al-Hamra red castle fortress, corner maritime watchtowers, and Mediterranean sea ingress.', category: 'city' },
  { name: 'Aleppo Citadel & Historic Covered Souq', x: -160, z: -420, color: '#d97706', desc: 'Majestic fortress hill mound, arched stone bridge gate crossing the moat, and medieval vaulted bazaars.', category: 'city' },
  { name: 'Doha Pearl Bay & Modernist Citadel', x: 440, z: 120, color: '#eab308', desc: 'Stacked geometric modernist limestone cubes, Arabian Gulf dhow harbor, and azure reflection bay.', category: 'city' },
  { name: 'Tunis Medina of Ez-Zitouna & Carthage Coast', x: 220, z: -360, color: '#059669', desc: 'Andalusian-Tunisian ceramic tiled minaret, whitewashed medina, and iconic royal blue studded doors.', category: 'city' },
  { name: 'Muscat Mutrah Harbor & Corniche Esplanade', x: 460, z: -100, color: '#8b5cf6', desc: 'Dramatic Gulf mountain watchtowers, white fortress corniche, and frankincense harbor piers.', category: 'city' },

  // Masajids (Mosques)
  { name: 'Grand Mosque & Mihrab Sanctuary', x: 0, z: -58, color: '#10b981', desc: 'Central congregational prayer hall, four towering minarets, and courtyard terrace.', category: 'masjid' },
  { name: 'Al-Andalus East Grand Masjid', x: 130, z: -60, color: '#059669', desc: 'Historic Andalusian arched colonnades, turquoise tiled domes, and reflection pool.', category: 'masjid' },
  { name: 'Al-Madinah Oasis Masjid', x: -130, z: 90, color: '#10b981', desc: 'Serene oasis sanctuary with emerald dome, date palm prayer garden, and fountain.', category: 'masjid' },
  { name: 'Al-Qarawiyyin Historical Masjid', x: -110, z: -110, color: '#047857', desc: 'Ancient Moroccan horseshoe arches, cedar woodwork, and tranquil courtyard.', category: 'masjid' },
  { name: 'Sultan Baybars South Grand Masjid', x: 110, z: 120, color: '#10b981', desc: 'Majestic marble mosque with soaring twin minarets and grand red prayer rugs.', category: 'masjid' },

  // Schools, Academies & Universities
  { name: 'Bayt Al-Hikma University', x: -48, z: -25, color: '#3b82f6', desc: 'Higher learning lecture amphitheater, scholarship podium, and academic symposiums.', category: 'academy' },
  { name: 'Madrasa Quran Academy', x: -22, z: -42, color: '#14b8a6', desc: 'Historic manuscript library, low wooden study rihlas, and ethical debate colonnade.', category: 'academy' },
  { name: 'Ibn Sina Medical School & Research', x: 140, z: 40, color: '#2563eb', desc: 'Botanical research gardens, medicinal herb conservatory, and tiered lecture hall.', category: 'academy' },
  { name: 'Al-Khwarizmi Astronomy & STEM Academy', x: -140, z: -40, color: '#0284c7', desc: 'Observatory dome with giant bronze astrolabe, algebra hall, and science terrace.', category: 'academy' },
  { name: 'Al-Zahra Youth & International Academy', x: -70, z: 140, color: '#06b6d4', desc: 'Modern educational campus with open courtyards, library wings, and study lawns.', category: 'academy' },
  { name: 'Dar Al-Quran & Calligraphy Conservatory', x: 70, z: -130, color: '#0d9488', desc: 'Illuminated calligraphy exhibitions, gold-leaf manuscript desks, and Quranic arts.', category: 'academy' },

  // Civic, Sports & Waterfront
  { name: 'Souq Al-Madina Marketplace', x: -28, z: 24, color: '#f59e0b', desc: 'Living merchant bazaar, spice stalls, community jobs, and sadaqah donation counters.', category: 'heritage' },
  { name: 'Baraka Football Arena', x: -45, z: 52, color: '#10b981', desc: 'Full regulation soccer pitch with floodlights, goal nets, and dynamic dribbling physics.', category: 'heritage' },
  { name: 'Central Boulevard & Esplanade', x: 0, z: 0, color: '#e2e8f0', desc: 'Broad four-lane avenue with autonomous traffic, palm promenades, and civic streetlamps.', category: 'heritage' },
  { name: 'Residential Quarter & Private Homes', x: 18, z: 18, color: '#a855f7', desc: 'Comfortable citizen apartments with private Moroccan divans, bedrooms, and gardens.', category: 'heritage' },
  { name: 'Public Park & Central Fountain', x: 32, z: -28, color: '#06b6d4', desc: 'Lush green lawns, stone water fountain, peaceful shaded pergolas, and park benches.', category: 'heritage' },
  { name: 'Oasis Botanical Palm Grove', x: 150, z: -130, color: '#10b981', desc: 'Expansive date palm grove with stone walking paths, waterways, and shaded pavilions.', category: 'heritage' },
  { name: 'Grand Marina Harbor Waterfront', x: -160, z: 0, color: '#38bdf8', desc: 'Scenic waterfront wooden pier promenade overlooking the sunset bay.', category: 'heritage' },
];

export default function ExpandedWorldMapModal({
  isOpen,
  onClose,
  playerX,
  playerZ,
  currentDistrict,
  onFastTravel,
}: ExpandedWorldMapModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'city' | 'masjid' | 'academy' | 'heritage'>('all');

  if (!isOpen) return null;

  const filteredDistricts = DISTRICT_ZONES.filter((dist) => {
    const matchesSearch = dist.name.toLowerCase().includes(searchQuery.toLowerCase()) || dist.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dist.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn font-sora">
      <div className="bg-[#0b0f19] border-2 border-emerald-500/50 rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="p-3 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base md:text-lg font-black uppercase text-white tracking-wide">
                  BARAKA CITY · GLOBAL SATELLITE MAP
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 font-bold">
                  {DISTRICT_ZONES.length} CITIES & REGIONS
                </span>
              </div>
              <span className="text-[9.5px] sm:text-[10px] font-hud text-emerald-400 block truncate">
                CURRENT DISTRICT: <span className="text-white font-bold">{currentDistrict.toUpperCase()}</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-3 sm:px-6 pt-3 pb-2 border-b border-white/10 bg-black/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shrink-0">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: `ALL (${DISTRICT_ZONES.length})` },
              { id: 'city', label: 'CITIES (24)' },
              { id: 'masjid', label: 'MASAJIDS (6)' },
              { id: 'academy', label: 'ACADEMIES (7)' },
              { id: 'heritage', label: 'HERITAGE' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-2.5 py-1 rounded-xl text-[9px] sm:text-[10px] font-hud uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cities or landmarks..."
              className="w-full bg-black/60 border border-white/15 focus:border-emerald-400 rounded-xl pl-8 pr-3 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors font-sans"
            />
          </div>
        </div>

        {/* Interactive Holographic City Map Grid */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Visual 2D Map Container (Covers ±500 coordinates) */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#05070d] border border-white/10 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Ambient Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
            
            {/* Highway Express Rings */}
            <div className="absolute w-[80%] h-[80%] border border-emerald-500/15 rounded-full pointer-events-none" />
            <div className="absolute w-[50%] h-[50%] border border-amber-500/15 rounded-full pointer-events-none" />

            {/* Main Road Cross Axes */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 sm:h-7 bg-zinc-800/60 border-y border-white/10 flex items-center justify-center pointer-events-none">
              <span className="text-[7px] sm:text-[8px] font-hud text-zinc-500 tracking-widest uppercase">CENTRAL BOULEVARD (EAST - WEST)</span>
            </div>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 sm:w-7 bg-zinc-800/60 border-x border-white/10 flex items-center justify-center pointer-events-none">
              <span className="text-[7px] sm:text-[8px] font-hud text-zinc-500 tracking-widest uppercase [writing-mode:vertical-lr] rotate-180">NORTH - SOUTH PROMENADE</span>
            </div>

            {/* Landmark Markers on 2D map */}
            {filteredDistricts.map((dist) => {
              // Map massive expanded world coords [-520, 520] to percentage [6%, 94%]
              const posX = 50 + (dist.x / 520) * 44;
              const posZ = 50 + (dist.z / 520) * 44;

              return (
                <div
                  key={dist.name}
                  style={{ left: `${Math.max(4, Math.min(96, posX))}%`, top: `${Math.max(4, Math.min(96, posZ))}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                  onClick={() => {
                    onFastTravel?.(dist.x, dist.z, dist.name);
                    onClose();
                  }}
                  title={`Fast Travel to ${dist.name}`}
                >
                  <div
                    style={{ backgroundColor: dist.color }}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-lg group-hover:scale-130 transition-transform flex items-center justify-center"
                  >
                    <div className="w-1 h-1 rounded-full bg-black/80" />
                  </div>
                  <span className="hidden md:block mt-1 px-1.5 py-0.5 rounded bg-black/90 border border-white/15 text-[8px] font-bold uppercase whitespace-nowrap text-zinc-200 group-hover:text-emerald-300 pointer-events-none shadow">
                    {dist.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}

            {/* Current Player Indicator */}
            {(() => {
              const pLeft = 50 + (playerX / 520) * 44;
              const pTop = 50 + (playerZ / 520) * 44;
              return (
                <div
                  style={{ left: `${Math.max(4, Math.min(96, pLeft))}%`, top: `${Math.max(4, Math.min(96, pTop))}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 border-2 border-emerald-400 animate-ping absolute" />
                  <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg">
                    <Navigation className="w-2.5 h-2.5 text-black" />
                  </div>
                  <span className="mt-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-black font-black text-[7.5px] uppercase tracking-wider shadow whitespace-nowrap">
                    YOU
                  </span>
                </div>
              );
            })()}
          </div>

          {/* District Directory & Fast Wayfinding */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> METROPOLIS DIRECTORY ({filteredDistricts.length} AVAILABLE)
              </span>
              <span className="text-[10px] text-zinc-400 font-normal font-sans">
                Click any city to travel immediately
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredDistricts.map((dist) => (
                <div
                  key={dist.name}
                  className="p-2.5 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-between gap-2.5 hover:border-emerald-500/40 hover:bg-black/70 transition-all group"
                >
                  <div className="truncate flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: dist.color }} />
                      <span className="text-[11.5px] font-bold text-white uppercase truncate group-hover:text-emerald-300 transition-colors">
                        {dist.name}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-zinc-400 truncate mt-0.5 font-sans leading-tight">
                      {dist.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onFastTravel?.(dist.x, dist.z, dist.name);
                      onClose();
                    }}
                    className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-[9.5px] font-black uppercase rounded-xl transition-all cursor-pointer shrink-0 active:scale-95 shadow group-hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  >
                    GO TO
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
