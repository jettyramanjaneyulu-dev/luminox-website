import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';

import LaserTreatments from './pages/LaserTreatments';
import Injectables from './pages/Injectables';
import SkinCare from './pages/SkinCare';
import MedicalDermatology from './pages/MedicalDermatology';

import ServiceDetail from './pages/ServiceDetail';
// import ScrollToTop from "./ScrollToTop";


function App() {
  return (
    <BrowserRouter>

      {/* Scroll reset component */}
      {/* <ScrollToTop /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />

        <Route path="/laser-treatments" element={<LaserTreatments />} />
        <Route path="/injectables" element={<Injectables />} />
        <Route path="/skin-care" element={<SkinCare />} />
        <Route path="/medical-dermatology" element={<MedicalDermatology />} />

        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;