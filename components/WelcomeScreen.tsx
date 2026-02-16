import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWedding } from '../context/WeddingContext';
import { COUPLE_NAMES } from '../constants';

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
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 left-0 w-64 h-64 border-r border-b border-wedding-gold rounded-br-full transform -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 border-l border-t border-wedding-gold rounded-tl-full transform translate-x-1/2 translate-y-1/2"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center px-6 relative z-10"
          >
            <p className="font-serif italic text-lg md:text-xl text-wedding-olive mb-6 tracking-widest uppercase">
              Estás invitado a nuestra boda
            </p>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-wedding-charcoal mb-8 leading-tight">
              {COUPLE_NAMES.bride} <span className="text-wedding-gold text-4xl align-middle">&</span> {COUPLE_NAMES.groom}
            </h1>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(85, 107, 47, 0.9)" }}
              whileTap={{ scale: 0.95 }}
              onClick={enterSite}
              className="px-8 py-3 bg-wedding-olive text-white font-sans text-sm tracking-[0.2em] uppercase rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
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
