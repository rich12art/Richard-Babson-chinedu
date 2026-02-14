import React from 'react';
import { motion } from 'framer-motion';
import { Skull, XCircle } from 'lucide-react';

export const DontCareView: React.FC = () => {
  return (
    <div className="w-full h-full bg-neutral-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Glitch Effect Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-[1px] w-full bg-white absolute"
            style={{ top: `${Math.random() * 100}%` }}
            animate={{ x: [-1000, 1000] }}
            transition={{ 
              duration: Math.random() * 0.5 + 0.1, 
              repeat: Infinity, 
              repeatType: "mirror" 
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 text-center max-w-xl p-8"
      >
        <motion.div
          animate={{ 
            x: [0, -5, 5, -5, 0],
            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
          }}
          transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
          className="mb-8 inline-block"
        >
            <div className="relative">
                 <Skull size={100} className="text-neutral-500" />
                 <XCircle size={40} className="text-red-600 absolute -bottom-2 -right-2 bg-neutral-900 rounded-full" />
            </div>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-neutral-400">
          Whatever.
        </h1>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 shadow-2xl transform -rotate-2"
        >
          <p className="text-3xl font-bold text-red-500 mb-2 font-mono">
            I don't even care.
          </p>
          <p className="text-neutral-500 text-sm font-mono">
            ERROR 404: FEELINGS NOT FOUND
          </p>
        </motion.div>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="mt-12 text-neutral-600 text-xs uppercase tracking-[0.3em]"
        >
            Your loss, honestly.
        </motion.p>
      </motion.div>
    </div>
  );
};