import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const ServiceCard = ({ title, description, icon, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: false }}
      className="group"
    >
      <div className="space-card p-4 sm:p-5 md:p-6 h-full">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-electric-blue/5 to-cosmic-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-electric-blue/20 to-cosmic-orange/20 flex items-center justify-center text-electric-blue group-hover:text-cosmic-orange transition-colors">
            {icon}
          </div>

          {/* Title */}
          <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-gradient-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
