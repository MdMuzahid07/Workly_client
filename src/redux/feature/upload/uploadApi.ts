import baseApi from "../../api/baseApi";

const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation({
      query: (formData: FormData) => ({
        url: "/upload/single",
        method: "POST",
        body: formData,
      }),
    }),
    uploadMultipleFiles: builder.mutation({
      query: (data) => ({
        url: "/upload/multiple",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadSingleFileMutation, useUploadMultipleFilesMutation } =
  uploadApi;
export default uploadApi;
