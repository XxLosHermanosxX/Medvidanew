
export enum Specialty {
  Nutricionista = 'Nutricionista',
  Psiquiatra = 'Psiquiatra',
  ClinicoGeral = 'Clínico Geral',
  Psicologo = 'Psicólogo'
}

export interface Doctor {
  id: string;
  name: string;
  crm: string;
  specialty: Specialty;
  rating: number;
  reviewCount: number;
  price: number;
  availability: string;
  imageUrl: string;
  bio: string;
  education: string[];
  certifications: string[];
}

export interface SpecialtyInfo {
  type: Specialty;
  icon: string;
  minPrice: number;
  rating: number;
  reviews: number;
  availableDoctors: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  recommended?: boolean;
}
