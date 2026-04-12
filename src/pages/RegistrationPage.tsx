import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import BackgroundEffects from '../components/ui/registration/BackgroundEffects';
import RegistrationCard from '../components/ui/registration/RegistrationCard';
import RoleSelector from '../components/ui/registration/RoleSelector';
import FormInput from '../components/ui/registration/FormInput';
import SubmitButton from '../components/ui/registration/SubmitButton';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
type UserRole = 'freelancer' | 'client';

const RegistrationPage = () => {
  const [role, setRole] = useState<UserRole>('freelancer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await api.post('/auth/login', { ...formData, role });

      if (resp.status === 201) {
        document.cookie = `token=${resp.data.token}; path=/; max-age=31536000`; // Сохранение токена в cookie
        navigate('/');
      }
    } catch (error) {
      console.error('Registration failed:', error);
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

          <SubmitButton role={role} />
        </form>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account?{' '}
            <a
              href="#"
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
