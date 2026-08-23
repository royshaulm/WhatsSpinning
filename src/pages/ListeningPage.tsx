import markup from './markup/listening.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function ListeningPage() {
  return <LegacyMarkup html={markup} className="listening-page-fragment" />;
}
