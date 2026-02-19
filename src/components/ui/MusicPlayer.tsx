import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useWedding } from '@/context';

import weddingSong from '@/assets/music/wedding-song.mp3';

const MusicPlayer: React.FC = () => {
  const { isEntered, isMusicPlaying, toggleMusic, audioRef } = useWedding();

  // Sync play/pause state with audio element (for toggle button)
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked — user can toggle manually
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying, audioRef]);

  return (
    <>
      {/* Audio element is always in the DOM so audioRef is available for enterSite() */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
      >
        <source src={weddingSong} type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {isEntered && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 1.5 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              onClick={toggleMusic}
              whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.9 }}
              className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors duration-300 backdrop-blur-sm ${
                isMusicPlaying
                  ? 'bg-wedding-olive/90 text-white'
                  : 'bg-white/90 text-wedding-charcoal border border-wedding-sand'
              }`}
              aria-label={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              {isMusicPlaying ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Volume2 size={20} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <VolumeX size={20} strokeWidth={1.5} />
                </motion.div>
              )}
            </motion.button>

            {/* Pulse ring animation when playing */}
            {isMusicPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-wedding-olive/40 pointer-events-none"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
