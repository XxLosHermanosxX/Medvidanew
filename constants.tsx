
import { Specialty, Doctor, SpecialtyInfo, Plan } from './types';

export const SPECIALTIES: SpecialtyInfo[] = [
  {
    type: Specialty.Nutricionista,
    icon: '🥗',
    minPrice: 14.99,
    rating: 4.9,
    reviews: 320,
    availableDoctors: 25
  },
  {
    type: Specialty.Psiquiatra,
    icon: '🧠',
    minPrice: 14.99,
    rating: 4.9,
    reviews: 150,
    availableDoctors: 18
  },
  {
    type: Specialty.ClinicoGeral,
    icon: '🩺',
    minPrice: 14.99,
    rating: 4.9,
    reviews: 580,
    availableDoctors: 45
  },
  {
    type: Specialty.Psicologo,
    icon: '💬',
    minPrice: 8.99,
    rating: 4.9,
    reviews: 410,
    availableDoctors: 30
  }
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 39,
    description: 'Ideal para quem busca prevenção individual e rotina.',
    benefits: [
      '1 Consulta Mensal Inclusa',
      'Chat com Enfermagem 24/7',
      'Receitas Digitais via SMS',
      'Desconto em Exames (15%)',
      'Histórico na Nuvem'
    ]
  },
  {
    id: 'family',
    name: 'Familiar',
    price: 49,
    description: 'Proteção completa para quem você mais ama.',
    benefits: [
      'Titular + 3 Dependentes',
      '2 Consultas por Pessoa',
      'Atendimento Pediátrico 24h',
      'Prontuário Familiar Integrado',
      'Desconto em Farmácias (30%)'
    ],
    recommended: true
  },
  {
    id: 'general',
    name: 'Geral',
    price: 59,
    description: 'Acesso ilimitado e prioritário em todas as frentes.',
    benefits: [
      'Consultas Ilimitadas',
      'Acesso a todas Especialidades',
      'Gestor de Saúde Dedicado',
      'Programas de Bem-estar',
      'Check-up Anual Digital'
    ]
  },
  {
    id: 'company',
    name: 'Empresa',
    price: 69,
    description: 'O melhor cuidado para o seu time de alta performance.',
    benefits: [
      'Portal RH com Dashboards',
      'Relatórios Epidemiológicos',
      'Integração com eSocial',
      'Palestras de Saúde Mensais',
      'Suporte Jurídico em Saúde'
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dra. Aline Santos',
    crm: '12345/SP',
    specialty: Specialty.Nutricionista,
    rating: 4.9,
    reviewCount: 287,
    price: 14.99,
    availability: 'Hoje às 14:30',
    imageUrl: 'https://i.ibb.co/ycmbG9tf/medico-v2-01-mulher-negra-35.png',
    bio: 'Especialista em nutrição clínica e esportiva, com foco em emagrecimento saudável e performance.',
    education: ['Graduação em Nutrição - USP', 'Mestrado em Nutrição Humana - UNIFESP'],
    certifications: ['Certificado em Nutrição Comportamental']
  },
  {
    id: '2',
    name: 'Dr. Roberto Magalhães',
    crm: '890123-CE',
    specialty: Specialty.Psiquiatra,
    rating: 4.7,
    reviewCount: 160,
    price: 14.99,
    availability: 'Hoje às 14:30',
    imageUrl: 'https://i.ibb.co/ZR6cKVH8/medico-v2-02-homem-branco-50.png',
    bio: 'Especialista em saúde mental com foco em transtornos de ansiedade e depressão em adultos.',
    education: ['Medicina - UFC', 'Residência em Psiquiatria - USP'],
    certifications: ['Membro Titular da ABP']
  },
  {
    id: '3',
    name: 'Dra. Camila Ferreira',
    crm: '123456-SP',
    specialty: Specialty.ClinicoGeral,
    rating: 4.9,
    reviewCount: 250,
    price: 14.99,
    availability: 'Hoje às 14:30',
    imageUrl: 'https://i.ibb.co/9kp4mBJm/medico-v2-03-mulher-parda-40.png',
    bio: 'Atendimento humanizado focado em prevenção e diagnóstico precoce de doenças crônicas.',
    education: ['Medicina - UNIFESP'],
    certifications: ['Certificação em Medicina Interna']
  },
  {
    id: '4',
    name: 'Dr. Anderson Silva',
    crm: '654321-RJ',
    specialty: Specialty.Psicologo,
    rating: 4.8,
    reviewCount: 180,
    price: 8.99,
    availability: 'Hoje às 15:00',
    imageUrl: 'https://i.ibb.co/cccYrpMy/medico-v2-04-homem-negro-38.png',
    bio: 'Psicólogo clínico com vasta experiência em Terapia Cognitivo-Comportamental (TCC).',
    education: ['Psicologia - UFRJ'],
    certifications: ['Especialista em Saúde Mental']
  },
  {
    id: '5',
    name: 'Dra. Fernanda Lima',
    crm: '234567-PE',
    specialty: Specialty.Nutricionista,
    rating: 4.9,
    reviewCount: 270,
    price: 14.99,
    availability: 'Amanhã às 09:00',
    imageUrl: 'https://i.ibb.co/bgv68zp9/medico-v2-05-mulher-branca-48.png',
    bio: 'Nutricionista focada em saúde da mulher e reeducação alimentar consciente.',
    education: ['Nutrição - UFPE'],
    certifications: ['Especialista em Nutrição Funcional']
  },
  {
    id: '6',
    name: 'Dr. Thiago Mendes',
    crm: '456789-DF',
    specialty: Specialty.ClinicoGeral,
    rating: 4.9,
    reviewCount: 240,
    price: 14.99,
    availability: 'Hoje às 16:30',
    imageUrl: 'https://i.ibb.co/CKfpFVMS/medico-v2-06-homem-pardo-33.png',
    bio: 'Clínico geral com foco em acompanhamento preventivo e check-ups periódicos.',
    education: ['Medicina - UnB'],
    certifications: ['SBMC Member']
  },
  {
    id: '7',
    name: 'Dra. Juliana Rocha',
    crm: '012345-GO',
    specialty: Specialty.Psiquiatra,
    rating: 4.8,
    reviewCount: 210,
    price: 14.99,
    availability: 'Hoje às 14:30',
    imageUrl: 'https://i.ibb.co/fVBNZb6R/medico-v2-07-mulher-negra-45.png',
    bio: 'Atendimento psiquiátrico com foco em psicofarmacologia e terapias integrativas.',
    education: ['Medicina - UFG', 'Residência em Psiquiatria - Santa Casa'],
    certifications: ['Membro da ABP']
  }
];

