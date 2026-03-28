import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Ecommerce Website",
    description: "Built algorithm that allows customers to submit a quiz that will dynamically create the recipe for a 12 ounce personalized deep conditioner based on their hair type. Used Python, Django, Javascript, Stripe, HTML, and CSS.",
    image: "https://tianahorn.com/images/FCRmockup3.png",
    tags: ["Python", "Django", "JavaScript", "Stripe"],
  },
  {
    title: "Programsuite",
    description: "Platform for managing social justice campaigns with complex data relationships. Features include notifications, mentioning users, campaign management, pagination, and third-party authentication integration.",
    image: "https://tianahorn.com/images/programsuite.png",
    tags: ["Python", "Django", "NextJS"],
  },
  {
    title: "Wedding Website",
    description: "Responsive wedding website allowing guests to search for their invitation and RSVP to multiple events. Features include Google Sheets integration, image carousels, custom cursors, and password protection.",
    image: "https://tianahorn.com/images/WeddingWebsite.png",
    tags: ["Python", "Django", "HTML", "CSS"],
  },
  {
    title: "SourceZilla",
    description: "Dynamic source generator to create source links based on user input. Reference codes update based on the source and input fields are protected from nested SQL injections.",
    image: "https://tianahorn.com/images/SourceZillaMockup.png",
    tags: ["React", "TypeScript"],
  },
];

const ProjectsSection = () => {
  return (
    <section className="py-24" id="projects">
      <div className="container">
        <AnimatedSection>
          <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-2">Portfolio</p>
          <h2 className="font-heading text-4xl font-bold mb-12">Projects</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.12}>
              <motion.div
                className="glass-card overflow-hidden group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-heading font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
