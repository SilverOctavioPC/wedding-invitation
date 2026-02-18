import React from 'react';
import { motion } from 'framer-motion';
import { STORY_DATA } from '@/constants';
import { StoryEvent } from '@/types';

const StorySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-wedding-charcoal mb-4">Nuestra Historia</h2>
          <div className="w-20 h-1 bg-wedding-gold mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-wedding-gold/40 transform md:-translate-x-1/2"></div>

          {STORY_DATA.map((event: StoryEvent, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col md:flex-row items-center mb-16 md:mb-24 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot on timeline */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-wedding-olive rounded-full border-4 border-white shadow-md transform -translate-x-1/2 z-10"></div>

              {/* Content Side */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                 <span className="font-serif text-wedding-gold text-xl italic block mb-2">{event.year}</span>
                 <h3 className="font-display text-2xl text-wedding-charcoal mb-3">{event.title}</h3>
                 <p className="font-sans font-light text-gray-600 leading-relaxed text-sm md:text-base">{event.description}</p>
              </div>

              {/* Image Side */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 mt-6 md:mt-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="relative overflow-hidden shadow-xl rounded-sm group">
                  <div className="absolute inset-0 bg-wedding-olive/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img src={event.image} alt={event.title} loading="lazy" className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
