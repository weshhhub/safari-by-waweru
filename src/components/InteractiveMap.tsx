import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { MapPin, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function InteractiveMap() {
  const [selectedDest, setSelectedDest] = useState<any>(null);

  return (
    <div className="relative w-full h-full bg-stone-100 rounded-[3rem] overflow-hidden border border-stone-200 shadow-inner">
      {/* Simple SVG Kenya Map Outline */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full fill-stone-200/50 stroke-stone-300 stroke-[0.5]"
      >
        <path d="M30,10 L70,10 L90,40 L80,90 L20,90 L10,40 Z" /> {/* Placeholder shape */}
      </svg>

      {DESTINATIONS.map((dest) => (
        <motion.div
          key={dest.id}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="absolute cursor-pointer z-10"
          style={{ left: `${dest.coordinates.x}%`, top: `${dest.coordinates.y}%` }}
          onClick={() => setSelectedDest(dest)}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2 group">
            <MapPin className={`w-8 h-8 drop-shadow-lg transition-all ${
              selectedDest?.id === dest.id ? 'text-safari-orange scale-125' : 'text-stone-400 group-hover:text-safari-orange group-hover:scale-110'
            }`} />
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
              <span className="text-xs font-bold text-safari-brown">{dest.name}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Popup Overlay */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-80 bg-white rounded-[2rem] p-8 shadow-2xl border border-stone-100 z-30"
          >
            <button 
              onClick={() => setSelectedDest(null)}
              className="absolute top-6 right-6 text-stone-300 hover:text-stone-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <span className="text-safari-orange font-bold uppercase tracking-widest text-[10px] mb-2 block">
              {selectedDest.region}
            </span>
            <h4 className="text-2xl font-serif font-bold text-safari-brown mb-3">{selectedDest.name}</h4>
            <p className="text-stone-500 text-sm mb-6 leading-relaxed line-clamp-2">
              {selectedDest.description}
            </p>
            
            <div className="space-y-3">
              <Link 
                to={`/destinations/${selectedDest.slug}`}
                className="flex items-center justify-center gap-2 w-full bg-safari-brown text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-safari-brown/90 transition-all"
              >
                View Destination
              </Link>
              <Link 
                to="/experiences"
                className="flex items-center justify-center gap-2 w-full border border-stone-200 text-stone-600 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition-all"
              >
                Explore Experiences
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedDest && (
        <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl max-w-[200px]">
          <h4 className="font-serif font-bold text-safari-brown mb-2">Explore Kenya</h4>
          <p className="text-xs text-stone-500 leading-relaxed">
            Click on the map markers to discover our signature destinations and wildlife parks.
          </p>
        </div>
      )}
    </div>
  );
}
