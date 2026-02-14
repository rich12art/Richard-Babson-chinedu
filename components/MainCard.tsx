import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Heart, HandHeart, Ghost } from 'lucide-react';

interface MainCardProps {
  onAccept: () => void;
  onReject: () => void;
}

// Simple synthesized sound effect for rejection
const playRejectSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Create a descending "error" tone with some noise character
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

// Simple pleasant sound for hover
const playHoverSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle "sparkle" or "ping" sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
    
    // Very low volume for subtlety
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Ignore audio errors
  }
};

export const MainCard: React.FC<MainCardProps> = ({ onAccept, onReject }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [isScared, setIsScared] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const yesControls = useAnimation();

  // Begging animation loop for Yes button
  useEffect(() => {
    yesControls.start({
      scale: [1, 1.1, 1],
      rotate: [0, -2, 2, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
  }, [yesControls]);

  const moveNoButton = () => {
    if (!containerRef.current || isRejecting) return;
    
    setIsScared(true);
    
    const btnWidth = 120;
    const btnHeight = 60;
    const padding = 60;
    
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    const minX = padding;
    const minY = padding;

    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    setNoBtnPosition({ x: newX, y: newY });
    setHoverCount(prev => prev + 1);
    
    // Reset scared state after animation completes
    setTimeout(() => setIsScared(false), 600);
  };

  const handleReject = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Stop bubbling
    setIsRejecting(true);
    playRejectSound();
    
    // Wait for the glitch animation to play out before switching views
    setTimeout(() => {
      onReject();
    }, 600);
  };

  const isRunning = hoverCount > 0;

  // Funny "No" text variations
  const noTexts = ["No", "Nope!", "Eek!", "Not today!", "Try again!", "Too slow!", "Catch me!", "Hehe!"];
  const currentNoText = noTexts[Math.min(hoverCount, noTexts.length - 1)];

  return (
    <motion.div 
      ref={containerRef} 
      animate={isRejecting ? {
        x: [0, -10, 10, -10, 5, -5, 0],
        rotate: [0, -2, 2, -1, 1, 0],
        scale: [1, 0.95, 0.9, 0.95],
        filter: ["grayscale(0%)", "grayscale(50%)", "grayscale(100%) blur(1px)"],
        opacity: [1, 0.8, 0]
      } : {}}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md p-8 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 text-center mx-4"
    >
      
      {/* Decorative Envelope Header */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <motion.div 
          animate={!isRejecting ? { y: [0, -10, 0] } : { y: 20, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-rose-500 text-white p-4 rounded-full shadow-xl"
        >
          <Heart fill="white" size={48} />
        </motion.div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold text-pink-500 uppercase tracking-[0.3em]"
          >
            A Special Request
          </motion.h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif leading-tight">
            Will you be my Valentine?
          </h1>
          <div className="h-1.5 w-20 bg-gradient-to-r from-pink-400 to-rose-600 mx-auto rounded-full mt-4" />
        </div>

        <p className="text-gray-500 italic font-serif text-lg">
          Love from, <span className="font-bold text-gray-900 not-italic">Richard Babson</span>
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 min-h-[140px] relative">
          
          {/* YES BUTTON */}
          <motion.button
            animate={yesControls}
            whileHover={!isRejecting ? { scale: 1.15, rotate: 0 } : {}}
            whileTap={!isRejecting ? { scale: 0.9 } : {}}
            onClick={onAccept}
            onMouseEnter={() => {
              if(!isRejecting) playHoverSound();
            }}
            disabled={isRejecting}
            className={`relative px-10 py-5 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl font-black text-2xl shadow-xl flex items-center justify-center gap-3 group z-20 overflow-hidden transition-all ${isRejecting ? 'opacity-50 grayscale' : 'hover:shadow-pink-500/40'}`}
          >
            <motion.div
              className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
            <HandHeart className="relative z-10" size={24} />
            <span className="relative z-10">YES!</span>
          </motion.button>

          {/* NO BUTTON - The Expressive Runner */}
          <motion.button
            style={
              isRunning 
                ? { position: 'fixed', left: 0, top: 0 }
                : {}
            }
            animate={isRunning ? { 
              x: noBtnPosition.x, 
              y: noBtnPosition.y,
              rotate: isScared ? [0, -15, 15, -15, 0] : 0,
              scale: isScared ? [1, 1.3, 1] : 1
            } : {
              // Enhanced Idle Animation: Nervous wobble + subtle pulse
              rotate: [0, -4, 4, -2, 2, 0],
              scale: [1, 1.05, 0.98, 1],
              y: [0, -2, 0]
            }}
            transition={isRunning ? {
              type: "spring", 
              stiffness: 400, 
              damping: 17,
              mass: 0.8
            } : {
              // Idle transition: repeat with a delay to look like a random twitch
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 1, 
              ease: "easeInOut"
            }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={handleReject}
            disabled={isRejecting}
            className={`px-8 py-4 rounded-2xl font-bold text-xl flex items-center gap-2 z-50 transition-colors duration-300 shadow-md ${
              isScared ? 'bg-orange-100 text-orange-600 border-2 border-orange-400' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <span className="whitespace-nowrap">{currentNoText}</span>
            <AnimatePresence mode="wait">
              {isScared ? (
                <motion.span
                  key="scared"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  😰
                </motion.span>
              ) : (
                <motion.span
                  key="normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Ghost size={20} />
                </motion.span>
              )}
            </AnimatePresence>
            
            {/* Playful sweat drops when scared */}
            {isScared && (
              <>
                <motion.span initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -20, x: -10 }} className="absolute text-blue-400">💦</motion.span>
                <motion.span initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -15, x: 10 }} className="absolute text-blue-400">💦</motion.span>
              </>
            )}
          </motion.button>

        </div>

        <div className="pt-4 h-6">
          <AnimatePresence>
            {(hoverCount > 3 && !isRejecting) && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-pink-400 flex items-center justify-center gap-1"
              >
                Persistence is key... but maybe just click Yes? 😉
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};