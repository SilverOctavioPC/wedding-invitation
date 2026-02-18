import React, { createContext, useContext, useState, useEffect, useRef, PropsWithChildren } from 'react';

interface WeddingContextType {
  isEntered: boolean;
  enterSite: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider = ({ children }: PropsWithChildren) => {
  const [isEntered, setIsEntered] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lock body scroll while WelcomeScreen is visible
  useEffect(() => {
    if (!isEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEntered]);

  const enterSite = () => {
    setIsEntered(true);
    setIsMusicPlaying(true);

    // Play audio directly in the click handler call stack (required for mobile)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay still blocked on some browsers — user can toggle manually
      });
    }
  };

  const toggleMusic = () => {
    setIsMusicPlaying(prev => !prev);
  };

  return (
    <WeddingContext.Provider value={{ isEntered, enterSite, isMusicPlaying, toggleMusic, audioRef }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};