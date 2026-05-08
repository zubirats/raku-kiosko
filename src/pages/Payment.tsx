import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, AlertCircle } from 'lucide-react';
import { paymentService } from '@/services/payment-service';
import { createKioskOrder } from '@/services/order-service';
import { supabase } from '@/integrations/supabase/client';

const PAYMENT_TIMEOUT = 90000; // 90 seconds
const MAX_RETRIES = 3;

export default function Payment() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, getTotal, loyaltyMemberId } = useCartStore();
  const [status, setStatus] = useState<'processing' | 'failed' | 'success'>('processing');
  const [retryCount, setRetryCount] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const total = getTotal();

  useEffect(() => {
    if (items.length === 0) {
      navigate('/menu');
      return;
    }

    processPayment();
  }, []);

  const processPayment = async () => {
    setStatus('processing');
    setErrorMessage(null);

    try {
      // Create order first
      const { orderId: newOrderId, orderNumber: newOrderNumber } = await createKioskOrder({
        items,
        total,
        loyaltyMemberId,
      });

      setOrderId(newOrderId);
      setOrderNumber(newOrderNumber);

      // Get a mock terminal (in production, this would be a real terminal selection)
      const { data: terminals } = await supabase
        .from('payment_terminals')
        .select('id')
        .eq('status', 'available')
        .eq('provider', 'mock')
        .limit(1)
        .single();

      if (!terminals) {
        throw new Error('No terminal available');
      }

      // Process payment
      const result = await paymentService.processPayment(
        total,
        newOrderId,
        terminals.id
      );

      if (result.success) {
        setStatus('success');
        // Navigate to WhatsApp input (or confirmation if skipped)
        setTimeout(() => {
          navigate(`/whatsapp?orderId=${newOrderId}&orderNumber=${newOrderNumber}`);
        }, 1000);
      } else {
        throw new Error(result.errorMessage || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);

      if (retryCount < MAX_RETRIES - 1) {
        setRetryCount(retryCount + 1);
        setTimeout(() => {
          processPayment();
        }, 2000);
      } else {
        setStatus('failed');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      }
    }
  };

  const handleGoToCashier = () => {
    navigate(`/confirmation/${orderNumber}`);
  };

  const handleCancel = () => {
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFCF8] to-[#F5F1E8] flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl mx-auto p-8 space-y-8 animate-fadeInUp">
        {status === 'processing' && (
          <>
            <div className="text-center space-y-6">
              <div className="relative">
                <CreditCard className="w-24 h-24 mx-auto text-[#2D6F4E]" strokeWidth={1.5} />
                <Loader2 className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2D6F4E] animate-spin" />
              </div>

              <div className="space-y-2">
                <h1 className="text-[clamp(28px,4vw,34px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
                  {t('payment.title')}
                </h1>
                <p className="text-[clamp(17px,2vw,20px)] text-[#4A4A4A]">
                  {t('payment.insertCard')}
                </p>
                {retryCount > 0 && (
                  <p className="text-[clamp(15px,1.8vw,17px)] text-[#8B8B8B]">
                    {t('payment.processing')} (Intento {retryCount + 1}/{MAX_RETRIES})
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-[clamp(15px,1.8vw,17px)] text-[#8B8B8B]">
                  {t('cart.total')}
                </p>
                <p className="text-[clamp(40px,6vw,88px)] font-semibold text-[#2D6F4E] tabular-nums">
                  ${total.toFixed(0)}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full min-h-[56px]"
            >
              {t('payment.cancel')}
            </Button>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="text-center space-y-6">
              <AlertCircle className="w-24 h-24 mx-auto text-red-600" strokeWidth={1.5} />

              <div className="space-y-2">
                <h1 className="text-[clamp(28px,4vw,34px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
                  {t('payment.failed')}
                </h1>
                {errorMessage && (
                  <p className="text-[clamp(15px,1.8vw,17px)] text-[#8B8B8B]">
                    {errorMessage}
                  </p>
                )}
              </div>

              <Alert>
                <AlertDescription className="text-center">
                  {t('payment.goToCashier')} <strong>{orderNumber}</strong>
                  <br />
                  <span className="text-[clamp(17px,2vw,20px)] font-semibold text-[#2D6F4E]">
                    ${total.toFixed(0)}
                  </span>
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleGoToCashier}
                className="w-full min-h-[var(--touch-min,72px)] bg-[#2D6F4E] text-white"
              >
                Continuar
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full min-h-[56px]"
              >
                Nueva orden
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
