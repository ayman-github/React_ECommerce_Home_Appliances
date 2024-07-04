import { ProductType } from '../types/Product.type';
import { UserType } from '../types/User.type';
import bcrypt from 'bcryptjs';

export const sampleProducts: ProductType[] = [
  {
    name: 'tv 01',
    slug: 'tv',
    image: 'no-img',
    category: 'tvs',
    brand: 'string',
    price: 150,
    currency: '$',
    stockCount: 14,
    descriptions: 'tv new QLind',
    rating: 4,
    reviews: 6,
  },
  {
    name: 'tv 02',
    slug: 'tv',
    image: 'no-img',
    category: 'tvs',
    brand: 'string',
    price: 490,
    currency: '$',
    stockCount: 10,
    descriptions: 'tv new QLind',
    rating: 3,
    reviews: 12,
  },
];

export const sampleUsers: UserType[] = [
  {
    fullName: 'admin',
    email: 'admin@homeapp.go',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: true,
  },
  {
    fullName: 'user1',
    email: 'user1@homeapp.go',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: false,
  },
];
