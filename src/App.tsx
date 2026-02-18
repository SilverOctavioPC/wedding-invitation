import React from 'react';
import { WeddingProvider } from '@/context';
import { ErrorBoundary, LoadingSpinner, MusicPlayer } from '@/components/ui';

// Lazy load section components for code splitting
const WelcomeScreen = React.lazy(() => import('@/components/sections/WelcomeScreen'));
const HeroSection = React.lazy(() => import('@/components/sections/HeroSection'));
const Countdown = React.lazy(() => import('@/components/sections/Countdown'));
const StorySection = React.lazy(() => import('@/components/sections/StorySection'));
const EventDetails = React.lazy(() => import('@/components/sections/EventDetails'));
const RSVPForm = React.lazy(() => import('@/components/sections/RSVPForm'));
const Gallery = React.lazy(() => import('@/components/sections/Gallery'));
const GiftSection = React.lazy(() => import('@/components/sections/GiftSection'));
const FinalMessage = React.lazy(() => import('@/components/sections/FinalMessage'));

function App() {
  return (
    <ErrorBoundary>
      <WeddingProvider>
        <main className="w-full min-h-screen relative font-sans text-wedding-charcoal selection:bg-wedding-gold selection:text-white">
          <React.Suspense fallback={<LoadingSpinner />}>
            <WelcomeScreen />
          </React.Suspense>
          <MusicPlayer />

          {/* Main Content */}
          <React.Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
            <HeroSection />
            <Countdown />
            <StorySection />
            <EventDetails />
            <Gallery />
            <GiftSection />
            <RSVPForm />
            <FinalMessage />
          </React.Suspense>
        </main>
      </WeddingProvider>
    </ErrorBoundary>
  );
}

export default App;
