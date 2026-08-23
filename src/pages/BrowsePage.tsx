import markup from './markup/browse.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function BrowsePage() {
  return <LegacyMarkup html={markup} />;
}
