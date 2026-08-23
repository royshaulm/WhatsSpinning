import markup from './markup/quickadd.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function QuickaddPage() {
  return <LegacyMarkup html={markup} />;
}
