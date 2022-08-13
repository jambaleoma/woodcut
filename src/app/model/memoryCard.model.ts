export interface MemoryCard {
  name?: string;
  image?: string;
  state?: 'default' | 'flipped' | 'matched';
  cardNumber?: number;
  flippable?: boolean;
}
