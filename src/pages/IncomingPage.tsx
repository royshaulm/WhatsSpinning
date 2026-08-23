import markup from './markup/incoming.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function IncomingPage() {
  return <LegacyMarkup html={markup} />;
}
