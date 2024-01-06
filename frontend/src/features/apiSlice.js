import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

const apiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "api/users/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
