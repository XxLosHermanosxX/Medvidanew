
import React, { useState } from 'react';
import { Doctor } from '../types';

interface DoctorProfilePageProps {
  doctor: Doctor;
  onBook: (doctor: Doctor, slot: string) => void;
}

const DoctorProfilePage: React.FC<DoctorProfilePageProps> = ({ doctor, onBook }) => {
  const [selectedDay, setSelectedDay] = useState(16);
  const slots = ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'];
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const days = [
    { n: 13, l: 'SEG' },
    { n: 14, l: 'TER' },
    { n: 15, l: 'QUA' },
    { n: 16, l: 'QUI' },
    { n: 17, l: 'SEX' },
  ];

  return (
    <div className="bg-light-gray min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-grow bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🩺</div>
            <div className="w-48 h-60 shrink-0 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl relative z-10">
              <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-blue-100 mb-4 font-medium">CRM {doctor.crm} • {doctor.specialty}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit mx-auto md:mx-0">
                <span className="text-2xl font-bold">4.9/5</span>
                <div className="flex flex-col">
                  <span className="text-accent text-sm font-bold">★★★★★</span>
                  <span className="text-[10px] text-blue-50 font-medium">({doctor.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">👤</span>
                Sobre o Médico
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {doctor.bio}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">🎓</span>
                Currículo
              </h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-dark-gray mb-2">Formação Acadêmica</h4>
                  <ul className="list-disc list-inside text-gray-500 space-y-1 ml-2">
                    {doctor.education.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-dark-gray mb-2">Certificações</h4>
                  <ul className="list-disc list-inside text-gray-500 space-y-1 ml-2">
                    {doctor.certifications.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">🗨️</span>
                Avaliações de Pacientes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-light-gray p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <p className="font-bold text-sm">Paciente #{i}</p>
                      </div>
                      <span className="text-accent text-xs">★★★★★</span>
                    </div>
                    <p className="text-sm text-gray-500 italic">"Atendimento fantástico, muito atencioso e explicou tudo com clareza. Me senti muito segura."</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">📅</span>
              Agendar Consulta
            </h3>

            {/* Calendar Mockup */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <button className="text-gray-400 hover:text-primary transition-colors">❮</button>
                <p className="font-bold">Maio 2024</p>
                <button className="text-gray-400 hover:text-primary transition-colors">❯</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {days.map(d => (
                  <button 
                    key={d.n}
                    onClick={() => setSelectedDay(d.n)}
                    className={`flex flex-col items-center py-3 rounded-2xl transition-all ${selectedDay === d.n ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                  >
                    <span className="text-[10px] font-bold opacity-60 mb-1">{d.l}</span>
                    <span className="text-lg font-bold">{d.n}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Horários Disponíveis</p>
              <div className="grid grid-cols-3 gap-2">
                {slots.map(s => (
                  <button 
                    key={s}
                    onClick={() => setSelectedSlot(s)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${selectedSlot === s ? 'bg-secondary text-white border-secondary' : 'bg-white text-gray-600 border-gray-200 hover:border-secondary'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Valor da Consulta</span>
                <span className="text-2xl font-bold text-primary">R$ {doctor.price.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-center gap-4 py-2 opacity-50 grayscale">
                <img src="https://img.icons8.com/color/32/000000/pix.png" alt="Pix" />
                <img src="https://img.icons8.com/color/32/000000/visa.png" alt="Visa" />
                <img src="https://img.icons8.com/color/32/000000/mastercard.png" alt="MC" />
              </div>

              <button 
                onClick={() => selectedSlot && onBook(doctor, `${selectedDay} de Maio às ${selectedSlot}`)}
                disabled={!selectedSlot}
                className={`w-full py-5 rounded-2xl font-bold text-dark-gray transition-all shadow-xl ${selectedSlot ? 'bg-accent hover:scale-105 cursor-pointer shadow-yellow-200' : 'bg-gray-200 opacity-50 cursor-not-allowed'}`}
              >
                Agendar Consulta
              </button>
            </div>

            <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className="text-blue-500 text-lg">🛡️</span>
                    Pagamento Seguro
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className="text-blue-500 text-lg">🌎</span>
                    Ambiente Protegido
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
