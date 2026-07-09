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
    uploadAvatar: builder.mutation({
      query: (formData: FormData) => ({
        url: "/upload/avatar",
        method: "POST",
        body: formData,
      }),
    }),
    uploadLogo: builder.mutation({
      query: (formData: FormData) => ({
        url: "/upload/logo",
        method: "POST",
        body: formData,
      }),
    }),
    uploadCover: builder.mutation({
      query: (formData: FormData) => ({
        url: "/upload/cover",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadSingleFileMutation,
  useUploadMultipleFilesMutation,
  useUploadAvatarMutation,
  useUploadLogoMutation,
  useUploadCoverMutation,
} = uploadApi;
export default uploadApi;