export const TESTIMONIALS = [
  { 
    name: 'Ana Lúcia Ribeiro', 
    rating: 5, 
    text: 'Finalmente uma telemedicina que entende o brasileiro. Recebi minha receita direto no Zap e a farmácia aceitou na hora. Sensacional!', 
    image: 'https://i.ibb.co/WvtcCM0M/meiaidadefloresta.jpg' 
  },
  { 
    name: 'Sr. João Pereira', 
    rating: 5, 
    text: 'Aos 65 anos achei que não ia conseguir usar, mas foi muito simples. O Dr. Roberto foi muito paciente. Saúde em primeiro lugar sempre.', 
    image: 'https://i.ibb.co/21W1m5bS/velhopescando.jpg' 
  },
  { 
    name: 'Mariana Souza', 
    rating: 5, 
    text: 'Amei a praticidade. Fiz a consulta na minha hora de almoço e já saí com o pedido de exames digital. MedVida salvou meu dia!', 
    image: 'https://i.ibb.co/4R6mQx3X/meninacachu.jpg' 
  },
];

export const DOCTOR_REVIEWS = [
  { name: 'Ricardo Silva', image: 'https://i.ibb.co/1YKFYNTR/meiaidadetrilha.jpg', text: 'Atendimento nota 10. Muito direto ao ponto e o sistema de token é muito seguro.' },
  { name: 'Carla Menezes', image: 'https://i.ibb.co/d45ZJC9s/sentadanorestaurante.jpg', text: 'Excelente médica. Me sinto ouvida e acolhida mesmo sendo por vídeo.' },
  { name: 'Dona Irene', image: 'https://i.ibb.co/HTdQWsbH/velhanaflor.jpg', text: 'Maravilhoso! O atestado chegou no meu e-mail rapidinho. Recomendo para todos.' },
  { name: 'Sr. Benedito', image: 'https://i.ibb.co/3yzkPk4S/velhonafazenda.jpg', text: 'Muito bom o atendimento. O médico explicou tudo sobre o meu tratamento com clareza.' },
  { name: 'Beatriz Lima', image: 'https://i.ibb.co/fGxGxG3x/vestidopraia.jpg', text: 'Prático demais. Não perco mais tempo em fila de hospital para pegar receita branca.' },
  { name: 'Eunice Gomes', image: 'https://i.ibb.co/bjr8hrfc/velhanavinicula.jpg', text: 'Pela primeira vez sinto que a tecnologia veio para facilitar a nossa vida na saúde.' },
];
