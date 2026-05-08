import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const REQUIRED_TAPS = 5;
const TAP_TIMEOUT = 3000; // Reset if no tap for 3 seconds

export function AdminPinZone() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [tapCount, setTapCount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [pin, setPin] = useState('');
  const [lastTapTime, setLastTapTime] = useState(0);

  const handleTap = () => {
    const now = Date.now();

    // Reset if timeout exceeded
    if (now - lastTapTime > TAP_TIMEOUT) {
      setTapCount(1);
      setLastTapTime(now);
      return;
    }

    const newCount = tapCount + 1;
    setTapCount(newCount);
    setLastTapTime(now);

    if (newCount >= REQUIRED_TAPS) {
      setShowDialog(true);
      setTapCount(0);
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleSubmit = async () => {
    if (pin.length !== 4) return;

    try {
      // Hash PIN with SHA-256
      const encoder = new TextEncoder();
      const data = encoder.encode(pin);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const pinHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      // Validate PIN using RPC
      const { data: isValid, error } = await supabase.rpc('validate_pin', {
        pin_hash: pinHash,
      });

      if (error) throw error;

      if (isValid) {
        toast({
          title: 'Acceso concedido',
          description: 'Admin mode activated',
        });
        setShowDialog(false);
        setPin('');
        // Here you would show the admin menu
        // For now, just log
        console.log('Admin access granted');
      } else {
        toast({
          variant: 'destructive',
          title: t('admin.incorrectPin'),
        });
        // Shake animation
        const dialog = document.querySelector('[role="dialog"]');
        dialog?.classList.add('animate-shake');
        setTimeout(() => {
          dialog?.classList.remove('animate-shake');
        }, 500);
        setPin('');
      }
    } catch (error) {
      console.error('PIN validation error:', error);
      toast({
        variant: 'destructive',
        title: t('common.error'),
      });
      setPin('');
    }
  };

  return (
    <>
      {/* Invisible tap zone in bottom left */}
      <div
        onClick={handleTap}
        className="fixed bottom-0 left-0 w-10 h-10 cursor-pointer z-[100]"
        aria-hidden="true"
      />

      {/* Admin PIN Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[clamp(24px,3.5vw,28px)]">
              {t('admin.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* PIN Display */}
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-[#F5F1E8] flex items-center justify-center"
                >
                  {pin.length > i && (
                    <div className="w-3 h-3 rounded-full bg-[#2D6F4E]" />
                  )}
                </div>
              ))}
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <Button
                  key={digit}
                  variant="outline"
                  className="h-16 text-2xl font-semibold"
                  onClick={() => handlePinInput(digit.toString())}
                >
                  {digit}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-16 text-xl"
                onClick={handleClear}
              >
                ⌫
              </Button>
              <Button
                variant="outline"
                className="h-16 text-2xl font-semibold"
                onClick={() => handlePinInput('0')}
              >
                0
              </Button>
              <Button
                variant="default"
                className="h-16 bg-[#2D6F4E] text-white"
                onClick={handleSubmit}
                disabled={pin.length !== 4}
              >
                ✓
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}
