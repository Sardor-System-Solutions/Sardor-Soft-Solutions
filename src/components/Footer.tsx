import { useTranslation } from 'react-i18next';

import { Separator } from '@/components/ui/separator';

import { Logo } from './Logo';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 px-6 pt-20 pb-12">
      <div className="container mx-auto">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="/" className="mb-6 inline-block">
              <Logo />
            </a>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.services')}
                </a>
              </li>
              <li>
                <a href="#process" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.process')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.contacts')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
              {t('footer.community')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.telegram')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.instagram')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.linkedin')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t('footer.github')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8 bg-border/80" />

        <div className="flex flex-col items-center justify-between gap-4 text-[11px] text-muted-foreground md:flex-row">
          <p className="font-mono tracking-wide uppercase">
            © {year} Sardor System Solutions. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="font-mono tracking-wide uppercase transition-colors hover:text-foreground">
              {t('footer.privacy')}
            </a>
            <a href="#" className="font-mono tracking-wide uppercase transition-colors hover:text-foreground">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
