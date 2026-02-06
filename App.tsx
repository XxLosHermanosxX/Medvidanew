
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SpecialtiesPage from './pages/SpecialtiesPage';
import PlansPage from './pages/PlansPage';
import DoctorSelectionPage from './pages/DoctorSelectionPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import PulseLoader from './components/PulseLoader';
import { Specialty, Doctor } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingTime, setBookingTime] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState(true);

  // Smooth Navigation with PulseLoader
  const performNavigation = useCallback((page: string) => {
    setIsNavigating(true);
    // Allow animation to play
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      // Extra tiny delay to ensure render is ready before hiding loader
      setTimeout(() => setIsNavigating(false), 500);
    }, 2000); 
  }, []);

  useEffect(() => {
    // Initial load experience
    const timer = setTimeout(() => setIsNavigating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page: string) => performNavigation(page);

  const handleSelectSpecialty = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    performNavigation('doctor-selection');
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    performNavigation('doctor-profile');
  };

  const handleBook = (doctor: Doctor, time: string) => {
    setSelectedDoctor(doctor);
    setBookingTime(time);
    performNavigation('checkout');
  };

  const handleComplete = () => {
    alert('Consulta agendada com sucesso!');
    performNavigation('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'specialties':
        return <SpecialtiesPage onSelect={handleSelectSpecialty} />;
      case 'plans':
        return <PlansPage />;
      case 'doctor-selection':
        return selectedSpecialty ? (
          <DoctorSelectionPage 
            specialty={selectedSpecialty} 
            onSelectDoctor={handleSelectDoctor}
            onBookDirect={(doc) => handleBook(doc, 'Hoje às 14:30')} 
          />
        ) : null;
      case 'doctor-profile':
        return selectedDoctor ? (
          <DoctorProfilePage 
            doctor={selectedDoctor} 
            onBook={handleBook} 
          />
        ) : null;
      case 'checkout':
        return selectedDoctor ? (
          <CheckoutPage 
            doctor={selectedDoctor} 
            bookingTime={bookingTime || 'Hoje às 14:30'} 
            onComplete={handleComplete} 
          />
        ) : null;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <PulseLoader isLoading={isNavigating} />
      <div className={isNavigating ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100 transition-opacity duration-1000'}>
        <Layout onNavigate={handleNavigate} currentPage={currentPage}>
          {renderPage()}
        </Layout>
      </div>
    </>
  );
};

export default App;
