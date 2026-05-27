import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare, ChevronRight, Info, Plus, Check, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTrip } from '../TripContext';
import { SAFARIS, EXPERIENCES, ACCOMMODATIONS, TRANSPORTS } from '../constants';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80"
          alt="Safari Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-safari-orange font-bold uppercase tracking-[0.3em] text-sm mb-6 block">
            Experience the Heart of Africa
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tighter">
            Unforgettable <br />
            <span className="italic text-safari-cream">Kenyan</span> Safaris
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the breathtaking beauty of Kenya's wilderness with expert-guided tours 
            tailored to your sense of adventure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/builder"
              className="w-full sm:w-auto bg-safari-orange text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-safari-orange/90 transition-all shadow-2xl shadow-safari-orange/20"
            >
              Build Your Package
            </Link>
            <Link
              to="/safaris"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              View Collection
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-safari-brown mb-6 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className={`h-1 w-20 bg-safari-orange mt-8 ${centered ? 'mx-auto' : ''}`} />
      </motion.div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { trip, calculateTotal } = useTrip();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Safaris', href: '/safaris' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Saved Quotes', href: '/saved-quotes' },
    { name: 'Custom Safari', href: '/builder' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-safari-cream/80 backdrop-blur-md border-b border-safari-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-serif font-bold text-safari-brown tracking-tighter">
              Safari <span className="text-safari-orange">by Waweru</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  location.pathname === link.href ? 'text-safari-orange' : 'text-stone-600 hover:text-safari-orange'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-stone-200 mx-2" />
            
            <Link 
              to="/builder"
              className="flex items-center gap-2 bg-safari-brown text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-safari-brown/90 transition-all shadow-lg shadow-safari-brown/20"
            >
              <ShoppingBag size={14} />
              {trip.selectedSafariId ? (trip.status === 'booked' ? 'View Booking' : `$${calculateTotal()}`) : 'Build Your Package'}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-4">
             {trip.selectedSafariId && (
               <Link to="/builder" className="text-safari-orange font-bold text-sm">
                 ${calculateTotal()}
               </Link>
             )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-safari-brown p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-safari-cream border-b border-safari-brown/10 px-4 pt-2 pb-6 space-y-2 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-stone-700 hover:bg-safari-brown/5 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/builder"
              onClick={() => setIsOpen(false)}
              className="w-full bg-safari-brown text-white px-6 py-4 rounded-xl text-base font-semibold mt-4 flex justify-center"
            >
              Book Your Safari
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function SafariCard({ safari }: { safari: any; key?: any }) {
  const { updateTrip } = useTrip();
  
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-stone-100 group flex flex-col h-full">
      <div className="relative h-72 overflow-hidden">
        <img
          src={safari.image}
          alt={safari.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-safari-brown px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
          {safari.duration}
        </div>
      </div>
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-serif font-bold text-safari-brown leading-tight">{safari.name}</h3>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">From</span>
            <span className="text-xl font-bold text-safari-green">${safari.basePrice}</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-8 flex-grow">
          {safari.highlights.slice(0, 3).map((h: string) => (
            <div key={h} className="flex items-center gap-3 text-stone-500 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-safari-orange" />
              {h}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link 
            to={`/safaris/${safari.slug}`}
            className="py-3.5 rounded-2xl border border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-widest text-center hover:bg-stone-50 transition-all"
          >
            View Details
          </Link>
          <Link 
            to="/builder"
            onClick={() => updateTrip({ selectedSafariId: safari.id })}
            className="py-3.5 rounded-2xl bg-safari-orange text-white text-xs font-bold uppercase tracking-widest text-center hover:bg-safari-orange/90 transition-all shadow-lg shadow-safari-orange/20"
          >
            Customize
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ExperienceCard({ experience, onAdd }: { experience: any; onAdd?: () => void; key?: any }) {
  const { trip, addExperience, removeExperience } = useTrip();
  const isSelected = trip.selectedExperiences.some(e => e.id === experience.id);

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-stone-100 group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h4 className="text-white font-serif font-bold text-xl">{experience.name}</h4>
          <span className="text-white/80 text-sm">${experience.price} per person</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-stone-500 text-sm mb-6 line-clamp-2">{experience.description}</p>
        <div className="flex gap-3">
          <Link 
            to="/experiences"
            className="flex-grow py-3 rounded-xl border border-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-widest text-center hover:bg-stone-50 transition-all"
          >
            Learn More
          </Link>
          <button 
            onClick={() => isSelected ? removeExperience(experience.id) : addExperience(experience.id, experience.options[0])}
            className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              isSelected 
                ? 'bg-safari-green text-white' 
                : 'bg-safari-brown text-white hover:bg-safari-brown/90'
            }`}
          >
            {isSelected ? <Check size={14} /> : <Plus size={14} />}
            {isSelected ? 'Added' : (trip.selectedSafariId ? 'Add to My Safari' : 'Reserve Experience')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-safari-brown text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-serif font-bold tracking-tighter mb-8 block">
              Safari <span className="text-safari-orange">by Waweru</span>
            </span>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              We create unforgettable travel experiences across Kenya, 
              combining adventure, comfort, and local expertise.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-safari-orange transition-colors cursor-pointer">
                <MessageSquare size={18} />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-8">Safaris</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><Link to="/safaris/maasai-mara" className="hover:text-safari-orange transition-colors">Maasai Mara</Link></li>
              <li><Link to="/safaris/amboseli" className="hover:text-safari-orange transition-colors">Amboseli</Link></li>
              <li><Link to="/safaris/tsavo" className="hover:text-safari-orange transition-colors">Tsavo East & West</Link></li>
              <li><Link to="/safaris/nairobi" className="hover:text-safari-orange transition-colors">Nairobi City Tour</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-8">Company</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><Link to="/about" className="hover:text-safari-orange transition-colors">Our Story</Link></li>
              <li><Link to="/experiences" className="hover:text-safari-orange transition-colors">Experiences</Link></li>
              <li><Link to="/destinations" className="hover:text-safari-orange transition-colors">Destinations</Link></li>
              <li><Link to="/saved-quotes" className="hover:text-safari-orange transition-colors">Saved Quotes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-8">Contact</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-safari-orange" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare size={16} className="text-safari-orange" />
                info@safaribywaweru.com
              </li>
              <li className="flex items-start gap-3">
                <Info size={16} className="text-safari-orange mt-1" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-[10px] uppercase tracking-widest font-bold">
          <p>&copy; {new Date().getFullYear()} Safari by Waweru. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/privacy" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254700000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
    >
      <MessageSquare size={28} />
      <span className="absolute right-full mr-4 bg-white text-stone-800 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with Waweru
      </span>
    </a>
  );
}
