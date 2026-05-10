import { motion } from 'motion/react';
import { Database, Globe, Layout, Search, Smartphone, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ServiceItem = { title: string; desc: string };

const ICONS = [Globe, Smartphone, Layout, Database, Zap, Search] as const;

export default function Services() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <section id="services" className="scroll-mt-24 py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="mb-4 font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('services.subtitle')}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, i) => {
            const Icon = ICONS[i] ?? Globe;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="group h-full border-border/80 bg-card/50 transition-colors hover:border-primary/25 hover:bg-card/80">
                  <CardHeader className="pb-2">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-[1.02]">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <CardTitle className="font-heading text-lg font-semibold tracking-tight">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {service.desc}
                    </CardDescription>
                    <div className="mt-6 h-px w-full bg-border/80" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
