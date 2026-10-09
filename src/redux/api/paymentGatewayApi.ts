import { baseApi } from "./baseApi";
import type { StripeSettings, RazorpaySettings, PayPalSettings, MidtransSettings, PaymentSettings } from "@/src/types/payment";

// Re-export for backward compatibility
export type { StripeSettings, RazorpaySettings, PayPalSettings, MidtransSettings };

export const paymentGatewayApi = baseApi.enhanceEndpoints({ addTagTypes: ["PaymentGateway", "Stripe", "Razorpay", "PayPal"] }).injectEndpoints({
  endpoints: (builder) => ({
    getStripeSettings: builder.query<{ success: boolean; data: StripeSettings }, void>({
      query: () => "/payment_gateway/stripe",
      providesTags: ["Stripe"],
    }),
    updateStripeSettings: builder.mutation<{ success: boolean; data: StripeSettings }, StripeSettings>({
      query: (body) => ({
        url: "/payment_gateway/stripe",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Stripe"],
    }),
    getRazorpaySettings: builder.query<{ success: boolean; data: RazorpaySettings }, void>({
      query: () => "/payment_gateway/razorpay",
      providesTags: ["Razorpay"],
    }),
    updateRazorpaySettings: builder.mutation<{ success: boolean; data: RazorpaySettings }, RazorpaySettings>({
      query: (body) => ({
        url: "/payment_gateway/razorpay",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Razorpay"],
    }),
    getPayPalSettings: builder.query<{ success: boolean; data: PayPalSettings }, void>({
      query: () => "/payment_gateway/paypal",
      providesTags: ["PayPal"],
    }),
    updatePayPalSettings: builder.mutation<{ success: boolean; data: PayPalSettings }, PayPalSettings>({
      query: (body) => ({
        url: "/payment_gateway/paypal",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PayPal"],
    }),
    getMidtransSettings: builder.query<{ success: boolean; data: MidtransSettings }, void>({
      query: () => "/payment_gateway/midtrans",
      providesTags: ["PaymentGateway"],
    }),
    updateMidtransSettings: builder.mutation<{ success: boolean; data: MidtransSettings }, MidtransSettings>({
      query: (body) => ({
        url: "/payment_gateway/midtrans",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PaymentGateway"],
    }),
    // Mollie
    getMollieSettings: builder.query<{ data: PaymentSettings }, void>({
      query: () => "/payment_gateway/mollie",
      providesTags: ["PaymentGateway"],
    }),
    updateMollieSettings: builder.mutation<
      { data: PaymentSettings; message: string },
      Partial<PaymentSettings>
    >({
      query: (data) => ({
        url: "/payment_gateway/mollie",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PaymentGateway"],
    }),
  }),
});

export const {
  useGetStripeSettingsQuery,
  useUpdateStripeSettingsMutation,
  useGetRazorpaySettingsQuery,
  useUpdateRazorpaySettingsMutation,
  useGetPayPalSettingsQuery,
  useUpdatePayPalSettingsMutation,
  useGetMidtransSettingsQuery,
  useUpdateMidtransSettingsMutation,
  useGetMollieSettingsQuery,
  useUpdateMollieSettingsMutation,
} = paymentGatewayApi;
