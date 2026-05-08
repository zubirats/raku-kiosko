import { supabase } from '@/integrations/supabase/client';

export interface PaymentResult {
  success: boolean;
  attemptId?: string;
  transactionId?: string;
  errorMessage?: string;
}

export interface PaymentService {
  processPayment(amount: number, orderId: string, terminalId: string): Promise<PaymentResult>;
  getStatus(): 'ready' | 'error' | 'processing';
}

// Mock implementation for development
class MockPaymentService implements PaymentService {
  private status: 'ready' | 'error' | 'processing' = 'ready';

  async processPayment(amount: number, orderId: string, terminalId: string): Promise<PaymentResult> {
    this.status = 'processing';

    // Simulate 2 second processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 95% success rate
    const success = Math.random() > 0.05;

    this.status = 'ready';

    if (success) {
      return {
        success: true,
        transactionId: `MOCK-${Date.now()}`,
        attemptId: `attempt-${Date.now()}`,
      };
    } else {
      return {
        success: false,
        errorMessage: 'Mock payment failed',
      };
    }
  }

  getStatus(): 'ready' | 'error' | 'processing' {
    return this.status;
  }
}

// Real Kushki implementation (to be swapped when credentials arrive)
class KushkiPaymentService implements PaymentService {
  private status: 'ready' | 'error' | 'processing' = 'ready';

  async processPayment(amount: number, orderId: string, terminalId: string): Promise<PaymentResult> {
    this.status = 'processing';

    try {
      const { data, error } = await supabase.functions.invoke('kushki-charge', {
        body: {
          order_id: orderId,
          amount,
          terminal_id: terminalId,
        },
      });

      if (error) throw error;

      this.status = 'ready';

      return {
        success: data.ok,
        attemptId: data.attempt_id,
        transactionId: data.transaction_id,
      };
    } catch (error) {
      this.status = 'error';
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Payment failed',
      };
    }
  }

  getStatus(): 'ready' | 'error' | 'processing' {
    return this.status;
  }
}

// Export the appropriate service based on environment
const USE_MOCK = import.meta.env.VITE_USE_MOCK_PAYMENT !== 'false';

export const paymentService: PaymentService = USE_MOCK
  ? new MockPaymentService()
  : new KushkiPaymentService();
