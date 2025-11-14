"use client";

import { useState } from 'react';
import { Calendar, Heart, Pill, Dumbbell, Bot, User, Plus, Bell, Syringe, PawPrint, Clock, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Activity, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Pet, Tutor, Vaccine, Medication, CalendarEvent, TrainingExercise } from '@/lib/types';
import { dogBreeds, catBreeds, vaccineSchedule, trainingExercises, getBreedInfo } from '@/lib/petData';

type Tab = 'home' | 'calendar' | 'health' | 'training' | 'ai' | 'profile';

// Tipos para o quiz
type QuizStep = 'welcome' | 'tutor-basic' | 'pet-basic' | 'pet-details' | 'relationship' | 'goals' | 'complete';

interface QuizData {
  // Dados do tutor
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;
  
  // Dados básicos do pet
  petName: string;
  petSpecies: 'dog' | 'cat' | '';
  petBreed: string;
  petBirthDate: string;
  petWeight: string;
  petSize: 'small' | 'medium' | 'large' | 'giant' | '';
  petPhoto: string;
  
  // Detalhes e curiosidades
  petPersonality: string[];
  petFavoriteActivity: string;
  petFavoriteFood: string;
  petQuirks: string;
  
  // Relacionamento e objetivos
  relationshipTime: string;
  relationshipQuality: string;
  mainGoals: string[];
  specificChallenges: string[];
  trainingInterest: string[];
}

