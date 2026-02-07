
import React from 'react';
import { PLANS } from '../constants';

const PlansPage: React.FC = () => {
  return (
    <div className="bg-[#F8FBFF] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-black text-secondary bg-green-50 px-4 py-2 rounded-full uppercase tracking-[0.4em] mb-4 inline-block">Planos MedVida</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#003B73] mb-6 uppercase tracking-tight">O Cuidado Ideal para Você</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            Escolha o plano que melhor se adapta às suas necessidades e garanta acesso ilimitado à saúde digital de alta performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white rounded-[3rem] p-8 shadow-2xl transition-all hover:-translate-y-3 flex flex-col ${plan.recommended ? 'ring-4 ring-secondary border-transparent scale-105 z-10' : 'border border-gray-100 opacity-90'}`}
            >
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                  Mais Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-[#003B73] mb-2 uppercase tracking-tight">{plan.name}</h3>
                <p className="text-xs text-gray-400 font-bold leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-[#003B73]">R$</span>
                  <span className="text-5xl font-black text-[#003B73]">{plan.price}</span>
                  <span className="text-sm font-bold text-gray-400">/mês</span>
                </div>
                <div className="mt-3 bg-blue-50/50 p-2 rounded-xl flex items-center justify-center gap-2 border border-blue-100">
                  <img src="https://img.icons8.com/color/16/000000/pix.png" alt="Pix" />
                  <span className="text-[9px] font-black text-[#003B73] uppercase tracking-widest">Valor Promocional via PIX</span>
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {plan.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center text-secondary shrink-0 mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-xs font-bold text-[#003B73] opacity-80">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest transition-all ${plan.recommended ? 'bg-secondary text-white shadow-xl shadow-green-100 hover:bg-green-600' : 'bg-blue-50 text-[#003B73] hover:bg-blue-100'}`}>
                Assinar Agora
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-blue-50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl">💡</div>
          <h2 className="text-2xl font-black text-[#003B73] mb-4 uppercase tracking-tight">Precisa de um Plano Sob Medida?</h2>
          <p className="text-gray-400 font-medium mb-8 max-w-lg mx-auto">Fale com nossos consultores para planos corporativos acima de 50 colaboradores.</p>
          <button className="bg-primary text-white font-black px-12 py-5 rounded-full uppercase text-xs tracking-[0.3em] hover:scale-105 transition-all shadow-lg shadow-blue-100">
            Consultoria Gratuita
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
