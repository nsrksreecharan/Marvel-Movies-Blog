import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const BASE_URL="https://marvel-movies-blog-api.vercel.app/"
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint, type }) => {
    if (!(type === 'mutation' && endpoint === 'register')) {
      headers.set("Content-Type", "application/json");
    }
    debugger
    const user = JSON.parse(localStorage.getItem("user"));
    const token=user?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.warn("Access token expired. Trying refresh token...");

    const refreshResult = await baseQuery(
      {
        url: "/user/refresh-token",
        method: "POST",
        credentials: "include",
        body: {},
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.accessToken = refreshResult.data.token;
      localStorage.setItem("user", JSON.stringify(storedUser));
      result = await baseQuery(args, api, extraOptions);
    } else {
      toast.warn("Session expired. Logging out...");
      localStorage.removeItem("user");
      setTimeout(() => {
        window.location.href = "#/login";
      }, 500);
    }
  }

  return result;
};



export const securedApi = createApi({
  reducerPath: "securedApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["Movie"],
  endpoints: () => ({}),
});

export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:baseQueryWithInterceptor,
    tagTypes:['Movie','User'],
    endpoints:()=>({}),
});
