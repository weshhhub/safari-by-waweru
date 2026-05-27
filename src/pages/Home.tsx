import { motion } from 'motion/react';
import { Navbar, Hero, SectionHeading, SafariCard, ExperienceCard, WhatsAppButton, Footer } from '../components/Layout';
import { InteractiveMap } from '../components/InteractiveMap';
import { DESTINATIONS, SAFARIS, EXPERIENCES, TESTIMONIALS, FAQS } from '../constants';
import { Star, CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function FAQItem({ question, answer }: { question: string; answer: string; key?: any }) {
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

export function Home() {
  return (
    <div className="min-h-screen bg-safari-cream">
      <Hero />

      {/* Interactive Map Section */}
      <section id="destinations" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeading 
              title="Explore the Wild" 
              subtitle="Discover Kenya's most iconic national parks and hidden gems through our interactive guide."
              centered={false}
            />
            <div className="space-y-6 mt-10">
              {DESTINATIONS.slice(0, 5).map(dest => (
                <Link key={dest.id} to={`/destinations/${dest.slug}`} className="group block">
                  <h4 className="text-xl font-serif font-bold text-safari-brown group-hover:text-safari-orange transition-colors flex items-center gap-3">
                    {dest.name} <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="text-stone-500 text-sm mt-1">{dest.description}</p>
                </Link>
              ))}
            </div>
            <Link to="/destinations" className="inline-block mt-12 bg-safari-brown text-white px-10 py-4 rounded-full font-bold hover:bg-safari-brown/90 transition-all">
              View Collection
            </Link>
          </div>
          <div className="h-[500px] md:h-[600px]">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Featured Safaris */}
      <section id="safaris" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            title="Signature Safaris" 
            subtitle="Curated experiences that define the spirit of African adventure."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {SAFARIS.map((safari) => (
              <SafariCard key={safari.id} safari={safari} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/safaris" className="inline-block bg-safari-brown text-white px-10 py-4 rounded-full font-bold hover:bg-safari-brown/90 transition-all shadow-xl shadow-safari-brown/20">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="py-24 px-4 max-w-7xl mx-auto">
        <SectionHeading 
          title="Beyond the Game Drive" 
          subtitle="Enhance your journey with authentic cultural, photography, and adventure experiences."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeading 
              title="The Waweru Standard" 
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
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80" 
                alt="Safari Experience" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-xs hidden md:block border border-stone-100">
              <div className="flex text-safari-orange mb-4">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-safari-brown font-serif italic text-lg mb-2">"We bring you closer to Kenya's beauty."</p>
              <p className="text-stone-500 text-sm font-bold">- Waweru, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-safari-brown text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading 
            title="Traveler Stories" 
            subtitle="Real experiences from people who explored Kenya with us."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            {TESTIMONIALS.map((t) => (
              <motion.div 
                key={t.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-[3rem]"
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
        <div className="max-w-6xl mx-auto bg-safari-orange rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-safari-orange/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Ready to Start Your <br />Adventure?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Contact us today to plan your custom safari or book one of our popular tour packages. 
              Our team is ready to help you create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/builder"
                className="w-full sm:w-auto bg-white text-safari-orange px-12 py-5 rounded-full font-bold text-xl hover:bg-stone-100 transition-all shadow-xl"
              >
                Start Your Journey
              </Link>
              <a 
                href="https://wa.me/254700000000" 
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

export function SafarisPage() {
  return (
    <div className="pt-32 pb-24 bg-safari-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="Our Signature Safaris" 
          subtitle="From luxury lodges to adventure camps, discover the perfect way to experience Kenya."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SAFARIS.map((safari) => (
            <SafariCard key={safari.id} safari={safari} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function ExperiencesPage() {
  return (
    <div className="pt-32 pb-24 bg-safari-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="Authentic Experiences" 
          subtitle="Deepen your connection with the wild through our curated activities."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-safari-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeading title="Our Story" subtitle="Founded on a passion for the wild and a commitment to excellence." />
        <div className="prose prose-stone lg:prose-xl text-stone-600 space-y-8">
          <p>
            Safari by Waweru began with a simple vision: to share the untamed beauty of Kenya with the world 
            through the eyes of those who know it best.
          </p>
          <p>
            Our founder, Waweru, grew up on the edge of the Maasai Mara, developing a deep respect for 
            the land and its inhabitants. Today, we are a team of dedicated professionals committed to 
            providing authentic, sustainable, and unforgettable travel experiences.
          </p>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-stone-100 mt-12">
            <h3 className="text-2xl font-serif font-bold text-safari-brown mb-4 text-center">Our Mission</h3>
            <p className="text-center italic">
              "To create meaningful connections between travelers and the African wilderness, 
              fostering conservation and community empowerment through responsible tourism."
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 bg-safari-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeading title="Legal Information" subtitle="Privacy Policy & Terms of Service" />
        <div className="space-y-12 text-stone-600">
          <section>
            <h3 className="text-xl font-bold text-safari-brown mb-4">Privacy Policy</h3>
            <p>
              We respect your privacy and are committed to protecting your personal data. This policy 
              outlines how we handle information collected through our website and booking process.
            </p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-safari-brown mb-4">Terms of Service</h3>
            <p>
              By booking with Safari by Waweru, you agree to our standard terms and conditions regarding 
              cancellations, liability, and travel requirements.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
