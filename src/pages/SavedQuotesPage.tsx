import { motion, AnimatePresence } from 'motion/react';
import { useTrip } from '../TripContext';
import { SAFARIS } from '../constants';
import { SectionHeading, Footer } from '../components/Layout';
import { Trash2, Play, Edit3, Calendar, Users, Clock, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function SavedQuotesPage() {
  const { savedQuotes, deleteQuote, loadQuote } = useTrip();
  const navigate = useNavigate();

  const handleResume = (quote: any) => {
    loadQuote(quote);
    navigate('/builder');
  };

  const handleBook = (quote: any) => {
    loadQuote(quote);
    navigate('/safari/booking');
  };

  return (
    <div className="min-h-screen bg-safari-cream">
      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <SectionHeading 
          title="Your Saved Quotes" 
          subtitle="Review, edit, or finalize your previously saved safari configurations."
        />

        {savedQuotes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] shadow-xl border border-stone-100">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
              <ShoppingBag size={40} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-safari-brown mb-4">No saved quotes yet</h3>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">
              Start building your dream safari and save your progress to see it here.
            </p>
            <Link 
              to="/builder"
              className="inline-flex items-center gap-2 bg-safari-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-safari-orange/90 transition-all"
            >
              Start Building <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {savedQuotes.map((quote) => {
                const safari = SAFARIS.find(s => s.id === quote.selectedSafariId);
                return (
                  <motion.div
                    key={quote.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-stone-100 group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-2">
                          Saved on {new Date(quote.savedAt).toLocaleDateString()}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-safari-brown">{safari?.name || 'Custom Safari'}</h3>
                      </div>
                      <button 
                        onClick={() => deleteQuote(quote.id)}
                        className="p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-stone-50 p-4 rounded-2xl">
                        <Users size={16} className="text-safari-orange mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Guests</span>
                        <span className="font-bold text-safari-brown">{quote.guests}</span>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-2xl">
                        <Calendar size={16} className="text-safari-orange mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Date</span>
                        <span className="font-bold text-safari-brown">{quote.date || 'TBD'}</span>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-2xl">
                        <Clock size={16} className="text-safari-orange mb-2" />
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Total</span>
                        <span className="font-bold text-safari-green">${quote.total}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => handleBook(quote)}
                        className="flex-grow bg-safari-brown text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-safari-brown/90 transition-all"
                      >
                        <Play size={16} /> Resume Booking
                      </button>
                      <button 
                        onClick={() => handleResume(quote)}
                        className="px-6 py-4 rounded-xl border border-stone-200 text-stone-600 font-bold flex items-center justify-center gap-2 hover:bg-stone-50 transition-all"
                      >
                        <Edit3 size={16} /> Edit
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
