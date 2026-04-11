import { motion } from 'motion/react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Tours', href: '#tours' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-safari-cream/80 backdrop-blur-md border-b border-safari-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-serif font-bold text-safari-brown tracking-tighter">
              Safari <span className="text-safari-orange">by Waweru</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-safari-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-safari-brown text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-safari-brown/90 transition-all shadow-lg shadow-safari-brown/20">
              Book Now
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-safari-brown p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-safari-cream border-b border-safari-brown/10 px-4 pt-2 pb-6 space-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-base font-medium text-stone-700 hover:bg-safari-brown/5 rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <button className="w-full bg-safari-brown text-white px-6 py-3 rounded-xl text-base font-semibold mt-4">
            Book Now
          </button>
        </motion.div>
      )}
    </nav>
  );
}

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80"
          alt="Safari Landscape"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block text-safari-orange font-semibold tracking-widest uppercase text-sm mb-4"
        >
          Discover the Heart of Africa
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6"
        >
          Explore Kenya's Best <br />
          <span className="italic text-safari-cream/90">Adventures With Us</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light"
        >
          From the wild plains of Maasai Mara to the pristine shores of Diani, 
          we craft unforgettable journeys tailored just for you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto bg-safari-orange text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-safari-orange/90 transition-all shadow-xl shadow-safari-orange/30">
            View Tours
          </button>
          <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
            Contact Us
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-safari-brown mb-4">{title}</h2>
      {subtitle && <p className="text-stone-500 max-w-2xl mx-auto text-lg">{subtitle}</p>}
      <div className={`h-1 w-20 bg-safari-orange mt-6 ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}

export function DestinationCard({ name, description, image }: { name: string; description: string; image: string; [key: string]: any }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">{name}</h3>
        <p className="text-white/80 text-sm line-clamp-2">{description}</p>
        <button className="mt-4 text-safari-orange font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
          Explore More <span>&rarr;</span>
        </button>
      </div>
    </motion.div>
  );
}

export function TourCard({ tour }: { tour: any; [key: string]: any }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-100 group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-safari-orange text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {tour.category}
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-serif font-bold text-safari-brown">{tour.name}</h3>
          <span className="text-safari-green font-bold">{tour.price}</span>
        </div>
        <p className="text-stone-500 text-sm mb-6">{tour.duration}</p>
        <ul className="space-y-2 mb-8">
          {tour.highlights.map((h: string) => (
            <li key={h} className="text-stone-600 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-safari-orange rounded-full" />
              {h}
            </li>
          ))}
        </ul>
        <button className="w-full py-3 rounded-xl border-2 border-safari-brown text-safari-brown font-bold hover:bg-safari-brown hover:text-white transition-all">
          View Itinerary
        </button>
      </div>
    </div>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/1234567890"
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

export function Footer() {
  return (
    <footer className="bg-safari-brown text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-serif font-bold tracking-tighter mb-6 block">
              Safari <span className="text-safari-orange">by Waweru</span>
            </span>
            <p className="text-stone-400 text-sm leading-relaxed">
              Creating unforgettable travel experiences across Kenya, 
              combining adventure, comfort, and local expertise.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><a href="#" className="hover:text-safari-orange transition-colors">Home</a></li>
              <li><a href="#tours" className="hover:text-safari-orange transition-colors">Tours</a></li>
              <li><a href="#destinations" className="hover:text-safari-orange transition-colors">Destinations</a></li>
              <li><a href="#about" className="hover:text-safari-orange transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-safari-orange" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare size={16} className="text-safari-orange" />
                info@safaribywaweru.com
              </li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-stone-400 text-sm mb-4">Get travel tips and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-safari-orange"
              />
              <button className="bg-safari-orange px-4 py-2 rounded-lg font-bold text-sm">Join</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 text-center text-stone-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Safari by Waweru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
