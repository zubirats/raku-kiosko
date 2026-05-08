import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMenu } from '@/hooks/use-menu';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Info } from 'lucide-react';
import { ItemDetailSheet } from '@/components/ItemDetailSheet';
import { CartSheet } from '@/components/CartSheet';
import { AdminPinZone } from '@/components/AdminPinZone';

export default function Menu() {
  const { t, i18n } = useTranslation();
  const { items, categories, isLoading } = useMenu(i18n.language);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  // Filter categories to show only top-level ones
  const topLevelCategories = categories.filter((cat) => !cat.parent_id);

  // Get items for selected category (including subcategories)
  const filteredItems = selectedCategory
    ? items.filter((item) => {
        // Check if item belongs to selected category or any of its subcategories
        const subCatIds = categories
          .filter((c) => c.parent_id === selectedCategory)
          .map((c) => c.id);

        if (subCatIds.length > 0) {
          return subCatIds.includes(item.category_id);
        }
        return item.category_id === selectedCategory;
      })
    : items;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center">
        <p className="text-[clamp(17px,2vw,20px)] text-[#4A4A4A]">
          {t('common.loading')}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-[20px] saturate-[180%] border-b border-black/[0.04]">
        <div className="max-w-[1440px] mx-auto px-[clamp(16px,2.5vw,32px)] py-4 flex items-center justify-between">
          <h1 className="text-[clamp(24px,3.5vw,28px)] font-semibold text-[#1A1A1A] tracking-[-0.5px]">
            {t('menu.title')}
          </h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-[clamp(13px,1.5vw,14px)]">
              {t(`languages.${i18n.language}`)}
            </Badge>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-[72px] z-30 bg-[#FDFCF8] border-b border-black/[0.04] overflow-x-auto">
        <div className="max-w-[1440px] mx-auto px-[clamp(16px,2.5vw,32px)] py-4">
          <div className="flex gap-2 min-w-max">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              className="min-h-[44px] px-6 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
              onClick={() => setSelectedCategory(null)}
            >
              {t('menu.title')}
            </Button>
            {topLevelCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="min-h-[44px] px-6 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <main className="max-w-[1440px] mx-auto px-[clamp(16px,2.5vw,32px)] py-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[clamp(12px,1.5vw,16px)] mb-32">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer transition-all duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.98] overflow-hidden border-[0.5px] border-black/[0.04]"
              onClick={() => setSelectedItem(item.id)}
            >
              <div className="aspect-square bg-[#F5F1E8] relative overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🍱
                  </div>
                )}
                {!item.kiosk_allowed && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Badge variant="secondary" className="gap-1">
                      <Info className="w-3 h-3" />
                      {t('menu.barOnly')}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-[clamp(15px,1.8vw,17px)] text-[#1A1A1A] line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-[clamp(17px,2vw,20px)] font-semibold text-[#2D6F4E]">
                  ${item.price.toFixed(0)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Floating Cart Button (tablet+) */}
      <div className="hidden md:block">
        <Button
          onClick={() => setShowCart(true)}
          className="fixed bottom-[clamp(20px,3vh,32px)] right-[clamp(20px,3vw,32px)] rounded-full min-h-[64px] px-8 shadow-[0_8px_24px_rgba(45,111,78,0.4)] transition-all duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_12px_32px_rgba(45,111,78,0.5)] hover:scale-[1.02] active:scale-[0.94] bg-[#2D6F4E] text-white z-50"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span className="text-[clamp(15px,1.8vw,17px)] font-semibold">
            {t('menu.cart')}
          </span>
          {itemCount > 0 && (
            <Badge className="ml-2 bg-white text-[#2D6F4E] font-bold animate-cartPulse">
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Bottom Bar (mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/[0.04] p-4 safe-bottom z-50">
        <Button
          onClick={() => setShowCart(true)}
          className="w-full min-h-[56px] bg-[#2D6F4E] text-white"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          <span className="text-[17px] font-semibold">{t('menu.cart')}</span>
          {itemCount > 0 && (
            <Badge className="ml-2 bg-white text-[#2D6F4E] font-bold">
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Sheets */}
      {selectedItem && (
        <ItemDetailSheet
          itemId={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
      <CartSheet open={showCart} onClose={() => setShowCart(false)} />

      {/* Admin Pin Zone */}
      <AdminPinZone />

      <style>{`
        @keyframes cartPulse {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-cartPulse {
          animation: cartPulse 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .safe-bottom {
          padding-bottom: max(1rem, env(safe-area-inset-bottom));
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
