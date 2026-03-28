import AnimatedSection from "./AnimatedSection";

const experiences = [
  {
    company: "Favored Paper",
    location: "Durham, NC",
    role: "Founder",
    period: "January 2025 - Present",
    highlights: [
      "Design art and content for notebooks, faith planner, wall art, stickers, cards and products for a Christian stationary company.",
      "Manage inventory across Amazon and online marketplaces.",
    ],
  },
  {
    company: "Color Of Change",
    location: "Remote",
    role: "Full-Stack Software Engineer",
    period: "April 2022 - January 2025",
    highlights: [
      "Architect and develop backend database and REST API for a platform to manage social justice campaigns.",
      "Discovered the cause and code fix for accessibility issues affecting millions of donor emails.",
      "Saved the company over $15,000 in annual website hosting costs within first month.",
      "Built form fields that protect against nested SQL injections and dynamically update source codes.",
    ],
  },
  {
    company: "ArchiveSocial",
    location: "Durham, NC",
    role: "Associate Software Engineer",
    period: "July 2019 - October 2020",
    highlights: [
      "Write, review, and test backend and frontend code. Deploy code to production for customers including the Obama Administration.",
      "Use Java, MySQL, JavaScript, and APIs for Facebook, Instagram to archive social media records.",
    ],
  },
  {
    company: "Flower Child Remedies",
    location: "Durham, NC",
    role: "CEO/CTO and Cofounder",
    period: "Aug 2015 - Present",
    highlights: [
      "Architect e-commerce web app using Python, Django, AWS, Stripe, and PostgreSQL.",
      "Build algorithms to create customized hair products and reflect pay gap pricing.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section className="py-24 bg-secondary/50" id="experience">
      <div className="container">
        <AnimatedSection>
          <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-2">Career</p>
          <h2 className="font-heading text-4xl font-bold mb-12">Experience</h2>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.company + exp.role} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? "" : "md:flex-row-reverse"} gap-8`}>
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 w-4 h-4 rounded-full bg-primary border-4 border-secondary z-10" />

                  {/* Spacer */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card */}
                  <div className="ml-8 md:ml-0 md:w-1/2 glass-card p-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-heading text-lg font-semibold text-foreground">{exp.company}</h3>
                      <span className="text-muted-foreground text-xs">{exp.location}</span>
                    </div>
                    <p className="text-primary font-heading text-sm font-medium">{exp.role}</p>
                    <p className="text-muted-foreground text-xs mb-3">{exp.period}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, hi) => (
                        <li key={hi} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                          <span className="text-primary mt-1.5 shrink-0">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
