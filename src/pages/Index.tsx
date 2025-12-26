import { useState, useCallback, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Brain,
  Shield,
  Database,
  Wifi,
  Code,
  Bot,
  Globe,
  Smartphone,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Rocket,
  Users,
  Award,
} from 'lucide-react';

import SEO from '@/components/SEO';
import IntroVideo from '@/components/IntroVideo';
import LogoReveal from '@/components/LogoReveal';
import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import FloatingLogo from '@/components/FloatingLogo';
import PlanetSection from '@/components/PlanetSection';
import ServiceCard from '@/components/ServiceCard';
import { CelestialTeamMap } from '../components/CelestialTeamMap';
import { MissionTrajectory } from '../components/MissionTrajectory';
import { InternshipCareerRoadmap } from '../components/CareerRoadmap';
import { BlackHoleNewsletter } from '../components/BlackHoleNewsletter';
import { SpaceAudio } from '../components/SpaceAudio';
import { StardustCursor } from '../components/StardustCursor';

type AppPhase = 'intro' | 'logo-reveal' | 'main';

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [currentSection, setCurrentSection] = useState(0);

  const handleIntroComplete = useCallback(() => {
    setPhase('logo-reveal');
  }, []);

  const handleLogoRevealComplete = useCallback(() => {
    setPhase('main');
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (phase !== 'main') return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phase]);

  const { scrollYProgress } = useScroll();
  const flareX = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);
  const flareY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const internshipDomains = [
    { title: 'Artificial Intelligence', icon: <Brain className="w-6 h-6" />, description: 'Master machine learning, neural networks, and AI applications.' },
    { title: 'Cyber Security', icon: <Shield className="w-6 h-6" />, description: 'Learn ethical hacking, penetration testing, and security protocols.' },
    { title: 'Data Science', icon: <Database className="w-6 h-6" />, description: 'Analyze data, build models, and extract valuable insights.' },
    { title: 'Internet of Things', icon: <Wifi className="w-6 h-6" />, description: 'Connect devices, sensors, and create smart systems.' },
    { title: 'CSE & Software', icon: <Code className="w-6 h-6" />, description: 'Develop software solutions with modern programming practices.' },
    { title: 'Robotics', icon: <Bot className="w-6 h-6" />, description: 'Build and program intelligent robotic systems.' },
  ];

  return (
    <HelmetProvider>
      <SEO />
      <StardustCursor />
      
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Star field background */}
        <StarField count={200} />

        {/* Lens Flare Effect */}
        <motion.div
          className="fixed pointer-events-none z-10 w-[100vw] h-[100vh]"
          style={{
            background: 'radial-gradient(circle at 80% 20%, rgba(135, 206, 235, 0.15) 0%, transparent 40%)',
            x: flareX,
            y: flareY,
          }}
        />

        {/* Holographic Scanlines */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(32,128,32,0.2)_50%,transparent_100%)] h-[20%] w-full"
            animate={{ top: ['-20%', '100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Persistent Audio - Starts as early as possible */}
        <SpaceAudio showControls={true} />

        {/* Intro Video Phase */}
        <AnimatePresence>
          {phase === 'intro' && (
            <IntroVideo onEnter={handleIntroComplete} />
          )}
        </AnimatePresence>

        {/* Logo Reveal Phase */}
        <AnimatePresence>
          {phase === 'logo-reveal' && (
            <LogoReveal onComplete={handleLogoRevealComplete} />
          )}
        </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence>
            {phase === 'main' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                  <FloatingLogo />
                    <Navigation onNavigate={handleNavigate} currentSection={currentSection} />


                {/* Hero / Home Section */}
                <section id="home" className="min-h-screen flex items-center justify-center relative pt-24 pb-12">
                  <div className="container mx-auto px-4 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <div className="mb-6 md:mb-8 flex justify-center">
                        <motion.img 
                          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/now-1-1766777372055.jpeg?width=8000&height=8000&resize=contain" 
                          alt="Afferent Technologies" 
                          className="max-w-full h-auto max-h-[300px] md:max-h-[600px] object-contain mix-blend-screen contrast-125 brightness-110"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.1 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>

                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-4">
                      Afferent Technologies Pvt Ltd empowers the next generation with cutting-edge 
                      internships, innovative projects, and world-class IT solutions.
                    </p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center px-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigate('internships')}
                        className="group relative px-6 md:px-8 py-3 md:py-4 rounded-full font-display font-bold tracking-wider overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cosmic-orange" />
                        <div className="absolute inset-[2px] bg-background rounded-full" />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-gradient-primary group-hover:text-gradient-secondary transition-all">
                          <Rocket className="w-4 h-4 md:w-5 md:h-5 text-electric-blue group-hover:text-cosmic-orange" />
                          Start Your Journey
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigate('about')}
                        className="px-6 md:px-8 py-3 md:py-4 rounded-full font-display font-bold tracking-wider bg-muted/50 border border-border/50 hover:border-electric-blue/50 transition-colors"
                      >
                        <span className="flex items-center justify-center gap-2 text-foreground">
                          <Users className="w-4 h-4 md:w-5 md:h-5" />
                          Learn More
                        </span>
                      </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

              {/* About Us Section - Mars */}
              <PlanetSection
                id="about"
                planetName="Mars"
                title="ABOUT US"
                subtitle="Pioneering Technology Education & Solutions"
                planetPosition="right"
              >
                  <div className="space-card p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-planet-mars/30 to-cosmic-orange/20 flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6 md:w-8 md:h-8 text-cosmic-orange" />
                          </div>
                          <div>
                            <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1 leading-tight">
                              Founded by Annem Akhila
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground">Visionary Leader & Technology Innovator</p>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                          Afferent Technologies Pvt Ltd is a leading technology company dedicated to bridging 
                          the gap between academic knowledge and industry expertise.
                        </p>

                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                          Our mission is to provide authentic technology education and empower individuals with practical skills in emerging technologies.
                        </p>
                      </div>

                      <div className="flex-1">
                        <CelestialTeamMap />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4 pt-6 mt-6 border-t border-border/30">

                    <div className="text-center">
                      <div className="font-display text-xl md:text-3xl font-black text-gradient-primary">500+</div>
                      <div className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider">Interns</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-xl md:text-3xl font-black text-gradient-secondary">100+</div>
                      <div className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-xl md:text-3xl font-black text-gradient-primary">50+</div>
                      <div className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider">Clients</div>
                      </div>
                    </div>
                  </div>
                </PlanetSection>

                <MissionTrajectory />


              {/* Internships Section - Saturn */}
              <PlanetSection
                id="internships"
                planetName="Saturn"
                title="INTERNSHIPS"
                subtitle="Launch Your Career in Technology"
                planetPosition="left"
                planetSize={500}
              >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {internshipDomains.map((domain, index) => (
                  <ServiceCard
                    key={domain.title}
                    title={domain.title}
                    description={domain.description}
                    icon={domain.icon}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </PlanetSection>

              <InternshipCareerRoadmap />

              {/* Projects Section - Jupiter */}
              <PlanetSection
                id="projects"
                planetName="Jupiter"
                title="PROJECTS"
                subtitle="Industry-Ready Solutions"
                planetPosition="right"
                planetSize={550}
              >
              <div className="space-card p-4 sm:p-6 md:p-8">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
                  Get comprehensive support for your final year projects across multiple domains.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {['AI & ML', 'Cybersecurity', 'Data Science', 'IoT', 'CSE & Software', 'Robotics'].map((domain) => (
                      <div
                        key={domain}
                        className="px-2 sm:px-3 md:px-4 py-2 md:py-3 rounded-xl bg-muted/30 border border-border/30 text-center font-display text-[9px] sm:text-[10px] md:text-sm tracking-wider glow-interactive"
                      >
                        {domain}
                      </div>
                    ))}

                </div>
              </div>
            </PlanetSection>

              {/* IT Company Projects Section - Neptune */}
              <PlanetSection
                id="it-projects"
                planetName="Neptune"
                title="IT COMPANY PROJECTS"
                subtitle="Enterprise-Grade Solutions"
                planetPosition="left"
              >
              <div className="space-card p-4 sm:p-6 md:p-8">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
                  We partner with companies to deliver custom IT solutions tailored to their specific 
                  requirements. From conceptualization to deployment, we handle every aspect of your 
                  project with precision and expertise.
                </p>

                <ul className="space-y-2 sm:space-y-3">
                  {['Custom Software Development', 'System Integration', 'Cloud Solutions', 'Enterprise Applications'].map((item) => (
                    <li key={item} className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-sm p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group cursor-default border border-transparent hover:border-border/30 hover:shadow-[0_0_15px_-5px_hsl(var(--electric-blue)/0.2)]">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-electric-blue group-hover:scale-125 transition-transform shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </PlanetSection>

              {/* Web Development Section - Venus */}
              <PlanetSection
                id="web-dev"
                planetName="Venus"
                title="WEB DEVELOPMENT"
                subtitle="Stunning Digital Experiences"
                planetPosition="right"
              >
              <div className="space-card p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cosmic-orange shrink-0" />
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-foreground">Full-Stack Solutions</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Frontend, Backend & Everything In Between</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
                  We create beautiful, responsive, and high-performance websites tailored to your 
                  business needs. From simple landing pages to complex web applications, we bring 
                  your vision to life with cutting-edge technologies.
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'PostgreSQL'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 rounded-full bg-muted/50 text-[10px] sm:text-xs font-display tracking-wider text-muted-foreground border border-border/30 glow-interactive"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </PlanetSection>

              {/* App Development Section - Mercury */}
              <PlanetSection
                id="app-dev"
                planetName="Mercury"
                title="APP DEVELOPMENT"
                subtitle="Mobile Solutions for Modern World"
                planetPosition="left"
              >
              <div className="space-card p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-electric-blue shrink-0" />
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-foreground">iOS & Android</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Native & Cross-Platform Development</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
                  Build powerful mobile applications that engage users and drive business growth. 
                  We develop native and cross-platform apps with intuitive interfaces and robust 
                  backend systems.
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 rounded-full bg-muted/50 text-[10px] sm:text-xs font-display tracking-wider text-muted-foreground border border-border/30 glow-interactive"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </PlanetSection>

              {/* Automation Section - Uranus */}
              <PlanetSection
                id="automation"
                planetName="Uranus"
                title="AUTOMATION"
                subtitle="AI Agents & Intelligent Systems"
                planetPosition="right"
              >
              <div className="space-card p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Cpu className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-electric-blue shrink-0" />
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-foreground">AI-Powered Automation</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Transform Your Business Processes</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 sm:mb-6">
                  Leverage the power of AI agents to automate repetitive tasks, enhance productivity, 
                  and unlock new possibilities. Our custom automation solutions are designed to 
                  seamlessly integrate with your existing workflows.
                </p>

                <ul className="space-y-2 sm:space-y-3">
                  {['Custom AI Agents', 'Workflow Automation', 'Chatbots & Virtual Assistants', 'Process Optimization'].map((item) => (
                    <li key={item} className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-sm p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group cursor-default border border-transparent hover:border-border/30 hover:shadow-[0_0_15px_-5px_hsl(var(--electric-blue)/0.2)]">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cosmic-orange group-hover:scale-125 transition-transform shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </PlanetSection>

              {/* Contact Section - Earth */}
              <PlanetSection
                id="contact"
                planetName="Earth"
                title="CONTACT US"
                subtitle="Let's Build Something Amazing Together"
                planetPosition="left"
              >
              <div className="space-card p-4 sm:p-6 md:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-electric-blue/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1 text-sm sm:text-base">Email</h3>
                      <a href="mailto:info@afferenttech.com" className="text-muted-foreground text-sm hover:text-white transition-colors break-all">info@afferenttech.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cosmic-orange/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-cosmic-orange" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1 text-sm sm:text-base">Phone</h3>
                      <p className="text-muted-foreground text-sm">+91 XXXXX XXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-planet-earth/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-planet-earth" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1 text-sm sm:text-base">Location</h3>
                      <p className="text-muted-foreground text-sm">India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/30">
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Follow us on{' '}
                    <a
                      href="https://instagram.com/afferenttechnologiespvtltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric-blue hover:text-electric-blue-glow transition-colors"
                    >
                      Instagram
                    </a>
                    {' & '}
                    <a
                      href="https://linkedin.com/company/afferent-technologies-pvt-ltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cosmic-orange hover:text-cosmic-orange-glow transition-colors"
                    >
                      LinkedIn
                    </a>
                  </p>
                </div>
              </div>
              </PlanetSection>

                <BlackHoleNewsletter />

              <div className="w-full py-4 sm:py-6 bg-black/40 backdrop-blur-sm border-t border-white/5 text-center relative z-10">
                <p className="text-xs sm:text-sm text-muted-foreground/60 tracking-wider sm:tracking-widest font-display px-4">
                  © Copyright Afferent Technologies Pvt Ltd. All Rights Reserved | <a href="mailto:info@afferenttech.com" className="hover:text-white transition-colors">info@afferenttech.com</a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
};

export default Index;
