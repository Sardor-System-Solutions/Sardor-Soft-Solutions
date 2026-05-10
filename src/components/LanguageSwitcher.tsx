import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LANGS = [
  { code: 'en', labelKey: 'lang.en' as const },
  { code: 'ru', labelKey: 'lang.ru' as const },
  { code: 'uz', labelKey: 'lang.uz' as const },
] as const;

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 border-border/80 bg-background/50 font-medium">
          <Languages className="size-3.5 opacity-80" />
          <span className="hidden sm:inline">{t(`lang.${i18n.language as 'en' | 'ru' | 'uz'}`)}</span>
          <span className="sm:hidden uppercase">{i18n.language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuRadioGroup
          value={i18n.language}
          onValueChange={(v) => void i18n.changeLanguage(v)}
        >
          {LANGS.map(({ code, labelKey }) => (
            <DropdownMenuRadioItem key={code} value={code}>
              {t(labelKey)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
