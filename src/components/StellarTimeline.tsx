import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Zap, Star, Flame, Sun } from 'lucide-react';

const timelineEvents = [
  {
    phase: "Stellar Nebula",
    year: "The Beginning",
    title: "Founding & Vision",
    description: "The cosmic dust began to swirl as Afferent Technologies was conceptualized with a mission to bridge academia and industry.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-blue-400 to-purple-500",
    glow: "rgba(147, 51, 234, 0.3)"
  },
  {
    phase: "Protostar",
    year: "Early Orbit",
    title: "First Internships Launched",
    description: "Gravity took hold as our first batch of interns embarked on their journey, mastering the fundamentals of AI and Software Development.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-cyan-400 to-blue-600",
    glow: "rgba(34, 211, 238, 0.3)"
  },
  {
    phase: "Main Sequence",
    year: "Steady Growth",
    title: "Expansion & Project Mastery",
    description: "The star stabilized. We expanded into Cybersecurity, IoT, and Data Science, delivering high-impact solutions to our first corporate clients.",
    icon: <Sun className="w-6 h-6" />,
    color: "from-yellow-400 to-orange-500",
    glow: "rgba(251, 191, 36, 0.3)"
  },
  {
    phase: "Red Giant",
    year: "Industry Presence",
    title: "Establishing the Orbit",
    description: "Broadening our horizons, we reached the milestone of training 500+ interns and delivering 100+ industry-grade projects.",
    icon: <Flame className="w-6 h-6" />,
    color: "from-orange-500 to-red-600",
    glow: "rgba(239, 68, 68, 0.3)"
  },
  {
    phase: "Supernova",
    year: "The Future",
    title: "Innovation Explosion",
    description: "The star explodes with innovation, reaching a global audience with AI-powered automation and enterprise-grade IT transformations.",
    icon: <Star className="w-6 h-6" />,
    color: "from-white to-electric-blue",
    glow: "rgba(0, 243, 255, 0.4)"
  }
];

export const StellarTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section ref={containerRef} id="timeline" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-black mb-4 tracking-tighter"
          >
            STELLAR <span className="text-gradient-primary">TIMELINE</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Trace the evolution of Afferent Technologies through the life cycle of a star.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white/5 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric-blue via-cosmic-orange to-white origin-top"
              style={{ scaleY: pathLength, height: '100%' }}
            />
          </div>

          <div className="space-y-24 relative">
            {timelineEvents.map((event, index) => (
              <TimelineItem 
                key={event.phase} 
                event={event} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cosmic-orange/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

const TimelineItem = ({ event, index }: { event: typeof timelineEvents[0], index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 w-full"
      >
        <div className="space-card p-6 md:p-8 hover:border-white/20 transition-colors group">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white`}>
              {event.phase}
            </span>
            <span className="text-muted-foreground font-display text-sm font-bold">{event.year}</span>
          </div>
          <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-electric-blue transition-colors">{event.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>
      </motion.div>

      {/* Central Node */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.1 
          }}
          className={`w-16 h-16 rounded-full bg-background border-2 border-white/10 flex items-center justify-center relative group cursor-default`}
          style={{ boxShadow: `0 0 30px ${event.glow}` }}
        >
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${event.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
          <div className="relative text-foreground transition-transform group-hover:scale-110 duration-300">
            {event.icon}
          </div>
          
          {/* Pulsing Outer Ring */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${event.color} -z-10`}
          />
        </motion.div>
      </div>

      {/* Spacer for Desktop Layout */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
};
