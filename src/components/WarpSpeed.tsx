import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WarpSpeedProps {
  active: boolean;
  onComplete?: () => void;
}

export const WarpSpeed: React.FC<WarpSpeedProps> = ({ active, onComplete }) => {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  interface LineData {
    angle: number;
    x: number;
    y: number;
    delay: number;
    isBlue: boolean;
  }

  const [linesData, setLinesData] = useState<LineData[]>([]);

  useEffect(() => {
    setMounted(true);
    const newLines = Array.from({ length: 100 }).map((_, i) => {
      const angle = (i / 100) * Math.PI * 2;
      return {
        angle,
        x: Math.cos(angle) * 100,
        y: Math.sin(angle) * 100,
        delay: Math.random() * 0.5,
        isBlue: i % 3 === 0,
      };
    });
    setLinesData(newLines);
  }, []);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {mounted && linesData.map((line, i) => (
              <motion.div
                key={i}
                initial={{
                  scaleX: 0,
                  x: 0,
                  y: 0,
                  opacity: 0
                }}
                animate={{
                  scaleX: [0, 15, 30],
                  x: [0, line.x * 15],
                  y: [0, line.y * 15],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeIn",
                  delay: line.delay
                }}
                className="absolute h-[2px] bg-white rounded-full origin-left"
                style={{
                  width: '20px',
                  rotate: `${(line.angle * 180) / Math.PI}deg`,
                  backgroundColor: line.isBlue ? 'hsl(var(--electric-blue))' : 'white',
                  boxShadow: line.isBlue ? '0 0 15px hsl(var(--electric-blue))' : '0 0 10px white',
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 4, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute inset-0 bg-gradient-radial from-white to-transparent opacity-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
