import { AppBackground } from './components/AppBackground';
import { AppHeader } from './components/AppHeader';
import { AppModals } from './components/AppModals';
import { useLegacyRuntime } from './hooks/useLegacyRuntime';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { RecentPage } from './pages/RecentPage';
import { SocialPage } from './pages/SocialPage';
import { ListeningPage } from './pages/ListeningPage';
import { HistoryPage } from './pages/HistoryPage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { BrowsePage } from './pages/BrowsePage';
import { DetailPage } from './pages/DetailPage';
import { QuickaddPage } from './pages/QuickaddPage';
import { WishlistPage } from './pages/WishlistPage';
import { IncomingPage } from './pages/IncomingPage';
import { PrizesPage } from './pages/PrizesPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const { error } = useLegacyRuntime();
  return (
    <>
      <AppBackground />
      <div id="app">
        <AppHeader />
        <OnboardingPage />
      <HomePage />
      <RecentPage />
      <SocialPage />
      <ListeningPage />
      <HistoryPage />
      <QuizPage />
      <ResultPage />
      <BrowsePage />
      <DetailPage />
      <QuickaddPage />
      <WishlistPage />
      <IncomingPage />
      <PrizesPage />
      <SettingsPage />
        <AppModals />
      </div>
      {error && <div className="legacy-runtime-error" role="alert">Runtime error: {error.message}</div>}
    </>
  );
}
