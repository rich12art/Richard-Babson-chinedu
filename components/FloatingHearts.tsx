import React from 'react';
import { motion } from 'framer-motion';

// Generate random hearts for background
const hearts = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  size: Math.random() * 20 + 10,
  left: `${Math.random() * 100}%`,
  duration: Math.random() * 5 + 5,
  delay: Math.random() * 5,
}));

export const FloatingHearts: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/30"
          style={{
            left: heart.left,
            fontSize: heart.size,
          }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.5, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};