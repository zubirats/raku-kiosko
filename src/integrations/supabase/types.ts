export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      assignment_history: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          restaurant_id: string
          staff_id: string
          station_id: string | null
          task_description: string | null
          task_type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          restaurant_id: string
          staff_id: string
          station_id?: string | null
          task_description?: string | null
          task_type?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          restaurant_id?: string
          staff_id?: string
          station_id?: string | null
          task_description?: string | null
          task_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_history_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_history_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "kitchen_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_history_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "kitchen_stations"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_registers: {
        Row: {
          actual_cash: number | null
          card_sales: number | null
          cash_difference: number | null
          cash_sales: number | null
          closed_at: string | null
          closed_by: string | null
          closing_balance: number | null
          courtesy_sales: number | null
          expected_cash: number | null
          id: string
          notes: string | null
          opened_at: string | null
          opened_by: string
          opening_balance: number
          restaurant_id: string
          shift_date: string
          status: string | null
          total_card: number | null
          total_cash: number | null
          total_orders: number | null
          total_sales: number | null
          total_tips: number | null
          total_transfer: number | null
          transfer_sales: number | null
        }
        Insert: {
          actual_cash?: number | null
          card_sales?: number | null
          cash_difference?: number | null
          cash_sales?: number | null
          closed_at?: string | null
          closed_by?: string | null
          closing_balance?: number | null
          courtesy_sales?: number | null
          expected_cash?: number | null
          id?: string
          notes?: string | null
          opened_at?: string | null
          opened_by: string
          opening_balance?: number
          restaurant_id: string
          shift_date?: string
          status?: string | null
          total_card?: number | null
          total_cash?: number | null
          total_orders?: number | null
          total_sales?: number | null
          total_tips?: number | null
          total_transfer?: number | null
          transfer_sales?: number | null
        }
        Update: {
          actual_cash?: number | null
          card_sales?: number | null
          cash_difference?: number | null
          cash_sales?: number | null
          closed_at?: string | null
          closed_by?: string | null
          closing_balance?: number | null
          courtesy_sales?: number | null
          expected_cash?: number | null
          id?: string
          notes?: string | null
          opened_at?: string | null
          opened_by?: string
          opening_balance?: number
          restaurant_id?: string
          shift_date?: string
          status?: string | null
          total_card?: number | null
          total_cash?: number | null
          total_orders?: number | null
          total_sales?: number | null
          total_tips?: number | null
          total_transfer?: number | null
          transfer_sales?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cash_registers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_visible: boolean | null
          name: string
          parent_id: string | null
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          name: string
          parent_id?: string | null
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          name?: string
          parent_id?: string | null
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      category_station_mapping: {
        Row: {
          category_id: string
          created_at: string
          id: string
          kds_station: string
          restaurant_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          kds_station?: string
          restaurant_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          kds_station?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_station_mapping_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_station_mapping_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_runs: {
        Row: {
          checklist_id: string
          completed_at: string | null
          created_at: string
          id: string
          restaurant_id: string
          results: Json
          started_at: string
          started_by: string
          status: string
        }
        Insert: {
          checklist_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          restaurant_id: string
          results?: Json
          started_at?: string
          started_by: string
          status?: string
        }
        Update: {
          checklist_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          restaurant_id?: string
          results?: Json
          started_at?: string
          started_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_runs_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      checklists: {
        Row: {
          checklist_type: string
          created_at: string
          id: string
          is_active: boolean
          items: Json
          name: string
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          checklist_type: string
          created_at?: string
          id?: string
          is_active?: boolean
          items?: Json
          name: string
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          checklist_type?: string
          created_at?: string
          id?: string
          is_active?: boolean
          items?: Json
          name?: string
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_configs: {
        Row: {
          course_name: string
          created_at: string | null
          default_fire_delay_minutes: number | null
          display_name: string
          id: string
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          course_name: string
          created_at?: string | null
          default_fire_delay_minutes?: number | null
          display_name: string
          id?: string
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          course_name?: string
          created_at?: string | null
          default_fire_delay_minutes?: number | null
          display_name?: string
          id?: string
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_configs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      course_statuses: {
        Row: {
          course: Database["public"]["Enums"]["course_type"]
          created_at: string | null
          fired_at: string | null
          id: string
          items: string | null
          order_id: string
          ready_at: string | null
          restaurant_id: string
          served_at: string | null
          status: string | null
        }
        Insert: {
          course: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          fired_at?: string | null
          id?: string
          items?: string | null
          order_id: string
          ready_at?: string | null
          restaurant_id: string
          served_at?: string | null
          status?: string | null
        }
        Update: {
          course?: Database["public"]["Enums"]["course_type"]
          created_at?: string | null
          fired_at?: string | null
          id?: string
          items?: string | null
          order_id?: string
          ready_at?: string | null
          restaurant_id?: string
          served_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_statuses_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_statuses_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_statuses_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_order_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          id: string
          items: Json
          notes: string | null
          rejected_at: string | null
          restaurant_id: string
          status: string
          table_id: string
          waiter_call_id: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          items?: Json
          notes?: string | null
          rejected_at?: string | null
          restaurant_id: string
          status?: string
          table_id: string
          waiter_call_id?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          items?: Json
          notes?: string | null
          rejected_at?: string | null
          restaurant_id?: string
          status?: string
          table_id?: string
          waiter_call_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_order_requests_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_order_requests_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "occupied_tables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_order_requests_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_order_requests_waiter_call_id_fkey"
            columns: ["waiter_call_id"]
            isOneToOne: false
            referencedRelation: "waiter_calls"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_ratings: {
        Row: {
          bonus_points_awarded: number | null
          created_at: string | null
          customer_feedback: string | null
          customer_score: number
          google_review_prompted: boolean | null
          id: string
          order_id: string
          points_awarded: number | null
          restaurant_id: string
          sent_to_google: boolean | null
          sentiment: string | null
          table_id: string | null
          waiter_score: number | null
        }
        Insert: {
          bonus_points_awarded?: number | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_score: number
          google_review_prompted?: boolean | null
          id?: string
          order_id: string
          points_awarded?: number | null
          restaurant_id: string
          sent_to_google?: boolean | null
          sentiment?: string | null
          table_id?: string | null
          waiter_score?: number | null
        }
        Update: {
          bonus_points_awarded?: number | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_score?: number
          google_review_prompted?: boolean | null
          id?: string
          order_id?: string
          points_awarded?: number | null
          restaurant_id?: string
          sent_to_google?: boolean | null
          sentiment?: string | null
          table_id?: string | null
          waiter_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_ratings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_ratings_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_ratings_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_receipt_items: {
        Row: {
          created_at: string
          delivery_receipt_id: string
          id: string
          ingredient_id: string
          matches_order: boolean | null
          quantity_received: number
          restaurant_id: string
          unit_price: number | null
        }
        Insert: {
          created_at?: string
          delivery_receipt_id: string
          id?: string
          ingredient_id: string
          matches_order?: boolean | null
          quantity_received: number
          restaurant_id: string
          unit_price?: number | null
        }
        Update: {
          created_at?: string
          delivery_receipt_id?: string
          id?: string
          ingredient_id?: string
          matches_order?: boolean | null
          quantity_received?: number
          restaurant_id?: string
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_receipt_items_delivery_receipt_id_fkey"
            columns: ["delivery_receipt_id"]
            isOneToOne: false
            referencedRelation: "delivery_receipts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_receipt_items_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_receipts: {
        Row: {
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string
          id: string
          image_url: string | null
          notes: string | null
          ocr_extracted_items: Json | null
          ocr_raw_text: string | null
          purchase_order_id: string
          restaurant_id: string
          status: string
          updated_at: string
        }
        Insert: {
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          notes?: string | null
          ocr_extracted_items?: Json | null
          ocr_raw_text?: string | null
          purchase_order_id: string
          restaurant_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          notes?: string | null
          ocr_extracted_items?: Json | null
          ocr_raw_text?: string | null
          purchase_order_id?: string
          restaurant_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_receipts_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      demand_multipliers: {
        Row: {
          confidence: number | null
          day_of_week: number | null
          hour_slot: number | null
          id: string
          last_calibrated_at: string | null
          menu_item_id: string | null
          multiplier: number | null
          restaurant_id: string | null
        }
        Insert: {
          confidence?: number | null
          day_of_week?: number | null
          hour_slot?: number | null
          id?: string
          last_calibrated_at?: string | null
          menu_item_id?: string | null
          multiplier?: number | null
          restaurant_id?: string | null
        }
        Update: {
          confidence?: number | null
          day_of_week?: number | null
          hour_slot?: number | null
          id?: string
          last_calibrated_at?: string | null
          menu_item_id?: string | null
          multiplier?: number | null
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demand_multipliers_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demand_multipliers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          created_at: string | null
          description: string | null
          flag_key: string
          flag_value: boolean | null
          id: string
          restaurant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          flag_key: string
          flag_value?: boolean | null
          id?: string
          restaurant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          flag_key?: string
          flag_value?: boolean | null
          id?: string
          restaurant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feature_flags_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          category: string
          cost_per_unit: number
          created_at: string
          id: string
          is_active: boolean
          min_stock_level: number
          name: string
          restaurant_id: string
          supplier: string | null
          unit: string
          updated_at: string
        }
        Insert: {
          category?: string
          cost_per_unit?: number
          created_at?: string
          id?: string
          is_active?: boolean
          min_stock_level?: number
          name: string
          restaurant_id: string
          supplier?: string | null
          unit?: string
          updated_at?: string
        }
        Update: {
          category?: string
          cost_per_unit?: number
          created_at?: string
          id?: string
          is_active?: boolean
          min_stock_level?: number
          name?: string
          restaurant_id?: string
          supplier?: string | null
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      inventory: {
        Row: {
          counted_by: string | null
          created_at: string
          current_stock: number
          id: string
          ingredient_id: string
          last_count_date: string | null
          last_restock_date: string | null
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          counted_by?: string | null
          created_at?: string
          current_stock?: number
          id?: string
          ingredient_id: string
          last_count_date?: string | null
          last_restock_date?: string | null
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          counted_by?: string | null
          created_at?: string
          current_stock?: number
          id?: string
          ingredient_id?: string
          last_count_date?: string | null
          last_restock_date?: string | null
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_logs: {
        Row: {
          change_amount: number
          created_at: string
          created_by: string | null
          id: string
          ingredient_id: string
          notes: string | null
          reason: string
          restaurant_id: string
        }
        Insert: {
          change_amount: number
          created_at?: string
          created_by?: string | null
          id?: string
          ingredient_id: string
          notes?: string | null
          reason?: string
          restaurant_id: string
        }
        Update: {
          change_amount?: number
          created_at?: string
          created_by?: string | null
          id?: string
          ingredient_id?: string
          notes?: string | null
          reason?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_logs_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      kitchen_staff: {
        Row: {
          created_at: string
          default_station_id: string | null
          id: string
          is_active: boolean
          name: string
          phone: string | null
          restaurant_id: string
          role: string
          schedule: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_station_id?: string | null
          id?: string
          is_active?: boolean
          name: string
          phone?: string | null
          restaurant_id: string
          role?: string
          schedule?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_station_id?: string | null
          id?: string
          is_active?: boolean
          name?: string
          phone?: string | null
          restaurant_id?: string
          role?: string
          schedule?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kitchen_staff_default_station_id_fkey"
            columns: ["default_station_id"]
            isOneToOne: false
            referencedRelation: "kitchen_stations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kitchen_staff_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      kitchen_stations: {
        Row: {
          assigned_staff: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          assigned_staff?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          assigned_staff?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      kitchen_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          description: string
          due_time: string | null
          id: string
          priority: string
          restaurant_id: string
          station_id: string
          status: string
          task_type: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description: string
          due_time?: string | null
          id?: string
          priority?: string
          restaurant_id: string
          station_id: string
          status?: string
          task_type?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string
          due_time?: string | null
          id?: string
          priority?: string
          restaurant_id?: string
          station_id?: string
          status?: string
          task_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kitchen_tasks_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "kitchen_stations"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_configs: {
        Row: {
          created_at: string | null
          google_maps_url: string | null
          id: string
          points_per_peso: number | null
          program_name: string | null
          restaurant_id: string
          tier_thresholds: Json | null
          updated_at: string | null
          welcome_message: string | null
        }
        Insert: {
          created_at?: string | null
          google_maps_url?: string | null
          id?: string
          points_per_peso?: number | null
          program_name?: string | null
          restaurant_id: string
          tier_thresholds?: Json | null
          updated_at?: string | null
          welcome_message?: string | null
        }
        Update: {
          created_at?: string | null
          google_maps_url?: string | null
          id?: string
          points_per_peso?: number | null
          program_name?: string | null
          restaurant_id?: string
          tier_thresholds?: Json | null
          updated_at?: string | null
          welcome_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_configs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_members: {
        Row: {
          allergens: string[] | null
          avg_ticket: number | null
          best_streak: number | null
          created_at: string | null
          current_streak: number | null
          email: string | null
          favorite_items: string[] | null
          id: string
          last_visit_date: string | null
          name: string
          notes: string | null
          phone: string
          points: number | null
          qr_code: string | null
          restaurant_id: string
          tier: Database["public"]["Enums"]["loyalty_tier"] | null
          total_spent: number | null
          total_visits: number | null
          updated_at: string | null
        }
        Insert: {
          allergens?: string[] | null
          avg_ticket?: number | null
          best_streak?: number | null
          created_at?: string | null
          current_streak?: number | null
          email?: string | null
          favorite_items?: string[] | null
          id?: string
          last_visit_date?: string | null
          name: string
          notes?: string | null
          phone: string
          points?: number | null
          qr_code?: string | null
          restaurant_id: string
          tier?: Database["public"]["Enums"]["loyalty_tier"] | null
          total_spent?: number | null
          total_visits?: number | null
          updated_at?: string | null
        }
        Update: {
          allergens?: string[] | null
          avg_ticket?: number | null
          best_streak?: number | null
          created_at?: string | null
          current_streak?: number | null
          email?: string | null
          favorite_items?: string[] | null
          id?: string
          last_visit_date?: string | null
          name?: string
          notes?: string | null
          phone?: string
          points?: number | null
          qr_code?: string | null
          restaurant_id?: string
          tier?: Database["public"]["Enums"]["loyalty_tier"] | null
          total_spent?: number | null
          total_visits?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_members_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      lupita_briefs: {
        Row: {
          brief_date: string
          brief_type: string
          content: string
          created_at: string | null
          data_snapshot: Json | null
          id: string
          restaurant_id: string | null
        }
        Insert: {
          brief_date: string
          brief_type?: string
          content: string
          created_at?: string | null
          data_snapshot?: Json | null
          id?: string
          restaurant_id?: string | null
        }
        Update: {
          brief_date?: string
          brief_type?: string
          content?: string
          created_at?: string | null
          data_snapshot?: Json | null
          id?: string
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lupita_briefs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      lupita_logs: {
        Row: {
          accuracy: number | null
          context: Json | null
          created_at: string | null
          id: string
          log_type: string
          output: string | null
          restaurant_id: string | null
        }
        Insert: {
          accuracy?: number | null
          context?: Json | null
          created_at?: string | null
          id?: string
          log_type: string
          output?: string | null
          restaurant_id?: string | null
        }
        Update: {
          accuracy?: number | null
          context?: Json | null
          created_at?: string | null
          id?: string
          log_type?: string
          output?: string | null
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lupita_logs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          allergens: string[] | null
          auto_dispatch: boolean
          availability_status:
            | Database["public"]["Enums"]["availability_status"]
            | null
          category_id: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_favorite: boolean | null
          kds_station: string | null
          modifiers: Json | null
          name: string
          price: number
          restaurant_id: string
          tax_type: Database["public"]["Enums"]["tax_type"] | null
          updated_at: string | null
        }
        Insert: {
          allergens?: string[] | null
          auto_dispatch?: boolean
          availability_status?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          category_id: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          kds_station?: string | null
          modifiers?: Json | null
          name: string
          price: number
          restaurant_id: string
          tax_type?: Database["public"]["Enums"]["tax_type"] | null
          updated_at?: string | null
        }
        Update: {
          allergens?: string[] | null
          auto_dispatch?: boolean
          availability_status?:
            | Database["public"]["Enums"]["availability_status"]
            | null
          category_id?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_favorite?: boolean | null
          kds_station?: string | null
          modifiers?: Json | null
          name?: string
          price?: number
          restaurant_id?: string
          tax_type?: Database["public"]["Enums"]["tax_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          channels_sent: string | null
          created_at: string | null
          error_message: string | null
          id: string
          message: string
          order_id: string | null
          restaurant_id: string
          success: boolean | null
        }
        Insert: {
          channels_sent?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          message: string
          order_id?: string | null
          restaurant_id: string
          success?: boolean | null
        }
        Update: {
          channels_sent?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          message?: string
          order_id?: string | null
          restaurant_id?: string
          success?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          items: Json
          notes: string | null
          order_date: string
          order_number: number
          order_type: Database["public"]["Enums"]["order_type"] | null
          restaurant_id: string
          server_name: string | null
          subtotal: number
          table_id: string | null
          tax_amount: number
          total: number
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_date?: string
          order_number: number
          order_type?: Database["public"]["Enums"]["order_type"] | null
          restaurant_id: string
          server_name?: string | null
          subtotal?: number
          table_id?: string | null
          tax_amount?: number
          total?: number
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          items?: Json
          notes?: string | null
          order_date?: string
          order_number?: number
          order_type?: Database["public"]["Enums"]["order_type"] | null
          restaurant_id?: string
          server_name?: string | null
          subtotal?: number
          table_id?: string | null
          tax_amount?: number
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "occupied_tables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          method: Database["public"]["Enums"]["payment_method"]
          offline_mode: boolean | null
          order_id: string
          processed_at: string | null
          restaurant_id: string
          split_parts: Json | null
          synced_at: string | null
          tip_amount: number | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          method: Database["public"]["Enums"]["payment_method"]
          offline_mode?: boolean | null
          order_id: string
          processed_at?: string | null
          restaurant_id: string
          split_parts?: Json | null
          synced_at?: string | null
          tip_amount?: number | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          offline_mode?: boolean | null
          order_id?: string
          processed_at?: string | null
          restaurant_id?: string
          split_parts?: Json | null
          synced_at?: string | null
          tip_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      pin_configs: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          pin_hash: string
          restaurant_id: string
          role: Database["public"]["Enums"]["staff_role"]
          staff_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pin_hash: string
          restaurant_id: string
          role: Database["public"]["Enums"]["staff_role"]
          staff_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pin_hash?: string
          restaurant_id?: string
          role?: Database["public"]["Enums"]["staff_role"]
          staff_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pin_configs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      prep_lists: {
        Row: {
          created_at: string
          created_by: string | null
          date: string
          id: string
          items: Json
          restaurant_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          date: string
          id?: string
          items?: Json
          restaurant_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          date?: string
          id?: string
          items?: Json
          restaurant_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      purchase_approvals: {
        Row: {
          approver: string
          created_at: string
          id: string
          max_amount: number
          restaurant_id: string
          status: string
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          approver: string
          created_at?: string
          id?: string
          max_amount: number
          restaurant_id: string
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          approver?: string
          created_at?: string
          id?: string
          max_amount?: number
          restaurant_id?: string
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_approvals_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_items: {
        Row: {
          created_at: string
          id: string
          ingredient_id: string
          purchase_order_id: string
          quantity: number
          restaurant_id: string
          subtotal: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id: string
          purchase_order_id: string
          quantity: number
          restaurant_id: string
          subtotal?: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string
          purchase_order_id?: string
          quantity?: number
          restaurant_id?: string
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          expected_delivery: string | null
          id: string
          notes: string | null
          order_number: string
          restaurant_id: string
          sent_at: string | null
          sent_via: string | null
          status: string
          supplier_id: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          expected_delivery?: string | null
          id?: string
          notes?: string | null
          order_number: string
          restaurant_id: string
          sent_at?: string | null
          sent_via?: string | null
          status?: string
          supplier_id: string
          total_amount?: number
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          expected_delivery?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          restaurant_id?: string
          sent_at?: string | null
          sent_via?: string | null
          status?: string
          supplier_id?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ingredients: {
        Row: {
          created_at: string
          id: string
          ingredient_id: string
          is_optional: boolean
          notes: string | null
          quantity: number
          recipe_id: string
          restaurant_id: string
          unit: string
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id: string
          is_optional?: boolean
          notes?: string | null
          quantity: number
          recipe_id: string
          restaurant_id: string
          unit?: string
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string
          is_optional?: boolean
          notes?: string | null
          quantity?: number
          recipe_id?: string
          restaurant_id?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          created_at: string
          difficulty: string
          id: string
          instructions: string | null
          is_active: boolean
          menu_item_id: string
          photo_url: string | null
          prep_time_minutes: number
          restaurant_id: string
          station: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          difficulty?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          menu_item_id: string
          photo_url?: string | null
          prep_time_minutes?: number
          restaurant_id: string
          station?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          menu_item_id?: string
          photo_url?: string | null
          prep_time_minutes?: number
          restaurant_id?: string
          station?: string
          updated_at?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          confirmation_code: string
          created_at: string | null
          email: string | null
          guest_name: string
          id: string
          notes: string | null
          party_size: number
          phone: string
          reservation_date: string
          reservation_time: string
          restaurant_id: string
          status: string | null
          table_id: string | null
          updated_at: string | null
        }
        Insert: {
          confirmation_code: string
          created_at?: string | null
          email?: string | null
          guest_name: string
          id?: string
          notes?: string | null
          party_size: number
          phone: string
          reservation_date: string
          reservation_time: string
          restaurant_id: string
          status?: string | null
          table_id?: string | null
          updated_at?: string | null
        }
        Update: {
          confirmation_code?: string
          created_at?: string | null
          email?: string | null
          guest_name?: string
          id?: string
          notes?: string | null
          party_size?: number
          phone?: string
          reservation_date?: string
          reservation_time?: string
          restaurant_id?: string
          status?: string | null
          table_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "occupied_tables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string | null
          created_at: string | null
          currency: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          slug: string
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          currency?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          slug: string
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          currency?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          slug?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      restock_rules: {
        Row: {
          auto_approve: boolean
          created_at: string
          id: string
          ingredient_id: string
          is_active: boolean
          max_auto_amount: number | null
          min_stock: number
          reorder_qty: number
          restaurant_id: string
          supplier_id: string
          updated_at: string
        }
        Insert: {
          auto_approve?: boolean
          created_at?: string
          id?: string
          ingredient_id: string
          is_active?: boolean
          max_auto_amount?: number | null
          min_stock: number
          reorder_qty: number
          restaurant_id: string
          supplier_id: string
          updated_at?: string
        }
        Update: {
          auto_approve?: boolean
          created_at?: string
          id?: string
          ingredient_id?: string
          is_active?: boolean
          max_auto_amount?: number | null
          min_stock?: number
          reorder_qty?: number
          restaurant_id?: string
          supplier_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restock_rules_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restock_rules_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          is_public: boolean | null
          order_id: string | null
          rating_id: string | null
          response: string | null
          restaurant_id: string
          review_type: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          order_id?: string | null
          rating_id?: string | null
          response?: string | null
          restaurant_id: string
          review_type?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          order_id?: string | null
          rating_id?: string | null
          response?: string | null
          restaurant_id?: string
          review_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_rating_id_fkey"
            columns: ["rating_id"]
            isOneToOne: false
            referencedRelation: "customer_ratings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          min_tier: Database["public"]["Enums"]["loyalty_tier"] | null
          name: string
          points_required: number
          restaurant_id: string
          reward_type: Database["public"]["Enums"]["reward_type"]
          updated_at: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          min_tier?: Database["public"]["Enums"]["loyalty_tier"] | null
          name: string
          points_required: number
          restaurant_id: string
          reward_type: Database["public"]["Enums"]["reward_type"]
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          min_tier?: Database["public"]["Enums"]["loyalty_tier"] | null
          name?: string
          points_required?: number
          restaurant_id?: string
          reward_type?: Database["public"]["Enums"]["reward_type"]
          updated_at?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rewards_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      service_timelines: {
        Row: {
          created_at: string | null
          first_course_fired_at: string | null
          id: string
          last_course_served_at: string | null
          order_id: string | null
          order_taken_at: string | null
          payment_completed_at: string | null
          payment_requested_at: string | null
          restaurant_id: string
          seated_at: string | null
          table_cleared_at: string | null
          table_id: string | null
          total_duration_minutes: number | null
        }
        Insert: {
          created_at?: string | null
          first_course_fired_at?: string | null
          id?: string
          last_course_served_at?: string | null
          order_id?: string | null
          order_taken_at?: string | null
          payment_completed_at?: string | null
          payment_requested_at?: string | null
          restaurant_id: string
          seated_at?: string | null
          table_cleared_at?: string | null
          table_id?: string | null
          total_duration_minutes?: number | null
        }
        Update: {
          created_at?: string | null
          first_course_fired_at?: string | null
          id?: string
          last_course_served_at?: string | null
          order_id?: string | null
          order_taken_at?: string | null
          payment_completed_at?: string | null
          payment_requested_at?: string | null
          restaurant_id?: string
          seated_at?: string | null
          table_cleared_at?: string | null
          table_id?: string | null
          total_duration_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "service_timelines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_timelines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_timelines_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_timelines_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "occupied_tables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_timelines_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_notes: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_resolved: boolean | null
          message: string
          priority: Database["public"]["Enums"]["priority_level"] | null
          resolved_at: string | null
          restaurant_id: string
          shift_date: string
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_resolved?: boolean | null
          message: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          resolved_at?: string | null
          restaurant_id: string
          shift_date?: string
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_resolved?: boolean | null
          message?: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          resolved_at?: string | null
          restaurant_id?: string
          shift_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_notes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_notification_configs: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          notify_course_ready: boolean | null
          notify_urgent: boolean | null
          notify_waiter_call: boolean | null
          phone: string | null
          restaurant_id: string
          staff_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          notify_course_ready?: boolean | null
          notify_urgent?: boolean | null
          notify_waiter_call?: boolean | null
          phone?: string | null
          restaurant_id: string
          staff_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          notify_course_ready?: boolean | null
          notify_urgent?: boolean | null
          notify_waiter_call?: boolean | null
          phone?: string | null
          restaurant_id?: string
          staff_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_notification_configs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_items: {
        Row: {
          created_at: string
          currency: string
          id: string
          ingredient_id: string
          lead_time_days: number | null
          min_order_qty: number | null
          notes: string | null
          restaurant_id: string
          supplier_id: string
          unit_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          id?: string
          ingredient_id: string
          lead_time_days?: number | null
          min_order_qty?: number | null
          notes?: string | null
          restaurant_id: string
          supplier_id: string
          unit_price?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          ingredient_id?: string
          lead_time_days?: number | null
          min_order_qty?: number | null
          notes?: string | null
          restaurant_id?: string
          supplier_id?: string
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_items_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          restaurant_id: string
          status: string
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          restaurant_id: string
          status?: string
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          restaurant_id?: string
          status?: string
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      tables: {
        Row: {
          capacity: number
          course_fire_mode:
            | Database["public"]["Enums"]["course_fire_mode"]
            | null
          created_at: string | null
          current_guest_name: string | null
          current_guest_phone: string | null
          current_order_id: string | null
          current_party_size: number | null
          guest_allergens: string[] | null
          id: string
          merged_into: string | null
          name: string
          position_x: number | null
          position_y: number | null
          restaurant_id: string
          seated_at: string | null
          status: Database["public"]["Enums"]["table_status"] | null
          updated_at: string | null
          zone: string
        }
        Insert: {
          capacity: number
          course_fire_mode?:
            | Database["public"]["Enums"]["course_fire_mode"]
            | null
          created_at?: string | null
          current_guest_name?: string | null
          current_guest_phone?: string | null
          current_order_id?: string | null
          current_party_size?: number | null
          guest_allergens?: string[] | null
          id?: string
          merged_into?: string | null
          name: string
          position_x?: number | null
          position_y?: number | null
          restaurant_id: string
          seated_at?: string | null
          status?: Database["public"]["Enums"]["table_status"] | null
          updated_at?: string | null
          zone: string
        }
        Update: {
          capacity?: number
          course_fire_mode?:
            | Database["public"]["Enums"]["course_fire_mode"]
            | null
          created_at?: string | null
          current_guest_name?: string | null
          current_guest_phone?: string | null
          current_order_id?: string | null
          current_party_size?: number | null
          guest_allergens?: string[] | null
          id?: string
          merged_into?: string | null
          name?: string
          position_x?: number | null
          position_y?: number | null
          restaurant_id?: string
          seated_at?: string | null
          status?: Database["public"]["Enums"]["table_status"] | null
          updated_at?: string | null
          zone?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_current_order"
            columns: ["current_order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_current_order"
            columns: ["current_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tables_merged_into_fkey"
            columns: ["merged_into"]
            isOneToOne: false
            referencedRelation: "occupied_tables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tables_merged_into_fkey"
            columns: ["merged_into"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_configs: {
        Row: {
          business_name: string | null
          created_at: string | null
          id: string
          ieps_beer_rate: number | null
          prices_include_tax: boolean | null
          restaurant_id: string
          rfc: string | null
          standard_rate: number | null
          takeaway_rate: number | null
          updated_at: string | null
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          id?: string
          ieps_beer_rate?: number | null
          prices_include_tax?: boolean | null
          restaurant_id: string
          rfc?: string | null
          standard_rate?: number | null
          takeaway_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          id?: string
          ieps_beer_rate?: number | null
          prices_include_tax?: boolean | null
          restaurant_id?: string
          rfc?: string | null
          standard_rate?: number | null
          takeaway_rate?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_configs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      upsell_configs: {
        Row: {
          created_at: string | null
          display_duration_seconds: number | null
          id: string
          is_active: boolean | null
          message: string | null
          restaurant_id: string
          suggested_items: string[]
          trigger_item_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_duration_seconds?: number | null
          id?: string
          is_active?: boolean | null
          message?: string | null
          restaurant_id: string
          suggested_items: string[]
          trigger_item_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_duration_seconds?: number | null
          id?: string
          is_active?: boolean | null
          message?: string | null
          restaurant_id?: string
          suggested_items?: string[]
          trigger_item_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "upsell_configs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      upsell_logs: {
        Row: {
          accepted: boolean
          created_at: string | null
          id: string
          order_id: string
          restaurant_id: string
          upsell_config_id: string
        }
        Insert: {
          accepted: boolean
          created_at?: string | null
          id?: string
          order_id: string
          restaurant_id: string
          upsell_config_id: string
        }
        Update: {
          accepted?: boolean
          created_at?: string | null
          id?: string
          order_id?: string
          restaurant_id?: string
          upsell_config_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "upsell_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upsell_logs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upsell_logs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upsell_logs_upsell_config_id_fkey"
            columns: ["upsell_config_id"]
            isOneToOne: false
            referencedRelation: "upsell_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          amount_spent: number | null
          created_at: string | null
          id: string
          loyalty_member_id: string
          order_id: string | null
          points_earned: number | null
          restaurant_id: string
          visit_date: string
        }
        Insert: {
          amount_spent?: number | null
          created_at?: string | null
          id?: string
          loyalty_member_id: string
          order_id?: string | null
          points_earned?: number | null
          restaurant_id: string
          visit_date?: string
        }
        Update: {
          amount_spent?: number | null
          created_at?: string | null
          id?: string
          loyalty_member_id?: string
          order_id?: string | null
          points_earned?: number | null
          restaurant_id?: string
          visit_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_loyalty_member_id_fkey"
            columns: ["loyalty_member_id"]
            isOneToOne: false
            referencedRelation: "loyalty_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      wait_list: {
        Row: {
          cancelled_at: string | null
          created_at: string | null
          estimated_wait_minutes: number | null
          guest_name: string
          id: string
          loyalty_member_id: string | null
          notes: string | null
          party_size: number
          phone: string | null
          restaurant_id: string
          seated_at: string | null
          status: string | null
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string | null
          estimated_wait_minutes?: number | null
          guest_name: string
          id?: string
          loyalty_member_id?: string | null
          notes?: string | null
          party_size: number
          phone?: string | null
          restaurant_id: string
          seated_at?: string | null
          status?: string | null
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string | null
          estimated_wait_minutes?: number | null
          guest_name?: string
          id?: string
          loyalty_member_id?: string | null
          notes?: string | null
          party_size?: number
          phone?: string | null
          restaurant_id?: string
          seated_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wait_list_loyalty_member_id_fkey"
            columns: ["loyalty_member_id"]
            isOneToOne: false
            referencedRelation: "loyalty_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wait_list_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      waiter_calls: {
        Row: {
          acknowledged_at: string | null
          call_type: Database["public"]["Enums"]["waiter_call_type"]
          created_at: string | null
          id: string
          notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          restaurant_id: string
          status: Database["public"]["Enums"]["call_status"] | null
          table_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          call_type: Database["public"]["Enums"]["waiter_call_type"]
          created_at?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          restaurant_id: string
          status?: Database["public"]["Enums"]["call_status"] | null
          table_id: string
        }
        Update: {
          acknowledged_at?: string | null
          call_type?: Database["public"]["Enums"]["waiter_call_type"]
          created_at?: string | null
          id?: string
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          restaurant_id?: string
          status?: Database["public"]["Enums"]["call_status"] | null
          table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "waiter_calls_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waiter_calls_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "occupied_tables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waiter_calls_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_orders_view: {
        Row: {
          age_minutes: number | null
          created_at: string | null
          id: string | null
          order_number: number | null
          order_type: Database["public"]["Enums"]["order_type"] | null
          restaurant_id: string | null
          server_name: string | null
          subtotal: number | null
          table_id: string | null
          table_name: string | null
          tax_amount: number | null
          total: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "occupied_tables_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_kpis_view: {
        Row: {
          avg_ticket: number | null
          goal_progress_pct: number | null
          items_86d: number | null
          mesa_orders: number | null
          mesa_sales: number | null
          occupancy_pct: number | null
          people_waiting: number | null
          remaining_to_goal: number | null
          report_date: string | null
          reservations_today: number | null
          tables_served: number | null
          takeaway_orders: number | null
          takeaway_sales: number | null
          total_orders: number | null
          total_sales: number | null
          total_tips: number | null
        }
        Relationships: []
      }
      ingredient_dependencies: {
        Row: {
          ingredient_id: string | null
          ingredient_name: string | null
          is_optional: boolean | null
          menu_item_id: string | null
          required_quantity: number | null
          restaurant_id: string | null
          unit: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      occupied_tables_view: {
        Row: {
          capacity: number | null
          course_fire_mode:
            | Database["public"]["Enums"]["course_fire_mode"]
            | null
          current_guest_name: string | null
          current_order_total: number | null
          current_party_size: number | null
          id: string | null
          name: string | null
          order_number: number | null
          restaurant_id: string | null
          seated_at: string | null
          seated_minutes: number | null
          status: Database["public"]["Enums"]["table_status"] | null
          zone: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      service_times_view: {
        Row: {
          hour: number | null
          minutes_cleaning: number | null
          minutes_to_fire: number | null
          minutes_to_order: number | null
          minutes_to_payment: number | null
          order_id: string | null
          restaurant_id: string | null
          service_date: string | null
          table_name: string | null
          total_duration_minutes: number | null
          zone: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_timelines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "active_orders_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_timelines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_timelines_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      activate_all_menu_items: {
        Args: { p_restaurant_id: string }
        Returns: undefined
      }
      approve_customer_order_request: {
        Args: {
          p_approved_by?: string
          p_request_id: string
          p_restaurant_id: string
        }
        Returns: Json
      }
      auto_86d_by_ingredient: {
        Args: { p_ingredient_id: string }
        Returns: {
          menu_item_id: string
          menu_item_name: string
        }[]
      }
      calculate_food_cost: {
        Args: { p_recipe_id: string }
        Returns: {
          cost_breakdown: Json
          ingredient_count: number
          menu_item_name: string
          recipe_id: string
          total_cost: number
        }[]
      }
      calculate_service_time: {
        Args: { p_date?: string; p_restaurant_id?: string }
        Returns: {
          avg_duration_minutes: number
          avg_time_to_first_order: number
          avg_time_to_payment: number
          table_name: string
          total_services: number
          zone: string
        }[]
      }
      calculate_tax: {
        Args: {
          p_order_type: Database["public"]["Enums"]["order_type"]
          p_price: number
          p_tax_type: Database["public"]["Enums"]["tax_type"]
        }
        Returns: number
      }
      calculate_tier: {
        Args: { p_points: number }
        Returns: Database["public"]["Enums"]["loyalty_tier"]
      }
      check_availability: {
        Args: { p_ingredient_id: string }
        Returns: {
          affected_menu_items: Json
          current_stock: number
          ingredient_id: string
          ingredient_name: string
          min_stock_level: number
          stock_status: string
          unit: string
        }[]
      }
      confirm_order_payment: {
        Args: {
          p_amount: number
          p_method: Database["public"]["Enums"]["payment_method"]
          p_order_id: string
          p_restaurant_id: string
          p_split_parts?: Json
          p_subtotal?: number
          p_tax_amount?: number
          p_tip_amount?: number
          p_total?: number
        }
        Returns: undefined
      }
      current_restaurant_id: { Args: never; Returns: string }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      customer_retention_rate: {
        Args: { p_days?: number; p_restaurant_id?: string }
        Returns: {
          active_members: number
          avg_days_between_visits: number
          churned_members: number
          retention_pct: number
          total_members: number
        }[]
      }
      daily_sales_summary: {
        Args: { p_date?: string; p_restaurant_id?: string }
        Returns: {
          avg_ticket: number
          card_total: number
          cash_total: number
          courtesy_total: number
          goal_progress: number
          mixed_total: number
          top_hour: number
          top_hour_sales: number
          total_orders: number
          total_sales: number
          transfer_total: number
        }[]
      }
      generate_daily_order_number: {
        Args: { p_restaurant_id?: string }
        Returns: number
      }
      lupita_daily_context: {
        Args: { p_date?: string; p_restaurant_id: string }
        Returns: Json
      }
      mark_noshow_reservations: { Args: never; Returns: number }
      next_order_number: { Args: { p_restaurant_id?: string }; Returns: number }
      reject_customer_order_request: {
        Args: { p_request_id: string; p_restaurant_id: string }
        Returns: undefined
      }
      resolve_86d_on_restock: {
        Args: { p_ingredient_id: string }
        Returns: {
          menu_item_id: string
          menu_item_name: string
        }[]
      }
      seed_initial_pins: { Args: { p_restaurant_id: string }; Returns: string }
      submit_customer_order: {
        Args: {
          p_items_auto: Json
          p_items_regular: Json
          p_notes?: string
          p_restaurant_id: string
          p_table_id: string
        }
        Returns: Json
      }
      toggle_menu_item_status: {
        Args: { p_item_id: string; p_restaurant_id: string; p_status: string }
        Returns: undefined
      }
      update_order_item_status: {
        Args: { p_item_index: number; p_new_status: string; p_order_id: string }
        Returns: undefined
      }
      validate_pin: {
        Args: { p_pin_hash: string; p_restaurant_id: string }
        Returns: {
          id: string
          role: string
          staff_name: string
        }[]
      }
    }
    Enums: {
      availability_status:
        | "active"
        | "paused"
        | "low_stock"
        | "out_of_stock"
        | "hidden"
      call_status: "active" | "acknowledged" | "resolved"
      course_fire_mode: "automatic" | "suggested" | "manual"
      course_type: "bebidas" | "curso_1" | "curso_2" | "curso_3"
      item_status: "pending" | "fired" | "preparing" | "ready" | "served"
      kds_station:
        | "cocina_caliente"
        | "cocina_fria"
        | "barra"
        | "postres"
        | "general"
      loyalty_tier: "bronce" | "plata" | "oro" | "platino"
      order_type: "mesa" | "para_llevar"
      payment_method:
        | "efectivo"
        | "tarjeta"
        | "transferencia"
        | "cortesia"
        | "mixto"
      priority_level: "low" | "normal" | "warning" | "critical"
      reward_type:
        | "free_item"
        | "discount_percent"
        | "discount_fixed"
        | "experience"
      staff_role: "owner" | "general_manager" | "manager" | "staff" | "scanner"
      table_status:
        | "available"
        | "seated"
        | "occupied"
        | "reserved"
        | "cleaning"
      tax_type: "standard" | "takeaway_food" | "sapporo"
      waiter_call_type:
        | "mesero"
        | "agua"
        | "cuenta"
        | "curso_listo"
        | "urgente"
        | "order_request"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      availability_status: [
        "active",
        "paused",
        "low_stock",
        "out_of_stock",
        "hidden",
      ],
      call_status: ["active", "acknowledged", "resolved"],
      course_fire_mode: ["automatic", "suggested", "manual"],
      course_type: ["bebidas", "curso_1", "curso_2", "curso_3"],
      item_status: ["pending", "fired", "preparing", "ready", "served"],
      kds_station: [
        "cocina_caliente",
        "cocina_fria",
        "barra",
        "postres",
        "general",
      ],
      loyalty_tier: ["bronce", "plata", "oro", "platino"],
      order_type: ["mesa", "para_llevar"],
      payment_method: [
        "efectivo",
        "tarjeta",
        "transferencia",
        "cortesia",
        "mixto",
      ],
      priority_level: ["low", "normal", "warning", "critical"],
      reward_type: [
        "free_item",
        "discount_percent",
        "discount_fixed",
        "experience",
      ],
      staff_role: ["owner", "general_manager", "manager", "staff", "scanner"],
      table_status: ["available", "seated", "occupied", "reserved", "cleaning"],
      tax_type: ["standard", "takeaway_food", "sapporo"],
      waiter_call_type: [
        "mesero",
        "agua",
        "cuenta",
        "curso_listo",
        "urgente",
        "order_request",
      ],
    },
  },
} as const
