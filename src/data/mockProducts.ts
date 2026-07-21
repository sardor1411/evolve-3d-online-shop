export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  hoverImage?: string;
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Aero Jacket',
    category: 'Apparel',
    price: 320,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
  },
  {
    id: 'p2',
    name: 'Ghost Sneaker',
    category: 'Footwear',
    price: 180,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&q=80',
  },
  {
    id: 'p3',
    name: 'Obsidian Tote',
    category: 'Accessories',
    price: 210,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
  },
  {
    id: 'p4',
    name: 'Monolith Hoodie',
    category: 'Apparel',
    price: 145,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  },
  {
    id: 'p5',
    name: 'Void Pants',
    category: 'Apparel',
    price: 165,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
  },
  {
    id: 'p6',
    name: 'Eclipse Shades',
    category: 'Accessories',
    price: 95,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
  },
];
