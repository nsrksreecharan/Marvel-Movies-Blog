import { apiSlice } from "../apiSlice";
import { userApiSlice } from "../userApiSlice";

const authApi=userApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(userData)=>({
                url:"/user/register",
                method:"POST",
                body:userData,
                formData: true,
            })
        }),
        login:builder.mutation({
            query:(userData)=>({
                url:"/user/login",
                method:"POST",
                body:userData,
            })
        }),
        getProfileImage:builder.query({
            query:(id)=>({
                url:`/user/profile-image/${id}`,
                method:"GET",
                responseHandler: (response) => response.blob(),
            }),
            transformResponse: async (blob) => {
                return URL.createObjectURL(blob); // Returns a usable image URL
            },
        })
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetProfileImageQuery,
    useLazyGetProfileImageQuery
}=authApi;