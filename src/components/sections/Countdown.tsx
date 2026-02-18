import React from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING_DATE } from '@/constants';
import { motion } from 'framer-motion';

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center mx-2 md:mx-6">
    <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center border border-wedding-olive/30 bg-white shadow-sm rounded-sm mb-2">
      <span className="font-display text-2xl md:text-4xl text-wedding-charcoal">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="font-serif italic text-xs md:text-sm text-wedding-olive tracking-widest lowercase">
      {label}
    </span>
  </div>
);

const Countdown: React.FC = () => {
  const timeLeft = useCountdown(WEDDING_DATE);

  return (
    <section className="py-16 md:py-20 px-4 bg-wedding-beige flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-wedding-olive mb-8 md:mb-10 italic px-2">
          Contando los segundos para el gran día
        </h3>
        
        <div className="flex justify-center flex-wrap">
          <TimeUnit value={timeLeft.days} label="días" />
          <TimeUnit value={timeLeft.hours} label="horas" />
          <TimeUnit value={timeLeft.minutes} label="minutos" />
          <TimeUnit value={timeLeft.seconds} label="segundos" />
        </div>
      </motion.div>
    </section>
  );
};

export default Countdown;
