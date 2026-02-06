
import React, { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS, DOCTORS, PLANS } from '../constants';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scrolling logic for the featured items - Stepped Scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollStep = 320 + 32; // Card width + gap
    const interval = setInterval(() => {
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, 4000); // 4 seconds pause per doctor

    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic styles based on scroll
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
      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-between px-6 h-20 ${showStickyHeader ? 'bg-white/70 backdrop-blur-xl border-b border-gray-100 translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
        <img 
          src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" 
          alt="MEDVIDA Logo" 
          className="h-10 md:h-12 w-auto"
        />
        <div className="flex gap-4">
           <button onClick={() => onNavigate('plans')} className="hidden md:block text-[10px] font-black text-[#003B73] uppercase tracking-widest px-4">Planos</button>
           <button 
            onClick={() => onNavigate('specialties')}
            className="bg-secondary text-white font-black text-xs md:text-sm px-6 py-3 rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-100 uppercase tracking-widest"
          >
            Agendar Agora
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-20 px-6 overflow-hidden flex flex-col items-center justify-start">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/TDn4nCdg/Gemini-Generated-Image-xis4wqxis4wqxis4.png" 
            alt="Doctors Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#003B73]/60"></div>
        </div>

        <div className="relative z-10 max-w-lg mx-auto text-center flex flex-col items-center pt-12">
          {/* Animated Logo */}
          <div 
            className="mb-12 transition-transform duration-300"
            style={{ 
              transform: `translateY(${-logoYTranslation}px) scale(${logoScale})`,
              opacity: 1 - scrollRatio * 0.8
            }}
          >
            <img 
              src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" 
              alt="MEDVIDA Logo" 
              className="h-16 md:h-24 brightness-0 invert drop-shadow-2xl"
            />
          </div>

          <div style={{ opacity: 1 - scrollRatio }}>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 px-4 drop-shadow-xl uppercase tracking-tight">
              Médico de Qualidade em Minutos
            </h1>
            <p className="text-blue-50 text-lg md:text-2xl mb-12 px-6 opacity-95 font-medium max-w-md drop-shadow-md">
              Consulte nutricionista, psiquiatra, clínico geral e psicólogo com segurança
            </p>
            
            <div className="relative w-full max-w-xs mx-auto mt-6">
              <button 
                onClick={() => onNavigate('specialties')}
                className="w-full bg-[#FFB81C] text-[#003B73] text-xl font-black py-6 rounded-3xl hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(255,184,28,0.5)] active:translate-y-1 uppercase tracking-widest relative z-10"
              >
                Agendar Agora
              </button>
              
              <div className="absolute -bottom-10 -right-6 md:-right-16 z-20 bg-secondary text-white border-4 border-white rounded-2xl px-4 py-2 shadow-2xl animate-pulse rotate-12 flex flex-col items-center justify-center min-w-[130px] transform hover:scale-110 transition-transform">
                <span className="text-[10px] font-black uppercase tracking-tighter opacity-80 leading-none">A partir de</span>
                <span className="text-xl font-black leading-none">R$ 4,99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Payment Section Card */}
      <section id="trust-section" className="px-6 -mt-16 relative z-20">
        <div className="max-w-lg mx-auto bg-white rounded-[3rem] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-gray-50">
          <div className="grid grid-cols-2 gap-6 border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#003B73]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <span className="text-[13px] font-black text-gray-800 tracking-tight leading-none">Confiável e Seguro</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-[#003B73]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <span className="text-[13px] font-black text-gray-800 tracking-tight leading-none">Pagamento Protegido</span>
            </div>
          </div>
        </div>
      </section>

      {/* Auto-rolling Doctor Section with Indicator */}
      <section className="py-24 px-4 overflow-hidden bg-white relative">
        <div className="max-w-lg mx-auto mb-10 flex justify-between items-center px-6">
          <h2 className="text-2xl font-black text-[#003B73] uppercase tracking-tight">Nossos Profissionais</h2>
          <span onClick={() => onNavigate('specialties')} className="text-[12px] font-black text-secondary tracking-widest uppercase cursor-pointer hover:underline underline-offset-4">Ver todos</span>
        </div>
        
        <div className="relative group">
          <div 
            ref={sliderRef}
            className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory px-8 pb-12 scroll-smooth"
          >
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="min-w-[320px] snap-center bg-white rounded-[3.5rem] border border-gray-50 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className="relative mb-8">
                  <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-blue-50 shadow-xl relative group">
                    <img 
                      src={doc.imageUrl} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={doc.name} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003B73]/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/20">
                      <img src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" className="h-3 md:h-4" alt="MedVida" />
                    </div>
                  </div>
                </div>
                <h3 className="font-black text-[#003B73] text-xl mb-1 uppercase tracking-tight">{doc.name}</h3>
                <p className="text-[12px] text-secondary font-black tracking-[0.2em] uppercase mb-6 opacity-80">{doc.specialty}</p>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 italic mb-8 px-4">"{doc.bio}"</p>
                
                <button 
                  onClick={() => onNavigate('specialties')}
                  className="w-full py-5 rounded-[2rem] bg-[#F5F9FF] text-[#003B73] text-[11px] font-black tracking-[0.2em] uppercase hover:bg-blue-100 transition-colors shadow-sm"
                >
                  Conhecer Perfil
                </button>
              </div>
            ))}
          </div>
          
          {/* Pulsing Navigation Arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none animate-pulse-slow">
            <div className="bg-[#FFB81C]/20 p-4 rounded-full backdrop-blur-sm border border-[#FFB81C]/30 shadow-2xl">
              <svg className="w-8 h-8 text-[#003B73]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Prescription & Certificates Ecosystem Section with Facilitation CTA */}
      <section className="py-24 px-6 bg-[#F8FBFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-6">
             <div className="inline-flex items-center gap-2 bg-blue-100/50 text-[#003B73] px-5 py-2 rounded-full border border-blue-100">
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Emissão Nativa & Legal</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-[#003B73] uppercase tracking-tight">Receitas e Atestados Digitais</h2>
             <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
               Nossas prescrições são emitidas diretamente no sistema <strong className="text-[#003B73]">CREMESP / SNCR</strong>, garantindo aceitação nacional em farmácias e laboratórios conforme a <strong className="text-secondary underline underline-offset-4 decoration-2">RDC 1000/2025 da ANVISA</strong>.
             </p>
             
             {/* Cognitive Facilitation CTA */}
             <div className="pt-4">
                <button 
                  onClick={() => alert('Abrindo portal de verificação de documentos...')}
                  className="group flex items-center gap-4 bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-green-100"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-125" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  Consultar Meu Documento Agora
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#003B73] mb-8 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
               </div>
               <h3 className="text-xl font-black text-[#003B73] mb-4 uppercase tracking-tighter leading-tight">1. Autenticação CREMESP</h3>
               <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">O médico emite o documento utilizando sua assinatura digital nativa do CRM de São Paulo ou do estado de origem.</p>
               <div className="mt-auto pt-6 border-t border-gray-50 w-full flex justify-center grayscale opacity-30">
                  <img src="https://i.ibb.co/ycyLCwgr/anvisa-logo-png-seeklogo-9430.png" className="h-6" alt="ANVISA" />
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform relative">
               <div className="absolute top-8 right-8 w-3 h-3 bg-secondary rounded-full animate-ping"></div>
               <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
               </div>
               <h3 className="text-xl font-black text-[#003B73] mb-4 uppercase tracking-tighter leading-tight">2. Token de Segurança</h3>
               <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">Você recebe um código de acesso de 4 números via SMS ou WhatsApp para garantir que a receita é exclusivamente sua.</p>
               <div className="flex gap-2">
                  {[0,0,0,0].map((_,i) => <div key={i} className="w-8 h-10 border-2 border-green-100 rounded-lg flex items-center justify-center text-secondary font-black text-xs">0</div>)}
               </div>
            </div>

            <div className="bg-[#003B73] p-10 rounded-[3.5rem] shadow-2xl border border-[#003B73] flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m-8 8h.01M4 16h4m12 0h2"/></svg>
               </div>
               <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tighter leading-tight">3. QR Code Universal</h3>
               <p className="text-sm text-blue-100/70 font-medium leading-relaxed mb-6">Basta apresentar o QR Code na farmácia. Compatível com receitas Brancas, Azuis e Amarelas (Controle Especial).</p>
               <div className="p-3 bg-white rounded-2xl">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" className="w-16 h-16" alt="QR" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-8 border-t border-gray-50">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-center text-[#003B73] mb-16 uppercase tracking-widest">Vozes Reais</h2>
          <div className="space-y-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-[#F8FBFF] p-8 rounded-[3rem] shadow-xl shadow-blue-50/50 border border-blue-50 flex gap-6 items-start">
                <img src={t.image} className="w-16 h-16 rounded-[1.5rem] object-cover shadow-md border-2 border-white" alt={t.name} />
                <div>
                  <p className="font-black text-base text-[#003B73] mb-1">{t.name}</p>
                  <div className="text-[#FFB81C] text-[12px] mb-4 font-bold flex gap-1">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic font-medium opacity-80">"{t.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#003B73] relative overflow-hidden border-t border-white/10">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-[10px] font-black text-secondary uppercase tracking-[0.5em] mb-4 block">Saúde Sem Limites</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight leading-tight">Cuidado Contínuo para Você e sua Família</h2>
          <p className="text-blue-100/70 text-lg mb-12 font-medium">Garanta consultas ilimitadas, descontos em exames e suporte 24h com nossos planos a partir de R$ 39/mês.</p>
          <button onClick={() => onNavigate('plans')} className="bg-[#FFB81C] text-[#003B73] px-12 py-6 rounded-3xl font-black text-lg uppercase tracking-widest hover:scale-110 transition-transform shadow-[0_20px_50px_rgba(255,184,28,0.3)]">Ver Todos os Planos</button>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translateY(-50%) translateX(0px); }
          50% { opacity: 1; transform: translateY(-50%) translateX(10px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
