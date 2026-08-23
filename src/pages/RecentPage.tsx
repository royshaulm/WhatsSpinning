import markup from './markup/recent.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function RecentPage() {
  return <LegacyMarkup html={markup} />;
}
