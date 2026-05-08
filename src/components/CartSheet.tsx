import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cart-store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, AlertCircle } from 'lucide-react';

const MAX_TRANSACTION = 2000;

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
}

export function CartSheet({ open, onClose }: CartSheetProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();
  const exceedsLimit = total > MAX_TRANSACTION;

  const handlePay = () => {
    if (items.length === 0) return;
    if (exceedsLimit) return;
    onClose();
    navigate('/payment');
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[90vh] max-h-[90vh] rounded-t-3xl md:h-auto md:max-h-[80vh] md:left-1/2 md:-translate-x-1/2 md:max-w-[720px] md:rounded-3xl overflow-hidden flex flex-col"
      >
        <div className="drag-handle md:hidden w-10 h-1 bg-black/20 rounded-full mx-auto mb-4" />

        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-[clamp(28px,4vw,34px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
            {t('cart.title')}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[clamp(17px,2vw,20px)] text-[#8B8B8B]">
              {t('cart.empty')}
            </p>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {items.map((item) => {
                const itemTotal = (item.price + item.modifiers.reduce((sum, m) => sum + m.price, 0)) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-[#F5F1E8] rounded-2xl space-y-3"
                  >
                    <div className="flex gap-3">
                      {item.imageUrl && (
                        <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[clamp(15px,1.8vw,17px)] text-[#1A1A1A] truncate">
                          {item.name}
                        </h4>
                        {item.modifiers.length > 0 && (
                          <p className="text-[clamp(14px,1.6vw,15px)] text-[#8B8B8B]">
                            {item.modifiers.map((m) => m.name).join(', ')}
                          </p>
                        )}
                        <p className="text-[clamp(15px,1.8vw,17px)] font-semibold text-[#2D6F4E] mt-1">
                          ${itemTotal.toFixed(0)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-[clamp(15px,1.8vw,17px)] font-medium w-8 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Limit warning */}
            {exceedsLimit && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {t('cart.limitExceeded')}
                </AlertDescription>
              </Alert>
            )}

            {/* Totals */}
            <div className="flex-shrink-0 space-y-4 pt-4 border-t border-black/[0.04]">
              <div className="space-y-2">
                <div className="flex justify-between text-[clamp(15px,1.8vw,17px)] text-[#4A4A4A]">
                  <span>{t('cart.subtotal')}</span>
                  <span className="tabular-nums">${total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[clamp(15px,1.8vw,17px)] text-[#4A4A4A]">
                  <span>{t('cart.tax')}</span>
                  <span className="tabular-nums">$0</span>
                </div>
                <Separator />
                <div className="flex justify-between text-[clamp(17px,2vw,20px)] font-semibold text-[#1A1A1A]">
                  <span>{t('cart.total')}</span>
                  <span className="tabular-nums">${total.toFixed(0)}</span>
                </div>
              </div>

              <Button
                onClick={handlePay}
                disabled={items.length === 0 || exceedsLimit}
                className="w-full min-h-[var(--touch-min,72px)] bg-[#2D6F4E] text-white text-[clamp(17px,2vw,20px)] font-semibold rounded-2xl transition-all duration-[180ms] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96] disabled:opacity-50"
              >
                {t('cart.pay')} ${total.toFixed(0)}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
