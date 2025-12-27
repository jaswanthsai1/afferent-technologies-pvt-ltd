import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import companyLogo from '@/assets/company-logo.jpeg';

  const FloatingLogo = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
      <motion.div
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <a href="#home" className="group flex items-center gap-3">
          {/* Logo with rotating effect */}
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-electric-blue to-cosmic-orange opacity-50"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Logo image */}
            <motion.div
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-electric-blue/50"
              animate={!isMobile ? { rotate: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                boxShadow: '0 0 20px hsl(var(--electric-blue) / 0.4)',
              }}
            >
              <img
                src={companyLogo}
                alt="Afferent Technologies"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Orbit ring */}
            {!isMobile && (
              <motion.div
                className="absolute -inset-1 rounded-full border border-cosmic-orange/30"
                style={{ transform: 'rotateX(60deg)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>

        {/* Company name - visible on hover */}
        <motion.div
          className="hidden md:block overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-display text-sm font-bold whitespace-nowrap">
            <span className="text-foreground">AFFERENT</span>
            <span className="text-gradient-secondary ml-1">TECH</span>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
};

export default FloatingLogo;
