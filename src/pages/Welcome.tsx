import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const languages = [
  { code: 'es', name: 'Español', flag: '🇲🇽' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export default function Welcome() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageSelect = (lang: string) => {
    i18n.changeLanguage(lang);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFCF8] to-[#F5F1E8] flex items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto text-center space-y-12 animate-fadeInUp">
        {/* Logo */}
        <div className="space-y-4">
          <h1 className="text-[clamp(40px,6vw,88px)] font-semibold text-[#1A1A1A] tracking-tight">
            Raku Café
          </h1>
          <p className="text-[clamp(28px,4vw,34px)] text-[#4A4A4A] font-medium">
            {t('welcome.title')}
          </p>
          <p className="text-[clamp(17px,2vw,20px)] text-[#8B8B8B]">
            {t('welcome.subtitle')}
          </p>
        </div>

        {/* Language selection */}
        <div className="space-y-4">
          <p className="text-[clamp(15px,1.8vw,17px)] text-[#4A4A4A] font-medium">
            {t('welcome.selectLanguage')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {languages.map((lang) => (
              <Card
                key={lang.code}
                className="group cursor-pointer transition-all duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] active:scale-[0.96] overflow-hidden border-[0.5px] border-black/[0.04]"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <Button
                  variant="ghost"
                  className="w-full h-full min-h-[var(--touch-min,72px)] flex flex-col items-center justify-center gap-2 p-6 hover:bg-[#2D6F4E]/[0.08]"
                >
                  <span className="text-5xl">{lang.flag}</span>
                  <span className="text-[clamp(17px,2vw,20px)] font-medium text-[#1A1A1A]">
                    {lang.name}
                  </span>
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Optional: Scan rewards */}
        <Button
          variant="outline"
          className="mt-8 text-[clamp(15px,1.8vw,17px)] min-h-[56px] px-8"
          onClick={() => navigate('/menu')}
        >
          {t('welcome.scanRewards')}
        </Button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 420ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        :root {
          --touch-min: 56px;
        }
        @media (min-width: 600px) and (max-width: 1023px) {
          :root {
            --touch-min: 64px;
          }
        }
        @media (min-width: 1024px) {
          :root {
            --touch-min: 72px;
          }
        }
      `}</style>
    </div>
  );
}
