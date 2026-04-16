import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  role: 'freelancer' | 'client';
  isLoading?: boolean;
}

const SubmitButton = ({ role, isLoading = false }: SubmitButtonProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div variants={itemVariants}>
      <motion.button
        type="submit"
        disabled={isLoading}
        className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {!isLoading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{
              x: '100%',
              transition: { duration: 0.6, ease: 'easeInOut' },
            }}
          />
        )}

        {!isLoading && (
          <motion.div
            className="absolute inset-0 bg-orange-400/50 rounded-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          {isLoading ? 'Creating Account...' : `Create Account as ${role === 'freelancer' ? 'Freelancer' : 'Client'}`}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default SubmitButton;
