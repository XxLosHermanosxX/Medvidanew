
import React, { useState, useEffect } from 'react';
import { Doctor } from '../types';

interface CheckoutPageProps {
  doctor: Doctor;
  bookingTime: string;
  onComplete: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ doctor, bookingTime, onComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-light-gray min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-blue-100/50 px-4 py-2 rounded-full border border-blue-100 mb-4">
             <div className="w-2 h-2 bg-secondary rounded-full animate-ping"></div>
             <span className="text-[11px] font-black text-[#003B73] uppercase tracking-widest">Vaga Garantida por {formatTime(timeLeft)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#003B73] mb-2 uppercase tracking-tight">Finalizar Consulta</h1>
          <p className="text-gray-400 text-sm font-medium">Sua jornada para o bem-estar começa agora.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Patient Info */}
          <div className="flex-grow space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
              <h2 className="text-xl font-black text-[#003B73] mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <span className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-xl">👤</span>
                Identificação do Paciente
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome Completo</label>
                    <input type="text" placeholder="Como no documento" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CPF / Identidade</label>
                    <input type="text" placeholder="000.000.000-00" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail de Contato</label>
                    <input type="email" placeholder="seu@email.com" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Celular / WhatsApp</label>
                    <input type="tel" placeholder="(00) 00000-0000" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all font-medium text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-50">
              <h2 className="text-xl font-black text-[#003B73] mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <span className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-xl">💳</span>
                Forma de Pagamento
              </h2>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest ${paymentMethod === 'pix' ? 'border-primary bg-blue-50 text-primary shadow-lg shadow-blue-50/50' : 'border-gray-50 text-gray-400 hover:border-blue-100'}`}
                >
                  <img src="https://img.icons8.com/color/24/000000/pix.png" alt="Pix" /> Pix
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest ${paymentMethod === 'card' ? 'border-primary bg-blue-50 text-primary shadow-lg shadow-blue-50/50' : 'border-gray-50 text-gray-400 hover:border-blue-100'}`}
                >
                  <img src="https://img.icons8.com/color/24/000000/visa.png" alt="Card" /> Cartão
                </button>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="text-center p-8 bg-blue-50/30 rounded-[2rem] border-2 border-dashed border-blue-100">
                  <div className="relative w-48 h-48 bg-white mx-auto rounded-3xl p-4 shadow-md mb-6 flex items-center justify-center border border-gray-50 overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Code" className="w-full h-full opacity-20 blur-[1.5px]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                       <span className="font-black text-primary text-[10px] tracking-[0.3em] uppercase">Gerando QR...</span>
                       <div className="w-10 h-1 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-1/2 animate-[progress_1s_infinite]"></div>
                       </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-tighter">O pagamento será confirmado em tempo real.</p>
                  <button className="bg-white border border-blue-100 text-[#003B73] px-6 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-sm hover:shadow-md transition-all">Copiar Código PIX</button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número do Cartão</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiração</label>
                      <input type="text" placeholder="MM/AA" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVC</label>
                      <input type="text" placeholder="000" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-50 sticky top-24">
              <h2 className="text-xl font-black text-[#003B73] mb-8 uppercase tracking-tighter">Resumo Final</h2>
              
              <div className="flex items-center gap-5 mb-8 p-5 bg-[#F8FBFF] rounded-[2rem] border border-blue-50">
                <div className="relative">
                   <img src={doctor.imageUrl} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white" />
                   <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full border shadow-sm">
                      <img src="https://i.ibb.co/fVwM0X8f/logo-coracao.png" className="w-4 h-4" />
                   </div>
                </div>
                <div>
                  <h4 className="font-black text-[#003B73] text-sm uppercase">{doctor.name}</h4>
                  <p className="text-[10px] font-black text-secondary tracking-widest uppercase opacity-70">{doctor.specialty}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-[11px] font-bold uppercase tracking-widest">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Data da Consulta</span>
                  <span className="text-[#003B73] font-black">{bookingTime}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Sala Virtual</span>
                  <span className="text-[#003B73] font-black">Vídeo HD Cripto</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t">
                  <span className="text-sm font-black text-gray-400">Valor Total</span>
                  <span className="text-3xl font-black text-primary">R$ {doctor.price.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={onComplete}
                className="w-full bg-secondary text-white text-sm font-black py-6 rounded-2xl hover:scale-105 transition-all shadow-[0_15px_30px_rgba(0,179,102,0.3)] flex items-center justify-center gap-3 uppercase tracking-[0.2em]"
              >
                Garantir Minha Vaga
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
              </button>

              <div className="mt-10 flex flex-col items-center gap-5">
                <div className="flex gap-4 items-center opacity-40 grayscale">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="MC" />
                  <div className="w-px h-4 bg-gray-400"></div>
                  <span className="text-[9px] font-black text-gray-500 tracking-widest">PCI COMPLIANT</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-[9px] font-black text-primary cursor-pointer hover:underline uppercase tracking-widest">Ajuda</span>
                    <span className="text-gray-200">/</span>
                    <span className="text-[9px] font-black text-primary cursor-pointer hover:underline uppercase tracking-widest">Privacidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
