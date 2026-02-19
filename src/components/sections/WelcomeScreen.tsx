import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWedding } from '@/context';
import { COUPLE_NAMES } from '@/constants';
import GoldenParticles from '@/components/ui/GoldenParticles';
import { CornerOrnament, DividerOrnament } from '@/components/ui/WeddingOrnaments';

const WelcomeScreen: React.FC = () => {
  const { isEntered, enterSite } = useWedding();

  return (
    <AnimatePresence>
      {!isEntered && (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            onTouchMove={(e) => e.preventDefault()}
        >
          {/* Textured Paper Background */}
          <div className="absolute inset-0 bg-wedding-beige">
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-wedding-gold/10" />
          </div>

          {/* Golden Floating Particles - Reduced density for elegance */}
          <div className="absolute inset-0 opacity-60">
             <GoldenParticles />
          </div>

          {/* Frame & Ornaments */}
          <div className="absolute inset-0 p-6 md:p-12 pointer-events-none">
            <div className="w-full h-full border border-wedding-gold/20 relative">
               <div className="absolute inset-[4px] border border-wedding-gold/10"></div>
               
               {/* Animated Corners */}
               <div className="absolute top-0 left-0"><CornerOrnament /></div>
               <div className="absolute top-0 right-0 rotate-90"><CornerOrnament /></div>
               <div className="absolute bottom-0 left-0 -rotate-90"><CornerOrnament /></div>
               <div className="absolute bottom-0 right-0 rotate-180"><CornerOrnament /></div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            className="text-center px-6 relative z-10 flex flex-col items-center"
          >
            <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-wedding-olive/80 mb-6 md:mb-8 font-medium">
              Estás invitado a nuestra boda
            </p>

            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-wedding-gold via-yellow-600 to-wedding-gold mb-8 leading-tight drop-shadow-sm">
              {COUPLE_NAMES.bride}
              <span className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-wedding-olive mx-4 align-middle font-light">&</span>
              {COUPLE_NAMES.groom}
            </h1>

            {/* Central Ornament */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mb-8"
            >
              <DividerOrnament className="text-wedding-gold/40 w-48 md:w-64" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-serif italic text-lg md:text-xl text-wedding-charcoal/70 mb-12 tracking-wide"
            >
              30 de Julio, 2026
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={enterSite}
              className="group relative px-12 py-4 bg-transparent overflow-hidden rounded-sm transition-all duration-300"
            >
              {/* Button Background & Border */}
               <div className="absolute inset-0 border border-wedding-olive/30 group-hover:border-wedding-olive/60 transition-colors duration-500"></div>
               <div className="absolute inset-0 bg-wedding-olive/5 group-hover:bg-wedding-olive/10 transition-colors duration-500"></div>
               
               {/* Pulsing Glow */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl bg-wedding-gold/20"></div>

              <span className="relative z-10 font-sans text-xs tracking-[0.3em] uppercase text-wedding-olive font-semibold group-hover:text-wedding-charcoal transition-colors duration-300">
                Abrir Invitación
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
