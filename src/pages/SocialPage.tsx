import markup from './markup/social.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function SocialPage() {
  return <LegacyMarkup html={markup} />;
}
