import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS, SAFARIS } from '../constants';
import { SectionHeading, Footer, Navbar } from '../components/Layout';
import { MapPin, CheckCircle2, ArrowLeft, Camera, Compass, TreePine, Hotel } from 'lucide-react';
import { useTrip } from '../TripContext';

export function DestinationDetail() {
  const { slug } = useParams();
  const { updateTrip } = useTrip();
  const destination = DESTINATIONS.find(d => d.slug === slug);

  if (!destination) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-serif font-bold text-safari-brown">Destination not found</h2>
        <Link to="/destinations" className="mt-8 inline-block text-safari-orange font-bold uppercase tracking-widest text-xs">
          Back to all destinations
        </Link>
      </div>
    );
  }

  // Find safaris related to this destination
  const relatedSafaris = SAFARIS.filter(s => s.slug === destination.slug);

  return (
    <div className="min-h-screen bg-safari-cream">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <Link to="/destinations" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Destinations
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-safari-orange font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
              {destination.region}
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              {destination.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl font-light leading-relaxed">
              {destination.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-4xl font-serif font-bold text-safari-brown mb-8">Overview</h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                {destination.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                <div className="w-12 h-12 bg-safari-orange/10 rounded-2xl flex items-center justify-center text-safari-orange mb-6">
                  <TreePine size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-safari-brown mb-6">Wildlife & Scenery</h3>
                <ul className="space-y-4">
                  {destination.wildlife?.map(w => (
                    <li key={w} className="flex items-center gap-3 text-stone-600">
                      <CheckCircle2 className="text-safari-green" size={18} />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                <div className="w-12 h-12 bg-safari-orange/10 rounded-2xl flex items-center justify-center text-safari-orange mb-6">
                  <Compass size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-safari-brown mb-6">Activities</h3>
                <ul className="space-y-4">
                  {destination.activities?.map(a => (
                    <li key={a} className="flex items-center gap-3 text-stone-600">
                      <CheckCircle2 className="text-safari-orange" size={18} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold text-safari-brown mb-8">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.highlights?.map(h => (
                  <div key={h} className="flex items-center gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                    <div className="w-2 h-2 rounded-full bg-safari-orange" />
                    <span className="font-bold text-safari-brown">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTAs */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="bg-safari-brown text-white p-10 rounded-[3rem] shadow-2xl">
                <Hotel className="text-safari-orange mb-6" size={32} />
                <h3 className="text-2xl font-serif font-bold mb-4">Stay Near {destination.name}</h3>
                <p className="text-stone-300 text-sm mb-8 leading-relaxed">
                  We have curated a selection of premium lodges and camps in the {destination.name} area.
                </p>
                <Link 
                  to="/builder"
                  onClick={() => updateTrip({ selectedSafariId: relatedSafaris[0]?.id || null })}
                  className="block w-full bg-safari-orange text-white py-5 rounded-2xl font-bold text-center shadow-xl shadow-safari-orange/20 hover:bg-safari-orange/90 transition-all mb-4"
                >
                  Book Stay Near {destination.name}
                </Link>
                <Link 
                  to="/builder"
                  className="block w-full border-2 border-white/20 text-white py-5 rounded-2xl font-bold text-center hover:bg-white/10 transition-all"
                >
                  Add Safari to Your Stay
                </Link>
              </div>

              {relatedSafaris.length > 0 && (
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                  <h3 className="text-xl font-serif font-bold text-safari-brown mb-6">Related Safaris</h3>
                  <div className="space-y-6">
                    {relatedSafaris.map(s => (
                      <Link key={s.id} to={`/safaris/${s.slug}`} className="group block">
                        <div className="flex gap-4 items-center">
                          <img src={s.image} alt={s.name} className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-safari-brown group-hover:text-safari-orange transition-colors">{s.name}</h4>
                            <span className="text-xs text-stone-400">{s.duration}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
