const skillCategories = [
  {
    name: "Programming",
    skills: ["Ruby", "Python", "Rust", "TypeScript", "SQL"],
  },
  {
    name: "Backend & frontend",
    skills: ["Ruby on Rails", "Flask", "React", "PostgreSQL", "Redis"],
  },
  {
    name: "Cloud & tooling",
    skills: [
      "AWS",
      "Kubernetes",
      "Terraform",
      "Docker",
      "Datadog",
      "Cloudflare",
    ],
  },
  {
    name: "Working mode",
    skills: [
      "Platform engineering",
      "On-call",
      "Technical ownership",
      "System migrations",
    ],
  },
];

export default function Skills() {
  return (
    <div className="skill-grid">
      {skillCategories.map((category) => (
        <div key={category.name} className="skill-group">
          <h3 className="eyebrow">{category.name}</h3>
          <div className="skill-list">
            {category.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
