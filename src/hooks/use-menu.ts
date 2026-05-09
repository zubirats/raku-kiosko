import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const RESTAURANT_ID = import.meta.env.VITE_RESTAURANT_ID;

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string;
  image_url: string | null;
  kiosk_allowed: boolean;
  availability_status: string;
  modifiers?: Modifier[];
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  display_order: number;
}

export function useMenu(locale: string) {
  const menuQuery = useQuery({
    queryKey: ['menu', locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select(`
          id,
          name,
          description,
          price,
          category_id,
          image_url,
          kiosk_allowed,
          availability_status,
          modifiers,
          menu_item_translations(
            locale,
            name,
            description
          )
        `)
        .eq('restaurant_id', RESTAURANT_ID)
        .eq('kiosk_allowed', true)
        .eq('availability_status', 'active');

      if (error) throw error;

      // Map translations to main item — pick locale match, fallback to ES, then to base name
      return (data || []).map((item: any) => {
        const translations = item.menu_item_translations || [];
        const translation =
          translations.find((t: any) => t.locale === locale) ||
          translations.find((t: any) => t.locale === 'es');
        return {
          id: item.id,
          name: translation?.name || item.name,
          description: translation?.description || item.description,
          price: item.price,
          category_id: item.category_id,
          image_url: item.image_url,
          kiosk_allowed: item.kiosk_allowed,
          availability_status: item.availability_status,
          modifiers: item.modifiers || [],
        };
      }) as MenuItem[];
    },
    staleTime: 60000, // Cache for 60 seconds
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories', locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_categories')
        .select(`
          id,
          name,
          parent_id,
          display_order,
          category_translations(
            locale,
            name
          )
        `)
        .eq('restaurant_id', RESTAURANT_ID)
        .order('display_order');

      if (error) throw error;

      return (data || []).map((cat: any) => {
        const translations = cat.category_translations || [];
        const translation =
          translations.find((t: any) => t.locale === locale) ||
          translations.find((t: any) => t.locale === 'es');
        return {
          id: cat.id,
          name: translation?.name || cat.name,
          parent_id: cat.parent_id,
          display_order: cat.display_order,
        };
      }) as Category[];
    },
    staleTime: 60000,
  });

  return {
    items: menuQuery.data || [],
    categories: categoriesQuery.data || [],
    isLoading: menuQuery.isLoading || categoriesQuery.isLoading,
    error: menuQuery.error || categoriesQuery.error,
  };
}
