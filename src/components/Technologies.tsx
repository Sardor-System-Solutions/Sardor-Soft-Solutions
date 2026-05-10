import { useTranslation } from 'react-i18next';

const TECHS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Flutter',
  'Docker',
] as const;

export default function Technologies() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border/80 py-16">
      <div className="container mx-auto px-6">
        <p className="mb-10 text-center text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
          {t('technologies.label')}
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 opacity-55 transition-opacity duration-500 hover:opacity-100">
          {TECHS.map((tech) => (
            <span
              key={tech}
              className="font-heading text-xl font-semibold tracking-tight whitespace-nowrap text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
