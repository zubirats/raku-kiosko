import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

const RESET_TIMEOUT = 60000; // 60 seconds

export default function Confirmation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [countdown, setCountdown] = useState(60);
  const { loyaltyMemberId, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const pointsEarned = Math.floor(total);

  useEffect(() => {
    // Start countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleNewOrder();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNewOrder = () => {
    clearCart();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFCF8] to-[#F5F1E8] flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl mx-auto p-8 space-y-8 text-center animate-fadeInUp">
        {/* Success Icon */}
        <div className="animate-successPulse">
          <CheckCircle2 className="w-24 h-24 mx-auto text-[#2D6F4E]" strokeWidth={1.5} />
        </div>

        {/* Thank you message */}
        <div className="space-y-4">
          <h1 className="text-[clamp(28px,4vw,34px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
            {t('confirmation.thanks')}
          </h1>
        </div>

        {/* Order number */}
        <div className="space-y-2">
          <p className="text-[clamp(17px,2vw,20px)] text-[#4A4A4A]">
            {t('confirmation.yourNumber')}
          </p>
          <div className="text-[clamp(40px,6vw,88px)] font-semibold text-[#2D6F4E] tracking-tight tabular-nums">
            {orderNumber}
          </div>
        </div>

        {/* Notification message */}
        <p className="text-[clamp(17px,2vw,20px)] text-[#4A4A4A]">
          {t('confirmation.notification')}
        </p>

        {/* Loyalty points (if applicable) */}
        {loyaltyMemberId && (
          <Badge className="text-[clamp(15px,1.8vw,17px)] px-6 py-3 bg-[#2D6F4E] text-white">
            +{pointsEarned} {t('confirmation.pointsEarned')}
          </Badge>
        )}

        {/* Countdown and CTA */}
        <div className="space-y-4 pt-4">
          <p className="text-[clamp(15px,1.8vw,17px)] text-[#8B8B8B]">
            {t('confirmation.countdownPrefix')} <strong className="tabular-nums">{countdown}</strong> {t('confirmation.countdownSuffix')}
          </p>
          <Button
            onClick={handleNewOrder}
            className="w-full min-h-[var(--touch-min,72px)] bg-[#2D6F4E] text-white text-[clamp(17px,2vw,20px)] font-semibold"
          >
            {t('confirmation.newOrder')}
          </Button>
        </div>
      </Card>

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
        @keyframes successPulse {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-successPulse {
          animation: successPulse 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
