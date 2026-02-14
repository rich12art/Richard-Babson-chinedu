import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MainCard } from './components/MainCard';
import { BillionaireView } from './components/BillionaireView';
import { DontCareView } from './components/DontCareView';
import { FloatingHearts } from './components/FloatingHearts';

// Application states
type AppState = 'asking' | 'accepted' | 'rejected';

export default function App() {
  const [appState, setAppState] = useState<AppState>('asking');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-100 to-rose-200">
      
      {/* Background Ambience - Only show when asking or accepted (different background for rejected) */}
      {appState !== 'rejected' && <FloatingHearts />}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {appState === 'asking' && (
          <motion.div
            key="asking"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <MainCard 
              onAccept={() => setAppState('accepted')}
              onReject={() => setAppState('rejected')}
            />
          </motion.div>
        )}

        {appState === 'accepted' && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20"
          >
            <BillionaireView />
          </motion.div>
        )}

        {appState === 'rejected' && (
          <motion.div
            key="rejected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30"
          >
            <DontCareView />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}