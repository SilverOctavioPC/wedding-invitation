import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-wedding-charcoal text-white px-6 py-3 rounded-sm shadow-2xl flex items-center gap-3 font-sans text-sm tracking-wide"
        >
          <Check className="w-4 h-4 text-wedding-gold" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message: string, duration = 2500) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), duration);
  };

  return { toast, showToast, ToastComponent: Toast };
};

export default Toast;
