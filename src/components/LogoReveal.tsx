import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import companyLogo from '@/assets/company-logo.jpeg';

interface LogoRevealProps {
  onComplete: () => void;
}

const LogoReveal = ({ onComplete }: LogoRevealProps) => {
  const [phase, setPhase] = useState<'earth' | 'logo' | 'complete'>('earth');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('logo'), 2000);
    const timer2 = setTimeout(() => setPhase('complete'), 4000);
    const timer3 = setTimeout(onComplete, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={phase === 'complete' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Rotating Earth */}
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={
            phase === 'complete'
              ? { scale: 0.15, x: '-42vw', y: '-42vh' }
              : phase === 'logo'
              ? { scale: 0.8 }
              : { scale: 1.2 }
          }
          transition={{
            duration: phase === 'complete' ? 1 : 2,
            ease: 'easeInOut',
          }}
        >
        {/* Earth glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(var(--electric-blue) / 0.4), transparent)',
            transform: 'scale(1.5)',
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Earth representation with logo */}
        <motion.div
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden"
          style={{
            boxShadow: '0 0 60px hsl(var(--electric-blue) / 0.5), 0 0 120px hsl(var(--cosmic-orange) / 0.3)',
          }}
        >
          <img
            src={companyLogo}
            alt="Afferent Technologies Logo"
            className="w-full h-full object-cover"
          />
          
          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderImage: 'linear-gradient(135deg, hsl(var(--electric-blue)), hsl(var(--cosmic-orange))) 1',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Orbit rings */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute w-[130%] h-[130%] rounded-full border border-electric-blue/30"
            style={{ transform: 'rotateX(60deg)' }}
          />
        </motion.div>
      </motion.div>

      {/* Company Name */}
      <motion.div
        className="absolute mt-[22rem] md:mt-[28rem] text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={
          phase === 'complete'
            ? { opacity: 0, y: -100 }
            : phase === 'logo'
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-display text-3xl md:text-5xl font-black tracking-wider"
          initial={{ letterSpacing: '0.5em', opacity: 0 }}
          animate={phase === 'logo' ? { letterSpacing: '0.2em', opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-foreground">AFFERENT</span>
        </motion.h1>
        <motion.div
          className="flex items-center justify-center gap-4 mt-2"
          initial={{ scaleX: 0 }}
          animate={phase === 'logo' ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cosmic-orange" />
          <span className="font-display text-sm md:text-lg tracking-[0.3em] text-gradient-secondary">
            TECHNOLOGIES PVT LTD
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-electric-blue" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LogoReveal;
