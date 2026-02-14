import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';

const SLIDE_DURATION = 4000;

// IMPORTANT: To use the sound from your video:
// 1. Rename your video file to "rich_life.mp4"
// 2. Place it in the "public" folder of your project
// 3. The code below will automatically play the audio from that video
const VIDEO_SOURCE = "/rich_life.mp4"; 

// Fallback audio if the video file isn't found (Epic Cinematic Beat similar to "Change")
const FALLBACK_AUDIO = "https://cdn.pixabay.com/download/audio/2023/06/13/audio_4e12c1b48a.mp3?filename=epic-hollywood-trailer-153494.mp3";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2000",
    title: "A Future Built Together",
    subtitle: "Richard Babson's promise of a lifetime of luxury."
  },
  {
    url: "https://images.unsplash.com/photo-1594913366159-1832ffefc311?auto=format&fit=crop&q=80&w=2000",
    title: "Every Moment is Gold",
    subtitle: "You are the most precious gem in my collection."
  },
  {
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2000",
    title: "Relax in Pure Love",
    subtitle: "Our story is my favorite destination."
  },
  {
    url: "https://images.unsplash.com/photo-1518196775741-152f13cdfe2b?auto=format&fit=crop&q=80&w=2000",
    title: "To the Moon and Back",
    subtitle: "Lighting up my world, even in the darkest nights."
  },
  {
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
    title: "Our Private Sanctuary",
    subtitle: "Where luxury meets the warmth of your heart."
  }
];

export const BillionaireView: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  // Handle auto-play and mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented:", error);
          // If autoplay is blocked, we often need to mute first, but here we just reflect UI state
          if (!isMuted) setIsMuted(true); 
        });
      }
    }
  }, [isMuted]);

  // Try to un-mute automatically if user interacts (optional enhancement)
  // But strictly respecting the toggle is better UX.

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
      
      {/* Hidden Video for Audio Track */}
      {/* We use a video tag so we can load the user's MP4 file directly to extract sound */}
      <video 
        ref={videoRef}
        src={VIDEO_SOURCE}
        loop
        playsInline
        className="hidden"
        onError={(e) => {
            // Fallback to the stock audio if local video file missing
            const target = e.target as HTMLVideoElement;
            if (target.src.includes(VIDEO_SOURCE)) {
                target.src = FALLBACK_AUDIO;
            }
        }}
      />

      {/* Image Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={slides[index].url} 
            alt="Success" 
            className="w-full h-full object-cover filter brightness-[0.7]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Mute Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
            <Heart size={32} fill="#ec4899" className="text-pink-500 animate-pulse" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-pink-400 font-bold tracking-[0.4em] uppercase text-sm">Yes, A Thousand Times</h2>
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-white leading-tight drop-shadow-lg">
              {slides[index].title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/80 font-serif italic max-w-2xl mx-auto">
              "{slides[index].subtitle}"
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          key={`bar-${index}`}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          className="h-1 bg-pink-500 mt-12 mx-auto origin-left w-32 rounded-full"
        />

        {/* Floating Badges */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
            <div className="px-6 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-all cursor-default">
                <Sparkles size={16} className="text-yellow-400" />
                Luxury Guaranteed
            </div>
            <div className="px-6 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-all cursor-default">
                Forever Yours
            </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-20">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full bg-white/5 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full bg-white/5 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Sidebar Progress Dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${index === i ? 'bg-pink-500 h-8' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};