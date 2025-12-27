import { motion } from 'framer-motion';
import { Home, Phone, Instagram, Linkedin, Route, Send, History } from 'lucide-react';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  currentSection: number;
}

const Navigation = ({ onNavigate, currentSection }: NavigationProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'roadmap', icon: Route, label: 'Roadmap' },
    { id: 'newsletter', icon: Send, label: 'Newsletter' },
    { id: 'contact', icon: Phone, label: 'Contact' },
    {
      id: 'instagram',
      icon: Instagram,
      label: 'Instagram',
      href: 'https://instagram.com/afferenttechnologiespvtltd'
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/afferent-technologies-pvt-ltd/'
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed top-14 sm:top-6 left-1/2 -translate-x-1/2 z-40 w-full flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full bg-background/80 backdrop-blur-2xl border border-border/40 shadow-2xl shadow-black/50 max-w-[90vw] overflow-x-auto no-scrollbar">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isExternal = !!item.href;

          const ButtonContent = (
            <motion.div
              className="relative group shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-electric-blue/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity" />

              <div
                className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 ${currentSection === 0 && item.id === 'home'
                    ? 'bg-gradient-to-r from-electric-blue to-cosmic-orange text-primary-foreground'
                    : 'bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>


              {/* Tooltip - Hidden on mobile */}
              <div className="hidden sm:block absolute top-full left-3 md:left-1/2 md:-translate-x-1/2 mt-2 px-3 py-1 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 text-xs font-display uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
            </motion.div>
          );

          if (isExternal) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                {ButtonContent}
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="shrink-0"
            >
              {ButtonContent}
            </button>
          );
        })}

        {/* Animated indicator line */}
        <div className="hidden md:block w-px h-6 bg-border/50 mx-1 shrink-0" />

        <motion.div
          className="hidden md:flex items-center gap-2 pl-2 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
          <span className="text-xs font-display text-muted-foreground uppercase tracking-widest">
            Explore
          </span>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;

