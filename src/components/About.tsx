import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { label: t('about.stats.projects'), val: '50+' },
    { label: t('about.stats.years'), val: '5+' },
    { label: t('about.stats.team'), val: '12+' },
    { label: t('about.stats.clients'), val: '40+' },
  ];

  return (
    <section id="about" className="scroll-mt-24 border-y border-border/80 bg-muted/5 py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="mb-8 font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
              {t('about.title')}
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <Card className="border-border/80 bg-card/40 py-2 text-center backdrop-blur-sm">
                  <CardContent className="flex flex-col justify-center py-10">
                    <span className="mb-2 font-heading text-4xl font-semibold tracking-tight text-primary lg:text-5xl">
                      {stat.val}
                    </span>
                    <span className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                      {stat.label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
