// Dados de raças, vacinas e treinos do PetCare+

import { BreedInfo, TrainingExercise, PetSpecies } from './types';

export const dogBreeds: BreedInfo[] = [
  {
    name: 'Labrador Retriever',
    species: 'dog',
    size: 'large',
    lifeExpectancy: '10-12 anos',
    commonHealthIssues: ['Displasia de quadril', 'Obesidade', 'Problemas oculares'],
    groomingNeeds: ['Escovação semanal', 'Banho mensal', 'Corte de unhas'],
    exerciseNeeds: 'Alto - 60-90 min/dia',
    temperament: ['Amigável', 'Ativo', 'Inteligente', 'Leal'],
    dietRecommendations: ['Ração premium para raças grandes', 'Controle de porções', 'Evitar sobrepeso']
  },
  {
    name: 'Golden Retriever',
    species: 'dog',
    size: 'large',
    lifeExpectancy: '10-12 anos',
    commonHealthIssues: ['Displasia de quadril', 'Câncer', 'Problemas cardíacos'],
    groomingNeeds: ['Escovação 2-3x/semana', 'Banho mensal', 'Tosa higiênica'],
    exerciseNeeds: 'Alto - 60-90 min/dia',
    temperament: ['Dócil', 'Inteligente', 'Amigável', 'Confiável'],
    dietRecommendations: ['Ração para raças grandes', 'Suplementos articulares', 'Controle calórico']
  },
  {
    name: 'Bulldog Francês',
    species: 'dog',
    size: 'small',
    lifeExpectancy: '10-12 anos',
    commonHealthIssues: ['Problemas respiratórios', 'Alergias', 'Problemas de coluna'],
    groomingNeeds: ['Limpeza de dobras diária', 'Banho quinzenal', 'Corte de unhas'],
    exerciseNeeds: 'Moderado - 30-45 min/dia',
    temperament: ['Afetuoso', 'Brincalhão', 'Adaptável', 'Sociável'],
    dietRecommendations: ['Ração para raças pequenas', 'Evitar alimentos alergênicos', 'Porções controladas']
  },
  {
    name: 'Pastor Alemão',
    species: 'dog',
    size: 'large',
    lifeExpectancy: '9-13 anos',
    commonHealthIssues: ['Displasia de quadril', 'Mielopatia degenerativa', 'Problemas digestivos'],
    groomingNeeds: ['Escovação diária', 'Banho mensal', 'Cuidados com subpelo'],
    exerciseNeeds: 'Muito alto - 90-120 min/dia',
    temperament: ['Inteligente', 'Leal', 'Protetor', 'Trabalhador'],
    dietRecommendations: ['Ração premium para raças grandes', 'Suplementos articulares', 'Proteína de qualidade']
  },
  {
    name: 'Poodle',
    species: 'dog',
    size: 'medium',
    lifeExpectancy: '12-15 anos',
    commonHealthIssues: ['Problemas oculares', 'Luxação patelar', 'Epilepsia'],
    groomingNeeds: ['Tosa profissional a cada 6-8 semanas', 'Escovação diária', 'Limpeza de ouvidos'],
    exerciseNeeds: 'Moderado - 45-60 min/dia',
    temperament: ['Inteligente', 'Ativo', 'Treinável', 'Elegante'],
    dietRecommendations: ['Ração para raças médias', 'Alimentos hipoalergênicos', 'Controle de peso']
  }
];

