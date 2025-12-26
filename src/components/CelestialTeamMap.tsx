import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { User, Shield, Code, Cpu } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string | JSX.Element;
  role: string;
  bio: string;
  icon: any;
  x: number;
  y: number;
  color: string;
}

const team: TeamMember[] = [
  {
    id: 'founder',
    name: 'Annem Akhila',
    role: 'Founder & CEO',
    bio: 'Visionary leader dedicated to bridging the gap between academia and industry through innovative technology education.',
    icon: Shield,
    x: 50,
    y: 40,
    color: 'hsl(var(--cosmic-orange))',
  },
  {
    id: 'tech-lead',
    name: 'Tech Architect',
    role: 'CTO',
    bio: 'Specialist in AI and large-scale system architecture, ensuring our solutions are built on the most robust technologies.',
    icon: Code,
    x: 30,
    y: 60,
    color: 'hsl(var(--electric-blue))',
  },
      {
        id: 'ops-lead',
        name: (
          <>
            MATURI JASWANTH SAI<br />
            MADHU MOHAN
          </>
        ),
        role: 'Operations Head',
      bio: 'Expert in project management and operational efficiency, driving the successful delivery of our global projects.',
      icon: Cpu,
      x: 70,
      y: 65,
      color: 'hsl(var(--starlight))',
    },
];

export const CelestialTeamMap = () => {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] bg-muted/10 rounded-2xl md:rounded-3xl border border-border/30 overflow-hidden group">
      {/* Background Star Lines (Constellation) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <line x1="50%" y1="40%" x2="30%" y2="60%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="40%" x2="70%" y2="65%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {team.map((member) => (
        <motion.div
          key={member.id}
          className="absolute cursor-pointer z-10"
          style={{ left: `${member.x}%`, top: `${member.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => setSelected(member)}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Planet Glow */}
            <motion.div
              className="absolute inset-0 rounded-full blur-md"
              style={{ backgroundColor: member.color }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Planet Body */}
            <div 
              className="relative w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white/20 flex items-center justify-center bg-background shadow-lg"
              style={{ borderColor: member.color }}
            >
              <member.icon className="w-4 h-4 md:w-6 md:h-6" style={{ color: member.color }} />
            </div>
            
            {/* Label */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] md:text-[10px] font-display font-bold tracking-widest uppercase text-muted-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              {member.name}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Info Card Overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-2 left-2 right-2 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 space-card border-electric-blue/30 z-20"
          >
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-muted-foreground hover:text-foreground p-1"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
              <div 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-white/10"
                style={{ backgroundColor: `${selected.color}22` }}
              >
                <selected.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: selected.color }} />
              </div>
              <div>
                <h4 className="font-display font-bold text-base md:text-lg leading-none">{selected.name}</h4>
                <p className="text-[10px] md:text-xs text-electric-blue uppercase tracking-widest mt-1">{selected.role}</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {selected.bio}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-2 left-4 md:top-4 md:left-6 text-[8px] md:text-[10px] font-display tracking-[0.2em] text-muted-foreground/50 uppercase">
        Explore our team
      </div>
    </div>
  );
};
