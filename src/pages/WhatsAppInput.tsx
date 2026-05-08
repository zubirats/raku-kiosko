import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function WhatsAppInput() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [phone, setPhone] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const orderId = searchParams.get('orderId');
  const orderNumber = searchParams.get('orderNumber');

  const handleSkip = () => {
    navigate(`/confirmation/${orderNumber}`);
  };

  const handleContinue = () => {
    // Validate phone (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      toast({
        variant: 'destructive',
        title: 'Número inválido',
        description: 'Ingresa 10 dígitos',
      });
      return;
    }
    setIsConfirming(true);
  };

  const handleCorrect = () => {
    setIsConfirming(false);
  };

  const handleSend = async () => {
    setIsSending(true);

    try {
      const whatsappNumber = `+52${phone}`;

      // Update order with WhatsApp number
      const { error: updateError } = await supabase
        .from('orders')
        .update({ customer_whatsapp: whatsappNumber })
        .eq('id', orderId);

      if (updateError) throw updateError;

      // In production, this would trigger Twilio via Edge Function
      // For now, just log and continue
      console.log('WhatsApp ticket to be sent to:', whatsappNumber);

      toast({
        title: t('whatsapp.success'),
      });

      navigate(`/confirmation/${orderNumber}`);
    } catch (error) {
      console.error('WhatsApp error:', error);
      toast({
        variant: 'destructive',
        title: t('common.error'),
      });
      navigate(`/confirmation/${orderNumber}`);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);

    if (limited.length <= 2) return limited;
    if (limited.length <= 6) return `${limited.slice(0, 2)} ${limited.slice(2)}`;
    return `${limited.slice(0, 2)} ${limited.slice(2, 6)} ${limited.slice(6)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFCF8] to-[#F5F1E8] flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl mx-auto p-8 space-y-8 animate-fadeInUp">
        {!isConfirming ? (
          <>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">📱</div>
              <h1 className="text-[clamp(28px,4vw,34px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
                {t('whatsapp.title')}
              </h1>
              <p className="text-[clamp(17px,2vw,20px)] text-[#4A4A4A]">
                {t('whatsapp.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-[#F5F1E8] rounded-2xl p-4">
                  <span className="text-[clamp(17px,2vw,20px)] text-[#4A4A4A] font-medium">
                    +52
                  </span>
                  <Input
                    type="tel"
                    value={formatPhone(phone)}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={t('whatsapp.placeholder')}
                    className="flex-1 text-[clamp(17px,2vw,20px)] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    maxLength={12}
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleContinue}
                  disabled={phone.length !== 10}
                  className="w-full min-h-[var(--touch-min,72px)] bg-[#2D6F4E] text-white text-[clamp(17px,2vw,20px)] font-semibold"
                >
                  {t('whatsapp.send')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="w-full min-h-[56px] text-[clamp(15px,1.8vw,17px)]"
                >
                  {t('whatsapp.skip')}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">✓</div>
              <h1 className="text-[clamp(28px,4vw,34px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
                {t('whatsapp.confirm')}
              </h1>
              <div className="text-[clamp(24px,3.5vw,28px)] font-semibold text-[#2D6F4E] tracking-tight">
                +52 {formatPhone(phone)}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleSend}
                disabled={isSending}
                className="w-full min-h-[var(--touch-min,72px)] bg-[#2D6F4E] text-white text-[clamp(17px,2vw,20px)] font-semibold"
              >
                {isSending ? t('payment.processing') : t('whatsapp.send')}
              </Button>
              <Button
                variant="outline"
                onClick={handleCorrect}
                disabled={isSending}
                className="w-full min-h-[56px] text-[clamp(15px,1.8vw,17px)]"
              >
                {t('whatsapp.correct')}
              </Button>
            </div>
          </>
        )}
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
      `}</style>
    </div>
  );
}
