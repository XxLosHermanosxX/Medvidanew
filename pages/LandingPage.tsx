
import React, { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS, DOCTORS, MEDIA_TESTIMONIALS } from '../constants';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const mediaSectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [visibleMediaCards, setVisibleMediaCards] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Scrollytelling for Media Cards
      if (mediaSectionRef.current) {
        const cards = mediaSectionRef.current.querySelectorAll('.media-card');
        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          // Trigger animation as card comes into view
          if (rect.top < window.innerHeight * 0.92) {
            setVisibleMediaCards(prev => prev.includes(index) ? prev : [...prev, index]);
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Recipe Cards Animation
  useEffect(() => {
    if (!showHowItWorks) return;
    const timers: number[] = [];
    [0, 1, 2].forEach((index) => {
      timers.push(window.setTimeout(() => {
        setVisibleCards(prev => [...new Set([...prev, index])]);
      }, 300 * (index + 1)));
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, [showHowItWorks]);

  // Auto-scrolling Logic for Professionals
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollNext = () => {
      const cardWidth = 320 + 32; 
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScroll - 50) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    };
    const interval = setInterval(scrollNext, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleHowItWorks = () => {
    setShowHowItWorks(!showHowItWorks);
    if (!showHowItWorks) {
      setTimeout(() => {
        howItWorksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const heroHeight = 600; 
  const scrollRatio = Math.min(scrollY / heroHeight, 1);
  const showStickyHeader = scrollY > 500;
  
  const logoInitialScale = 1.5;
  const logoFinalScale = 1;
  const logoScale = logoInitialScale - (scrollRatio * (logoInitialScale - logoFinalScale));
  const logoYTranslation = scrollY * 0.4; 

  return (
    <div className="flex flex-col bg-white">
      {/* Dynamic Scroll Header */}
      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-between px-6 md:px-20 lg:px-32 h-20 ${showStickyHeader ? 'bg-white/70 backdrop-blur-xl border-b border-gray-100 translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <img src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" alt="MEDVIDA Logo" className="h-10 md:h-12 w-auto" />
        <div className="flex gap-4 md:gap-8 items-center">
           <button onClick={() => onNavigate('plans')} className="hidden md:block text-[11px] font-black text-[#003B73] uppercase tracking-widest hover:text-secondary transition-colors">Planos</button>
           <button onClick={() => onNavigate('specialties')} className="bg-secondary text-white font-black text-xs md:text-sm px-6 md:px-10 py-3.5 rounded-2xl hover:bg-green-600 transition-all hover:scale-105 shadow-lg shadow-green-100 uppercase tracking-widest">Agendar Agora</button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-20 px-6 overflow-hidden flex flex-col items-center justify-start">
        <div className="absolute inset-0 z-0">
          <img src="https://i.ibb.co/TDn4nCdg/Gemini-Generated-Image-xis4wqxis4wqxis4.png" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#003B73]/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center pt-12">
          <div className="mb-12 transition-transform duration-300" style={{ transform: `translateY(${-logoYTranslation}px) scale(${logoScale})`, opacity: 1 - scrollRatio * 0.8 }}>
            <img src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" alt="Logo" className="h-16 md:h-24 brightness-0 invert drop-shadow-2xl" />
          </div>
          <div className={`transition-opacity duration-700 ${scrollRatio > 0.5 ? 'opacity-0' : 'opacity-100'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight mb-8 px-4 drop-shadow-xl uppercase tracking-tight max-w-5xl mx-auto leading-none">Médico de Qualidade em Minutos</h1>
            <p className="text-blue-50 text-lg md:text-2xl lg:text-3xl mb-12 px-6 opacity-95 font-medium max-w-2xl drop-shadow-md mx-auto leading-relaxed">Consulte especialistas com segurança e rapidez sem sair de casa</p>
            <div className="relative w-full max-w-xs md:max-w-md mx-auto mt-6">
              <button onClick={() => onNavigate('specialties')} className="w-full bg-[#FFB81C] text-[#003B73] text-xl md:text-3xl font-black py-6 md:py-8 rounded-3xl hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(255,184,28,0.5)] active:translate-y-1 uppercase tracking-widest relative z-10">Agendar Agora</button>
            </div>
          </div>
        </div>
      </section>

      {/* Professionals Slider */}
      <section className="py-24 px-4 overflow-hidden bg-white relative">
        <div className="max-w-7xl mx-auto mb-12 flex justify-between items-center px-6 lg:px-12">
          <h2 className="text-2xl md:text-4xl font-black text-[#003B73] uppercase tracking-tight">Nossos Profissionais</h2>
          <span onClick={() => onNavigate('specialties')} className="text-[12px] md:text-sm font-black text-secondary tracking-widest uppercase cursor-pointer hover:underline underline-offset-4 decoration-2 transition-all">Ver todos</span>
        </div>
        <div className="relative group max-w-7xl mx-auto">
          <div ref={sliderRef} className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-8 md:px-12 pb-16 scroll-smooth">
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="min-w-[320px] snap-center bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.06)] p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:-translate-y-4 group/card overflow-hidden">
                <div className="relative mb-10 w-44 h-44 flex items-center justify-center">
                  <div className="w-full h-full rounded-[3.5rem] overflow-hidden border-4 border-blue-50 shadow-xl relative z-10 transition-transform duration-500 bg-white">
                    <img src={doc.imageUrl} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000" alt={doc.name} />
                  </div>
                  <div className="absolute inset-0 bg-blue-100 rounded-[3.5rem] rotate-6 group-hover/card:rotate-12 transition-transform duration-500 -z-0 opacity-40"></div>
                </div>
                <h3 className="font-black text-[#003B73] text-xl mb-1 uppercase tracking-tight">{doc.name}</h3>
                <p className="text-[12px] text-secondary font-black tracking-[0.2em] uppercase mb-6 opacity-80">{doc.specialty}</p>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 italic mb-10 px-4">"{doc.bio}"</p>
                <button onClick={() => onNavigate('specialties')} className="w-full py-5 rounded-[2rem] bg-[#F5F9FF] text-[#003B73] text-[11px] font-black tracking-[0.3em] uppercase hover:bg-blue-100 transition-colors shadow-sm">Conhecer Perfil</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Authority Section - Enhanced Glassmorphism & Fixed Layout */}
      <section ref={mediaSectionRef} className="py-48 px-6 bg-[#FDFDFD] relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
           <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse"></div>
           <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
           <div className="text-center mb-32">
              <span className="text-[11px] font-black text-[#003B73] bg-blue-50 px-6 py-2 rounded-full uppercase tracking-[0.6em] mb-6 inline-block">Autoridade Médica</span>
              <h2 className="text-4xl md:text-7xl font-black text-[#003B73] uppercase tracking-tighter leading-none mb-6">Referência na Mídia Nacional</h2>
              <p className="text-gray-400 font-medium text-lg md:text-xl max-w-2xl mx-auto">Vozes influentes que reconhecem o impacto da MEDVIDA no setor.</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 lg:gap-12">
              {MEDIA_TESTIMONIALS.map((media, idx) => (
                <div 
                  key={idx} 
                  className={`media-card group relative bg-white/20 backdrop-blur-[40px] rounded-[3.5rem] border border-white/50 shadow-[0_60px_120px_-20px_rgba(0,59,115,0.08)] p-10 md:p-12 flex flex-col transition-all duration-1000 transform ${visibleMediaCards.includes(idx) ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-95'}`}
                >
                   {/* Magazine Logo Overlapping - Normalized Height & No Background Box */}
                   <div className="absolute -top-12 right-10 md:-top-16 md:right-12 flex items-center justify-center h-20 md:h-24 w-auto transition-transform group-hover:scale-110 z-20">
                      <img 
                        src={media.logo} 
                        alt={media.role} 
                        className="h-12 md:h-16 w-auto object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)]" 
                      />
                   </div>

                   {/* Author Profile - Centered for better mobile appearance */}
                   <div className="flex flex-col items-center md:items-start gap-8 mb-12">
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-primary/25 rounded-full blur-2xl group-hover:blur-3xl transition-all scale-125"></div>
                        <img 
                          src={media.image} 
                          alt={media.author} 
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl relative z-10" 
                        />
                      </div>
                      
                      {/* Author Info - Fixed spacing and text layout to prevent overlap */}
                      <div className="text-center md:text-left pt-2 flex flex-col gap-2">
                        <h4 className="font-black text-[#003B73] text-2xl md:text-3xl uppercase tracking-tighter leading-none">{media.author}</h4>
                        <p className="text-[10px] md:text-xs font-black text-secondary uppercase tracking-[0.4em] opacity-90 pt-1 leading-tight">{media.role}</p>
                      </div>
                   </div>

                   {/* Quote Area - Improved typography and contrast */}
                   <div className="relative flex-grow">
                      <svg className="absolute -top-10 -left-6 w-20 h-20 text-primary opacity-5 transform -rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.3561 14 14.017 12.6609 14.017 11V8C14.017 6.33914 15.3561 5 17.017 5H19.017V3H17.017C14.2556 3 12.017 5.23858 12.017 8V11V14V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017V14H8.017C6.35614 14 5.017 12.6609 5.017 11V8C5.017 6.33914 6.35614 5 8.017 5H10.017V3H8.017C5.25558 3 3.017 5.23858 3.017 8V11V14V21H5.017Z"/>
                      </svg>
                      <p className="text-gray-800 font-medium text-lg md:text-2xl italic leading-relaxed relative z-10 px-2 tracking-tight">"{media.text}"</p>
                   </div>
                   
                   {/* Bottom Decorative Element */}
                   <div className="mt-12 h-1.5 w-20 bg-blue-50 rounded-full group-hover:w-full group-hover:bg-primary/20 transition-all duration-700"></div>
                </div>
              ))}
           </div>
           
           {/* Unified Media Bar - Consistent Heights */}
           <div className="mt-48 flex flex-wrap justify-center items-center gap-12 md:gap-32 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000 px-4">
              <img src="https://i.ibb.co/M5pqGgdT/Veja-svg.png" className="h-10 md:h-16 w-auto object-contain" alt="Veja" />
              <img src="https://i.ibb.co/RGTWKz8g/exame-logo-0.png" className="h-10 md:h-16 w-auto object-contain" alt="Exame" />
              <img src="https://i.ibb.co/d0x2Y0sb/infomoney-logo-0.png" className="h-10 md:h-16 w-auto object-contain" alt="InfoMoney" />
              <img src="https://i.ibb.co/gZZ4VT8F/Forbes-Logo-PNG-HD.png" className="h-10 md:h-16 w-auto object-contain" alt="Forbes" />
           </div>
        </div>
      </section>

      {/* Plans Final CTA */}
      <section className="py-32 px-6 bg-[#003B73] relative overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-8xl font-black text-white mb-12 uppercase tracking-tight leading-tight">Cuidado Contínuo para sua Família</h2>
          <button onClick={() => onNavigate('plans')} className="bg-[#FFB81C] text-[#003B73] px-20 py-8 rounded-[3rem] font-black text-xl md:text-2xl uppercase tracking-[0.2em] hover:scale-110 transition-transform shadow-[0_30px_60px_rgba(255,184,28,0.4)]">Ver Todos os Planos</button>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LandingPage;
