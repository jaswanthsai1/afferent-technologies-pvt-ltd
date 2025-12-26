import { motion } from 'framer-motion';

interface PlanetOrbitsProps {
  onPlanetClick: (sectionId: string) => void;
}

const planets = [
  { id: 'about', name: 'Mars', color: 'hsl(var(--mars))', size: 60, orbitRadius: 150, speed: 20 },
  { id: 'internships', name: 'Saturn', color: 'hsl(var(--saturn))', size: 80, orbitRadius: 220, speed: 30 },
  { id: 'projects', name: 'Jupiter', color: 'hsl(var(--jupiter))', size: 90, orbitRadius: 300, speed: 40 },
  { id: 'it-projects', name: 'Neptune', color: 'hsl(var(--neptune))', size: 55, orbitRadius: 380, speed: 50 },
  { id: 'web-dev', name: 'Venus', color: 'hsl(var(--venus))', size: 50, orbitRadius: 450, speed: 25 },
  { id: 'app-dev', name: 'Mercury', color: 'hsl(var(--mercury))', size: 40, orbitRadius: 520, speed: 15 },
  { id: 'automation', name: 'Uranus', color: 'hsl(var(--uranus))', size: 65, orbitRadius: 590, speed: 45 },
  { id: 'contact', name: 'Earth', color: 'hsl(var(--earth))', size: 55, orbitRadius: 660, speed: 35 },
];

const PlanetOrbits = ({ onPlanetClick }: PlanetOrbitsProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Center sun/logo reference point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Orbit paths */}
        {planets.map((planet) => (
          <div
            key={`orbit-${planet.id}`}
            className="absolute rounded-full border border-border/10"
            style={{
              width: planet.orbitRadius * 2,
              height: planet.orbitRadius * 2,
              left: -planet.orbitRadius,
              top: -planet.orbitRadius,
            }}
          />
        ))}

        {/* Planets */}
        {planets.map((planet, index) => (
          <motion.div
            key={planet.id}
            className="absolute pointer-events-auto"
            style={{
              width: planet.orbitRadius * 2,
              height: planet.orbitRadius * 2,
              left: -planet.orbitRadius,
              top: -planet.orbitRadius,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: planet.speed,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 0.5,
            }}
          >
            {/* Planet */}
            <motion.button
              className="absolute group"
              style={{
                left: planet.orbitRadius - planet.size / 2,
                top: -planet.size / 2,
                width: planet.size,
                height: planet.size,
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPlanetClick(planet.id)}
              animate={{ rotate: -360 }}
              transition={{
                duration: planet.speed,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Planet glow */}
              <div
                className="absolute inset-0 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ background: planet.color }}
              />
              
              {/* Planet body */}
              <div
                className="absolute inset-0 rounded-full transition-shadow group-hover:shadow-lg"
                style={{
                  background: `radial-gradient(circle at 30% 30%, 
                    ${planet.color}, 
                    color-mix(in srgb, ${planet.color} 60%, black))`,
                  boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.5), inset 3px 3px 10px rgba(255,255,255,0.2)`,
                }}
              />

              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-background/90 backdrop-blur-sm border border-border/50 text-[10px] font-display uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {planet.name}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlanetOrbits;
