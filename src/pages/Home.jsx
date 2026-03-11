import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import ServiceBar from '../components/home/ServiceBar';
import HomeAbout from '../components/home/HomeAbout';
import HomeServices from '../components/home/HomeServices';
import Stats from '../components/home/Stats';
import WhyUs from '../components/home/WhyUs';
import BeforeAfter from '../components/home/BeforeAfter';
import Testimonials from '../components/home/Testimonials';
import AppointmentForm from '../components/forms/AppointmentForm';
import HomeDoctors from '../components/home/HomeDoctors';
import HomeFAQ from '../components/home/HomeFAQ';
import CTABanner from '../components/home/CTABanner';
import Footer from '../components/layout/Footer';
import VideoSection from '../components/home/VideoSection';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ServiceBar />
      <HomeAbout />
      <HomeServices />
      <Stats />
      <WhyUs />
      <BeforeAfter/>
      <Testimonials />
      <AppointmentForm />
      <VideoSection />
      <HomeDoctors />
      <HomeFAQ />
      <CTABanner />
      <Footer />
    </div>
  );
};


export default Home;