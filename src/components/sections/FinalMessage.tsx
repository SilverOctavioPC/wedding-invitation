import React from 'react';
import { motion } from 'framer-motion';
import { COUPLE_NAMES } from '@/constants';

const FinalMessage: React.FC = () => {
  return (
    <footer className="relative h-[80vh] flex flex-col items-center justify-center text-white overflow-hidden text-center bg-wedding-charcoal">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=1920&auto=format&fit=crop" 
            alt="Wedding Celebration Sparklers" 
            className="w-full h-full object-cover" 
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div 
        className="relative z-10 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="font-serif italic text-xl md:text-3xl mb-8 text-wedding-beige/90 leading-relaxed">
          "El amor no hace girar al mundo. <br className="hidden md:block" /> El amor es lo que hace que el viaje valga la pena."
        </p>
        
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-wedding-gold mb-8">
          ¡Los esperamos!
        </h2>

        <div className="h-px w-32 bg-wedding-gold mx-auto mb-8"></div>

        <div className="font-display text-xl md:text-3xl tracking-[0.2em] uppercase">
          {COUPLE_NAMES.bride} & {COUPLE_NAMES.groom}
        </div>
      </motion.div>

      <div className="absolute bottom-6 w-full text-center text-white/40 text-xs font-sans z-10">
        Hecho con ❤️ para nuestra boda
      </div>
    </footer>
  );
};

export default FinalMessage;
