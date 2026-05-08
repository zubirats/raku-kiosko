import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';

export default function Closed() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFCF8] to-[#F5F1E8] flex items-center justify-center p-8">
      <div className="w-full max-w-2xl mx-auto text-center space-y-8 animate-fadeInUp">
        <Clock className="w-24 h-24 mx-auto text-[#2D6F4E]" strokeWidth={1.5} />

        <div className="space-y-4">
          <h1 className="text-[clamp(40px,6vw,88px)] font-semibold text-[#1A1A1A] tracking-tight">
            {t('welcome.closed')}
          </h1>
          <p className="text-[clamp(28px,4vw,34px)] text-[#4A4A4A] font-medium">
            Raku Café
          </p>
          <p className="text-[clamp(17px,2vw,20px)] text-[#8B8B8B]">
            {t('welcome.hours')}
          </p>
        </div>
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
      `}</style>
    </div>
  );
}
