import markup from './markup/settings.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function SettingsPage() {
  return <LegacyMarkup html={markup} />;
}
