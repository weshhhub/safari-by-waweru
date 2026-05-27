import { motion, AnimatePresence } from 'motion/react';
import { useTrip } from '../TripContext';
import { SAFARIS, ACCOMMODATIONS, TRANSPORTS, EXPERIENCES } from '../constants';
import { Check, ChevronRight, Users, Calendar, MapPin, Truck, Home, Star, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SafariBuilder() {
  const { trip, updateTrip, calculateTotal, resetTrip, saveQuote } = useTrip();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const navigate = useNavigate();

  const selectedSafari = SAFARIS.find(s => s.id === trip.selectedSafariId);

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleConfirm = () => {
    navigate('/safari/booking');
  };

  const handleSave = () => {
    saveQuote();
    setShowSaveModal(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-24 px-4 max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-24 h-24 bg-safari-green text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-safari-green/20">
            <Check size={48} />
          </div>
          <h2 className="text-5xl font-serif font-bold text-safari-brown mb-6">Safari Requested!</h2>
          <p className="text-lg text-stone-500 mb-12 leading-relaxed">
            Thank you for building your dream safari. We've received your configuration and our 
            experts are reviewing the details. We'll contact you within 24 hours with a formal quote.
          </p>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100 mb-12 text-left">
            <h3 className="font-serif font-bold text-xl text-safari-brown mb-6">Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-stone-400">Safari:</span> <span className="font-bold">{selectedSafari?.name}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Guests:</span> <span className="font-bold">{trip.guests}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Date:</span> <span className="font-bold">{trip.date}</span></div>
              <div className="flex justify-between pt-4 border-t border-stone-100"><span className="text-stone-400">Estimated Total:</span> <span className="text-xl font-bold text-safari-green">${calculateTotal()}</span></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => { resetTrip(); setIsSubmitted(false); setStep(1); }}
              className="bg-safari-brown text-white px-10 py-4 rounded-2xl font-bold"
            >
              Build Another Safari
            </button>
            <Link 
              to="/safaris"
              className="bg-stone-100 text-stone-600 px-10 py-4 rounded-2xl font-bold hover:bg-stone-200 transition-all"
            >
              Explore More Packages
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Configurator */}
        <div className="lg:col-span-2 space-y-12">
          <div className="flex items-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-grow rounded-full transition-all ${
                  i <= step ? 'bg-safari-orange' : 'bg-stone-200'
                }`} 
              />
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-serif font-bold text-safari-brown mb-8 flex items-center gap-4">
                <MapPin className="text-safari-orange" />
                Select Your Destination
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SAFARIS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      updateTrip({ selectedSafariId: s.id });
                      handleNext();
                    }}
                    className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                      trip.selectedSafariId === s.id 
                        ? 'border-safari-orange bg-safari-orange/5' 
                        : 'border-stone-100 hover:border-stone-200'
                    }`}
                  >
                    <img src={s.image} alt={s.name} className="w-full h-40 object-cover rounded-2xl mb-4" />
                    <h3 className="font-serif font-bold text-xl text-safari-brown">{s.name}</h3>
                    <p className="text-stone-500 text-sm mt-2">{s.duration}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-serif font-bold text-safari-brown mb-8 flex items-center gap-4">
                <Users className="text-safari-orange" />
                Travel Details
              </h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Number of Guests</label>
                  <div className="flex items-center gap-6">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <button
                        key={n}
                        onClick={() => updateTrip({ guests: n })}
                        className={`w-14 h-14 rounded-2xl border-2 font-bold transition-all ${
                          trip.guests === n ? 'border-safari-orange bg-safari-orange text-white' : 'border-stone-100'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Preferred Date</label>
                  <input 
                    type="date" 
                    value={trip.date}
                    onChange={(e) => updateTrip({ date: e.target.value })}
                    className="w-full max-w-md p-4 rounded-2xl border-2 border-stone-100 focus:border-safari-orange outline-none"
                  />
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!trip.date}
                  className="bg-safari-brown text-white px-10 py-4 rounded-2xl font-bold disabled:opacity-50"
                >
                  Continue to Accommodation
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-serif font-bold text-safari-brown mb-8 flex items-center gap-4">
                <Home className="text-safari-orange" />
                Choose Accommodation
              </h2>
              <div className="space-y-6">
                {ACCOMMODATIONS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => {
                      updateTrip({ accommodationId: acc.id });
                      handleNext();
                    }}
                    className={`w-full p-8 rounded-[2rem] border-2 text-left transition-all flex justify-between items-center ${
                      trip.accommodationId === acc.id ? 'border-safari-orange bg-safari-orange/5' : 'border-stone-100'
                    }`}
                  >
                    <div>
                      <h3 className="font-serif font-bold text-xl text-safari-brown mb-2">{acc.name}</h3>
                      <p className="text-stone-500 text-sm">{acc.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-safari-green">+${acc.pricePerNight}</span>
                      <span className="text-[10px] text-stone-400 block uppercase tracking-widest">per night</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-serif font-bold text-safari-brown mb-8 flex items-center gap-4">
                <Truck className="text-safari-orange" />
                Select Transport
              </h2>
              <div className="space-y-6">
                {TRANSPORTS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      updateTrip({ transportId: t.id });
                      handleNext();
                    }}
                    className={`w-full p-8 rounded-[2rem] border-2 text-left transition-all flex justify-between items-center ${
                      trip.transportId === t.id ? 'border-safari-orange bg-safari-orange/5' : 'border-stone-100'
                    }`}
                  >
                    <div>
                      <h3 className="font-serif font-bold text-xl text-safari-brown mb-2">{t.name}</h3>
                      <p className="text-stone-500 text-sm">{t.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-safari-green">+${t.price}</span>
                      <span className="text-[10px] text-stone-400 block uppercase tracking-widest">flat fee</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-serif font-bold text-safari-brown mb-8 flex items-center gap-4">
                <Star className="text-safari-orange" />
                Enhance Your Safari
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EXPERIENCES.map((exp) => {
                  const isSelected = trip.selectedExperiences.some(e => e.id === exp.id);
                  return (
                    <button
                      key={exp.id}
                      onClick={() => isSelected ? updateTrip({ selectedExperiences: trip.selectedExperiences.filter(e => e.id !== exp.id) }) : updateTrip({ selectedExperiences: [...trip.selectedExperiences, { id: exp.id, option: exp.options[0] }] })}
                      className={`p-6 rounded-[2rem] border-2 text-left transition-all relative ${
                        isSelected ? 'border-safari-orange bg-safari-orange/5' : 'border-stone-100'
                      }`}
                    >
                      {isSelected && <div className="absolute top-4 right-4 bg-safari-orange text-white p-1 rounded-full"><Check size={16} /></div>}
                      <img src={exp.image} alt={exp.name} className="w-full h-32 object-cover rounded-2xl mb-4" />
                      <h3 className="font-serif font-bold text-lg text-safari-brown">{exp.name}</h3>
                      <p className="text-stone-500 text-xs mt-2 line-clamp-2">{exp.description}</p>
                      <span className="text-safari-green font-bold text-sm block mt-4">+${exp.price}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-12 flex gap-4">
                <button onClick={handleBack} className="px-10 py-4 rounded-2xl border-2 border-stone-100 font-bold">Back</button>
                <button 
                  onClick={handleConfirm}
                  className="flex-grow bg-safari-orange text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-safari-orange/20"
                >
                  Confirm & Generate Quote
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white rounded-[3rem] p-10 shadow-2xl border border-stone-100">
            <h3 className="text-2xl font-serif font-bold text-safari-brown mb-8 flex items-center gap-3">
              <ShoppingBag className="text-safari-orange" />
              Your Safari Quote
            </h3>
            
            <div className="space-y-6 mb-10">
              {selectedSafari ? (
                <div className="pb-6 border-b border-stone-100">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-2">Selected Safari</span>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-safari-brown">{selectedSafari.name}</span>
                    <span className="text-stone-500">${selectedSafari.basePrice * trip.guests}</span>
                  </div>
                  <span className="text-xs text-stone-400 mt-1 block">{trip.guests} Guests • {selectedSafari.duration}</span>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-stone-100 rounded-3xl text-center">
                  <p className="text-stone-400 text-sm">Select a destination to start building your quote.</p>
                </div>
              )}

              {trip.accommodationId && selectedSafari && (
                <div className="pb-6 border-b border-stone-100">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-2">Accommodation</span>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-safari-brown">{ACCOMMODATIONS.find(a => a.id === trip.accommodationId)?.name}</span>
                    <span className="text-stone-500">${(ACCOMMODATIONS.find(a => a.id === trip.accommodationId)?.pricePerNight || 0) * trip.guests}</span>
                  </div>
                </div>
              )}

              {trip.selectedExperiences.length > 0 && (
                <div className="pb-6 border-b border-stone-100">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-2">Add-ons</span>
                  {trip.selectedExperiences.map(se => {
                    const exp = EXPERIENCES.find(e => e.id === se.id);
                    return (
                      <div key={se.id} className="flex justify-between items-center mb-2 last:mb-0">
                        <span className="text-sm text-safari-brown">{exp?.name}</span>
                        <span className="text-sm text-stone-500">${(exp?.price || 0) * trip.guests}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-serif font-bold text-safari-brown">Total Estimate</span>
              <span className="text-3xl font-bold text-safari-green">${calculateTotal()}</span>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleConfirm}
                disabled={!selectedSafari || !trip.date}
                className="w-full bg-safari-brown text-white py-5 rounded-2xl font-bold text-lg hover:bg-safari-brown/90 transition-all shadow-xl shadow-safari-brown/20 disabled:opacity-50"
              >
                Confirm Booking
              </button>
              
              <button 
                onClick={handleSave}
                disabled={!selectedSafari}
                className="w-full py-4 rounded-2xl border-2 border-stone-100 text-stone-600 font-bold hover:bg-stone-50 transition-all disabled:opacity-50"
              >
                Save Quote
              </button>
            </div>
            
            <button 
              onClick={resetTrip}
              className="w-full mt-6 py-3 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:text-safari-orange transition-colors"
            >
              Reset Configuration
            </button>
          </div>
        </div>
      </div>
      {/* Save Confirmation Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSaveModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-safari-green/10 text-safari-green rounded-full flex items-center justify-center mx-auto mb-8">
                <Check size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-safari-brown mb-4">Quote Saved!</h3>
              <p className="text-stone-500 mb-10 leading-relaxed">
                Your safari configuration has been saved. You can access it anytime from your saved quotes.
              </p>
              <div className="space-y-4">
                <Link 
                  to="/saved-quotes"
                  className="block w-full bg-safari-brown text-white py-4 rounded-2xl font-bold hover:bg-safari-brown/90 transition-all"
                >
                  View Saved Quotes
                </Link>
                <button 
                  onClick={() => setShowSaveModal(false)}
                  className="block w-full py-4 rounded-2xl border-2 border-stone-100 text-stone-600 font-bold hover:bg-stone-50 transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
