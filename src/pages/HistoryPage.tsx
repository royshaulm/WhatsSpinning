import markup from './markup/history.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function HistoryPage() {
  return <LegacyMarkup html={markup} />;
}
