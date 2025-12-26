import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WarpSpeed } from './WarpSpeed';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldCheck, Rocket, Info } from 'lucide-react';

interface IntroVideoProps {
  onEnter: () => void;
}

const IntroVideo = ({ onEnter }: IntroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(console.error);
      
      const handleCanPlay = () => {
        setIsVideoReady(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      
      const handleTimeUpdate = () => {
        // Show prompt near the end of video or after 5 seconds
        if (video.currentTime >= video.duration - 2 || video.currentTime >= 5) {
          setShowPrompt(true);
        }
      };

      const handleEnded = () => {
        setShowPrompt(true);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);

      // Fallback: show prompt after 5 seconds regardless
      const timer = setTimeout(() => setShowPrompt(true), 5000);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleEnterClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setIsWarping(true);
  };

  const handleWarpComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <>
      <WarpSpeed active={isWarping} onComplete={handleWarpComplete} />
      
      <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 bg-background overflow-hidden"
            initial={{ y: 0 }}
            animate={isExiting ? { y: '100%', scale: 0.9 } : { y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Video Background */}
            {mounted && (
              <motion.video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVideoReady ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                muted
                playsInline
                loop={false}
              >
                <source src="/intro-video.mp4" type="video/mp4" />
              </motion.video>
            )}


        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && [...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                '--duration': Math.random() * 3 + 2 + 's',
                '--delay': Math.random() * 2 + 's',
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Prompt Message */}
        <AnimatePresence>
          {showPrompt && !isExiting && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* Message Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Glowing border effect */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-electric-blue via-cosmic-orange to-electric-blue opacity-75 blur-lg animate-pulse" />
                
                  <div className="relative space-card px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10 text-center mx-4">
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-t-2 border-l-2 border-electric-blue rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-t-2 border-r-2 border-cosmic-orange rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-b-2 border-l-2 border-cosmic-orange rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-b-2 border-r-2 border-electric-blue rounded-br-lg" />

                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="font-display text-lg sm:text-xl md:text-4xl font-bold text-foreground mb-2"
                    >
                      ARE YOU READY FOR A
                    </motion.h2>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="font-display text-xl sm:text-2xl md:text-5xl font-black mb-6 sm:mb-8"
                    >
                      <span className="text-gradient-primary">SMALL</span>{' '}
                      <span className="text-gradient-secondary">ADVENTURE</span>
                      <span className="text-foreground">?</span>
                    </motion.h2>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEnterClick}
                      className="group relative px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 font-display text-base sm:text-lg md:text-xl font-bold uppercase tracking-widest overflow-hidden rounded-full"
                    >
                      {/* Button background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cosmic-orange rounded-full" />
                      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cosmic-orange rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                      
                      {/* Inner dark background */}
                      <div className="absolute inset-[2px] bg-background rounded-full" />
                      
                      {/* Text */}
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="text-gradient-primary group-hover:text-gradient-secondary transition-all">
                          ENTER
                        </span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-cosmic-orange"
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Mission Authorization Alert */}
                <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                  <AlertDialogContent className="bg-background/95 border-border/50 backdrop-blur-xl shadow-[0_0_50px_-12px_hsl(var(--electric-blue)/0.3)]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight">
                        <div className="p-2 rounded-lg bg-electric-blue/20">
                          <ShieldCheck className="w-6 h-6 text-electric-blue" />
                        </div>
                        MISSION AUTHORIZATION
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground text-lg py-4">
                        You are about to initiate the cosmic journey into the 
                        <span className="text-electric-blue font-bold"> Afferent Universe</span>. 
                        Do you authorize the system to proceed with full initialization?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="bg-muted/30 p-4 rounded-xl border border-border/30 mb-6 flex gap-4 items-start">
                      <div className="p-2 rounded-full bg-cosmic-orange/20 mt-1">
                        <Info className="w-4 h-4 text-cosmic-orange" />
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-bold text-foreground/80 mb-1 uppercase tracking-widest">System Note:</p>
                        Proceeding will unlock interactive modules, immersive audio experiences, and high-performance visual simulations.
                      </div>
                    </div>
                    <AlertDialogFooter className="gap-3 sm:gap-4">
                      <AlertDialogCancel className="bg-muted/50 border-border/50 hover:bg-muted/80 text-foreground font-display font-bold tracking-wider rounded-xl py-6">
                        ABORT MISSION
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleConfirm}
                        className="bg-gradient-to-r from-electric-blue to-cosmic-orange text-white font-display font-bold tracking-widest rounded-xl py-6 hover:shadow-[0_0_30px_-5px_hsl(var(--electric-blue)/0.5)] transition-all flex gap-2"
                      >
                        <Rocket className="w-5 h-5 animate-pulse" />
                        AUTHORIZE & ENTER
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>


              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {mounted && [...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      background: i % 2 === 0 
                        ? 'hsl(var(--electric-blue))' 
                        : 'hsl(var(--cosmic-orange))',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Exit transition overlay */}
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 50 }}
              transition={{ duration: 1, ease: 'easeIn' }}
              className="w-4 h-4 rounded-full bg-gradient-radial from-electric-blue via-background to-background"
            />
          </motion.div>
        )}
      </motion.div>
      </AnimatePresence>
    </>
  );
};

export default IntroVideo;
