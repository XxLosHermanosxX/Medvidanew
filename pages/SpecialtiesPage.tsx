
import React from 'react';
import { SPECIALTIES } from '../constants';
import { Specialty } from '../types';

interface SpecialtiesPageProps {
  onSelect: (specialty: Specialty) => void;
}

const SpecialtiesPage: React.FC<SpecialtiesPageProps> = ({ onSelect }) => {
  return (
    <div className="bg-light-gray min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Nossas Especialidades</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Selecione a área de cuidado que você precisa e encontre os melhores profissionais disponíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPECIALTIES.map((spec) => (
            <div 
              key={spec.type} 
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all border border-transparent hover:border-blue-100 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform">
                {spec.icon}
              </div>
              <h2 className="text-2xl font-bold text-dark-gray mb-2">{spec.type}</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">A partir de R$ {spec.minPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 mb-6 text-sm text-gray-400">
                <span className="text-accent">★ {spec.rating}/5</span>
                <span>({spec.reviews} avaliações)</span>
              </div>
              <p className="text-gray-500 text-sm mb-8 font-medium">
                {spec.availableDoctors} médicos disponíveis
              </p>
              <button 
                onClick={() => onSelect(spec.type)}
                className="w-full bg-secondary text-white font-bold py-4 rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-100 flex items-center justify-center gap-2"
              >
                Ver Médicos
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesPage;
