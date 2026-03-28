import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <AnimatedSection delay={0.2}>
              <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-4">Full-Stack Software Engineer</p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
                Tiana M.{" "}
                <span className="text-gradient">Horn</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Building impactful software with Python, Django, React & NextJS. 
                Duke University alumna. Entrepreneur & public speaker.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/tiana-horn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm font-medium hover:opacity-90 transition-all hover:scale-105"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href="https://tianahorn.com/files/HornTianaResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-border text-foreground font-heading text-sm font-medium hover:border-primary hover:text-primary transition-all hover:scale-105"
                >
                  View Resume
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} direction="right" className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl rotate-3 scale-105" />
              <motion.img
                src="https://tianahorn.com/images/tiana.jpg"
                alt="Tiana M. Horn"
                className="relative rounded-2xl w-72 md:w-80 object-cover shadow-2xl shadow-primary/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
