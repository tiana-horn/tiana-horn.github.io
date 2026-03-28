import AnimatedSection from "./AnimatedSection";

const EducationSection = () => {
  const schools = [
    {
      name: "Momentum Learning",
      program: "Python Full-Stack Development",
      date: "January 2019",
      logo: "https://tianahorn.com/images/momentum-logo.png",
      url: "https://www.momentumlearn.com/",
    },
    {
      name: "Duke University",
      program: "Major: Public Policy",
      date: "September 2017",
      logo: "https://tianahorn.com/images/Dukecrest.png",
      url: "https://www.duke.edu/",
    },
  ];

  return (
    <section className="py-24" id="education">
      <div className="container">
        <AnimatedSection>
          <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-2">Background</p>
          <h2 className="font-heading text-4xl font-bold mb-12">Education</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {schools.map((school, i) => (
            <AnimatedSection key={school.name} delay={i * 0.15}>
              <a
                href={school.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 flex items-center gap-6 group hover:border-primary/30 transition-all duration-300 block"
              >
                <img src={school.logo} alt={school.name} className="w-16 h-16 object-contain rounded-lg group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">{school.name}</h3>
                  <p className="text-muted-foreground text-sm">{school.program}</p>
                  <p className="text-primary text-sm mt-1">{school.date}</p>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
