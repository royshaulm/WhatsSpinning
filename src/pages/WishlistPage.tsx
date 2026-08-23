import markup from './markup/wishlist.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function WishlistPage() {
  return <LegacyMarkup html={markup} />;
}
