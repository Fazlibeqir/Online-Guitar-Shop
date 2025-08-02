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