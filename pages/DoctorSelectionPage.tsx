
import React from 'react';
import { DOCTORS } from '../constants';
import { Specialty, Doctor } from '../types';

interface DoctorSelectionPageProps {
  specialty: Specialty;
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDirect: (doctor: Doctor) => void;
}

const DoctorSelectionPage: React.FC<DoctorSelectionPageProps> = ({ specialty, onSelectDoctor, onBookDirect }) => {
  const filteredDoctors = DOCTORS.filter(d => d.specialty === specialty);

  return (
    <div className="bg-white min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col mb-8">
          <h1 className="text-2xl font-bold text-[#003B73] mb-1">Selecione seu Médico</h1>
          <p className="text-gray-400 text-sm font-medium">{specialty} • {filteredDoctors.length} profissionais</p>
        </div>

        <div className="space-y-6">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-5 hover:shadow-xl transition-all group overflow-hidden">
              <div className="relative shrink-0 flex justify-center">
                <div className="w-28 h-28 md:w-32 md:h-40 rounded-3xl overflow-hidden bg-gray-50 border border-blue-50 relative">
                  <img 
                    src={doc.imageUrl} 
                    alt={doc.name} 
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-lg">
                    <img src="https://i.ibb.co/MxSb0g9N/logo-medvida-horizontal.png" className="h-2" alt="MV" />
                  </div>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-[#003B73] leading-tight">{doc.name}</h3>
                    <div className="bg-green-50 text-secondary text-[10px] font-black px-2 py-1 rounded-full whitespace-nowrap">R$ {doc.price.toFixed(2)}</div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-2">CRM {doc.crm}</p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex text-accent text-[10px]">★★★★★</div>
                    <span className="text-[10px] text-gray-400 font-bold">({doc.reviewCount})</span>
                  </div>
                  <div className="bg-blue-50/50 p-2 rounded-xl flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                    <p className="text-[10px] font-bold text-[#003B73] opacity-80">{doc.availability}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => onSelectDoctor(doc)}
                    className="flex-1 py-3 text-[11px] font-bold text-[#003B73] border border-blue-100 rounded-2xl hover:bg-blue-50 transition-colors"
                  >
                    Ver Perfil
                  </button>
                  <button 
                    onClick={() => onBookDirect(doc)}
                    className="flex-1 py-3 text-[11px] font-bold text-white bg-secondary rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-100"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSelectionPage;
