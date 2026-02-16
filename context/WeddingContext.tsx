import React, { createContext, useContext, useState, ReactNode, PropsWithChildren } from 'react';

interface WeddingContextType {
  isEntered: boolean;
  enterSite: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isEntered, setIsEntered] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const enterSite = () => {
    setIsEntered(true);
    setIsMusicPlaying(true); // Auto-play music on entry (if browser allows)
  };

  const toggleMusic = () => {
    setIsMusicPlaying(prev => !prev);
  };

  return (
    <WeddingContext.Provider value={{ isEntered, enterSite, isMusicPlaying, toggleMusic }}>
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