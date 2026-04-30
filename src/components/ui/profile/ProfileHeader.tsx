import { motion } from 'framer-motion';
import { User, Briefcase, FileText, Camera } from 'lucide-react';
import { useRef, useState } from 'react';
import axiosInstance from '../../../api/api';
import type { Profile } from '../../../types/profileTypes';

interface ProfileHeaderProps {
  profile: Profile;
  proposalsCount: number;
  tasksCount: number;
  onAvatarUpdate?: () => void;
}

const ProfileHeader = ({ profile, proposalsCount, tasksCount, onAvatarUpdate }: ProfileHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const formData = new FormData();
      formData.append('image', file);

      await axiosInstance.post('/auth/upload-avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onAvatarUpdate?.();
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-white/5 rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="relative group">
          {profile.url ? (
            <img
              src={profile.url}
              alt={profile.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-orange-500/30"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center border-2 border-orange-500/30">
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          )}

          {/* Upload overlay */}
          <button
            onClick={handleAvatarClick}
            disabled={uploading}
            className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
          >
            {uploading ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera className="w-8 h-8 text-white" />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {profile.role}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{profile.name}</h1>
          {profile.description && (
            <p className="text-gray-400 text-sm sm:text-base mb-4">{profile.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Briefcase className="w-4 h-4 text-orange-400" />
              <span>{proposalsCount} Proposals</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>{tasksCount} Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
