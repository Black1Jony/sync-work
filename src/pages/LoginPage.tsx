import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import BackgroundEffects from '../components/ui/registration/BackgroundEffects';
import RegistrationCard from '../components/ui/registration/RegistrationCard';
import FormInput from '../components/ui/registration/FormInput';
import LoginButton from '../components/ui/login/LoginButton';
import { toast } from 'sonner';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
interface ApiError {
  error: string;
  message: string;
}
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      navigate('/');
    }
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await api.post('/auth/login', formData);
      toast.success('Logged in successfully');
      document.cookie = `token=${resp.data.token}; path=/ maxage=31536000`;
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred during login');
    }
    setIsLoading(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundEffects />

      <RegistrationCard>
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-zinc-400 text-sm">
            Sign in to continue your journey
          </p>
        </motion.div>

        
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
            placeholder="your@email.com"
            icon={Mail}
            required
          />

          <FormInput
            label="Password"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
            placeholder="Enter your password"
            icon={Lock}
            required
          />

          {/* Forgot Password Link */}
          <motion.div variants={itemVariants} className="text-right">
            <a
              href="#"
              className="text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </motion.div>

          <LoginButton isLoading={isLoading} />
        </form>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-zinc-500 text-sm">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              Sign up
            </a>
          </p>
        </motion.div>
      </RegistrationCard>
    </div>
  );
};

export default LoginPage;
