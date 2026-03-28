import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const speakingEvents = [
  { title: "Black History Month Panel", date: "February 26, 2025", image: "https://tianahorn.com/images/speaking/BHMFlyer2.png" },
  { title: "Duke University Black in Business Panel", date: "March 25, 2019", image: "https://tianahorn.com/images/speaking/BiBflyer.png" },
  { title: "Choice FM Appearance", date: "February 23, 2019", image: "https://tianahorn.com/images/speaking/radio.jpg" },
  { title: "Lessons from Entrepreneurial Women", date: "February 23, 2019", image: "https://tianahorn.com/images/speaking/entreprenuerial.png" },
  { title: "MLK Commemoration", date: "January 15, 2017", image: "https://tianahorn.com/images/speaking/MLKday.jpeg" },
  { title: "Abele Quad Dedication", date: "September 30, 2016", image: "https://tianahorn.com/images/speaking/abeleplaque.jpeg" },
  { title: "Duke Graduation Final Honors Ceremony", date: "May 13, 2017", image: "https://tianahorn.com/images/speaking/FinalHonors.jpg" },
];

const Speaking = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container">
          <AnimatedSection>
            <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-2">Engagements</p>
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
              Public <span className="text-gradient">Speaking</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-16 max-w-xl">
              Panels, keynotes, and media appearances on entrepreneurship, technology, and social justice.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakingEvents.map((event, i) => (
              <AnimatedSection key={event.title} delay={i * 0.08}>
                <motion.div
                  className="glass-card overflow-hidden group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{event.title}</h3>
                    <p className="text-primary text-sm">{event.date}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Speaking;
