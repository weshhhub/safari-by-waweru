import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAFARIS, EXPERIENCES, ACCOMMODATIONS, TRANSPORTS } from './constants';

interface TripState {
  selectedSafariId: string | null;
  selectedExperiences: { id: string; option: string }[];
  accommodationId: string;
  transportId: string;
  guests: number;
  date: string;
  status: 'planning' | 'booked' | 'active';
}

interface SavedQuote extends TripState {
  id: string;
  savedAt: string;
  total: number;
}

interface TripContextType {
  trip: TripState;
  savedQuotes: SavedQuote[];
  updateTrip: (updates: Partial<TripState>) => void;
  addExperience: (id: string, option: string) => void;
  removeExperience: (id: string) => void;
  calculateTotal: (tripState?: TripState) => number;
  resetTrip: () => void;
  saveQuote: () => void;
  deleteQuote: (id: string) => void;
  loadQuote: (quote: SavedQuote) => void;
}

const defaultTrip: TripState = {
  selectedSafariId: null,
  selectedExperiences: [],
  accommodationId: 'budget',
  transportId: 'shared',
  guests: 1,
  date: '',
  status: 'planning',
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trip, setTrip] = useState<TripState>(() => {
    const saved = localStorage.getItem('safari_trip');
    return saved ? JSON.parse(saved) : defaultTrip;
  });

  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>(() => {
    const saved = localStorage.getItem('safari_quotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('safari_trip', JSON.stringify(trip));
  }, [trip]);

  useEffect(() => {
    localStorage.setItem('safari_quotes', JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  const updateTrip = (updates: Partial<TripState>) => {
    setTrip(prev => ({ ...prev, ...updates }));
  };

  const addExperience = (id: string, option: string) => {
    setTrip(prev => {
      const exists = prev.selectedExperiences.find(e => e.id === id);
      if (exists) {
        return {
          ...prev,
          selectedExperiences: prev.selectedExperiences.map(e => e.id === id ? { id, option } : e)
        };
      }
      return {
        ...prev,
        selectedExperiences: [...prev.selectedExperiences, { id, option }]
      };
    });
  };

  const removeExperience = (id: string) => {
    setTrip(prev => ({
      ...prev,
      selectedExperiences: prev.selectedExperiences.filter(e => e.id !== id)
    }));
  };

  const calculateTotal = (tripState: TripState = trip) => {
    let total = 0;
    
    const safari = SAFARIS.find(s => s.id === tripState.selectedSafariId);
    if (safari) {
      total += safari.basePrice * tripState.guests;
      
      const acc = ACCOMMODATIONS.find(a => a.id === tripState.accommodationId);
      if (acc) {
        const nights = parseInt(safari.duration.split('/')[1]) || 1;
        total += acc.pricePerNight * nights * tripState.guests;
      }
      
      const trans = TRANSPORTS.find(t => t.id === tripState.transportId);
      if (trans) {
        total += trans.price;
      }
    }

    tripState.selectedExperiences.forEach(se => {
      const exp = EXPERIENCES.find(e => e.id === se.id);
      if (exp) {
        total += exp.price * tripState.guests;
      }
    });

    return total;
  };

  const resetTrip = () => setTrip(defaultTrip);

  const saveQuote = () => {
    const newQuote: SavedQuote = {
      ...trip,
      id: Math.random().toString(36).substr(2, 9),
      savedAt: new Date().toISOString(),
      total: calculateTotal()
    };
    setSavedQuotes(prev => [newQuote, ...prev]);
  };

  const deleteQuote = (id: string) => {
    setSavedQuotes(prev => prev.filter(q => q.id !== id));
  };

  const loadQuote = (quote: SavedQuote) => {
    const { id, savedAt, total, ...tripState } = quote;
    setTrip(tripState);
  };

  return (
    <TripContext.Provider value={{ 
      trip, 
      savedQuotes, 
      updateTrip, 
      addExperience, 
      removeExperience, 
      calculateTotal, 
      resetTrip,
      saveQuote,
      deleteQuote,
      loadQuote
    }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip must be used within a TripProvider');
  return context;
}
