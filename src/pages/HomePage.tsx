import markup from './markup/home.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function HomePage() {
  return <LegacyMarkup html={markup} />;
}