export const catBreeds: BreedInfo[] = [
  {
    name: 'Persa',
    species: 'cat',
    size: 'medium',
    lifeExpectancy: '12-17 anos',
    commonHealthIssues: ['Problemas respiratórios', 'Doença renal policística', 'Problemas oculares'],
    groomingNeeds: ['Escovação diária', 'Limpeza de olhos diária', 'Banho mensal'],
    exerciseNeeds: 'Baixo - 20-30 min/dia',
    temperament: ['Calmo', 'Afetuoso', 'Dócil', 'Quieto'],
    dietRecommendations: ['Ração premium para gatos', 'Alimentos úmidos', 'Controle de bolas de pelo']
  },
  {
    name: 'Siamês',
    species: 'cat',
    size: 'medium',
    lifeExpectancy: '15-20 anos',
    commonHealthIssues: ['Problemas dentários', 'Asma', 'Amiloidose'],
    groomingNeeds: ['Escovação semanal', 'Limpeza de ouvidos', 'Cuidados dentários'],
    exerciseNeeds: 'Alto - 45-60 min/dia',
    temperament: ['Vocal', 'Sociável', 'Inteligente', 'Ativo'],
    dietRecommendations: ['Ração de alta qualidade', 'Proteína animal', 'Hidratação adequada']
  },
  {
    name: 'Maine Coon',
    species: 'cat',
    size: 'large',
    lifeExpectancy: '12-15 anos',
    commonHealthIssues: ['Cardiomiopatia hipertrófica', 'Displasia de quadril', 'Atrofia muscular espinhal'],
    groomingNeeds: ['Escovação 2-3x/semana', 'Cuidados com pelagem longa', 'Corte de unhas'],
    exerciseNeeds: 'Moderado - 30-45 min/dia',
    temperament: ['Gentil', 'Sociável', 'Brincalhão', 'Inteligente'],
    dietRecommendations: ['Ração para raças grandes', 'Alta proteína', 'Suplementos articulares']
  },
  {
    name: 'Ragdoll',
    species: 'cat',
    size: 'large',
    lifeExpectancy: '12-17 anos',
    commonHealthIssues: ['Cardiomiopatia hipertrófica', 'Doença renal policística', 'Obesidade'],
    groomingNeeds: ['Escovação 2-3x/semana', 'Banho ocasional', 'Limpeza de olhos'],
    exerciseNeeds: 'Baixo a moderado - 20-30 min/dia',
    temperament: ['Dócil', 'Calmo', 'Afetuoso', 'Relaxado'],
    dietRecommendations: ['Ração premium', 'Controle de porções', 'Alimentos úmidos']
  },
  {
    name: 'Bengal',
    species: 'cat',
    size: 'medium',
    lifeExpectancy: '12-16 anos',
    commonHealthIssues: ['Cardiomiopatia hipertrófica', 'Atrofia progressiva da retina', 'Luxação patelar'],
    groomingNeeds: ['Escovação semanal', 'Banho ocasional', 'Corte de unhas'],
    exerciseNeeds: 'Muito alto - 60-90 min/dia',
    temperament: ['Ativo', 'Curioso', 'Inteligente', 'Brincalhão'],
    dietRecommendations: ['Ração de alta proteína', 'Alimentos naturais', 'Hidratação constante']
  }
];

export const vaccineSchedule = {
  dog: [
    { name: 'V8 ou V10 (Polivalente)', ageWeeks: 6, description: 'Primeira dose' },
    { name: 'V8 ou V10 (Polivalente)', ageWeeks: 9, description: 'Segunda dose' },
    { name: 'V8 ou V10 (Polivalente)', ageWeeks: 12, description: 'Terceira dose' },
    { name: 'Antirrábica', ageWeeks: 16, description: 'Dose única anual' },
    { name: 'Leishmaniose', ageWeeks: 16, description: 'Primeira dose (opcional)' },
    { name: 'Gripe Canina', ageWeeks: 12, description: 'Dose única anual (opcional)' },
    { name: 'Giardíase', ageWeeks: 8, description: 'Duas doses (opcional)' }
  ],
  cat: [
    { name: 'V3 ou V4 (Polivalente)', ageWeeks: 6, description: 'Primeira dose' },
    { name: 'V3 ou V4 (Polivalente)', ageWeeks: 9, description: 'Segunda dose' },
    { name: 'V3 ou V4 (Polivalente)', ageWeeks: 12, description: 'Terceira dose' },
    { name: 'Antirrábica', ageWeeks: 16, description: 'Dose única anual' },
    { name: 'FeLV (Leucemia Felina)', ageWeeks: 12, description: 'Primeira dose (opcional)' },
    { name: 'FeLV (Leucemia Felina)', ageWeeks: 15, description: 'Segunda dose (opcional)' }
  ]
};