export default function PetCarePlus() {
  const [showQuiz, setShowQuiz] = useState(true);
  const [quizStep, setQuizStep] = useState<QuizStep>('welcome');
  const [quizData, setQuizData] = useState<QuizData>({
    tutorName: '',
    tutorEmail: '',
    tutorPhone: '',
    petName: '',
    petSpecies: '',
    petBreed: '',
    petBirthDate: '',
    petWeight: '',
    petSize: '',
    petPhoto: '',
    petPersonality: [],
    petFavoriteActivity: '',
    petFavoriteFood: '',
    petQuirks: '',
    relationshipTime: '',
    relationshipQuality: '',
    mainGoals: [],
    specificChallenges: [],
    trainingInterest: []
  });

  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showAddPet, setShowAddPet] = useState(false);
  
  // Estado simulado - em produção viria de banco de dados
  const [currentPet, setCurrentPet] = useState<Pet>({
    id: '1',
    name: 'Rex',
    species: 'dog',
    breed: 'Labrador Retriever',
    birthDate: '2022-03-15',
    weight: 28,
    size: 'large',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
    behavior: ['Amigável', 'Enérgico', 'Obediente'],
    healthNotes: 'Saudável, sem alergias conhecidas',
    createdAt: '2024-01-01'
  });

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      petId: '1',
      name: 'Antipulgas',
      dosage: '1 comprimido',
      frequency: 'monthly',
      startDate: '2024-01-01',
      times: ['09:00'],
      active: true,
      notes: 'Administrar com alimento'
    }
  ]);

  const [vaccines, setVaccines] = useState<Vaccine[]>([
    {
      id: '1',
      petId: '1',
      name: 'V10 Polivalente',
      date: '2024-01-15',
      nextDate: '2025-01-15',
      veterinarian: 'Dr. Silva',
      notes: 'Reforço anual'
    }
  ]);

  const [aiMessages, setAiMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: '🐾 Olá! Sou a assistente virtual do PetCare+. Estou aqui para ajudar com dúvidas sobre saúde, comportamento, nutrição e cuidados do seu pet. Como posso ajudar você e o Rex hoje?'
    }
  ]);
  
  const [aiInput, setAiInput] = useState('');

  const breedInfo = getBreedInfo(currentPet.breed, currentPet.species);
  const petAge = Math.floor((new Date().getTime() - new Date(currentPet.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365));

  // Função para atualizar dados do quiz
  const updateQuizData = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  // Função para toggle de arrays (personalidade, objetivos, etc)
  const toggleArrayValue = (field: keyof QuizData, value: string) => {
    setQuizData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  // Função para finalizar quiz
  const completeQuiz = () => {
    // Aqui você salvaria os dados no banco de dados
    console.log('Quiz completo:', quizData);
    
    // Atualizar o pet atual com os dados do quiz
    setCurrentPet({
      id: '1',
      name: quizData.petName,
      species: quizData.petSpecies as 'dog' | 'cat',
      breed: quizData.petBreed,
      birthDate: quizData.petBirthDate,
      weight: parseFloat(quizData.petWeight) || 0,
      size: quizData.petSize as any,
      photo: quizData.petPhoto || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
      behavior: quizData.petPersonality,
      healthNotes: `Atividade favorita: ${quizData.petFavoriteActivity}. ${quizData.petQuirks}`,
      createdAt: new Date().toISOString()
    });
    
    // Atualizar mensagem da IA com informações personalizadas
    setAiMessages([
      {
        role: 'assistant',
        content: `🐾 Olá ${quizData.tutorName}! Sou a assistente virtual do PetCare+. Estou aqui para ajudar com dúvidas sobre saúde, comportamento, nutrição e cuidados do ${quizData.petName}. Como posso ajudar você hoje?`
      }
    ]);
    
    setShowQuiz(false);
  };

  // Renderização do Quiz
  const renderQuiz = () => {
    if (!showQuiz) return null;

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 z-50 overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            
            {/* Welcome */}
            {quizStep === 'welcome' && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full mx-auto flex items-center justify-center">
                  <PawPrint className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800">Bem-vindo ao PetCare+! 🐾</h1>
                <p className="text-lg text-gray-600">
                  Vamos conhecer você e seu melhor amigo! Este cadastro nos ajudará a personalizar a experiência e oferecer as melhores recomendações para o cuidado do seu pet.
                </p>
                <div className="bg-emerald-50 rounded-2xl p-6 text-left space-y-3">
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Calendário de vacinas e medicamentos personalizado</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Plano de treinos baseado nos seus objetivos</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Assistente IA especializada em pets</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Dicas personalizadas para a raça do seu pet</span>
                  </p>
                </div>
                <button
                  onClick={() => setQuizStep('tutor-basic')}
                  className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Começar Cadastro
                  <ArrowRight className="w-6 h-6" />
                </button>
                <p className="text-sm text-gray-500">Leva apenas 3 minutos ⏱️</p>
              </div>
            )}

            {/* Tutor Basic Info */}
            {quizStep === 'tutor-basic' && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Sobre Você</h2>
                    <p className="text-sm text-gray-600">Passo 1 de 6</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Seu Nome Completo</label>
                    <input
                      type="text"
                      value={quizData.tutorName}
                      onChange={(e) => updateQuizData('tutorName', e.target.value)}
                      placeholder="Ex: Maria Silva"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={quizData.tutorEmail}
                      onChange={(e) => updateQuizData('tutorEmail', e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone (opcional)</label>
                    <input
                      type="tel"
                      value={quizData.tutorPhone}
                      onChange={(e) => updateQuizData('tutorPhone', e.target.value)}
                      placeholder="(11) 98765-4321"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setQuizStep('welcome')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </button>
                  <button
                    onClick={() => setQuizStep('pet-basic')}
                    disabled={!quizData.tutorName || !quizData.tutorEmail}
                    className="flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Próximo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Pet Basic Info */}
            {quizStep === 'pet-basic' && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full flex items-center justify-center">
                    <PawPrint className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Sobre Seu Pet</h2>
                    <p className="text-sm text-gray-600">Passo 2 de 6</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Pet</label>
                    <input
                      type="text"
                      value={quizData.petName}
                      onChange={(e) => updateQuizData('petName', e.target.value)}
                      placeholder="Ex: Rex, Luna, Mel..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Espécie</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateQuizData('petSpecies', 'dog')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          quizData.petSpecies === 'dog'
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-4xl mb-2">🐕</div>
                        <div className="font-semibold">Cachorro</div>
                      </button>
                      <button
                        onClick={() => updateQuizData('petSpecies', 'cat')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          quizData.petSpecies === 'cat'
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-4xl mb-2">🐈</div>
                        <div className="font-semibold">Gato</div>
                      </button>
                    </div>
                  </div>

                  {quizData.petSpecies && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Raça</label>
                      <select
                        value={quizData.petBreed}
                        onChange={(e) => updateQuizData('petBreed', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                      >
                        <option value="">Selecione a raça</option>
                        {(quizData.petSpecies === 'dog' ? dogBreeds : catBreeds).map(breed => (
                          <option key={breed.name} value={breed.name}>{breed.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Data de Nascimento</label>
                      <input
                        type="date"
                        value={quizData.petBirthDate}
                        onChange={(e) => updateQuizData('petBirthDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Peso (kg)</label>
                      <input
                        type="number"
                        value={quizData.petWeight}
                        onChange={(e) => updateQuizData('petWeight', e.target.value)}
                        placeholder="Ex: 15"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Porte</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: 'small', label: 'Pequeno', emoji: '🐕' },
                        { value: 'medium', label: 'Médio', emoji: '🐕' },
                        { value: 'large', label: 'Grande', emoji: '🐕' },
                        { value: 'giant', label: 'Gigante', emoji: '🐕' }
                      ].map(size => (
                        <button
                          key={size.value}
                          onClick={() => updateQuizData('petSize', size.value)}
                          className={`p-3 rounded-xl border-2 transition-all text-sm ${
                            quizData.petSize === size.value
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{size.emoji}</div>
                          <div className="font-semibold text-xs">{size.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setQuizStep('tutor-basic')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </button>
                  <button
                    onClick={() => setQuizStep('pet-details')}
                    disabled={!quizData.petName || !quizData.petSpecies || !quizData.petBreed}
                    className="flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Próximo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Pet Details */}
            {quizStep === 'pet-details' && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Personalidade</h2>
                    <p className="text-sm text-gray-600">Passo 3 de 6</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Como você descreveria a personalidade do {quizData.petName}? (Selecione todas que se aplicam)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Amigável', 'Enérgico', 'Calmo', 'Brincalhão', 'Tímido', 'Protetor', 'Independente', 'Carinhoso'].map(trait => (
                        <button
                          key={trait}
                          onClick={() => toggleArrayValue('petPersonality', trait)}
                          className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                            quizData.petPersonality.includes(trait)
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {trait}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Atividade favorita</label>
                    <input
                      type="text"
                      value={quizData.petFavoriteActivity}
                      onChange={(e) => updateQuizData('petFavoriteActivity', e.target.value)}
                      placeholder="Ex: Correr no parque, brincar de bolinha..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Comida favorita</label>
                    <input
                      type="text"
                      value={quizData.petFavoriteFood}
                      onChange={(e) => updateQuizData('petFavoriteFood', e.target.value)}
                      placeholder="Ex: Frango, petiscos de fígado..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alguma curiosidade ou comportamento único?</label>
                    <textarea
                      value={quizData.petQuirks}
                      onChange={(e) => updateQuizData('petQuirks', e.target.value)}
                      placeholder="Ex: Adora dormir de barriga pra cima, late para a TV..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setQuizStep('pet-basic')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </button>
                  <button
                    onClick={() => setQuizStep('relationship')}
                    disabled={quizData.petPersonality.length === 0}
                    className="flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Próximo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Relationship */}
            {quizStep === 'relationship' && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Sua Relação</h2>
                    <p className="text-sm text-gray-600">Passo 4 de 6</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Há quanto tempo vocês estão juntos?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'new', label: 'Menos de 1 mês' },
                        { value: 'recent', label: '1-6 meses' },
                        { value: 'established', label: '6 meses - 2 anos' },
                        { value: 'longtime', label: 'Mais de 2 anos' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => updateQuizData('relationshipTime', option.value)}
                          className={`p-4 rounded-xl border-2 transition-all text-sm ${
                            quizData.relationshipTime === option.value
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Como você descreveria sua relação atual?</label>
                    <div className="space-y-2">
                      {[
                        { value: 'excellent', label: 'Excelente - Muito próximos e conectados', emoji: '😍' },
                        { value: 'good', label: 'Boa - Nos damos bem, mas pode melhorar', emoji: '😊' },
                        { value: 'developing', label: 'Em desenvolvimento - Ainda nos conhecendo', emoji: '🙂' },
                        { value: 'challenging', label: 'Desafiadora - Enfrentamos algumas dificuldades', emoji: '😕' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => updateQuizData('relationshipQuality', option.value)}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            quizData.relationshipQuality === option.value
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.emoji}</span>
                            <span className="font-medium text-sm">{option.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setQuizStep('pet-details')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </button>
                  <button
                    onClick={() => setQuizStep('goals')}
                    disabled={!quizData.relationshipTime || !quizData.relationshipQuality}
                    className="flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Próximo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Goals */}
            {quizStep === 'goals' && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Seus Objetivos</h2>
                    <p className="text-sm text-gray-600">Passo 5 de 6</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Quais são seus principais objetivos com o {quizData.petName}? (Selecione todas que se aplicam)</label>
                    <div className="space-y-2">
                      {[
                        { value: 'bond', label: 'Fortalecer nosso vínculo e conexão', icon: Heart },
                        { value: 'health', label: 'Manter a saúde em dia', icon: Activity },
                        { value: 'behavior', label: 'Melhorar comportamento geral', icon: CheckCircle2 },
                        { value: 'training', label: 'Ensinar comandos e truques', icon: Sparkles },
                        { value: 'exercise', label: 'Estabelecer rotina de exercícios', icon: Dumbbell },
                        { value: 'socialization', label: 'Socializar com outros pets/pessoas', icon: User }
                      ].map(goal => {
                        const Icon = goal.icon;
                        return (
                          <button
                            key={goal.value}
                            onClick={() => toggleArrayValue('mainGoals', goal.value)}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              quizData.mainGoals.includes(goal.value)
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-5 h-5 ${quizData.mainGoals.includes(goal.value) ? 'text-emerald-600' : 'text-gray-400'}`} />
                              <span className="font-medium text-sm">{goal.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Desafios específicos que você enfrenta? (Opcional)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Xixi no lugar errado',
                        'Puxar na guia',
                        'Latir excessivo',
                        'Ansiedade de separação',
                        'Agressividade',
                        'Medo/timidez',
                        'Destruir objetos',
                        'Não obedece comandos'
                      ].map(challenge => (
                        <button
                          key={challenge}
                          onClick={() => toggleArrayValue('specificChallenges', challenge)}
                          className={`p-3 rounded-xl border-2 transition-all text-xs font-medium ${
                            quizData.specificChallenges.includes(challenge)
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {challenge}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Que tipo de treino te interessa?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Comandos básicos',
                        'Truques divertidos',
                        'Obediência avançada',
                        'Agilidade',
                        'Comportamento social',
                        'Terapia/suporte emocional'
                      ].map(training => (
                        <button
                          key={training}
                          onClick={() => toggleArrayValue('trainingInterest', training)}
                          className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                            quizData.trainingInterest.includes(training)
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {training}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setQuizStep('relationship')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </button>
                  <button
                    onClick={() => setQuizStep('complete')}
                    disabled={quizData.mainGoals.length === 0}
                    className="flex-1 bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Próximo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Complete */}
            {quizStep === 'complete' && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full mx-auto flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800">Tudo Pronto! 🎉</h1>
                <p className="text-lg text-gray-600">
                  Obrigado por compartilhar essas informações, {quizData.tutorName}! Agora vamos personalizar sua experiência com o {quizData.petName}.
                </p>
                
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-left space-y-3">
                  <h3 className="font-bold text-gray-800 mb-3">O que preparamos para você:</h3>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Calendário de vacinas personalizado para {quizData.petBreed}</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Plano de treinos focado em: {quizData.mainGoals.slice(0, 2).join(', ')}</span>
                  </p>
                  {quizData.specificChallenges.length > 0 && (
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>Dicas para lidar com: {quizData.specificChallenges[0]}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-700 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Assistente IA pronta para ajudar 24/7</span>
                  </p>
                </div>

                <button
                  onClick={completeQuiz}
                  className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Começar a Usar o PetCare+
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  // Função para enviar mensagem para IA
  const sendAiMessage = () => {
    if (!aiInput.trim()) return;
    
    const userMessage = aiInput;
    setAiMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setAiInput('');

    // Simulação de resposta da IA (em produção, seria uma chamada real à API)
    setTimeout(() => {
      let response = '';
      
      if (userMessage.toLowerCase().includes('vacina')) {
        response = `Com base no perfil do ${currentPet.name}, um ${currentPet.breed} de ${petAge} anos, as vacinas essenciais são: V10 (anual), Antirrábica (anual) e Gripe Canina (opcional). A próxima vacina está agendada para ${vaccines[0]?.nextDate || 'não agendada'}. Recomendo manter o calendário em dia!`;
      } else if (userMessage.toLowerCase().includes('alimentação') || userMessage.toLowerCase().includes('comida')) {
        response = `Para um ${currentPet.breed} adulto de ${currentPet.weight}kg, recomendo:\n\n🍖 Ração premium para raças grandes\n📊 Porção: aproximadamente ${Math.round(currentPet.weight * 20)}g por dia (dividido em 2 refeições)\n⏰ Horários fixos: 8h e 18h\n💧 Água fresca sempre disponível\n\nEvite: chocolate, uvas, cebola, alho e alimentos muito gordurosos.`;
      } else if (userMessage.toLowerCase().includes('comportamento') || userMessage.toLowerCase().includes('treino')) {
        response = `O ${currentPet.name} é um ${currentPet.breed}, raça conhecida por ser ${breedInfo?.temperament.join(', ').toLowerCase()}. Para treinos, recomendo:\n\n✅ Sessões curtas de 10-15 minutos\n✅ Reforço positivo com petiscos\n✅ Exercícios diários de 60-90 minutos\n✅ Comandos básicos: senta, fica, vem\n\nConfira a aba "Treinos" para exercícios específicos!`;
      } else if (userMessage.toLowerCase().includes('saúde') || userMessage.toLowerCase().includes('doente')) {
        response = `⚠️ Atenção: Não substituo um veterinário! Se o ${currentPet.name} apresenta sintomas preocupantes, consulte um profissional.\n\nPara ${currentPet.breed}s, fique atento a:\n${breedInfo?.commonHealthIssues.map(issue => `• ${issue}`).join('\n')}\n\nMantenha consultas veterinárias regulares (a cada 6-12 meses).`;
      } else {
        response = `Entendi sua dúvida sobre "${userMessage}". Como assistente especializada em pets, posso ajudar com:\n\n🏥 Saúde e vacinas\n🍖 Alimentação e nutrição\n🎾 Exercícios e comportamento\n💊 Medicamentos e cuidados\n📅 Rotinas e calendários\n\nPergunta algo específico e terei prazer em ajudar o ${currentPet.name}!`;
      }

      setAiMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {renderQuiz()}
      
      {!showQuiz && (
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">Bem-vindo ao PetCare+</h1>
          <p className="text-gray-600 mt-2">Cuidando do {currentPet.name} com carinho! 🐾</p>
        </div>
      )}
    </div>
  );
}
