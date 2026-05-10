import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

type Step = { title: string; desc: string };

export default function Process() {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as Step[];

  return (
    <section id="process" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
            {t('process.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('process.subtitle')}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="relative"
            >
              <span className="mb-5 block font-mono text-5xl font-bold text-muted/40 transition-colors duration-500 lg:text-6xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-3 font-heading text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute top-10 -right-4 hidden h-px w-8 bg-border lg:block" aria-hidden />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
