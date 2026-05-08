import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMenu } from '@/hooks/use-menu';
import { useCartStore } from '@/stores/cart-store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';

interface ItemDetailSheetProps {
  itemId: string;
  open: boolean;
  onClose: () => void;
}

export function ItemDetailSheet({ itemId, open, onClose }: ItemDetailSheetProps) {
  const { t, i18n } = useTranslation();
  const { items } = useMenu(i18n.language);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);

  const item = items.find((i) => i.id === itemId);

  if (!item) return null;

  const modifiers = item.modifiers || [];
  const selectedModifierObjects = modifiers.filter((m) =>
    selectedModifiers.includes(m.id)
  );
  const modifierTotal = selectedModifierObjects.reduce((sum, m) => sum + m.price, 0);
  const itemTotal = (item.price + modifierTotal) * quantity;

  const handleToggleModifier = (modifierId: string) => {
    setSelectedModifiers((prev) =>
      prev.includes(modifierId)
        ? prev.filter((id) => id !== modifierId)
        : [...prev, modifierId]
    );
  };

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      modifiers: selectedModifierObjects.map((m) => ({
        id: m.id,
        name: m.name,
        price: m.price,
      })),
      imageUrl: item.image_url || undefined,
    });

    // Reset and close
    setQuantity(1);
    setSelectedModifiers([]);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[90vh] max-h-[90vh] rounded-t-3xl md:h-auto md:max-h-[80vh] md:left-1/2 md:-translate-x-1/2 md:max-w-[720px] md:rounded-3xl overflow-auto"
      >
        <div className="drag-handle md:hidden w-10 h-1 bg-black/20 rounded-full mx-auto mb-4" />

        <SheetHeader>
          <div className="aspect-square max-w-[300px] mx-auto bg-[#F5F1E8] rounded-2xl overflow-hidden mb-4">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🍱
              </div>
            )}
          </div>
          <SheetTitle className="text-[clamp(28px,4vw,34px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
            {item.name}
          </SheetTitle>
          {item.description && (
            <SheetDescription className="text-[clamp(15px,1.8vw,17px)] text-[#8B8B8B]">
              {item.description}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Modifiers */}
          {modifiers.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[clamp(17px,2vw,20px)] font-semibold text-[#1A1A1A]">
                {t('item.modifiers')}
              </h3>
              <div className="space-y-3">
                {modifiers.map((modifier) => (
                  <div
                    key={modifier.id}
                    className="flex items-center justify-between p-4 bg-[#F5F1E8] rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={modifier.id}
                        checked={selectedModifiers.includes(modifier.id)}
                        onCheckedChange={() => handleToggleModifier(modifier.id)}
                      />
                      <Label
                        htmlFor={modifier.id}
                        className="text-[clamp(15px,1.8vw,17px)] cursor-pointer"
                      >
                        {modifier.name}
                      </Label>
                    </div>
                    <span className="text-[clamp(15px,1.8vw,17px)] font-medium text-[#2D6F4E]">
                      +${modifier.price.toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-4">
            <h3 className="text-[clamp(17px,2vw,20px)] font-semibold text-[#1A1A1A]">
              {t('item.quantity')}
            </h3>
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-5 h-5" />
              </Button>
              <span className="text-[clamp(28px,4vw,34px)] font-semibold w-16 text-center tabular-nums">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Add to cart button */}
          <Button
            onClick={handleAddToCart}
            className="w-full min-h-[var(--touch-min,72px)] bg-[#2D6F4E] text-white text-[clamp(17px,2vw,20px)] font-semibold rounded-2xl transition-all duration-[180ms] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
          >
            {t('item.addToCart')} • ${itemTotal.toFixed(0)}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
