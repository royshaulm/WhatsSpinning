import markup from './markup/prizes.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function PrizesPage() {
  return <LegacyMarkup html={markup} />;
}
