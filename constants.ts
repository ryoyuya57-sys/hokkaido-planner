import { TripData } from './types';

export const TRIP_DATA: TripData = {
  title: "北海道燈節百萬美元五稜星5日",
  duration: "2025/12/23 - 2025/12/27",
  flights: [
    {
      date: "2025/12/23",
      flightNo: "IT260",
      airline: "台灣虎航",
      from: "高雄 (KHH)",
      to: "新千歲 (CTS)",
      depTime: "08:00",
      arrTime: "12:55"
    },
    {
      date: "2025/12/27",
      flightNo: "IT261",
      airline: "台灣虎航",
      from: "新千歲 (CTS)",
      to: "高雄 (KHH)",
      depTime: "13:55",
      arrTime: "18:05"
    }
  ],
  contacts: [
    {
      role: "領隊/導遊",
      name: "邱良泰",
      phoneTW: "0932819110",
      phoneJP: "81-090-8779-3933"
    }
  ],
  hotels: [
    {
      date: "12/23",
      name: "登別萬世閣 (Noboribetsu Manseikaku)",
      tel: "81-143-84-3500"
    },
    {
      date: "12/24",
      name: "函館 IMAGINE & RESORT",
      tel: "81-138-57-9161"
    },
    {
      date: "12/25",
      name: "洞爺湖畔亭飯店 (Toya Kohan Tei)",
      tel: "81-142-75-2211"
    },
    {
      date: "12/26",
      name: "HOTEL IBIS STYLES 札幌",
      tel: "81-11-530-4055"
    }
  ],
  itinerary: [
    {
      date: "12/23",
      dayOfWeek: "週二",
      title: "DAY 1 高雄 ✈ 新千歲 ➝ 登別",
      weatherEstimate: { temp: "-2°C", condition: "Snow" },
      items: [
        {
          id: "d1-1",
          time: "05:30",
          title: "集合報到",
          description: "高雄小港機場國際航站3樓虎航櫃台",
          category: "other",
          location: "高雄小港機場國際航站",
          icon: "MapPin"
        },
        {
          id: "d1-2",
          time: "08:00",
          title: "搭乘 IT260 飛往北海道",
          description: "抵達時間 12:55。",
          category: "flight",
          location: "新千歲機場",
          icon: "Plane"
        },
        {
          id: "d1-lunch",
          title: "午餐：壽司餐盒＋茶飲",
          description: "車上享用美味壽司便當，欣賞沿途雪景。",
          category: "food",
          location: "專車上",
          icon: "Utensils"
        },
        {
          id: "d1-3",
          title: "登別地獄谷",
          description: "北海道遺產，直徑450公尺的火山口遺跡，煙霧繚繞如地獄景象。",
          category: "sightseeing",
          location: "登別地獄谷",
          icon: "Mountain"
        },
        {
          id: "d1-4",
          title: "登別溫泉街",
          description: "極樂通商店街、閻王變臉秀。日本十大溫泉之一，硫化水素泉。",
          category: "sightseeing",
          location: "登別溫泉通",
          icon: "Footprints"
        },
        {
          id: "d1-5",
          title: "晚餐：飯店內總匯自助餐",
          description: "入住登別萬世閣。",
          category: "food",
          location: "登別萬世閣",
          icon: "Utensils"
        }
      ]
    },
    {
      date: "12/24",
      dayOfWeek: "週三",
      title: "DAY 2 尼克斯海洋公園 ➝ 函館夜景",
      weatherEstimate: { temp: "-3°C", condition: "Cloudy" },
      items: [
        {
          id: "d2-1",
          title: "尼克斯海洋公園",
          description: "北歐風海洋城堡。必看：企鵝遊行、海豚海獅秀、銀河水槽。",
          category: "sightseeing",
          location: "登別尼克斯海洋公園",
          icon: "Fish"
        },
        {
          id: "d2-lunch",
          title: "午餐：日式壽喜燒吃到飽",
          description: "享用熱騰騰的壽喜燒鍋物，肉品無限供應。",
          category: "food",
          location: "餐廳",
          icon: "Utensils"
        },
        {
          id: "d2-2a",
          title: "金森紅磚倉庫群",
          description: "明治時代港口倉庫改建的購物區，有各式雜貨與甜點。",
          category: "shopping",
          location: "金森紅磚倉庫",
          icon: "ShoppingBag"
        },
        {
          id: "d2-2b",
          title: "函館聖誕嘉年華",
          description: "欣賞巨大聖誕樹與港灣的霓虹彩燈節。",
          category: "sightseeing",
          location: "金森紅磚倉庫群前",
          icon: "Lightbulb"
        },
        {
          id: "d2-3",
          title: "贈送：Pastry Snaffle’s 起司蛋糕",
          description: "函館超人氣甜點，口感綿密。",
          category: "food",
          location: "金森洋物館",
          note: "若遇缺貨改贈等值甜點",
          icon: "Gift"
        },
        {
          id: "d2-4",
          title: "函館山百萬夜景",
          description: "搭乘纜車上下山，欣賞世界三大夜景之一的扇形海灣夜景。",
          category: "sightseeing",
          location: "函館山纜車",
          note: "若纜車停駛則改搭巴士，並退費處理",
          icon: "Moon"
        },
        {
          id: "d2-5",
          title: "入住：函館 IMAGINE & RESORT",
          description: "晚餐：飯店內總匯自助餐。",
          category: "lodging",
          location: "函館 IMAGINE & RESORT",
          icon: "Hotel"
        }
      ]
    },
    {
      date: "12/25",
      dayOfWeek: "週四",
      title: "DAY 3 函館朝市 ➝ 洞爺湖",
      weatherEstimate: { temp: "-4°C", condition: "Snow" },
      items: [
        {
          id: "d3-1",
          title: "函館朝市",
          description: "發放代金日幣 1500，可自由品嚐海膽、牡丹蝦或水果。",
          category: "food",
          location: "函館朝市",
          icon: "Utensils"
        },
        {
          id: "d3-2",
          title: "五稜郭公園",
          description: "日本第一座西洋式星形城堡 (不上展望塔)。",
          category: "sightseeing",
          location: "五稜郭公園",
          icon: "Landmark"
        },
        {
          id: "d3-3",
          title: "大沼國定公園",
          description: "日本新三景之一，駒岳山下的美麗火山湖。",
          category: "sightseeing",
          location: "大沼國定公園",
          icon: "TreePine"
        },
        {
          id: "d3-lunch",
          title: "午餐：鮭ちゃんちゃん燒",
          description: "北海道名物：鮭魚味噌鐵板燒 (石狩鍋風味)。",
          category: "food",
          location: "大沼/昭和新山周邊",
          icon: "Utensils"
        },
        {
          id: "d3-4",
          title: "昭和新山熊牧場",
          description: "贈送熊餅乾或蘋果體驗餵食樂趣。",
          category: "sightseeing",
          location: "昭和新山熊牧場",
          icon: "PawPrint"
        },
        {
          id: "d3-5",
          title: "洞爺湖冬季夢幻隧道",
          description: "40萬顆燈泡組成的光之隧道 (自由前往)。",
          category: "sightseeing",
          location: "洞爺湖汽船本社前",
          icon: "Lightbulb"
        },
        {
          id: "d3-6",
          title: "入住：洞爺湖畔亭飯店",
          description: "晚餐：飯店內自助餐。",
          category: "lodging",
          location: "洞爺湖畔亭",
          icon: "Hotel"
        }
      ]
    },
    {
      date: "12/26",
      dayOfWeek: "週五",
      title: "DAY 4 小樽運河 ➝ 札幌市區",
      weatherEstimate: { temp: "-5°C", condition: "Snow" },
      items: [
        {
          id: "d4-1",
          title: "SAIRO 展望台",
          description: "眺望洞爺湖全景的最佳地點。",
          category: "sightseeing",
          location: "筒倉展望台",
          icon: "Mountain"
        },
        {
          id: "d4-lunch",
          title: "午餐：豪華三大蟹+日式涮涮鍋",
          description: "帝王蟹、松葉蟹、毛蟹吃到飽 + 軟飲無限暢飲。",
          category: "food",
          location: "名水亭/小樽周邊",
          icon: "UtensilsCrossed"
        },
        {
          id: "d4-2",
          title: "小樽運河",
          description: "浪漫的紅色磚瓦倉庫群與運河風情。",
          category: "sightseeing",
          location: "小樽運河",
          icon: "Camera"
        },
        {
          id: "d4-3",
          title: "銀之鐘咖啡館",
          description: "贈送 Hello Kitty 咖啡杯 + 暢飲熱飲 + 小甜點。",
          category: "food",
          location: "小樽 銀之鐘一號館",
          icon: "Coffee"
        },
        {
          id: "d4-4",
          title: "小樽音樂盒堂 & 北一硝子館",
          description: "參觀百年蒸氣時鐘，欣賞精緻玻璃工藝。",
          category: "shopping",
          location: "小樽音樂盒堂 本館",
          icon: "Music"
        },
        {
          id: "d4-5",
          title: "贈送：不思議大泡芙",
          description: "北菓樓名產，外酥內爆漿。",
          category: "food",
          location: "北菓樓 小樽本館",
          icon: "Gift"
        },
        {
          id: "d4-6a",
          title: "大通公園 (白色燈樹節)",
          description: "札幌著名的冬季點燈活動，璀璨浪漫。",
          category: "sightseeing",
          location: "札幌大通公園",
          icon: "Lightbulb"
        },
        {
          id: "d4-6b",
          title: "狸小路商店街",
          description: "北海道最大的商店街，藥妝、伴手禮一應俱全 (含慕尼黑聖誕市集)。",
          category: "shopping",
          location: "狸小路商店街",
          icon: "ShoppingBag"
        },
        {
          id: "d4-7",
          title: "晚餐：方便逛街，敬請自理",
          description: "建議於狸小路或薄野區享用湯咖哩或拉麵。",
          category: "food",
          location: "狸小路/薄野",
          icon: "Utensils"
        },
        {
          id: "d4-8",
          title: "入住：HOTEL IBIS STYLES 札幌",
          category: "lodging",
          location: "ibis Styles Sapporo",
          icon: "Hotel"
        }
      ]
    },
    {
      date: "12/27",
      dayOfWeek: "週六",
      title: "DAY 5 札幌 ✈ 高雄",
      weatherEstimate: { temp: "-2°C", condition: "Cloudy" },
      items: [
        {
          id: "d5-1",
          title: "市區巡禮 (車窗觀光)",
          description: "途經舊道廳 (紅磚廳舍) 與 時計台。",
          category: "sightseeing",
          location: "北海道廳舊本廳舍",
          icon: "Bus"
        },
        {
          id: "d5-2",
          title: "北海道神宮",
          description: "北海道唯一的神宮，供奉歷代天皇及開拓功臣。",
          category: "sightseeing",
          location: "北海道神宮",
          icon: "Landmark"
        },
        {
          id: "d5-3a",
          title: "前往新千歲機場",
          description: "準備搭機返台。",
          category: "transport",
          location: "新千歲機場",
          icon: "Bus"
        },
        {
          id: "d5-3b",
          title: "機場免稅店最後採買",
          description: "購買白色戀人、薯條三兄弟等北海道限定伴手禮。",
          category: "shopping",
          location: "新千歲機場國內線航廈",
          icon: "ShoppingBag"
        },
        {
          id: "d5-4",
          time: "13:55",
          title: "搭乘 IT261 返台",
          description: "午餐：機上餐食 + 起司魚板點心。 18:05 抵達高雄。",
          category: "flight",
          location: "新千歲機場",
          icon: "Plane"
        }
      ]
    }
  ]
};