import React from 'react';
import { motion } from 'framer-motion';
import { COUPLE_NAMES, WEDDING_DATE } from '@/constants';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const date = new Date(WEDDING_DATE);
  const formattedDate = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-wedding-charcoal">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920&auto=format&fit=crop" 
          alt="Couple Kissing Background" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <p className="font-serif italic text-xl md:text-2xl mb-4 tracking-widest text-wedding-beige/90">
            Nos Casamos
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-6 tracking-wide">
            {COUPLE_NAMES.bride} <br className="md:hidden"/>
            <span className="text-3xl md:text-5xl font-serif italic text-wedding-gold align-middle mx-2">&</span>
            <br className="md:hidden"/> {COUPLE_NAMES.groom}
          </h1>
          
          <div className="h-px w-24 bg-wedding-gold mx-auto mb-6"></div>
          
          <p className="font-sans text-lg md:text-xl tracking-[0.3em] uppercase">
            {formattedDate}
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
