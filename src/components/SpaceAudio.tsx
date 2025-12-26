import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

  export const SpaceAudio = ({ showControls = true }: { showControls?: boolean }) => {
    const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

    const toggleAudio = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(err => {
            console.error("Audio playback failed:", err);
            setIsPlaying(false);
          });
          setIsPlaying(true);
        }
      }
    };

    const handleAudioError = (e: any) => {
      console.error("Audio source failed to load:", e);
      setIsPlaying(false);
    };

    useEffect(() => {
      const attemptPlay = () => {
        if (audioRef.current && !hasInteracted.current) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
              hasInteracted.current = true;
              window.removeEventListener('click', attemptPlay);
              window.removeEventListener('keydown', attemptPlay);
              window.removeEventListener('touchstart', attemptPlay);
            })
            .catch(() => {
              // Auto-play failed, wait for user interaction
              setIsPlaying(false);
            });
        }
      };

      // Try playing immediately
      attemptPlay();

      // Add listeners for interaction to trigger play if autoplay was blocked
      window.addEventListener('click', attemptPlay);
      window.addEventListener('keydown', attemptPlay);
      window.addEventListener('touchstart', attemptPlay);

      // Cleanup on unmount
      return () => {
        window.removeEventListener('click', attemptPlay);
        window.removeEventListener('keydown', attemptPlay);
        window.removeEventListener('touchstart', attemptPlay);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, []);

    return (
      <div className="fixed bottom-8 left-8 z-[100]">
        <audio
          ref={audioRef}
          src="/cornfield-chase.mp3"
          loop
          preload="auto"
          onError={handleAudioError}
        />
        
        <AnimatePresence>
          {showControls && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleAudio}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                isPlaying 
                  ? 'bg-electric-blue text-background shadow-electric-blue/40' 
                  : 'bg-muted/20 text-muted-foreground border border-border/30 backdrop-blur-md'
              }`}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="volume-on"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="volume-off"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <VolumeX className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Animated pulse when playing */}
              {isPlaying && (
                <motion.div 
                  className="absolute inset-0 rounded-full border border-electric-blue"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          )}
        </AnimatePresence>
        
        <div className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none overflow-hidden">
          <AnimatePresence>
            {showControls && isPlaying && (
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="text-[10px] font-display font-bold tracking-[0.2em] text-electric-blue uppercase bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-electric-blue/20"
              >
                Cornfield Chase
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    );

};
