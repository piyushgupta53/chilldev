import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Emoji {
  id: number;
  emoji: string;
  startX: number;
  endX: number;
  endY: number;
  rotation: number;
  scale: number;
  delay: number;
}

interface EmojiConfettiProps {
  isVisible: boolean;
}

const EMOJIS = ['😎', '🆒', '✨', '🔥', '🚀', '💫', '😌', '🧘‍♂️', '🎯', '💯'];

const generateConfetti = (count: number): Emoji[] => {
  return Array.from({ length: count }, (_, i) => {
    const startX = 50 + (Math.random() - 0.5) * 20; // Start more centered
    const spread = Math.random() > 0.5 ? 1 : -1; // Determine left or right spread
    const endX = startX + spread * (20 + Math.random() * 30); // Spread outward
    const endY = -(30 + Math.random() * 40); // Float upward
    
    return {
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      startX,
      endX,
      endY,
      rotation: -360 + Math.random() * 720, // Spin between -360 and 360 degrees
      scale: 0.5 + Math.random() * 1,
      delay: Math.random() * 0.3,
    };
  });
};

const EmojiConfetti: React.FC<EmojiConfettiProps> = ({ isVisible }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    if (isVisible) {
      setEmojis(generateConfetti(30));
    } else {
      setEmojis([]);
    }
  }, [isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {emojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            initial={{
              opacity: 0,
              x: `${emoji.startX}%`,
              y: '100%',
              rotate: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: `${emoji.endX}%`,
              y: `${emoji.endY}%`,
              rotate: emoji.rotation,
              scale: emoji.scale,
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: emoji.delay,
              opacity: {
                times: [0, 0.2, 0.8, 1],
                duration: 2,
              },
            }}
            className="fixed text-2xl"
            style={{ fontSize: `${emoji.scale + 0.5}rem` }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EmojiConfetti;