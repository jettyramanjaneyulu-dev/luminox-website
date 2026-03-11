import ScrollToTop from "./ScrollToTop";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import BeforeAfter from './pages/BeforeAfter';

// Dropdown category pages (create these pages)
import LaserTreatments from './pages/LaserTreatments';
import Injectables from './pages/Injectables';
import SkinCare from './pages/SkinCare';
import MedicalDermatology from './pages/MedicalDermatology';

// Service detail page
import ServiceDetail from './pages/ServiceDetail';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* Main pages */}
        <ScrollToTop />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/before-after" element={<BeforeAfter />} />

        {/* Dropdown category pages — matches Navbar */}
        <Route path="/laser-treatments" element={<LaserTreatments />} />
        <Route path="/injectables" element={<Injectables />} />
        <Route path="/skin-care" element={<SkinCare />} />
        <Route path="/medical-dermatology" element={<MedicalDermatology />} />

        {/* Individual service detail — for dropdown child links */}
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;