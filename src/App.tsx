import React from 'react';
import { WeddingProvider } from '@/context';
import { ErrorBoundary, LoadingSpinner, MusicPlayer, SectionDivider } from '@/components/ui';

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

            {/* Hero → Countdown: dark to beige */}
            <SectionDivider variant="elegant" fillTop="#36454F" fillBottom="#F5F5F0" />

            <Countdown />

            {/* Countdown → Story: beige to white */}
            <SectionDivider variant="wave" fillTop="#F5F5F0" fillBottom="#FFFFFF" />

            <StorySection />

            {/* Story → EventDetails: white to beige */}
            <SectionDivider variant="curve" fillTop="#FFFFFF" fillBottom="#F5F5F0" />

            <EventDetails />

            {/* EventDetails → Gallery: beige to white */}
            <SectionDivider variant="wave" fillTop="#F5F5F0" fillBottom="#FFFFFF" />

            <Gallery />

            {/* Gallery → GiftSection: white to beige */}
            <SectionDivider variant="elegant" fillTop="#FFFFFF" fillBottom="#F5F5F0" />

            <GiftSection />

            {/* GiftSection → RSVP: beige to white */}
            <SectionDivider variant="curve" fillTop="#F5F5F0" fillBottom="#FFFFFF" />

            <RSVPForm />

            {/* RSVP → FinalMessage: white to dark */}
            <SectionDivider variant="elegant" fillTop="#FFFFFF" fillBottom="#36454F" />

            <FinalMessage />
          </React.Suspense>
        </main>
      </WeddingProvider>
    </ErrorBoundary>
  );
}

export default App;
