import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const SkillsSection = () => {
  const skillLevels = [
    { label: "Expert", skills: ["Python", "Django", "Java", "CSS", "MySQL", "JavaScript", "React", "NextJS", "REST APIs", "HTML", "PostgreSQL"] },
    { label: "Proficient", skills: ["React-Native", "Tailwind", "Bootstrap", "AWS", "TypeScript"] },
    { label: "Competent", skills: ["jQuery", "Tachyons.io", "Groovi", "Vue.js", "Figma", "PHP"] },
    { label: "Beginner", skills: ["Esri/ArcGIS", "PostGIS", "Terraform", "Swift"] },
  ];

  return (
    <section className="py-24 bg-secondary/50" id="skills">
      <div className="container">
        <AnimatedSection>
          <p className="font-heading text-primary text-sm tracking-[0.2em] uppercase mb-2">Expertise</p>
          <h2 className="font-heading text-4xl font-bold mb-12">Technical Skills</h2>
        </AnimatedSection>

        <div className="grid gap-8">
          {skillLevels.map((level, li) => (
            <AnimatedSection key={level.label} delay={li * 0.1}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <span className="font-heading text-sm font-semibold text-primary tracking-wider uppercase w-28 shrink-0 pt-1">
                  {level.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {level.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: li * 0.1 + si * 0.03, duration: 0.3 }}
                      className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground font-body hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
