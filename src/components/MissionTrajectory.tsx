import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  { year: '2015', title: 'Founding', description: 'Afferent Technologies begins its voyage into the tech universe.' },
  { year: '2026', title: 'Expansion', description: 'Launched comprehensive internship programs in 5 major domains.' },
  { year: '2026', title: 'Innovation', description: 'Pioneered AI & Robotics solutions for industrial applications.' },
  { year: '2026', title: 'Future', description: 'Expanding our cosmic footprint to global horizons.' },
];

export const MissionTrajectory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative py-20 px-4 max-w-4xl mx-auto">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30 -translate-x-1/2 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-electric-blue to-cosmic-orange origin-top"
          style={{ height: '100%', scaleY }}
        />
      </div>

      <div className="space-y-24 relative">
        {milestones.map((milestone, index) => (
          <motion.div
            key={`${milestone.year}-${milestone.title}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}
          >
            {/* Content Area */}
            <div className="flex-1">
              <div className="space-card p-6 border-muted/20 hover:border-electric-blue/30 transition-colors">
                <span className="text-xs font-display font-bold text-electric-blue uppercase tracking-[0.2em]">
                  {milestone.year}
                </span>
                <h4 className="text-lg font-display font-bold mt-1 mb-2">{milestone.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>

            {/* Path Node */}
            <div className="relative z-10">
              <motion.div 
                className="w-4 h-4 rounded-full bg-background border-2 border-electric-blue shadow-[0_0_15px_rgba(0,243,255,0.5)]"
                whileInView={{ scale: [1, 1.5, 1] }}
                viewport={{ once: false }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-electric-blue/20 animate-ping" />
            </div>

            {/* Empty space for alignment */}
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
      
      {/* Flight Path SVG */}
      <svg className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none opacity-10">
        <pattern id="dotPattern" x="0" y="0" width="10" height="20" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>
    </div>
  );
};
