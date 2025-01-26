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
      query:() => ({
        url: `/orders`,
        method: "GET"
      })
    })
  }),
});
export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
