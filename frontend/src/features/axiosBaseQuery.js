import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data }) => {
    try {
      const res = await axios({ url: baseUrl + url, method, data });
      return { data: res.data };
      f;
    } catch (err) {
      return {
        error: {
          status: err.response.status,
          data: {
            message: err.response?.data?.message
              ? err.response.data.message
              : "An unexpected error occured",
          },
        },
      };
    }
  };

export default axiosBaseQuery;
