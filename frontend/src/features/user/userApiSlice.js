import apiSlice from "../apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "post",
        data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "post",
        data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "post",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "profile",
        method: "put",
        data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
