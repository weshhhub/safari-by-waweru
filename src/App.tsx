import { Navbar, Hero, SectionHeading, DestinationCard, TourCard, WhatsAppButton, Footer } from './components/Layout';
import { DESTINATIONS, TOURS, TESTIMONIALS, FAQS } from './constants';
import { motion } from 'motion/react';
import { CheckCircle2, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

function FAQItem({ question, answer }: { question: string; answer: string; [key: string]: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg font-serif font-bold text-safari-brown">{question}</span>
        {isOpen ? <ChevronUp className="text-safari-orange" /> : <ChevronDown className="text-stone-400" />}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-4 text-stone-600 leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-safari-cream">
      <Navbar />
      <Hero />

      {/* Featured Destinations */}
      <section id="destinations" className="py-24 px-4 max-w-7xl mx-auto">
        <SectionHeading 
          title="Iconic Destinations" 
          subtitle="Explore the most breathtaking landscapes and wildlife habitats Kenya has to offer."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      </section>

      {/* Popular Tours */}
      <section id="tours" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            title="Popular Tour Packages" 
            subtitle="Hand-picked experiences designed to give you the ultimate Kenyan adventure."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TOURS.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className="bg-safari-brown text-white px-10 py-4 rounded-full font-bold hover:bg-safari-brown/90 transition-all shadow-xl shadow-safari-brown/20">
              Explore All Tours
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeading 
              title="Why Choose Safari by Waweru" 
              centered={false}
            />
            <div className="space-y-8 mt-10">
              {[
                { title: 'Experienced Guides', desc: 'Our local experts have years of experience and deep knowledge of wildlife and culture.' },
                { title: 'Customized Tours', desc: 'We don\'t believe in one-size-fits-all. Every trip is tailored to your preferences.' },
                { title: 'Reliable Transport', desc: 'Travel in comfort and safety with our fleet of well-maintained safari vehicles.' },
                { title: 'Local Expertise', desc: 'As a local company, we have the best connections and insider knowledge.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-safari-orange/10 rounded-2xl flex items-center justify-center text-safari-orange">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-safari-brown mb-2">{item.title}</h4>
                    <p className="text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=1000&q=80" 
                alt="Waweru - Founder" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs hidden md:block">
              <div className="flex text-safari-orange mb-4">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-safari-brown font-serif italic text-lg mb-2">"We bring you closer to Kenya's beauty."</p>
              <p className="text-stone-500 text-sm">- Waweru, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-safari-brown text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            title="What Our Travelers Say" 
            subtitle="Real stories from people who explored Kenya with us."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            {TESTIMONIALS.map((t) => (
              <motion.div 
                key={t.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl"
              >
                <div className="flex text-safari-orange mb-6">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-xl font-serif italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-safari-orange rounded-full flex items-center justify-center font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold">{t.name}</h5>
                    <p className="text-stone-400 text-sm">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-12">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-safari-orange rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-safari-orange/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready to Start Your <br />Adventure?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
              Contact us today to plan your custom safari or book one of our popular tour packages. 
              Our team is ready to help you create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto bg-white text-safari-orange px-12 py-5 rounded-full font-bold text-xl hover:bg-stone-100 transition-all shadow-xl">
                Plan Your Trip
              </button>
              <a 
                href="https://wa.me/1234567890" 
                className="w-full sm:w-auto bg-safari-brown text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-safari-brown/90 transition-all flex items-center justify-center gap-3"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
