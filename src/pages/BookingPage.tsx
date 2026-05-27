import { motion } from 'motion/react';
import { useTrip } from '../TripContext';
import { SAFARIS, ACCOMMODATIONS, EXPERIENCES } from '../constants';
import { SectionHeading, Footer } from '../components/Layout';
import { CheckCircle2, Calendar, Users, MapPin, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function BookingPage() {
  const { trip, calculateTotal, updateTrip } = useTrip();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedSafari = SAFARIS.find(s => s.id === trip.selectedSafariId);
  const accommodation = ACCOMMODATIONS.find(a => a.id === trip.accommodationId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  if (!selectedSafari) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-serif font-bold text-safari-brown">No safari selected</h2>
        <Link to="/builder" className="mt-8 inline-block text-safari-orange font-bold uppercase tracking-widest text-xs">
          Go to Safari Builder
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      updateTrip({ status: 'booked' });
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-24 px-4 max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-24 h-24 bg-safari-green text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-safari-green/20">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-5xl font-serif font-bold text-safari-brown mb-6">Booking Confirmed!</h2>
          <p className="text-lg text-stone-500 mb-12 leading-relaxed">
            Your safari reservation has been successfully processed. A confirmation email with your 
            itinerary and next steps has been sent to <span className="font-bold text-safari-brown">{formData.email}</span>.
          </p>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100 mb-12 text-left">
            <h3 className="font-serif font-bold text-xl text-safari-brown mb-6">Reservation Details</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-stone-400">Reference:</span> <span className="font-mono font-bold">SW-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Safari:</span> <span className="font-bold">{selectedSafari.name}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Date:</span> <span className="font-bold">{trip.date}</span></div>
              <div className="flex justify-between"><span className="text-stone-400">Guests:</span> <span className="font-bold">{trip.guests}</span></div>
              <div className="flex justify-between pt-4 border-t border-stone-100"><span className="text-stone-400">Total Paid:</span> <span className="text-xl font-bold text-safari-green">${calculateTotal()}</span></div>
            </div>
          </div>
          <Link 
            to="/"
            className="inline-block bg-safari-brown text-white px-12 py-5 rounded-2xl font-bold shadow-xl shadow-safari-brown/20 hover:bg-safari-brown/90 transition-all"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-safari-cream">
      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <SectionHeading 
          title="Complete Your Reservation" 
          subtitle="Please provide your details to finalize your luxury safari booking."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                <h3 className="text-2xl font-serif font-bold text-safari-brown mb-8">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">First Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full p-4 rounded-xl border-2 border-stone-100 focus:border-safari-orange outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Last Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="w-full p-4 rounded-xl border-2 border-stone-100 focus:border-safari-orange outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full p-4 rounded-xl border-2 border-stone-100 focus:border-safari-orange outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-4 rounded-xl border-2 border-stone-100 focus:border-safari-orange outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                <h3 className="text-2xl font-serif font-bold text-safari-brown mb-8">Special Requests</h3>
                <textarea 
                  value={formData.specialRequests}
                  onChange={e => setFormData({...formData, specialRequests: e.target.value})}
                  className="w-full p-6 rounded-2xl border-2 border-stone-100 focus:border-safari-orange outline-none transition-all min-h-[150px]"
                  placeholder="Dietary requirements, accessibility needs, or special occasions..."
                />
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100">
                <div className="flex items-center gap-4 mb-8">
                  <CreditCard className="text-safari-orange" />
                  <h3 className="text-2xl font-serif font-bold text-safari-brown">Payment Method</h3>
                </div>
                <div className="p-6 rounded-2xl border-2 border-safari-orange bg-safari-orange/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-stone-800 rounded flex items-center justify-center text-white font-bold text-[10px]">VISA</div>
                    <div>
                      <p className="font-bold text-safari-brown">Secure Credit Card Payment</p>
                      <p className="text-xs text-stone-500">All transactions are encrypted and secure.</p>
                    </div>
                  </div>
                  <ShieldCheck className="text-safari-green" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-safari-orange text-white py-6 rounded-[2rem] font-bold text-xl shadow-2xl shadow-safari-orange/20 hover:bg-safari-orange/90 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Confirm Safari Booking <ArrowRight size={20} /></>
                )}
              </button>
            </form>
          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-[3rem] p-10 shadow-2xl border border-stone-100">
              <h3 className="text-2xl font-serif font-bold text-safari-brown mb-8">Booking Summary</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-safari-orange shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Safari</span>
                    <p className="font-bold text-safari-brown">{selectedSafari.name}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-safari-orange shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Date</span>
                    <p className="font-bold text-safari-brown">{trip.date}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-safari-orange shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Guests</span>
                    <p className="font-bold text-safari-brown">{trip.guests} People</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Base Package</span>
                    <span className="font-bold text-safari-brown">${selectedSafari.basePrice * trip.guests}</span>
                  </div>
                  {accommodation && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500">Accommodation</span>
                      <span className="font-bold text-safari-brown">${accommodation.pricePerNight * trip.guests}</span>
                    </div>
                  )}
                  {trip.selectedExperiences.map(se => {
                    const exp = EXPERIENCES.find(e => e.id === se.id);
                    return (
                      <div key={se.id} className="flex justify-between text-sm">
                        <span className="text-stone-500">{exp?.name}</span>
                        <span className="font-bold text-safari-brown">${(exp?.price || 0) * trip.guests}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
                <span className="text-lg font-serif font-bold text-safari-brown">Total Amount</span>
                <span className="text-3xl font-bold text-safari-green">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
