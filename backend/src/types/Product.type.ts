export type ProductType = {
  _id?: string | unknown;
  name: string;
  slug: string;
  image: string;
  category: string;
  brand: string;
  price: number;
  currency: string;
  stockCount: number;
  descriptions: string;
  rating: number;
  reviews: number;
};
