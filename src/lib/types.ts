// Tipos do PetCare+

export type PetSpecies = 'dog' | 'cat';
export type PetSize = 'small' | 'medium' | 'large' | 'giant';
export type TrainingLevel = 'basic' | 'intermediate' | 'advanced';
export type MedicationFrequency = 'daily' | 'weekly' | 'monthly' | 'as-needed';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  birthDate: string;
  weight: number;
  size: PetSize;
  photo?: string;
  behavior: string[];
  healthNotes: string;
  createdAt: string;
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: Pet[];
}

export interface Vaccine {
  id: string;
  petId: string;
  name: string;
  date: string;
  nextDate?: string;
  veterinarian?: string;
  notes?: string;
  documentUrl?: string;
}

export interface Medication {
  id: string;
  petId: string;
  name: string;
  dosage: string;
  frequency: MedicationFrequency;
  startDate: string;
  endDate?: string;
  times: string[];
  notes?: string;
  photoUrl?: string;
  active: boolean;
}

export interface TrainingExercise {
  id: string;
  title: string;
  level: TrainingLevel;
  duration: number;
  description: string;
  steps: string[];
  videoUrl?: string;
  category: string;
}

export interface CalendarEvent {
  id: string;
  petId: string;
  type: 'vaccine' | 'medication' | 'grooming' | 'vet' | 'training' | 'other';
  title: string;
  date: string;
  time?: string;
  notes?: string;
  completed: boolean;
}

export interface BreedInfo {
  name: string;
  species: PetSpecies;
  size: PetSize;
  lifeExpectancy: string;
  commonHealthIssues: string[];
  groomingNeeds: string[];
  exerciseNeeds: string;
  temperament: string[];
  dietRecommendations: string[];
}
