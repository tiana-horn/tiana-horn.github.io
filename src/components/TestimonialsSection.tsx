import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "She doesn't let problems stop her from making progress.",
    name: "Howie Rhee",
    title: "Duke Innovation & Entrepreneurship Managing Director",
    source: "Duke Chronicle 2016",
  },
  {
    quote: "[Gambardella] attributed Horn's success to her hard work and \"go-getter\" mentality.",
    name: "Dylan Gambardella",
    title: "Founder Next-Gen Summit",
    source: "Duke Chronicle 2016",
  },
  {
    quote: "Horn has high academic and professional ambitions.",
    name: "Alexandra Pannoni",
    title: "USNews & World Report Staff Writer",
    source: "USNews & World Report 2017",
  },
  {
    quote: "She is an asset to any organization that is lucky enough to work with her.",
    name: "Valerie Ashby",
    title: "Dean of Duke University Trinity College of Arts & Sciences",
    source: "",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24" id="testimonials">
      <div className="container">
        <AnimatedSection>
          <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-2">What Others Say</p>
          <h2 className="font-heading text-4xl font-bold mb-12">Testimonials</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                className="glass-card p-8 h-full flex flex-col"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-primary text-4xl font-heading leading-none mb-4">❝</span>
                <p className="text-foreground text-lg italic leading-relaxed flex-1 mb-6">{t.quote}</p>
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.title}</p>
                  {t.source && <p className="text-muted-foreground text-xs mt-1">{t.source}</p>}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
