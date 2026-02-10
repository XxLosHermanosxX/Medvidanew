
import React, { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS, DOCTORS, MEDIA_TESTIMONIALS } from '../constants';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const mediaSectionRef = useRef<HTMLDivElement>(null);
  const workflowSectionRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [visibleMediaCards, setVisibleMediaCards] = useState<number[]>([]);
  const [visibleWorkflowCards, setVisibleWorkflowCards] = useState<number[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  const logos = [
    "https://i.ibb.co/TBvptz5w/veja-logo-1959x320.png",
    "https://i.ibb.co/DgGrDKLd/exame-logo-1959x320.png",
    "https://i.ibb.co/bp0RLsd/infomoney-logo-1959x320.png",
    "https://i.ibb.co/d0hDFRBp/forbes-logo-1959x320.png"
  ];

  const steps = [
    {
      icon: "🔍",
      title: "Escolha",
      desc: "Selecione a especialidade que você precisa agora."
    },
    {
      icon: "👨‍⚕️",
      title: "Agende",
      desc: "Escolha o melhor médico e o horário de sua preferência."
    },
    {
      icon: "💳",
      title: "Confirme",
      desc: "Realize o pagamento seguro via PIX ou Cartão."
    },
    {
      icon: "🎥",
      title: "Consulte",
      desc: "Acesse o link enviado e fale com o médico por vídeo."
    }
  ];

  const workflowSteps = [
    {
      icon: "🏥",
      title: "Teleconsulta HD",
      desc: "Conecte-se com especialistas em uma sala de vídeo segura e criptografada."
    },
    {
      icon: "✍️",
      title: "Assinatura Digital",
      desc: "Documentos emitidos com validade jurídica e reconhecimento nacional (ICP-Brasil)."
    },
    {
      icon: "📲",
      title: "Receita no Celular",
      desc: "Receba receitas, atestados e exames via SMS ou WhatsApp em segundos."
    },
    {
      icon: "💊",
      title: "Farmácia Aceita",
      desc: "Basta apresentar o QR Code ou link na farmácia para comprar seu medicamento."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const checkVisibility = (ref: React.RefObject<HTMLDivElement>, setVisible: React.Dispatch<React.SetStateAction<number[]>>) => {
        if (ref.current) {
          const cards = ref.current.querySelectorAll('.animate-on-scroll');
          cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95) {
              setVisible(prev => prev.includes(index) ? prev : [...prev, index]);
            }
          });
        }
      };

      checkVisibility(howItWorksRef, setVisibleSteps);
      checkVisibility(mediaSectionRef, setVisibleMediaCards);
      checkVisibility(workflowSectionRef, setVisibleWorkflowCards);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Hero Section with Enhanced Smooth Transition */}
      <section className="relative min-h-[95vh] md:min-h-screen pt-24 pb-32 px-6 overflow-hidden flex flex-col items-center justify-start">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img src="https://i.ibb.co/TDn4nCdg/Gemini-Generated-Image-xis4wqxis4wqxis4.png" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#003B73]/60"></div>
        </div>

        {/* TOP Transition Mask: Blends Hero bottom into white content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 md:h-96 bg-gradient-to-t from-white via-white/60 to-transparent z-[5] pointer-events-none"></div>

        <div className="relative z-20 max-w-7xl mx-auto text-center flex flex-col items-center pt-8 md:pt-12">
          <div className="mb-8 md:mb-12 transition-transform duration-300" style={{ transform: `translateY(${-logoYTranslation}px) scale(${logoScale})`, opacity: 1 - scrollRatio * 0.8 }}>
            <img src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" alt="Logo" className="h-12 md:h-24 brightness-0 invert drop-shadow-2xl" />
          </div>
          <div className={`transition-all duration-1000 ${scrollRatio > 0.5 ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-none'}`}>
            <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-white leading-tight mb-6 md:mb-8 px-4 drop-shadow-xl uppercase tracking-tight max-w-5xl mx-auto leading-none">Médico de Qualidade em Minutos</h1>
            <p className="text-blue-50 text-base md:text-2xl lg:text-3xl mb-10 md:mb-12 px-6 opacity-95 font-medium max-w-2xl drop-shadow-md mx-auto leading-relaxed">Consulte especialistas com segurança e rapidez sem sair de casa</p>
            <div className="relative w-full max-w-xs md:max-w-md mx-auto mt-2">
              <button onClick={() => onNavigate('specialties')} className="w-full bg-[#FFB81C] text-[#003B73] text-lg md:text-3xl font-black py-5 md:py-8 rounded-2xl md:rounded-3xl hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(255,184,28,0.5)] active:translate-y-1 uppercase tracking-widest relative z-10">Agendar Agora</button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section ref={howItWorksRef} className="py-24 md:py-40 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 md:mb-32">
            <span className="text-[10px] md:text-[11px] font-black text-primary bg-blue-50 px-4 md:px-6 py-2 rounded-full uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6 inline-block">Cuidado Simples</span>
            <h2 className="text-3xl md:text-7xl font-black text-[#003B73] uppercase tracking-tighter leading-none mb-6">Saúde Digital sem Complicação</h2>
            <p className="text-gray-400 font-medium text-base md:text-xl max-w-2xl mx-auto">Em poucos cliques, o atendimento médico que você merece chega até você.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`animate-on-scroll step-card group relative flex flex-col items-center text-center px-4 transition-all duration-[1200ms] cubic-bezier-out-expo transform ${
                  visibleSteps.includes(idx) 
                    ? 'translate-y-0 opacity-100 blur-none scale-100' 
                    : 'translate-y-20 opacity-0 blur-md scale-95'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center text-4xl md:text-5xl mb-8 group-hover:scale-110 transition-all duration-700 shadow-[0_20px_40px_rgba(0,59,115,0.08)] relative z-10 border border-gray-50">
                  <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10 bg-[#003B73] text-white rounded-full flex items-center justify-center text-sm md:text-base font-black shadow-lg">
                    {idx + 1}
                  </div>
                  {step.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#003B73] uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium max-w-[220px]">{step.desc}</p>
                
                {idx < steps.length - 1 && (
                  <div className="lg:hidden h-12 w-px bg-gradient-to-b from-blue-100 to-transparent my-4 opacity-50"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <button 
              onClick={() => {
                const slider = document.getElementById('doctors-section');
                slider?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#003B73] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] hover:text-primary transition-all duration-500 flex flex-col items-center gap-4 mx-auto group"
            >
              Conheça nossos especialistas
              <span className="animate-bounce-slow bg-blue-50 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7-7-7"/></svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Professionals Slider */}
      <section id="doctors-section" className="py-24 md:py-32 px-4 overflow-hidden bg-white relative border-t border-gray-50">
        <div className="max-w-7xl mx-auto mb-16 md:mb-20 flex justify-between items-end px-6 lg:px-12">
          <div>
            <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-2 block">Seleção de Elite</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#003B73] uppercase tracking-tight">Especialistas à disposição</h2>
          </div>
          <span onClick={() => onNavigate('specialties')} className="text-[10px] md:text-sm font-black text-secondary tracking-widest uppercase cursor-pointer hover:underline underline-offset-8 decoration-2 transition-all">Explorar Todos</span>
        </div>
        
        <div className="relative group max-w-7xl mx-auto">
          <div ref={sliderRef} className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar snap-x snap-mandatory px-8 md:px-12 pb-16 md:pb-24 scroll-smooth">
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="min-w-[280px] md:min-w-[340px] snap-center bg-white rounded-[3rem] md:rounded-[4rem] border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.05)] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 group/card overflow-hidden">
                <div className="relative mb-8 md:mb-12 w-40 h-40 md:w-52 md:h-52 flex items-center justify-center">
                  <div className="w-full h-full rounded-[3rem] md:rounded-[3.5rem] overflow-hidden border-4 border-white shadow-2xl relative z-10 transition-transform duration-700 bg-white">
                    <img src={doc.imageUrl} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-1000" alt={doc.name} />
                  </div>
                  <div className="absolute inset-0 bg-blue-50 rounded-[3rem] md:rounded-[3.5rem] rotate-6 group-hover/card:rotate-12 transition-transform duration-700 -z-0"></div>
                </div>
                <h3 className="font-black text-[#003B73] text-xl md:text-2xl mb-1 uppercase tracking-tight">{doc.name}</h3>
                <p className="text-[10px] md:text-[11px] text-secondary font-black tracking-[0.2em] uppercase mb-6 opacity-80">{doc.specialty}</p>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-3 italic mb-10 px-4">"{doc.bio}"</p>
                <button onClick={() => onNavigate('specialties')} className="w-full py-5 rounded-[2.5rem] bg-[#F5F9FF] text-[#003B73] text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase hover:bg-primary hover:text-white transition-all duration-500 shadow-sm">Ver Perfil Completo</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Workflow Section */}
      <section ref={workflowSectionRef} className="py-24 md:py-40 px-6 bg-[#F8FBFF] overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-32">
            <span className="text-[10px] md:text-[11px] font-black text-secondary bg-green-50 px-4 md:px-6 py-2 rounded-full uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6 inline-block">Tecnologia em Saúde</span>
            <h2 className="text-3xl md:text-6xl font-black text-[#003B73] uppercase tracking-tighter leading-none mb-6">Atestados e Receitas Instantâneos</h2>
            <p className="text-gray-400 font-medium text-base md:text-xl max-w-2xl mx-auto">Documentação digital segura com reconhecimento em todo território nacional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative">
             {workflowSteps.map((step, idx) => (
               <div 
                  key={idx} 
                  className={`animate-on-scroll workflow-card group relative bg-white rounded-[3rem] md:rounded-[3.5rem] p-10 md:p-12 border border-white shadow-[0_20px_50px_rgba(0,59,115,0.03)] hover:shadow-2xl transition-all duration-[1200ms] cubic-bezier-out-expo transform z-10 ${
                    visibleWorkflowCards.includes(idx) 
                      ? 'translate-y-0 opacity-100 blur-none scale-100' 
                      : 'translate-y-20 opacity-0 blur-md scale-95'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
               >
                  <div className="w-20 h-20 bg-blue-50 rounded-[1.8rem] flex items-center justify-center text-4xl mb-10 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700 shadow-inner">
                    {step.icon}
                  </div>
                  <div className="absolute top-12 right-12 text-5xl font-black text-[#003B73]/5 group-hover:text-primary/10 transition-colors duration-700">0{idx + 1}</div>
                  <h3 className="text-xl font-black text-[#003B73] uppercase tracking-tight mb-4 group-hover:text-secondary transition-colors duration-500">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                  
                  {idx < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-2 h-2 bg-blue-100 rounded-full"></div>
                  )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Media Authority Section */}
      <section ref={mediaSectionRef} className="pt-24 pb-32 md:pt-40 md:pb-52 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
           <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse"></div>
           <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
           <div className="text-center mb-24 md:mb-32">
              <span className="text-[10px] md:text-[11px] font-black text-[#003B73] bg-blue-50 px-4 md:px-6 py-2 rounded-full uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 md:mb-6 inline-block">Autoridade Global</span>
              <h2 className="text-3xl md:text-8xl font-black text-[#003B73] uppercase tracking-tighter leading-none mb-6">Referência na Grande Mídia</h2>
              <p className="text-gray-400 font-medium text-base md:text-xl max-w-2xl mx-auto px-4">Especialistas e veículos de renome que avaliam a revolução MEDVIDA.</p>
           </div>

           <div className="mb-32 md:mb-40 relative overflow-hidden py-10 md:py-14 border-y border-gray-100/50">
              <div className="flex w-[400%] md:w-[200%] animate-infinite-scroll hover:pause">
                <div className="flex w-1/2 justify-around items-center">
                  {logos.map((logo, i) => (
                    <img key={`logo-1-${i}`} src={logo} className="h-4 md:h-12 w-auto object-contain opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 mx-6 md:mx-12" alt="Media" />
                  ))}
                </div>
                <div className="flex w-1/2 justify-around items-center">
                  {logos.map((logo, i) => (
                    <img key={`logo-2-${i}`} src={logo} className="h-4 md:h-12 w-auto object-contain opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 mx-6 md:mx-12" alt="Media" />
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10"></div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-32 lg:gap-24 px-2 md:px-0">
              {MEDIA_TESTIMONIALS.map((media, idx) => (
                <div 
                  key={idx} 
                  className={`animate-on-scroll media-card group relative bg-white rounded-[3rem] md:rounded-[4rem] border border-gray-50 shadow-[0_40px_100px_-20px_rgba(0,59,115,0.06)] p-10 md:p-14 flex flex-col transition-all duration-[1500ms] cubic-bezier-out-expo transform ${
                    visibleMediaCards.includes(idx) 
                      ? 'translate-y-0 opacity-100 blur-none scale-100' 
                      : 'translate-y-24 opacity-0 blur-lg scale-90'
                  }`}
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                   <div className="absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 flex items-center justify-center h-12 md:h-20 w-auto transition-transform duration-700 group-hover:scale-110 z-20">
                      <img 
                        src={media.logo} 
                        alt={media.role} 
                        className="h-full w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]" 
                      />
                   </div>

                   <div className="flex flex-col items-center md:items-start gap-8 mb-12 mt-6">
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl group-hover:blur-[50px] transition-all scale-125 duration-1000"></div>
                        <img 
                          src={media.image} 
                          alt={media.author} 
                          className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-2xl relative z-10" 
                        />
                      </div>
                      <div className="text-center md:text-left pt-1 flex flex-col gap-2">
                        <h4 className="font-black text-[#003B73] text-2xl md:text-4xl uppercase tracking-tighter leading-none">{media.author}</h4>
                        <p className="text-[10px] md:text-xs font-black text-secondary uppercase tracking-[0.4em] opacity-90 leading-tight">{media.role}</p>
                      </div>
                   </div>

                   <div className="relative flex-grow">
                      <svg className="absolute -top-12 -left-6 md:-top-16 md:-left-10 w-16 h-16 md:w-28 md:h-28 text-primary opacity-5 transform -rotate-12 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.3561 14 14.017 12.6609 14.017 11V8C14.017 6.33914 15.3561 5 17.017 5H19.017V3H17.017C14.2556 3 12.017 5.23858 12.017 8V11V14V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017V14H8.017C6.35614 14 5.017 12.6609 5.017 11V8C5.017 6.33914 6.35614 5 8.017 5H10.017V3H8.017C5.25558 3 3.017 5.23858 3.017 8V11V14V21H5.017Z"/>
                      </svg>
                      <p className="text-gray-800 font-medium text-lg md:text-3xl italic leading-relaxed relative z-10 px-2 tracking-tight">"{media.text}"</p>
                   </div>
                   
                   <div className="mt-14 h-1 w-20 md:h-1.5 md:w-32 bg-blue-50 rounded-full group-hover:w-full group-hover:bg-primary/20 transition-all duration-1000"></div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Plans Final CTA - Smooth Blending TOP and BOTTOM */}
      <section className="relative py-32 md:py-52 px-6 bg-[#003B73] overflow-hidden">
        {/* TOP Transition Mask: Blends white media section into dark blue CTA */}
        <div className="absolute top-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-b from-white via-white/40 to-transparent z-[5] pointer-events-none"></div>

        {/* BOTTOM Transition Mask: Blends dark blue CTA into white footer */}
        <div className="absolute bottom-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-t from-white via-white/40 to-transparent z-[5] pointer-events-none"></div>

        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/20 rounded-full blur-[200px] animate-pulse-slow"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-9xl font-black text-white mb-10 md:mb-16 uppercase tracking-tighter leading-none">O Futuro da Saúde Agora.</h2>
          <button onClick={() => onNavigate('plans')} className="bg-[#FFB81C] text-[#003B73] px-16 py-8 md:px-24 md:py-10 rounded-[2.5rem] md:rounded-[4rem] font-black text-xl md:text-3xl uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all duration-500 shadow-[0_40px_80px_rgba(255,184,28,0.4)]">Escolher Meu Plano</button>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .cubic-bezier-out-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }

        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 45s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation: infinite-scroll 30s linear infinite;
          }
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
