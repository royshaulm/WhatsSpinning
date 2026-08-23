import markup from './markup/result.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function ResultPage() {
  return <LegacyMarkup html={markup} />;
}
