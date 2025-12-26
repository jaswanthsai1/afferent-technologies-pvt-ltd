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
import { ShieldCheck, Lock, Info, CheckCircle2 } from 'lucide-react';

interface IntroVideoProps {
  onEnter: () => void;
}

export const IntroVideo = ({ onEnter }: IntroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [stars, setStars] = useState<{width: string, height: string, left: string, top: string, duration: string, delay: string}[]>([]);
  const [particles, setParticles] = useState<{left: string, top: string, bg: string, duration: number, delay: number}[]>([]);

  useEffect(() => {
    setMounted(true);
    
    const newStars = [...Array(50)].map(() => ({
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      duration: Math.random() * 3 + 2 + 's',
      delay: Math.random() * 2 + 's',
    }));
    setStars(newStars);

    const newParticles = [...Array(20)].map((_, i) => ({
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      bg: i % 2 === 0 ? 'hsl(var(--electric-blue))' : 'hsl(var(--cosmic-orange))',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setIsVideoReady(true);
        video.play().catch(console.error);
      };

      if (video.readyState >= 3) {
        setIsVideoReady(true);
        video.play().catch(console.error);
      }

      video.addEventListener('canplay', handleCanPlay);
      
      const handleTimeUpdate = () => {
        if (video.currentTime >= video.duration - 2 || video.currentTime >= 5) {
          setShowPrompt(true);
        }
      };

      const handleEnded = () => {
        setShowPrompt(true);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);

      const timer = setTimeout(() => setShowPrompt(true), 5000);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
        clearTimeout(timer);
      };
    }
  }, [mounted]);

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
        {!isExiting && (
          <motion.div
            className="fixed inset-0 z-50 bg-background overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ y: '100%', scale: 0.9, opacity: 0 }}
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
              {mounted && stars.map((star, i) => (
                <div
                  key={i}
                  className="star"
                  style={{
                    width: star.width,
                    height: star.height,
                    left: star.left,
                    top: star.top,
                    '--duration': star.duration,
                    '--delay': star.delay,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Prompt Message */}
            <AnimatePresence>
              {showPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-electric-blue via-cosmic-orange to-electric-blue opacity-75 blur-lg animate-pulse" />
                    
                    <div className="relative space-card px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10 text-center mx-4">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-electric-blue rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cosmic-orange rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cosmic-orange rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-electric-blue rounded-br-lg" />

                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="font-display text-lg sm:text-xl md:text-4xl font-bold text-foreground mb-2"
                      >
                        ARE YOU READY TO
                      </motion.h2>
                        <motion.h2
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="font-display text-xl sm:text-2xl md:text-5xl font-black mb-6 sm:mb-8"
                        >
                          <span className="text-gradient-primary">EXPERIENCE</span>{' '}
                          <span className="text-gradient-secondary">GALAXY ADVENTURE</span>
                          <span className="text-foreground">?</span>
                        </motion.h2>

                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEnterClick}
                        className="group relative px-6 py-3 font-display text-base sm:text-lg font-bold uppercase tracking-widest overflow-hidden rounded-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cosmic-orange rounded-full" />
                        <div className="absolute inset-[2px] bg-background rounded-full" />
                        <span className="relative z-10 flex items-center gap-3">
                          <span className="text-gradient-primary group-hover:text-gradient-secondary transition-all">
                            ENTER
                          </span>
                          <span className="text-cosmic-orange">→</span>
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {mounted && particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: particle.bg,
                    left: particle.left,
                    top: particle.top,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="bg-background/95 border-border/50 backdrop-blur-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3 font-display text-2xl font-bold">
              <ShieldCheck className="w-6 h-6 text-electric-blue" />
              SYSTEM GATEWAY VERIFICATION
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-muted-foreground text-sm sm:text-base py-4 space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-electric-blue font-mono text-[10px] tracking-tighter">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                      ENTERPRISE NODE: ENCRYPTED TUNNEL [ACTIVE]
                    </div>
                    <div className="flex items-center gap-2 text-cosmic-orange">
                      STATUS: SYNCHRONIZED (AFF-CORE-01)
                    </div>
                  </div>

                  <div className="border-l-2 border-electric-blue/30 pl-3 py-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/80 mb-1">Afferent Technologies Pvt. Ltd.</p>
                    <p className="text-[9px] font-mono opacity-60">REG NO: U72900TG2022PTC160541 | AUTH LEVEL: ALPHA-4</p>
                  </div>

                  <p className="leading-relaxed text-xs sm:text-sm">
                    Identity verified via Corporate Biometrics. You are about to enter the <span className="text-foreground font-bold italic underline decoration-electric-blue/50">internal proprietary infrastructure</span> of Afferent Technologies. 
                    Access authorization is strictly granted for operational deployment and strategic resource management during the 2026 Innovation Cycle.
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/20">
                    <div className="space-y-1">
                      <span className="block text-[9px] uppercase tracking-widest text-muted-foreground">Terminal ID</span>
                      <span className="block font-mono text-[11px] text-cosmic-orange">AFF-SRV-NORTH-01</span>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="block text-[9px] uppercase tracking-widest text-muted-foreground">Session Token</span>
                      <span className="block font-mono text-[11px] text-cosmic-orange truncate">AUTH_0X7F2B8D9A...</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[9px] uppercase tracking-widest text-muted-foreground">Data Layer</span>
                      <span className="block font-mono text-[11px] text-electric-blue">SYNCHRONIZED</span>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="block text-[9px] uppercase tracking-widest text-muted-foreground">Fiscal Protocol</span>
                      <span className="block font-mono text-[11px] text-electric-blue">CYBER-PRO-2026-V1</span>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-md border border-border/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-20">
                      <ShieldCheck className="w-8 h-8 text-electric-blue" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-electric-blue mt-0.5 shrink-0" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-foreground/90 uppercase tracking-tight">Corporate Compliance [Directive 2026]</p>
                        <p className="text-[10px] leading-tight opacity-70">
                          Infrastructure monitoring active. Data logging engaged. Unauthorized distribution of proprietary assets is strictly prohibited under the Information Technology Act 2000.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="h-1 flex-1 bg-muted/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-electric-blue to-cosmic-orange"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground animate-pulse">CONNECTING CORPORATE ASSETS... 99%</span>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ABORT</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} className="bg-gradient-to-r from-electric-blue to-cosmic-orange text-white">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              AUTHORIZE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Exit transition overlay */}
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-transparent pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 100 }}
            transition={{ duration: 1.5, ease: 'easeIn' }}
            className="w-4 h-4 rounded-full bg-white"
          />
        </motion.div>
      )}
    </>
  );
};

export default IntroVideo;
