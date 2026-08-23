import markup from './markup/onboarding.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function OnboardingPage() {
  return <LegacyMarkup html={markup} />;
}
