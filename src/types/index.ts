export interface Brand {
  id: string;
  name: string;
  origin: string;
  image: string;
  categories: string[];
}

export interface GuitarModel {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  price: number;
  specs: Specifications;
  musicians: Musician[];
}

export interface Specifications {
  bodyWood: string;
  neckWood: string;
  fingerboardWood: string;
  pickups: string;
  tuners: string;
  scaleLength: string;
  bridge: string;
}

export interface Musician {
  name: string;
  musicianImage: string;
  bands: string[];
}

export interface GuitarDetails {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  price: number;
  specs: Specifications;
  musicians: Musician[];
}

export type Language = 'en' | 'mk' | 'sq';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export interface SortBy {
  field: 'name' | 'type' | 'price';
  order: 'ASC' | 'DESC';
} 