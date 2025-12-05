import React, { useEffect, useState } from 'react';
import { TripData } from '../types';
import { Plane, Phone, Building2, Ticket, Cloud, Sun, CloudRain, Snowflake, Clock, MapPin } from 'lucide-react';

interface InfoProps {
  data: TripData;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [timeTW, setTimeTW] = useState('');
  const [timeJP, setTimeJP] = useState('');
  const [weather, setWeather] = useState({
    temp: 0,
    feelsLike: 0,
    condition: 'Loading',
    location: '定位中...'
  });

  useEffect(() => {
    // Clock Timer
    const timer = setInterval(() => {
      const now = new Date();
      setTimeTW(now.toLocaleTimeString('zh-TW', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit' }));
      setTimeJP(now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Weather Simulation (Mocking real API behavior based on location)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setWeather({
            temp: -2,
            feelsLike: -6,
            condition: 'Snow',
            location: '目前位置 (北海道)' // Simulated location name
          });
        },
        (error) => {
          console.error("Error getting location", error);
          setWeather({
            temp: -3,
            feelsLike: -7,
            condition: 'Snow',
            location: '札幌 (預設)'
          });
        }
      );
    } else {
        setWeather({
            temp: -3,
            feelsLike: -7,
            condition: 'Snow',
            location: '札幌 (預設)'
        });
    }
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch(condition) {
      case 'Sun': return <Sun className="w-8 h-8 text-amber-400" />;
      case 'Rain': return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'Snow': return <Snowflake className="w-8 h-8 text-cyan-300" />;
      default: return <Cloud className="w-8 h-8 text-stone-400" />;
    }
  };

  return (
    <div className="p-5 pb-24 space-y-6 bg-[#fffbf0]">
      
      {/* Real-time Info Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100">
        
        {/* Time */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-stone-50 rounded-xl">
                <div className="flex items-center justify-center gap-1 text-stone-400 text-xs mb-1">
                    <Clock className="w-3 h-3" /> 台灣時間
                </div>
                <div className="text-2xl font-black text-stone-700">{timeTW}</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center justify-center gap-1 text-orange-500 text-xs mb-1">
                    <Clock className="w-3 h-3" /> 日本時間
                </div>
                <div className="text-2xl font-black text-orange-700">{timeJP}</div>
            </div>
        </div>

        {/* Weather */}
        <div className="flex items-center justify-between bg-stone-800 text-white p-4 rounded-xl shadow-lg">
            <div>
                <div className="flex items-center gap-1 text-stone-300 text-xs mb-1">
                    <MapPin className="w-3 h-3" /> {weather.location}
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">{weather.temp}°</span>
                    <span className="text-sm text-stone-300 mb-1">體感 {weather.feelsLike}°</span>
                </div>
            </div>
            <div className="flex flex-col items-center">
                {getWeatherIcon(weather.condition)}
                <span className="text-xs mt-1 text-stone-300">{weather.condition === 'Snow' ? '下雪' : '多雲'}</span>
            </div>
        </div>
      </div>
      
      {/* Header Info - Warm Gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-200">
        <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
        <div className="flex items-center opacity-90 text-sm">
          <Ticket className="w-4 h-4 mr-2" />
          <span>團號: CTS05IT25D23K01</span>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
            <span className="text-orange-100 text-sm">日期</span>
            <span className="font-bold">{data.duration}</span>
        </div>
      </div>

      {/* Emergency Contacts */}
      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-rose-500" /> 緊急聯絡
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
          {data.contacts.map((contact, idx) => (
            <div key={idx} className="p-4 border-b border-orange-50 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-stone-700">{contact.role}</span>
                <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-xs">{contact.name}</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">國內手機</span>
                  <a href={`tel:${contact.phoneTW}`} className="text-orange-600 font-mono">{contact.phoneTW}</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">國外手機</span>
                  <a href={`tel:${contact.phoneJP}`} className="text-orange-600 font-mono">{contact.phoneJP}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flights */}
      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3 flex items-center">
          <Plane className="w-5 h-5 mr-2 text-amber-500" /> 航班資訊
        </h3>
        <div className="space-y-3">
          {data.flights.map((flight, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-bl-lg font-bold">
                {idx === 0 ? '去程' : '回程'}
              </div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-2xl font-black text-stone-700">{flight.from.split(' ')[0]}</span>
                <Plane className="w-5 h-5 text-stone-300 mb-1 mx-2" />
                <span className="text-2xl font-black text-stone-700">{flight.to.split(' ')[0]}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-stone-400 text-xs">日期</p>
                  <p className="font-semibold text-stone-700">{flight.date}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs">班機</p>
                  <p className="font-semibold text-stone-700">{flight.airline} {flight.flightNo}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs">出發</p>
                  <p className="font-semibold text-stone-700">{flight.depTime}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs">抵達</p>
                  <p className="font-semibold text-stone-700">{flight.arrTime}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-50 text-xs text-center text-stone-500">
                行李限制: 託運20kg + 手提10kg
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotels */}
      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-orange-500" /> 住宿飯店
        </h3>
        <div className="space-y-3">
          {data.hotels.map((hotel, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 flex gap-4 items-start">
               <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-600 font-bold text-xs flex-col">
                 <span>12</span>
                 <span>/{hotel.date.split('/')[1]}</span>
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-stone-800 text-sm mb-1">{hotel.name}</h4>
                 <div className="flex items-center text-xs text-stone-500 mb-1">
                   <Phone className="w-3 h-3 mr-1" />
                   <a href={`tel:${hotel.tel}`} className="underline hover:text-orange-500">{hotel.tel}</a>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Info;