import { motion } from 'framer-motion';

interface SubmitButtonProps {
  role: 'freelancer' | 'client';
}

const SubmitButton = ({ role }: SubmitButtonProps) => {
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
        className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-xl overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{
            x: '100%',
            transition: { duration: 0.6, ease: 'easeInOut' },
          }}
        />

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

        <span className="relative z-10">
          Create Account as {role === 'freelancer' ? 'Freelancer' : 'Client'}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default SubmitButton;
