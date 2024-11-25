import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Search, Loader2, Share2 } from 'lucide-react';
import { calculateChillScore } from './utils/github';
import ChillOMeter from './components/ChillOMeter';
import EmojiConfetti from './components/EmojiConfetti';

function App() {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError('');
    setScore(null);
    setShowConfetti(false);

    try {
      const chillScore = await calculateChillScore(username);
      setScore(chillScore);
      setShowConfetti(true);
      // Reset confetti after animation
      setTimeout(() => setShowConfetti(false), 2000);
    } catch (err) {
      setError('Could not find this GitHub user. Keep it chill and try again! 😎');
    } finally {
      setLoading(false);
    }
  };

  const shareOnTwitter = () => {
    if (score === null) return;
    
    const text = `My dev chill-o-meter is ${score}/100. Find out how chill your coding style is!`;
    const url = 'https://chilldev-five.vercel.app/';
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 flex flex-col items-center justify-center p-4">
      <EmojiConfetti isVisible={showConfetti} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.div
            className="text-8xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            😏
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Are you a chill dev?</h1>
          <p className="text-gray-600">Find out how chill your coding style is! 😎</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 rounded-lg font-medium shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            disabled={loading || !username}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Search size={20} />
                <span>Calculate Chill Score</span>
              </>
            )}
          </motion.button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mt-4"
          >
            {error}
          </motion.div>
        )}

        {score !== null && (
          <div className="space-y-4">
            <ChillOMeter score={score} />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={shareOnTwitter}
              className="w-full bg-[#1DA1F2] text-white py-3 rounded-lg font-medium shadow-lg flex items-center justify-center space-x-2"
            >
              <Share2 size={20} />
              <span>Share on Twitter</span>
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;