export const trainingExercises: TrainingExercise[] = [
  {
    id: '1',
    title: 'Comando "Senta"',
    level: 'basic',
    duration: 10,
    category: 'Obediência Básica',
    description: 'Ensine seu cão a sentar no comando. Este é um dos comandos mais fundamentais.',
    steps: [
      'Segure um petisco perto do nariz do seu cão',
      'Mova sua mão para cima, fazendo a cabeça dele seguir o petisco',
      'Quando o bumbum tocar o chão, diga "senta" claramente',
      'Dê o petisco e elogie com entusiasmo',
      'Repita 5-10 vezes por sessão, 2-3 vezes ao dia'
    ]
  },
  {
    id: '2',
    title: 'Comando "Fica"',
    level: 'basic',
    duration: 15,
    category: 'Obediência Básica',
    description: 'Ensine seu cão a permanecer parado até receber permissão para se mover.',
    steps: [
      'Peça para seu cão sentar',
      'Abra a palma da mão em frente a ele e diga "fica"',
      'Dê um passo para trás',
      'Se ele ficar parado, volte e recompense',
      'Aumente gradualmente a distância e o tempo',
      'Pratique em diferentes ambientes'
    ]
  },
  {
    id: '3',
    title: 'Comando "Vem"',
    level: 'basic',
    duration: 15,
    category: 'Obediência Básica',
    description: 'Treine seu cão a vir até você quando chamado. Essencial para segurança.',
    steps: [
      'Coloque uma coleira longa no seu cão',
      'Agache-se e diga "vem" com voz animada',
      'Puxe gentilmente a coleira se necessário',
      'Recompense generosamente quando ele chegar',
      'Pratique em ambientes com poucas distrações primeiro',
      'Nunca chame para algo negativo (banho, bronca)'
    ]
  },
  {
    id: '4',
    title: 'Caminhada com Guia',
    level: 'intermediate',
    duration: 20,
    category: 'Comportamento',
    description: 'Ensine seu cão a caminhar ao seu lado sem puxar a guia.',
    steps: [
      'Comece em ambiente calmo',
      'Segure petiscos na mão do lado que o cão deve andar',
      'Quando ele puxar, pare imediatamente',
      'Só continue quando a guia estiver frouxa',
      'Recompense quando ele andar ao seu lado',
      'Pratique diariamente, aumentando distrações gradualmente'
    ]
  },
  {
    id: '5',
    title: 'Controle de Impulso',
    level: 'intermediate',
    duration: 20,
    category: 'Autocontrole',
    description: 'Desenvolva o autocontrole do seu cão em situações de excitação.',
    steps: [
      'Coloque um petisco na sua mão fechada',
      'Deixe o cão cheirar mas não abra',
      'Quando ele parar de tentar, diga "espera"',
      'Abra a mão lentamente',
      'Se ele tentar pegar, feche novamente',
      'Quando ele esperar, diga "pega" e permita',
      'Aumente o tempo de espera gradualmente'
    ]
  },
  {
    id: '6',
    title: 'Socialização com Outros Cães',
    level: 'intermediate',
    duration: 30,
    category: 'Socialização',
    description: 'Ajude seu cão a interagir de forma positiva com outros cães.',
    steps: [
      'Comece com cães calmos e amigáveis',
      'Mantenha as guias soltas',
      'Permita aproximação gradual',
      'Observe sinais de estresse',
      'Recompense comportamento calmo',
      'Interrompa se houver tensão',
      'Aumente exposição gradualmente'
    ]
  },
  {
    id: '7',
    title: 'Truque: Dar a Pata',
    level: 'basic',
    duration: 10,
    category: 'Truques',
    description: 'Ensine seu cão a dar a patinha. Ótimo para socialização.',
    steps: [
      'Peça para seu cão sentar',
      'Segure um petisco na mão fechada',
      'Quando ele tocar sua mão com a pata, diga "pata"',
      'Abra a mão e dê o petisco',
      'Repita até ele oferecer a pata no comando',
      'Pratique com ambas as patas'
    ]
  },
  {
    id: '8',
    title: 'Dessensibilização a Ruídos',
    level: 'advanced',
    duration: 25,
    category: 'Comportamento',
    description: 'Reduza a sensibilidade do seu cão a ruídos assustadores.',
    steps: [
      'Identifique os ruídos que assustam seu cão',
      'Reproduza o som em volume muito baixo',
      'Recompense comportamento calmo',
      'Aumente o volume gradualmente ao longo de semanas',
      'Nunca force exposição intensa',
      'Associe o som com coisas positivas',
      'Seja paciente - pode levar meses'
    ]
  }
];

export function getBreedInfo(breedName: string, species: PetSpecies): BreedInfo | undefined {
  const breeds = species === 'dog' ? dogBreeds : catBreeds;
  return breeds.find(b => b.name.toLowerCase() === breedName.toLowerCase());
}

export function getVaccineSchedule(species: PetSpecies) {
  return vaccineSchedule[species];
}

export function getTrainingsByLevel(level: TrainingLevel) {
  return trainingExercises.filter(ex => ex.level === level);
}
