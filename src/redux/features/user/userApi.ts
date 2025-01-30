import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    blockUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}/block`,
        method: "PATCH",
      }),
    }),
    unblockUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}/unblock`,
        method: "PATCH",
      }),
    }),
  }),
});
export const { useGetAllUsersQuery, useBlockUserMutation, useUnblockUserMutation } = authApi;
