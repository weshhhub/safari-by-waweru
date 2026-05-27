import { useParams, Link } from 'react-router-dom';
import { SAFARIS } from '../constants';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, MapPin, DollarSign, ChevronRight, ArrowLeft } from 'lucide-react';
import { SectionHeading } from '../components/Layout';
import { useTrip } from '../TripContext';

export function SafariDetail() {
  const { slug } = useParams();
  const { updateTrip } = useTrip();
  const safari = SAFARIS.find(s => s.slug === slug);

  if (!safari) return <div className="pt-32 text-center">Safari not found.</div>;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img src={safari.image} alt={safari.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <Link to="/safaris" className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Safaris
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            {safari.name}
          </motion.h1>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3 text-white">
              <Clock className="text-safari-orange" />
              <span className="font-bold">{safari.duration}</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <DollarSign className="text-safari-orange" />
              <span className="font-bold">From ${safari.basePrice}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-3xl font-serif font-bold text-safari-brown mb-8">Itinerary</h2>
              <div className="space-y-12">
                {safari.itinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-8 relative">
                    {idx !== safari.itinerary.length - 1 && (
                      <div className="absolute top-10 left-5 bottom-0 w-px bg-stone-200" />
                    )}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-safari-orange text-white flex items-center justify-center font-bold z-10">
                      {item.day}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-safari-brown mb-3">{item.title}</h3>
                      <p className="text-stone-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-serif font-bold text-safari-brown mb-6">Highlights</h3>
                <ul className="space-y-4">
                  {safari.highlights.map(h => (
                    <li key={h} className="flex items-center gap-3 text-stone-600">
                      <CheckCircle2 className="text-safari-green" size={20} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-safari-brown mb-6">Included</h3>
                <ul className="space-y-4">
                  {safari.included.map(i => (
                    <li key={i} className="flex items-center gap-3 text-stone-600">
                      <CheckCircle2 className="text-safari-orange" size={20} />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-stone-50 rounded-[3rem] p-10 border border-stone-100">
              <h3 className="text-2xl font-serif font-bold text-safari-brown mb-6">Book This Safari</h3>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                Ready to experience the {safari.name}? Start your customization to build the perfect trip.
              </p>
              <Link 
                to="/builder"
                onClick={() => updateTrip({ selectedSafariId: safari.id })}
                className="block w-full bg-safari-orange text-white py-5 rounded-2xl font-bold text-center shadow-xl shadow-safari-orange/20 hover:bg-safari-orange/90 transition-all mb-4"
              >
                Customize & Get Quote
              </Link>
              <a 
                href={`https://wa.me/254700000000?text=${encodeURIComponent(`I'd like to request a digital brochure for the ${safari.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-5 rounded-2xl border-2 border-safari-brown text-safari-brown font-bold hover:bg-safari-brown hover:text-white transition-all text-center"
              >
                Request Digital Brochure
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
