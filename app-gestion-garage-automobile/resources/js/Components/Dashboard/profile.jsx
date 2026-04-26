import React from 'react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

const UserProfileBar = ({ user }) => {
    const handleLogout = () => {
        router.post('/logout');
    };

    const avatar = '/assets/avatar.jpg'

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white border border-gray-200 px-6 py-4 flex items-center justify-between rounded-2xl shadow-sm mb-7"
        >
            <div className="flex items-center space-x-4">
                <img
                    src={avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                />
                <div className="text-gray-800">
                    <p className="text-base font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-md text-sm font-medium transition"
            >
                <LogOut size={18} />
                Déconnexion
            </motion.button>
        </motion.div>
    );
};

export default UserProfileBar;
