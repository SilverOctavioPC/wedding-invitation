import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWedding } from '@/context';
import { COUPLE_NAMES } from '@/constants';
import GoldenParticles from '@/components/ui/GoldenParticles';

const WelcomeScreen: React.FC = () => {
  const { isEntered, enterSite } = useWedding();

  return (
    <AnimatePresence>
      {!isEntered && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wedding-sand text-wedding-charcoal overflow-hidden"
        >
          {/* Golden Floating Particles */}
          <GoldenParticles />

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner ornaments */}
            <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-wedding-gold/20 rounded-tl-sm" />
            <div className="absolute top-8 right-8 w-32 h-32 border-r-2 border-t-2 border-wedding-gold/20 rounded-tr-sm" />
            <div className="absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-wedding-gold/20 rounded-bl-sm" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-wedding-gold/20 rounded-br-sm" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center px-6 relative z-10"
          >
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '4rem' }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-px bg-wedding-gold mx-auto mb-8"
            />

            <p className="font-serif italic text-lg md:text-xl text-wedding-olive mb-4 tracking-widest uppercase">
              Estás invitado a nuestra boda
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-wedding-charcoal mb-4 leading-tight">
              {COUPLE_NAMES.bride}
              <span className="text-wedding-gold text-3xl md:text-4xl align-middle mx-3 font-serif italic">&</span>
              {COUPLE_NAMES.groom}
            </h1>

            {/* Date teaser */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-wedding-charcoal/50 mb-10"
            >
              30 de Julio, 2026
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '4rem' }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-px bg-wedding-gold mx-auto mb-10"
            />

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={enterSite}
              className="px-10 py-4 bg-wedding-olive text-white font-sans text-xs tracking-[0.3em] uppercase rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-wedding-olive hover:bg-wedding-olive/90"
            >
              Abrir Invitación
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
