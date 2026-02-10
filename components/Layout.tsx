
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage }) => {
  const isLanding = currentPage === 'landing';
  const [showMobileMenu, setShowMobileMenu] = useState(!isLanding);

  useEffect(() => {
    // If not on landing page, menu should always be visible
    if (!isLanding) {
      setShowMobileMenu(true);
      return;
    }

    // Threshold for the "first container" (Hero section)
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.85; 
      if (window.scrollY > threshold) {
        setShowMobileMenu(true);
      } else {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to check initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding, currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* 
          Sticky Desktop Subheader for Non-Landing Pages
      */}
      {!isLanding && (
        <div className="md:flex hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b px-6 py-4 items-center justify-between shadow-sm">
           <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('landing')}
          >
            <img 
              src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" 
              alt="MEDVIDA Logo" 
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center gap-8 text-[11px] font-black text-[#003B73] uppercase tracking-widest">
            <button onClick={() => onNavigate('specialties')} className="hover:text-secondary transition-colors">Consultas</button>
            <button onClick={() => onNavigate('plans')} className="hover:text-secondary transition-colors">Planos</button>
            <button className="hover:text-secondary transition-colors">Como Funciona</button>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('specialties')}
              className="bg-secondary text-white font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-green-100"
            >
              Agendar Agora
            </button>
          </div>
        </div>
      )}

      {/* Mobile context header */}
      {!isLanding && (
        <div className="md:hidden sticky top-0 z-[55] flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md border-b">
           <button onClick={() => onNavigate('landing')} className="text-gray-400 p-2">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
           </button>
           <img 
              src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" 
              alt="MEDVIDA" 
              className="h-5"
            />
            <div className="w-10"></div>
        </div>
      )}

      <main className="flex-grow w-full relative">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar - Conditional Visibility */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white border-t flex justify-around py-4 px-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] transition-all duration-700 ease-in-out transform ${showMobileMenu ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <button onClick={() => onNavigate('landing')} className={`flex flex-col items-center gap-1.5 ${isLanding ? 'text-[#003B73]' : 'text-gray-300'}`}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span className="text-[9px] font-black uppercase tracking-tight">Início</span>
        </button>
        <button onClick={() => onNavigate('specialties')} className={`flex flex-col items-center gap-1.5 ${currentPage === 'specialties' ? 'text-[#003B73]' : 'text-gray-300'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <span className="text-[9px] font-black uppercase tracking-tight">Consultas</span>
        </button>
        <button onClick={() => onNavigate('plans')} className={`flex flex-col items-center gap-1.5 ${currentPage === 'plans' ? 'text-[#003B73]' : 'text-gray-300'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span className="text-[9px] font-black uppercase tracking-tight">Planos</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span className="text-[9px] font-black uppercase tracking-tight">Perfil</span>
        </button>
      </div>

      {/* Footer Fix */}
      <footer className="w-full bg-white border-t py-20 px-6 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <img 
              src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" 
              alt="MEDVIDA Logo" 
              className="h-10"
            />
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed font-medium">
              Sua plataforma de telemedicina de confiança. Médicos especialistas prontos para te atender em minutos com total segurança e profissionalismo.
            </p>
            <div className="flex gap-5">
              <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all border border-gray-100">
                <img src="https://img.icons8.com/ios-filled/24/003B73/facebook-new.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-pink-50 transition-all border border-gray-100">
                <img src="https://img.icons8.com/ios-filled/24/003B73/instagram-new.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-red-50 transition-all border border-gray-100">
                <img src="https://img.icons8.com/ios-filled/24/003B73/youtube-play.png" alt="YouTube" className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[#003B73] mb-8 uppercase text-xs tracking-widest opacity-60">Licenciamento</h4>
            <div className="space-y-6">
              <img src="https://i.ibb.co/ycyLCwgr/anvisa-logo-png-seeklogo-9430.png" alt="ANVISA" className="h-10 grayscale opacity-40 hover:opacity-100 transition-opacity" />
              <ul className="space-y-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <li>Telemedicina Segura</li>
                <li>ISO 27001 Compliant</li>
                <li>Dados Criptografados</li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[#003B73] mb-8 uppercase text-xs tracking-widest opacity-60">Ecossistema</h4>
            <div className="space-y-6">
              <div className="p-5 bg-[#003B73] rounded-3xl inline-block shadow-xl shadow-blue-100/50">
                <img src="https://i.ibb.co/b5qLmQ74/logo-multicare-white.webp" alt="MultiCare" className="h-6" />
                <p className="text-[8px] text-white/50 font-black mt-2 text-center uppercase tracking-widest">Padrão de Qualidade</p>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Métodos de Pagamento unificada no Rodapé */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 flex justify-center items-center gap-8 md:gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <img src="https://img.icons8.com/color/48/000000/pix.png" className="h-8" alt="Pix" />
            <img src="https://img.icons8.com/color/48/000000/google-pay.png" className="h-8" alt="Google Pay" />
            <img src="https://img.icons8.com/color/48/000000/apple-pay.png" className="h-8" alt="Apple Pay" />
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-4 md:h-6" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-8" alt="Mastercard" />
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <p>© 2026 MEDVIDA. Inovação em Saúde Digital.</p>
          <div className="flex gap-8">
            <span className="hover:text-[#003B73] cursor-pointer transition-colors">Privacidade</span>
            <span className="hover:text-[#003B73] cursor-pointer transition-colors">Termos de Uso</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
