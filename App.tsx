import React, { useState } from 'react';
import Itinerary from './components/Itinerary';
import Info from './components/Info';
import ShoppingList from './components/ShoppingList';
import Expenses from './components/Expenses';
import { TRIP_DATA } from './constants';
import { CalendarDays, Info as InfoIcon, ShoppingBasket, Wallet } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'info' | 'shopping' | 'expenses'>('itinerary');

  return (
    <div className="min-h-screen bg-[#fffbf0] max-w-md mx-auto relative shadow-2xl overflow-hidden h-screen overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col font-sans">
      
      {/* Simple Text Header (Replaces Banner) - Warm Theme */}
      <div className="pt-10 pb-2 px-6 bg-[#fffbf0]">
           <span className="inline-block bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 tracking-wider uppercase border border-orange-200">
             2025 Winter Tour
           </span>
           <h1 className="text-3xl font-black text-stone-800 leading-tight">
             北海道<span className="text-orange-500 ml-2">五稜星雪祭 ❄️</span>
           </h1>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 bg-[#fffbf0]">
        {activeTab === 'itinerary' && <Itinerary data={TRIP_DATA} />}
        {activeTab === 'info' && <Info data={TRIP_DATA} />}
        {activeTab === 'shopping' && <ShoppingList />}
        {activeTab === 'expenses' && <Expenses />}
      </main>

      {/* Sticky Bottom Navigation - Warm Theme */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-orange-100/50 z-50 p-1.5 flex justify-between items-center text-stone-500">
        
        <button 
          onClick={() => setActiveTab('itinerary')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-full transition-all duration-300 ${activeTab === 'itinerary' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'hover:bg-orange-50'}`}
        >
          <CalendarDays className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">行程</span>
        </button>

        <button 
          onClick={() => setActiveTab('info')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-full transition-all duration-300 ${activeTab === 'info' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'hover:bg-orange-50'}`}
        >
          <InfoIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">資訊</span>
        </button>

        <button 
          onClick={() => setActiveTab('shopping')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-full transition-all duration-300 ${activeTab === 'shopping' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'hover:bg-orange-50'}`}
        >
          <ShoppingBasket className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">購物</span>
        </button>

        <button 
          onClick={() => setActiveTab('expenses')}
          className={`flex-1 flex flex-col items-center justify-center py-3 rounded-full transition-all duration-300 ${activeTab === 'expenses' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'hover:bg-orange-50'}`}
        >
          <Wallet className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">花費</span>
        </button>

      </nav>
    </div>
  );
}

export default App;