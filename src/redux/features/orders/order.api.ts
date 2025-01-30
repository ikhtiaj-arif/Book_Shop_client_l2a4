import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/orders/verify`,
        params: { order_id },
        method: "GET",
      }),
    }),
    viewOrders: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,

        method: "GET",
      }),
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useViewOrdersQuery
} = orderApi;
