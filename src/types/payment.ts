// Payment Gateway types

import { PaginationInfo } from "./store";

export interface StripeSettings {
  stripe_publishable_key: string;
  stripe_secret_key_set?: boolean;
  stripe_secret_key: string;
  is_stripe_active?: boolean;
}

export interface RazorpaySettings {
  razorpay_key_id: string;
  razorpay_key_secret: string;
  razorpay_key_secret_set?: string;
  razorpay_webhook_secret_set?: string;
  razorpay_webhook_secret: string;
  is_razorpay_active?: boolean;
}

export interface PayPalSettings {
  paypal_client_id: string;
  paypal_secret_key: string;
  paypal_secret_key_set?: boolean;
  paypal_mode: "sandbox" | "live";
  is_paypal_active?: boolean;
}

export interface MidtransSettings {
  midtrans_merchant_id: string;
  midtrans_client_key: string;
  midtrans_server_key: string;
  midtrans_server_key_set?: boolean;
  midtrans_mode: "sandbox" | "live";
  is_midtrans_active?: boolean;
}

export interface MollieSettings {
  mollie_api_key: string;
  mollie_api_key_set?: boolean;
  mollie_mode: "sandbox" | "live";
  is_mollie_active?: boolean;
  webhook_url?: string;
}

export type PaymentSettings = Partial<StripeSettings & RazorpaySettings & PayPalSettings & MidtransSettings & MollieSettings>;

export interface PaymentHistory {
  _id: string;
  user_id: string;
  subscription_id: string;
  plan_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_status: string;
  transaction_id: string;
  payment_gateway: string;
  invoice_number?: string;
  invoice_url?: string;
  paid_at: string;
  refunded_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  plan?: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    billing_cycle: string;
  };
}

export interface GetPaymentHistoryParams {
  page?: number;
  limit?: number;
  search?: string;
  payment_status?: string;
  payment_gateway?: string;
  start_date?: string;
  end_date?: string;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

export interface GetPaymentHistoryResponse {
  success: boolean;
  data: {
    payments: PaymentHistory[];
    pagination: PaginationInfo;
  };
}

export type GatewayId = "stripe" | "razorpay" | "paypal" | "midtrans" | "mollie";

export interface GatewayCardProps {
  title: string;
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export interface GatewayCardProps {
  title: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  children: React.ReactNode;
}

export interface PaymentsTableProps {
  payments: PaymentHistory[];
  isLoading: boolean;
  pagination?: PaginationInfo;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  page: number;
  limit: number;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
  visibleColumns?: string[];
  searchTerm?: string;
}