import markup from './markup/quiz.html?raw';
import { LegacyMarkup } from '../components/LegacyMarkup';

export function QuizPage() {
  return <LegacyMarkup html={markup} />;
}
