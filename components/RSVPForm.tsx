import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RSVPData } from '../types';
import { Check, Loader2, AlertCircle } from 'lucide-react';

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    email: '',
    attending: null,
    guests: 1,
    dietaryRestrictions: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAttendanceChange = (val: 'yes' | 'no') => {
    setFormData(prev => ({ ...prev, attending: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.attending) {
        setStatus('error');
        return;
    }

    setStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
  };

  if (status === 'success') {
      return (
          <section className="py-24 bg-wedding-olive text-white text-center px-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg mx-auto bg-white/10 p-12 backdrop-blur-sm border border-white/20 rounded-sm"
              >
                  <Check className="w-16 h-16 mx-auto mb-6 text-wedding-gold" />
                  <h2 className="font-display text-3xl mb-4">¡Gracias por confirmar!</h2>
                  <p className="font-sans font-light">Hemos recibido tu respuesta. Nos emociona mucho compartir este día contigo.</p>
              </motion.div>
          </section>
      );
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-wedding-charcoal mb-4">RSVP</h2>
          <p className="font-serif italic text-gray-500">Por favor confirma tu asistencia antes del 1 de Julio</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-wedding-beige p-8 md:p-12 shadow-inner border border-wedding-sand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
                <label className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">Nombre Completo</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    className="bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-wedding-olive transition-colors font-serif text-lg text-wedding-charcoal"
                    placeholder="Tu nombre"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    className="bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-wedding-olive transition-colors font-serif text-lg text-wedding-charcoal"
                    placeholder="correo@ejemplo.com"
                />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
              <label className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-6">¿Asistirás?</label>
              <div className="flex gap-6">
                  <button 
                    type="button"
                    onClick={() => handleAttendanceChange('yes')}
                    className={`px-8 py-3 border transition-all duration-300 ${formData.attending === 'yes' ? 'bg-wedding-olive text-white border-wedding-olive' : 'border-gray-300 text-gray-500 hover:border-wedding-olive'}`}
                  >
                      Sí, asistiré
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleAttendanceChange('no')}
                    className={`px-8 py-3 border transition-all duration-300 ${formData.attending === 'no' ? 'bg-wedding-charcoal text-white border-wedding-charcoal' : 'border-gray-300 text-gray-500 hover:border-wedding-charcoal'}`}
                  >
                      No podré asistir
                  </button>
              </div>
          </div>

          <AnimatePresence>
            {formData.attending === 'yes' && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-8"
                >
                     <div className="flex flex-col">
                        <label className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">Número de invitados (incluyéndote)</label>
                        <select 
                            name="guests" 
                            value={formData.guests} 
                            onChange={handleChange}
                            className="bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-wedding-olive font-serif text-lg"
                        >
                            <option value="1">1 Persona</option>
                            <option value="2">2 Personas</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">Restricciones Alimenticias</label>
                        <textarea 
                            name="dietaryRestrictions" 
                            value={formData.dietaryRestrictions} 
                            onChange={handleChange}
                            rows={2}
                            className="bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-wedding-olive font-serif text-lg resize-none"
                            placeholder="Alergias, vegetariano, etc."
                        />
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          {status === 'error' && (
              <div className="text-red-800 bg-red-50 p-3 flex items-center justify-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" /> Por favor completa los campos requeridos.
              </div>
          )}

          <div className="text-center pt-6">
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="bg-wedding-gold text-white px-12 py-4 font-sans text-sm uppercase tracking-[0.2em] hover:bg-yellow-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {status === 'submitting' ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Enviar Confirmación'}
              </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;