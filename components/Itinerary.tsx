import React, { useState } from 'react';
import { 
  Plane, MapPin, Mountain, Footprints, Utensils, 
  BedDouble, Fish, ShoppingBag, Gift, Moon, 
  Landmark, Trees, PawPrint, Lightbulb, Camera, 
  Coffee, Music, Bus, UtensilsCrossed, Navigation, ArrowRight
} from 'lucide-react';
import { TripData, TripItem } from '../types';

interface ItineraryProps {
  data: TripData;
}

// Warm Color Themes
const THEMES = [
  { name: 'orange', main: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200', shadow: 'shadow-orange-200', line: 'bg-orange-200' },
  { name: 'rose',   main: 'bg-rose-500',   text: 'text-rose-600',   light: 'bg-rose-50',   border: 'border-rose-200',   shadow: 'shadow-rose-200',   line: 'bg-rose-200' },
  { name: 'amber',  main: 'bg-amber-500',  text: 'text-amber-600',  light: 'bg-amber-50',  border: 'border-amber-200',  shadow: 'shadow-amber-200',  line: 'bg-amber-200' },
  { name: 'red',    main: 'bg-red-500',    text: 'text-red-600',    light: 'bg-red-50',    border: 'border-red-200',    shadow: 'shadow-red-200',    line: 'bg-red-200' },
  { name: 'stone',  main: 'bg-stone-500',  text: 'text-stone-600',  light: 'bg-stone-50',  border: 'border-stone-200',  shadow: 'shadow-stone-200',  line: 'bg-stone-200' },
];

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Plane': return <Plane className="w-5 h-5" />;
    case 'MapPin': return <MapPin className="w-5 h-5" />;
    case 'Mountain': return <Mountain className="w-5 h-5" />;
    case 'Footprints': return <Footprints className="w-5 h-5" />;
    case 'Utensils': return <Utensils className="w-5 h-5" />;
    case 'Hotel': return <BedDouble className="w-5 h-5" />;
    case 'Fish': return <Fish className="w-5 h-5" />;
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
    case 'Gift': return <Gift className="w-5 h-5" />;
    case 'Moon': return <Moon className="w-5 h-5" />;
    case 'Landmark': return <Landmark className="w-5 h-5" />;
    case 'TreePine': return <Trees className="w-5 h-5" />;
    case 'PawPrint': return <PawPrint className="w-5 h-5" />;
    case 'Lightbulb': return <Lightbulb className="w-5 h-5" />;
    case 'Camera': return <Camera className="w-5 h-5" />;
    case 'Coffee': return <Coffee className="w-5 h-5" />;
    case 'Music': return <Music className="w-5 h-5" />;
    case 'Bus': return <Bus className="w-5 h-5" />;
    case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
    default: return <MapPin className="w-5 h-5" />;
  }
};

