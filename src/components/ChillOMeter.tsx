import React from 'react';
import { motion } from 'framer-motion';

interface ChillOMeterProps {
  score: number;
}

const ChillOMeter: React.FC<ChillOMeterProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-teal-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMessage = (score: number) => {
    if (score >= 80) return 'Ultra Chill! You\'re basically a zen master! 🧘‍♂️';
    if (score >= 60) return 'Pretty Chill! Keep that vibe going! 😎';
    if (score >= 40) return 'Moderately Chill. Room for more chill! 😌';
    return 'Need more chill! Take a deep breath! 😅';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Your Chill Score</h2>
      
      <motion.div
        className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-4"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-cyan-500"
          initial={{ width: '0%' }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="text-center"
      >
        <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-2xl text-gray-600">/100</span>
      </motion.div>

      <p className="text-center mt-4 text-gray-700">
        {getMessage(score)}
      </p>
    </motion.div>
  );
};

export default ChillOMeter;