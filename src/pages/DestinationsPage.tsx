import { motion } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { SectionHeading, Footer, Navbar } from '../components/Layout';
import { Link } from 'react-router-dom';
import { InteractiveMap } from '../components/InteractiveMap';
import { MapPin, ArrowRight, Filter } from 'lucide-react';
import { useState } from 'react';

const REGIONS = [
  'All Regions',
  'Southern Kenya',
  'Rift Valley & Central',
  'Coastal & Marine',
  'Northern Kenya',
  'Nairobi Area',
  'Western Kenya'
];

export function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState('All Regions');

  const filteredDestinations = activeRegion === 'All Regions' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.region === activeRegion);

  return (
    <div className="min-h-screen bg-safari-cream">
      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <SectionHeading 
          title="Explore Kenya" 
          subtitle="From the snow-capped peaks of Mt. Kenya to the sun-drenched beaches of Diani, discover the diverse landscapes of our beautiful country."
        />

        {/* Interactive Map Section */}
        <div className="mb-24 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-serif font-bold text-safari-brown mb-6">Interactive Guide</h3>
              <p className="text-stone-500 mb-8 leading-relaxed">
                Click on the markers to explore our most popular destinations and national parks.
              </p>
              <div className="space-y-4">
                {DESTINATIONS.slice(0, 5).map(dest => (
                  <Link 
                    key={dest.id} 
                    to={`/destinations/${dest.slug}`}
                    className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 hover:bg-safari-orange/5 transition-all group"
                  >
                    <span className="font-bold text-safari-brown group-hover:text-safari-orange transition-colors">{dest.name}</span>
                    <ArrowRight size={16} className="text-stone-300 group-hover:text-safari-orange group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 h-[500px] md:h-[600px]">
              <InteractiveMap />
            </div>
          </div>
        </div>

        {/* Region Filter */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-stone-400 mr-4">
            <Filter size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Filter by Region:</span>
          </div>
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeRegion === region 
                  ? 'bg-safari-orange text-white shadow-lg shadow-safari-orange/20' 
                  : 'bg-white text-stone-500 hover:bg-stone-100'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDestinations.map((dest) => (
            <motion.div
              key={dest.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-stone-100 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-safari-brown px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  {dest.region}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold text-safari-brown mb-4">{dest.name}</h3>
                <p className="text-stone-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                  {dest.description}
                </p>
                <Link 
                  to={`/destinations/${dest.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-safari-orange font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
                >
                  Explore Destination <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-24">
            <p className="text-stone-400 italic">No destinations found in this region yet. We are constantly expanding our offerings!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
