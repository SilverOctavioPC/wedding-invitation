import React from 'react';
import { WeddingProvider } from './context/WeddingContext';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection';
import Countdown from './components/Countdown';
import StorySection from './components/StorySection';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPForm';
import Gallery from './components/Gallery';
import GiftSection from './components/GiftSection';
import FinalMessage from './components/FinalMessage';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <WeddingProvider>
      <main className="w-full min-h-screen relative font-sans text-wedding-charcoal selection:bg-wedding-gold selection:text-white">
        <WelcomeScreen />
        <MusicPlayer />
        
        {/* Main Content */}
        <HeroSection />
        <Countdown />
        <StorySection />
        <EventDetails />
        <Gallery />
        <GiftSection />
        <RSVPForm />
        <FinalMessage />
      </main>
    </WeddingProvider>
  );
}

export default App;
