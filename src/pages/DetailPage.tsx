import markup from './markup/detail.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function DetailPage() {
  return <LegacyMarkup html={markup} />;
}