const Itinerary: React.FC<ItineraryProps> = ({ data }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const currentDay = data.itinerary[selectedDayIndex];
  const currentTheme = THEMES[selectedDayIndex % THEMES.length];

  const handleNavigate = (item: TripItem) => {
    const query = encodeURIComponent(item.location || item.title);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(url, '_blank');
  };

  // Generate a route summary for the day (unique locations)
  const routeSummary = Array.from(new Set(
    currentDay.items
      .filter(item => item.category !== 'other' && item.category !== 'food' && item.location)
      .map(item => item.location?.replace(/機場|飯店|Hotel/g, '').trim())
  )).filter(Boolean).slice(0, 4);

  return (
    <div className={`pb-24 min-h-full ${currentTheme.light} transition-colors duration-500`}>
      {/* Date Selector */}
      <div className="sticky top-0 bg-[#fffbf0]/95 backdrop-blur-sm z-20 shadow-sm border-b border-orange-100">
        <div className="flex w-full px-2 py-3 gap-2">
          {data.itinerary.map((day, index) => {
            const theme = THEMES[index % THEMES.length];
            const isSelected = selectedDayIndex === index;
            
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDayIndex(index)}
                className={`flex-1 min-w-0 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 border ${
                  isSelected
                    ? `${theme.main} text-white shadow-lg ${theme.shadow} transform scale-[1.02] border-transparent`
                    : `bg-white text-stone-400 border-orange-100 hover:border-orange-200`
                }`}
              >
                <span className={`text-[10px] font-bold tracking-wider mb-0.5 ${isSelected ? 'text-white/90' : 'text-stone-400'}`}>
                  DAY {index + 1}
                </span>
                <span className={`text-sm font-black truncate w-full text-center ${isSelected ? 'text-white' : 'text-stone-600'}`}>
                  {day.date}
                </span>
                <span className={`text-[10px] ${isSelected ? 'text-white/90' : 'text-stone-400'}`}>
                  {day.dayOfWeek}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header Info */}
      <div className="px-5 py-6">
        <div className="mb-6 animate-in slide-in-from-left-2 duration-300" key={`title-${selectedDayIndex}`}>
          <h2 className={`text-2xl font-black ${currentTheme.text} mb-1`}>
            {currentDay.title.split(' ')[0]} {currentDay.title.split(' ')[1]}
          </h2>
          <p className="text-stone-500 text-sm font-medium mb-3">
            {currentDay.title.split(' ').slice(2).join(' ')}
          </p>

          {/* Route Summary */}
          {routeSummary.length > 0 && (
             <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-600 bg-white/60 p-2 rounded-lg border border-orange-100/50">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {routeSummary.map((loc, idx) => (
                    <React.Fragment key={idx}>
                        <span>{loc}</span>
                        {idx < routeSummary.length - 1 && <ArrowRight className="w-3 h-3 text-stone-300" />}
                    </React.Fragment>
                ))}
             </div>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-6 relative">
          {/* Vertical Line with Dynamic Color */}
          <div className={`absolute left-[19px] top-4 bottom-4 w-0.5 ${currentTheme.line} z-0 transition-colors duration-500`}></div>

          {currentDay.items.map((item: TripItem, idx) => {
            const isShopping = item.category === 'shopping';
            
            return (
            <div 
              key={item.id} 
              className="relative z-10 flex gap-4 animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Icon Bubble */}
              <div 
                onClick={() => handleNavigate(item)}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform hover:scale-110 cursor-pointer ${
                item.category === 'flight' ? 'bg-sky-100 text-sky-600' :
                item.category === 'food' ? 'bg-orange-100 text-orange-600' :
                item.category === 'lodging' ? 'bg-indigo-100 text-indigo-600' :
                isShopping ? 'bg-pink-100 text-pink-600' : 
                'bg-emerald-100 text-emerald-600' // Default sightseeing
              }`}>
                {getIcon(item.icon)}
              </div>

              {/* Content Card */}
              <div 
                onClick={() => handleNavigate(item)}
                className={`flex-1 p-4 rounded-2xl shadow-sm border transition-all active:scale-[0.98] cursor-pointer group relative overflow-hidden ${
                    isShopping 
                    ? 'bg-pink-50/50 border-pink-100 hover:border-pink-200' 
                    : 'bg-white border-stone-100 hover:border-stone-200 hover:shadow-md'
                }`}
              >
                {/* Hover/Tap Highlight Effect */}
                <div className="absolute right-0 top-0 p-2 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-orange-50 text-orange-600 p-1.5 rounded-full">
                        <Navigation className="w-4 h-4" />
                    </div>
                </div>

                <div className="flex justify-between items-start mb-1 pr-6">
                  <h3 className={`font-bold text-lg ${isShopping ? 'text-pink-800' : 'text-stone-800'}`}>
                      {item.title}
                  </h3>
                  {item.time && (
                    <span className="text-xs font-mono bg-stone-100 text-stone-500 px-2 py-1 rounded-md">
                      {item.time}
                    </span>
                  )}
                </div>
                
                {item.description && (
                  <p className={`text-sm leading-relaxed mb-2 ${isShopping ? 'text-pink-700/80' : 'text-stone-600'}`}>
                    {item.description}
                  </p>
                )}

                {/* Tags/Notes */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.note && (
                     <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-xs border border-amber-100">
                       <Gift className="w-3 h-3" />
                       {item.note}
                     </div>
                  )}
                  {item.category === 'lodging' && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs">
                      <BedDouble className="w-3 h-3" />
                      Hotel Info
                    </div>
                  )}
                  {/* Category Tag */}
                   {isShopping && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-pink-100 text-pink-700 text-xs">
                      <ShoppingBag className="w-3 h-3" />
                      Shopping
                    </div>
                  )}
                  {/* Navigation Tag */}
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
                      isShopping 
                      ? 'bg-white/60 text-pink-400' 
                      : 'bg-stone-50 text-stone-400 group-hover:bg-orange-50 group-hover:text-orange-600'
                  }`}>
                      <MapPin className="w-3 h-3" />
                      {item.location || item.title}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
          
          {/* End of Day Marker */}
          <div className="relative z-10 flex gap-4 opacity-50">
             <div className={`flex-shrink-0 w-10 h-4 mx-auto rounded-full ${currentTheme.line} mt-2`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;