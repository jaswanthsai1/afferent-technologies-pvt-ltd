import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SpaceAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    osc1: OscillatorNode;
    osc2: OscillatorNode;
    gain: GainNode;
    lfo: OscillatorNode;
  } | null>(null);

  const initAudio = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    // Deep hum oscillators
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(55.5, ctx.currentTime); // Slightly detuned
    
    // Filter for "muffled" space feel
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.Q.setValueAtTime(10, ctx.currentTime);

    // LFO for pulsing effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // 0.2Hz pulse
    lfoGain.gain.setValueAtTime(0.3, ctx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    
    osc1.start();
    osc2.start();
    lfo.start();

    audioContextRef.current = ctx;
    nodesRef.current = { osc1, osc2, gain, lfo };
  };

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      initAudio();
    }

    const { current: ctx } = audioContextRef;
    const { gain } = nodesRef.current!;

    if (isPlaying) {
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx!.currentTime + 1);
      setTimeout(() => setIsPlaying(false), 1000);
    } else {
      if (ctx!.state === 'suspended') {
        ctx!.resume();
      }
      gain.gain.exponentialRampToValueAtTime(0.1, ctx!.currentTime + 1);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <motion.button
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
      
      <div className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none overflow-hidden">
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: isPlaying ? 0 : -20, opacity: isPlaying ? 1 : 0 }}
          className="text-[10px] font-display font-bold tracking-[0.2em] text-electric-blue uppercase bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-electric-blue/20"
        >
          Cosmic Ambience
        </motion.span>
      </div>
    </div>
  );
};
