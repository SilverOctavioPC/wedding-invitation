import React, { useRef, useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Music, Pause } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const { isMusicPlaying, toggleMusic, isEntered } = useWedding();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch((e) => {
            console.warn("Autoplay blocked by browser interaction policy", e);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  if (!isEntered) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-11054.mp3" type="audio/mpeg" />
      </audio>
      <button 
        onClick={toggleMusic}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-wedding-gold text-wedding-olive shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
      >
        {isMusicPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
