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
    title: 'Training Phase',
    description: 'Master advanced technologies through intensive, hands-on workshops.',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-yellow-400',
    orbit: 'Orbit 2: Specialization'
  },
  {
    title: 'Project Selection',
    description: 'Choose your mission trajectory and join a high-impact development squad.',
    icon: <Telescope className="w-6 h-6" />,
    color: 'text-purple-400',
    orbit: 'Orbit 3: Exploration'
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

export const CareerRoadmap = () => {
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
    <section id="roadmap" className="py-24 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white">
            GALACTIC <span className="text-gradient-primary">CAREER ROADMAP</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your flight path from student to industry professional across the Afferent galaxy.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* SVG Path Background */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden pointer-events-none">
            <div className="h-full w-full bg-white/5" />
            <motion.div 
              style={{ height: `${pathLength.get() * 100}%` }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric-blue via-purple-500 to-cosmic-orange"
            />
          </div>

          <div className="space-y-24">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex items-start gap-8 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1 hidden md:block" />
                
                {/* Milestone Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full bg-black border-4 border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform hover:scale-110 group cursor-default`}>
                    <div className={`${milestone.color} transition-colors group-hover:brightness-125`}>
                      {milestone.icon}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-display font-bold text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">
                    {milestone.orbit}
                  </div>
                </div>

                <div className="flex-1">
                  <div className={`space-card p-6 md:p-8 hover:border-electric-blue/30 transition-all ${
                    index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'
                  }`}>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Star System */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-30">
        <div className="w-[500px] h-[500px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-0 w-[400px] h-[400px] rounded-full border border-white/5 m-auto animate-[spin_40s_linear_infinite_reverse]" />
      </div>
    </section>
  );
};
