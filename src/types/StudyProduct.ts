export interface StudyProduct {
  id: string;
  title: string;
  description: string;
  category: 'Primario' | 'Secundario' | 'Universitario' | 'Curso';
  year: number;
  price: number;
  discountedPrice?: number;
  rating: number; // 0 a 5
  image: string;
  inCart: boolean;
}
