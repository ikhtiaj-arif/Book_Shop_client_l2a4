import { baseApi } from "../../api/baseApi";
export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element:TQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },

      providesTags: ["product"],
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
useGetAllCategoryQuery,useGetCategoryByIdQuery, useAddCategoryMutation

} = productManagementApi;
