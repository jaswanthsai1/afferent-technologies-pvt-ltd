import { useState, useCallback, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
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
      
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* Star field background */}
        <StarField count={200} />

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
              <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
                <div className="container mx-auto px-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 mb-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Sparkles className="w-4 h-4 text-cosmic-orange" />
                      <span className="text-sm font-display tracking-wider text-muted-foreground">
                        PIONEERING TECHNOLOGY SOLUTIONS
                      </span>
                    </motion.div>

                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6">
                      <span className="text-foreground">EXPLORE THE</span>
                      <br />
                      <span className="text-gradient-primary">UNIVERSE</span>
                      <span className="text-foreground"> OF</span>
                      <br />
                      <span className="text-gradient-secondary">TECHNOLOGY</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                      Afferent Technologies Pvt Ltd empowers the next generation with cutting-edge 
                      internships, innovative projects, and world-class IT solutions.
                    </p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigate('internships')}
                        className="group relative px-8 py-4 rounded-full font-display font-bold tracking-wider overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cosmic-orange" />
                        <div className="absolute inset-[2px] bg-background rounded-full" />
                        <span className="relative z-10 flex items-center gap-2 text-gradient-primary group-hover:text-gradient-secondary transition-all">
                          <Rocket className="w-5 h-5 text-electric-blue group-hover:text-cosmic-orange" />
                          Start Your Journey
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigate('about')}
                        className="px-8 py-4 rounded-full font-display font-bold tracking-wider bg-muted/50 border border-border/50 hover:border-electric-blue/50 transition-colors"
                      >
                        <span className="flex items-center gap-2 text-foreground">
                          <Users className="w-5 h-5" />
                          Learn More
                        </span>
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Scroll indicator */}
                  <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
                  >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <span className="text-xs font-display tracking-widest">SCROLL TO EXPLORE</span>
                      <div className="w-6 h-10 rounded-full border-2 border-border/50 flex justify-center pt-2">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-electric-blue"
                          animate={{ y: [0, 12, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* About Us Section - Mars */}
              <PlanetSection
                id="about"
                planetName="Mars"
                planetColor="hsl(15, 80%, 45%)"
                title="ABOUT US"
                subtitle="Pioneering Technology Education & Solutions"
                planetPosition="right"
              >
                <div className="space-card p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-planet-mars/30 to-cosmic-orange/20 flex items-center justify-center">
                      <Award className="w-8 h-8 text-cosmic-orange" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        Founded by Annem Akhila
                      </h3>
                      <p className="text-sm text-muted-foreground">Visionary Leader & Technology Innovator</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Afferent Technologies Pvt Ltd is a leading technology company dedicated to bridging 
                    the gap between academic knowledge and industry expertise. We provide comprehensive 
                    internship programs, innovative project solutions, and cutting-edge IT services that 
                    prepare students and businesses for the future of technology.
                  </p>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Our mission is to empower individuals with practical skills in emerging technologies 
                    including Artificial Intelligence, Cybersecurity, Data Science, IoT, and Robotics. 
                    We believe in learning by doing, and our programs are designed to give you real-world 
                    experience that sets you apart.
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/30">
                    <div className="text-center">
                      <div className="font-display text-3xl font-black text-gradient-primary">500+</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Interns Trained</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-3xl font-black text-gradient-secondary">100+</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Projects Delivered</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-3xl font-black text-gradient-primary">50+</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Happy Clients</div>
                    </div>
                  </div>
                </div>
              </PlanetSection>

              {/* Internships Section - Saturn */}
              <PlanetSection
                id="internships"
                planetName="Saturn"
                planetColor="hsl(40, 60%, 55%)"
                title="INTERNSHIPS"
                subtitle="Launch Your Career in Technology"
                planetPosition="left"
                planetSize={500}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

              {/* Projects Section - Jupiter */}
              <PlanetSection
                id="projects"
                planetName="Jupiter"
                planetColor="hsl(25, 50%, 50%)"
                title="FINAL YEAR PROJECTS"
                subtitle="Industry-Ready Project Solutions"
                planetPosition="right"
                planetSize={550}
              >
                <div className="space-card p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Get comprehensive support for your final year projects across multiple domains. 
                    Our expert team guides you through conceptualization, implementation, and documentation 
                    to ensure your project stands out.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['AI & ML', 'Cybersecurity', 'Data Science', 'IoT', 'CSE & Software', 'Robotics'].map((domain) => (
                      <div
                        key={domain}
                        className="px-4 py-3 rounded-xl bg-muted/30 border border-border/30 text-center font-display text-sm tracking-wider hover:border-electric-blue/50 transition-colors cursor-pointer"
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
                planetColor="hsl(210, 70%, 45%)"
                title="IT COMPANY PROJECTS"
                subtitle="Enterprise-Grade Solutions"
                planetPosition="left"
              >
                <div className="space-card p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We partner with companies to deliver custom IT solutions tailored to their specific 
                    requirements. From conceptualization to deployment, we handle every aspect of your 
                    project with precision and expertise.
                  </p>

                  <ul className="space-y-3">
                    {['Custom Software Development', 'System Integration', 'Cloud Solutions', 'Enterprise Applications'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-electric-blue" />
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
                planetColor="hsl(45, 70%, 60%)"
                title="WEB DEVELOPMENT"
                subtitle="Stunning Digital Experiences"
                planetPosition="right"
              >
                <div className="space-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Globe className="w-12 h-12 text-cosmic-orange" />
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">Full-Stack Solutions</h3>
                      <p className="text-sm text-muted-foreground">Frontend, Backend & Everything In Between</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We create beautiful, responsive, and high-performance websites tailored to your 
                    business needs. From simple landing pages to complex web applications, we bring 
                    your vision to life with cutting-edge technologies.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'PostgreSQL'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-muted/50 text-xs font-display tracking-wider text-muted-foreground border border-border/30"
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
                planetColor="hsl(30, 20%, 50%)"
                title="APP DEVELOPMENT"
                subtitle="Mobile Solutions for Modern World"
                planetPosition="left"
              >
                <div className="space-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Smartphone className="w-12 h-12 text-electric-blue" />
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">iOS & Android</h3>
                      <p className="text-sm text-muted-foreground">Native & Cross-Platform Development</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Build powerful mobile applications that engage users and drive business growth. 
                    We develop native and cross-platform apps with intuitive interfaces and robust 
                    backend systems.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-muted/50 text-xs font-display tracking-wider text-muted-foreground border border-border/30"
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
                planetColor="hsl(180, 60%, 50%)"
                title="AUTOMATION"
                subtitle="AI Agents & Intelligent Systems"
                planetPosition="right"
              >
                <div className="space-card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Cpu className="w-12 h-12 text-electric-blue" />
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">AI-Powered Automation</h3>
                      <p className="text-sm text-muted-foreground">Transform Your Business Processes</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Leverage the power of AI agents to automate repetitive tasks, enhance productivity, 
                    and unlock new possibilities. Our custom automation solutions are designed to 
                    seamlessly integrate with your existing workflows.
                  </p>

                  <ul className="space-y-3">
                    {['Custom AI Agents', 'Workflow Automation', 'Chatbots & Virtual Assistants', 'Process Optimization'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <Sparkles className="w-4 h-4 text-cosmic-orange" />
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
                planetColor="hsl(200, 70%, 45%)"
                title="CONTACT US"
                subtitle="Let's Build Something Amazing Together"
                planetPosition="left"
              >
                <div className="space-card p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-electric-blue/20 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-electric-blue" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">contact@afferenttechnologies.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cosmic-orange/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-cosmic-orange" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-1">Phone</h3>
                        <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-planet-earth/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-planet-earth" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-1">Location</h3>
                        <p className="text-muted-foreground">India</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/30">
                    <p className="text-center text-sm text-muted-foreground">
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

              {/* Footer */}
              <footer className="py-12 border-t border-border/20">
                <div className="container mx-auto px-4 text-center">
                  <p className="font-display text-sm text-muted-foreground tracking-wider">
                    © {new Date().getFullYear()} AFFERENT TECHNOLOGIES PVT LTD. All rights reserved.
                  </p>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
};

export default Index;
