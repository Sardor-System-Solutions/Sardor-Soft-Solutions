import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-[padding,box-shadow] duration-300',
        'nav-liquid',
        isScrolled ? 'nav-liquid--scrolled py-3' : 'py-4',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="/" className="transition-opacity hover:opacity-90">
          <Logo />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
          <LanguageSwitcher />
          <Button size="lg" className="rounded-xl px-5 font-semibold" asChild>
            <a href="#contact">{t('nav.cta')}</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="nav-drawer-liquid overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="mt-3 w-full rounded-xl font-semibold" asChild>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.cta')}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
