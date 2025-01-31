// import {
//   BaseQueryApi,
//   BaseQueryFn,
//   createApi,
//   DefinitionType,
//   FetchArgs,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query/react";
// import { toast } from "sonner";
// //   import { logOut, setUser } from "../features/auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:5000/api",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     // const token = (getState() as RootState).auth.token;
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       headers.set("authorization", `${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithRefreshToken: BaseQueryFn<
//   FetchArgs,
//   BaseQueryApi,
//   DefinitionType
// > = async (args, api, extraOptions): Promise<any> => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 404) {
//     toast.error(result.error.data.message);
//   }

//   //

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQueryWithRefreshToken,
//   endpoints: () => ({}),
// });


import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Retrieve access token from localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `${token}`);
    }

    // Retrieve cart data from localStorage and send it as a header
    const cart = localStorage.getItem("cart");
    if (cart) {
      headers.set("x-cart-data", encodeURIComponent(cart)); // Encode JSON to avoid issues
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error(result.error.data.message);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['product'],
  endpoints: () => ({}),
});
