import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { COUPLE_NAMES } from '@/constants';
import { DividerOrnament } from '@/components/ui/WeddingOrnaments';

const FinalMessage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <footer ref={sectionRef} className="relative h-[70vh] md:h-[80vh] flex flex-col items-center justify-center text-white overflow-hidden text-center bg-wedding-charcoal">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img 
          src="https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=1920&auto=format&fit=crop" 
          alt="Wedding Celebration Sparklers" 
          className="w-full h-[120%] object-cover" 
          loading="lazy"
        />
        {/* Gradient overlay - matching image height to ensure full coverage during parallax */}
        <div className="absolute top-0 left-0 w-full h-[120%] bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
      </motion.div>



      <motion.div 
        className="relative z-10 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="font-serif italic text-lg sm:text-xl md:text-3xl mb-6 md:mb-8 text-wedding-beige/90 leading-relaxed"
        >
          "El amor no hace girar al mundo. <br className="hidden md:block" /> El amor es lo que hace que el viaje valga la pena."
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 flex justify-center"
        >
          <DividerOrnament className="text-wedding-gold/80 w-48 md:w-64 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-wedding-gold mb-6 md:mb-8 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        >
          ¡Los esperamos!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="font-display text-xl md:text-3xl tracking-[0.2em] uppercase"
        >
          {COUPLE_NAMES.bride} & {COUPLE_NAMES.groom}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 w-full text-center text-white/90 text-sm font-sans z-10 tracking-widest font-medium drop-shadow-md">
        Hecho con ❤️ para nuestra boda
      </div>
    </footer>
  );
};

export default FinalMessage;
