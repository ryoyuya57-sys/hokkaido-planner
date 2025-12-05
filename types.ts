
export type Category = 'flight' | 'sightseeing' | 'food' | 'lodging' | 'shopping' | 'transport' | 'other';

export interface TripItem {
  id: string;
  time?: string;
  title: string;
  description?: string;
  category: Category;
  location?: string;
  note?: string; // For things like "Gift included" or "Ticket price"
  icon?: string;
}

export interface DaySchedule {
  date: string;
  dayOfWeek: string;
  title: string; // e.g., "Day 1: Hakodate Arrival"
  weatherEstimate?: {
    temp: string;
    condition: string;
  };
  items: TripItem[];
}

export interface FlightInfo {
  date: string;
  flightNo: string;
  airline: string;
  from: string;
  to: string;
  depTime: string;
  arrTime: string;
}

export interface HotelInfo {
  date: string;
  name: string;
  address?: string;
  tel: string;
}

export interface ContactInfo {
  role: string;
  name: string;
  phoneTW: string;
  phoneJP: string;
}

export interface TripData {
  title: string;
  duration: string;
  flights: FlightInfo[];
  hotels: HotelInfo[];
  contacts: ContactInfo[];
  itinerary: DaySchedule[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  imageUrl?: string;
  note?: string;
  isPurchased: boolean;
}

export type ExpenseCategory = 'transport' | 'food' | 'lodging' | 'ticket' | 'shopping' | 'other';
export type PaymentMethod = 'cash' | 'credit';

export interface ExpenseItem {
  id: string;
  category: ExpenseCategory;
  name: string;
  date: string;
  amount: number;
  paymentMethod: PaymentMethod;
  note?: string;
}
