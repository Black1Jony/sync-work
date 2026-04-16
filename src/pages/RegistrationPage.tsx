import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import BackgroundEffects from '../components/ui/registration/BackgroundEffects';
import RegistrationCard from '../components/ui/registration/RegistrationCard';
import RoleSelector from '../components/ui/registration/RoleSelector';
import FormInput from '../components/ui/registration/FormInput';
import SubmitButton from '../components/ui/registration/SubmitButton';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type UserRole = 'freelancer' | 'client';

interface ApiError {
  error: string;
  message: string;
}

const RegistrationPage = () => {
  const [role, setRole] = useState<UserRole>('freelancer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const resp = await api.post('/auth/login', { ...formData, role });

      if (resp.status === 201) {
        document.cookie = `token=${resp.data.token}; path=/; max-age=31536000`;
        toast.success('Registration successful! Welcome aboard!');
        navigate('/');
      } 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiError = error.response.data as ApiError;

        switch (apiError.error) {
          case 'EMAIL_REQUIRED':
            toast.error('Email is required');
            break;
          case 'PASSWORD_REQUIRED':
            toast.error('Password is required');
            break;
          case 'PASSWORD_TOO_SHORT':
            toast.error('Password must be at least 6 characters');
            break;
          case 'NAME_REQUIRED':
            toast.error('Name is required');
            break;
          case 'ROLE_REQUIRED':
            toast.error('Role is required');
            break;
          case 'INVALID_ROLE':
            toast.error('Role must be "freelancer" or "client"');
            break;
          case 'SIGNUP_FAILED':
            toast.error('Email already exists. Try logging in instead.');
            break;
          case 'PROFILE_CREATION_FAILED':
            toast.error('Registration failed. Please contact support.');
            break;
          case 'TOKEN_GENERATION_FAILED':
            toast.error('Registration successful. Please try logging in.');
            break;
          case 'INVALID_REQUEST_BODY':
            toast.error('Invalid data format. Please check your input.');
            break;
          default:
            toast.error(apiError.message || 'Registration failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  }

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
            Join the Hub
          </h1>
          <p className="text-zinc-400 text-sm">
            Your gateway to freelance excellence
          </p>
        </motion.div>

        {/* Role Selector */}
        <RoleSelector role={role} onRoleChange={setRole} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            placeholder="Enter your name"
            icon={User}
            required
          />

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
            placeholder="Create a strong password"
            icon={Lock}
            required
          />

          <SubmitButton role={role} isLoading={isLoading} />
        </form>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account?{' '}
            <a
              href="/signin"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </RegistrationCard>
    </div>
  );
};

export default RegistrationPage;
