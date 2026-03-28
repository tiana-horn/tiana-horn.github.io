import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const pressFeatures = [
  {
    name: "US News & World Report",
    logo: "https://tianahorn.com/images/BlackNews.png",
    url: "https://www.usnews.com/education/best-colleges/articles/2017-09-25/north-carolina-college-road-trip-duke-university",
  },
  {
    name: "Duke Chronicle",
    logo: "https://tianahorn.com/images/BlackChronicle.png",
    url: "https://www.dukechronicle.com/article/2016/03/new-bsa-president-horn-looks-to-unite-campus-minority-groups",
  },
  {
    name: "The Triangle Tribune",
    logo: "https://tianahorn.com/images/TriangleTribune.png",
    url: "https://now.dirxion.com/Triangle_Tribune/library/Triangle_Tribune_02_25_2018.pdf#page=2&zoom=80",
  },
  {
    name: "WRAL TechWire",
    logo: "https://tianahorn.com/images/BlackToday.png",
    url: "https://today.duke.edu/2016/10/quad-dedication-brings-julian-abele-out-shadows",
  },
];

const PressSection = () => {
  return (
    <section className="py-24 bg-secondary/50" id="press">
      <div className="container">
        <AnimatedSection>
          <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-2">Recognition</p>
          <h2 className="font-heading text-4xl font-bold mb-4 text-foreground">Featured In</h2>
          <p className="text-muted-foreground mb-16 max-w-lg">
            Press features and mentions across major publications.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {pressFeatures.map((press, i) => (
            <AnimatedSection key={press.name} delay={i * 0.1}>
              <motion.a
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 rounded-xl hover:bg-card transition-colors duration-300 group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={press.logo}
                  alt={`${press.name} logo`}
                  className="max-h-12 md:max-h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
