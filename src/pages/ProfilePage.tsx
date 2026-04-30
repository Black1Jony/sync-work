import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Plus, Users } from 'lucide-react';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import ProfileHeader from '../components/ui/profile/ProfileHeader';
import StatsCards from '../components/ui/profile/StatsCards';
import ProposalCard from '../components/ui/profile/ProposalCard';
import TaskCard from '../components/ui/profile/TaskCard';
import TaskProposals from '../components/ui/profile/TaskProposals';
import CreateTaskModal from '../components/ui/profile/CreateTaskModal';
import axiosInstance from '../api/api';
import type { ProfileData } from '../types/profileTypes';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'proposals' | 'tasks' | 'task-proposals'>('proposals');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      const { data } = await axiosInstance.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfileData(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Failed to load profile</p>
        </div>
        <Footer />
      </div>
    );
  }

  const { profile, proposals, tasks } = profileData;

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Header />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader
            profile={profile}
            proposalsCount={proposals.length}
            tasksCount={tasks.length}
            onAvatarUpdate={fetchProfile}
          />

          <StatsCards proposals={proposals} />

          {/* Tabs with Create Button */}
          <div className="flex items-center justify-between mb-6 border-b border-white/5">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('proposals')}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === 'proposals'
                    ? 'text-orange-400 border-b-2 border-orange-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                My Proposals ({proposals.length})
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-6 py-3 font-medium transition-all ${
                  activeTab === 'tasks'
                    ? 'text-orange-400 border-b-2 border-orange-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                My Tasks ({tasks.length})
              </button>
              <button
                onClick={() => setActiveTab('task-proposals')}
                className={`px-6 py-3 font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'task-proposals'
                    ? 'text-orange-400 border-b-2 border-orange-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Users className="w-4 h-4" />
                Task Proposals
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Create Task</span>
            </motion.button>
          </div>

          {/* Content */}
          {activeTab === 'proposals' ? (
            <div className="grid gap-4">
              {proposals.length > 0 ? (
                proposals.map((proposal, index) => (
                  <ProposalCard key={proposal.task_id} proposal={proposal} index={index} />
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No proposals yet</p>
                </div>
              )}
            </div>
          ) : activeTab === 'tasks' ? (
            <div className="grid gap-4">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No tasks created yet</p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-2.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-colors font-medium"
                  >
                    Create Your First Task
                  </button>
                </div>
              )}
            </div>
          ) : (
            <TaskProposals />
          )}
        </div>
      </main>

      <Footer />

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchProfile}
      />
    </div>
  );
};

export default ProfilePage;
