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
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <div className="space-card p-6 h-full transition-all duration-300 group-hover:border-electric-blue/50">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-electric-blue/5 to-cosmic-orange/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-electric-blue/20 to-cosmic-orange/20 flex items-center justify-center text-electric-blue group-hover:text-cosmic-orange transition-colors">
            {icon}
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-gradient-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
