import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './TripContext';
import { Home, SafarisPage, ExperiencesPage, AboutPage, PrivacyPage } from './pages/Home';
import { SafariDetail } from './pages/SafariDetail';
import { SafariBuilder } from './pages/SafariBuilder';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetail } from './pages/DestinationDetail';
import { BookingPage } from './pages/BookingPage';
import { SavedQuotesPage } from './pages/SavedQuotesPage';
import { Navbar, WhatsAppButton } from './components/Layout';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <TripProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-safari-cream">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/safaris" element={<SafarisPage />} />
            <Route path="/safaris/:slug" element={<SafariDetail />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/builder" element={<SafariBuilder />} />
            <Route path="/safari/booking" element={<BookingPage />} />
            <Route path="/saved-quotes" element={<SavedQuotesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/contact" element={<Home />} />
          </Routes>
          <WhatsAppButton />
        </div>
      </Router>
    </TripProvider>
  );
}
