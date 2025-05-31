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
          args.forEach((element: TQueryParam) => {
            params.append(element.name, element.value as string);
          });
        }
        return {
          url: "/category",
          method: "GET",
          params: params,
        };
      },

      providesTags: ["product"],
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productManagementApi;
