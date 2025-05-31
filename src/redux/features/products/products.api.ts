import { TProductQueryParams } from "@/types/types";
import { baseApi } from "../../api/baseApi";
export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllProducts: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((element: TQueryParam) => {
    //         params.append(element.name, element.value as string);
    //       });
    //     }
    //     return {
    //       url: "/products",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["product"],
    // }),
    // productsApi.ts
    
    getAllProducts: builder.query({
      query: (args?: TProductQueryParams) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, value.toString());
            }
          });
        }

        return {
          url: "/products",
          method: "GET",
          params,
        };
      },
      providesTags: ["product"],
    }),

    getProductById: builder.query({
      query: (id: string) => {
        console.log("Fetching product with ID:", id); // 👈 log the id here
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetBookByIdQuery,
} = productManagementApi;
