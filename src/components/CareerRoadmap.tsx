import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Star, Telescope, Trophy, Zap } from 'lucide-react';

const milestones = [
  {
    title: 'Admission & Onboarding',
    description: 'Enter the cosmic portal and begin your journey into the tech universe.',
    icon: <Rocket className="w-6 h-6" />,
    color: 'text-blue-400',
    orbit: 'Orbit 1: Foundation'
  },
  {
    title: 'Project Selection',
    description: 'Choose your mission trajectory and join a high-impact development squad.',
    icon: <Telescope className="w-6 h-6" />,
    color: 'text-purple-400',
    orbit: 'Orbit 2: Exploration'
  },
  {
    title: 'Training Phase',
    description: 'Master advanced technologies through intensive, hands-on workshops.',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-yellow-400',
    orbit: 'Orbit 3: Specialization'
  },
  {
    title: 'Development Sprint',
    description: 'Build real-world solutions under the guidance of industry commanders.',
    icon: <Star className="w-6 h-6" />,
    color: 'text-orange-400',
    orbit: 'Orbit 4: Creation'
  },
  {
    title: 'Certification & Beyond',
    description: 'Complete your mission and graduate into the professional galaxy.',
    icon: <Trophy className="w-6 h-6" />,
    color: 'text-green-400',
    orbit: 'Orbit 5: Achievement'
  }
];

export const InternshipCareerRoadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-black/40" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white">
            INTERNSHIP <span className="text-gradient-primary">CAREER ROADMAP</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your flight path from student to industry professional across the Afferent galaxy.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-white/10">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-electric-blue via-purple-500 to-cosmic-orange origin-top"
            />
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-20 md:pl-32"
              >
                {/* Milestone Marker */}
                <div className="absolute left-0 top-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-black border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`${milestone.color} relative z-10`}>
                      {milestone.icon}
                    </div>
                    <span className="mt-2 text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-widest hidden md:block">
                      {milestone.orbit.split(':')[0]}
                    </span>
                  </motion.div>
                </div>

                <div className="space-card p-6 md:p-8 group hover:border-electric-blue/40 transition-all cursor-default">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-electric-blue transition-colors">
                      {milestone.title}
                    </h3>
                    <span className="text-xs font-display font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {milestone.orbit}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
