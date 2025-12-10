export type Category = 'hoodies' | 'tees' | 'pants' | 'sets';
export type Tag = 'oversized' | 'unisex' | 'minimal' | 'graphic' | 'summer' | 'winter';

export interface Variant {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: Category;
  tags: Tag[];
  hasVariants: boolean;
  sizes: Variant[];
  colors: Variant[];
  image: string;
  shortDescription: string;
  longDescription: string;
  onFlashSale?: boolean;
  flashSalePrice?: number;
  reviewsCount?: number;
  rating?: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'midnight-script-hoodie',
    name: 'Midnight Script Hoodie',
    price: 59,
    category: 'hoodies',
    tags: ['oversized', 'unisex', 'winter'],
    hasVariants: true,
    sizes: [
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
      { label: 'XL', value: 'xl' },
    ],
    colors: [
      { label: 'Black', value: 'black' },
      { label: 'Forest', value: 'forest' },
    ],
    image: 'https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription:
      'Heavyweight hoodie with front script print, soft fleece inside, and an oversized street-ready fit.',
    longDescription:
      'This hoodie is built for late nights, cold cities, and everyday wear. The fabric is a heavyweight cotton blend with a soft brushed interior, so it feels premium without being too bulky. The front script graphic is subtle enough for daily use, but still stands out in photos. Drop shoulders and an oversized cut give you the modern streetwear silhouette, while the double-stitched hems are made to last season after season.',
    onFlashSale: true,
    flashSalePrice: 49,
  },
  {
    id: 2,
    slug: 'signal-cargo-pants',
    name: 'Signal Cargo Pants',
    price: 52,
    category: 'pants',
    tags: ['unisex', 'minimal', 'winter'],
    hasVariants: true,
    sizes: [
      { label: '30', value: '30' },
      { label: '32', value: '32' },
      { label: '34', value: '34' },
    ],
    colors: [
      { label: 'Olive', value: 'olive' },
      { label: 'Sand', value: 'sand' },
    ],
    image: 'https://images.pexels.com/photos/6311659/pexels-photo-6311659.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription:
      'Relaxed-fit cargo pants with utility pockets and drawstring ankles — made for movement.',
    longDescription:
      'Signal Cargo Pants are designed to move from daytime errands to late-night sessions without changing your fit. The relaxed leg and adjustable drawstring ankles let you style them straight or stacked over your sneakers. Multiple utility pockets hold your phone, wallet, and keys with room to spare. The mid-weight fabric works across seasons, especially layered with hoodies or oversized tees.',
    onFlashSale: true,
    flashSalePrice: 42,
  },
  {
    id: 3,
    slug: 'radio-wave-tee',
    name: 'Radio Wave Tee',
    price: 34,
    category: 'tees',
    tags: ['graphic', 'summer', 'unisex'],
    hasVariants: true,
    sizes: [
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
      { label: 'XL', value: 'xl' },
    ],
    colors: [
      { label: 'White', value: 'white' },
      { label: 'Ink', value: 'ink' },
    ],
    image: 'https://images.pexels.com/photos/7671260/pexels-photo-7671260.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription:
      'Soft cotton tee with a clean front and bold back print inspired by radio waves and city lights.',
    longDescription:
      'The Radio Wave Tee keeps the front minimal and hides the loud energy on the back. Printed with a high‑resolution graphic inspired by late‑night radio frequencies, this tee is built from soft, breathable cotton that works in hot weather and under layers. The cut is slightly boxy with a relaxed fit that pairs with cargos, denim, or shorts.',
  },
  {
    id: 4,
    slug: 'two-piece-street-set',
    name: 'Two-Piece Street Set',
    price: 88,
    category: 'sets',
    tags: ['oversized', 'summer'],
    hasVariants: true,
    sizes: [
      { label: 'S', value: 's' },
      { label: 'M', value: 'm' },
      { label: 'L', value: 'l' },
    ],
    colors: [
      { label: 'Stone', value: 'stone' },
      { label: 'Charcoal', value: 'charcoal' },
    ],
    image: 'https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg?auto=compress&cs=tinysrgb&w=800',
    shortDescription:
      'Matching top and bottom set with relaxed cuts — easy to wear, easy to style, perfect for full-fit days.',
    longDescription:
      'This two‑piece set is your shortcut to looking put‑together with zero effort. The top and bottoms share the same fabric and color story, so you can throw them on and step out instantly styled. The relaxed fit keeps it breathable in warmer weather, while the minimalist details let you layer jewelry, caps, and sneakers to match your mood.',
    onFlashSale: false,
  },
];

export function findProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}