import { apiSlice } from "../apiSlice";

const moviesApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllMovies:builder.query({
            query:(task)=>({
                url:"/movies/",
                method:"GET",
                body:task
            }),
            validateTags:["Movie"],
        }),
        getMovieById:builder.query({
            query:(id)=>({
                url:`/movies/${id}`,
                method:"GET",
            }),
            validateTags:["Movie"],
        }),
        getTopMovies:builder.query({
            query:({sortBy="likes",limit=5,page=1})=>({
                url:`/movies/top-movies?sortBy=${sortBy}&limit=${limit}&page=${1}`,
                method:"GET",
            }),
            validateTags:["Movie"],
        }),
        
        getTopContributor:builder.query({
            query:({limit=5,page=1})=>({
                url:`/user/top-contributor?limit=${limit}&page=${1}`,
                method:"GET",
            }),
            validateTags:["Movie"],
        }),
        
        getYourContribution:builder.query({
            query:({limit=5,page=1})=>({
                url:`/movies/your-contribution?limit=${limit}&page=${1}`,
                method:"GET",
            }),
            validateTags:["Movie"],
        }),

        addLike:builder.mutation({
             query:(id)=>({
                url:`/movies/like/${id}`,
                method:"POST",
            }),
            invalidatesTags:["Movie"],
        }),
        disLike:builder.mutation({
            query:(id)=>({
                url:`/movies/like/${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["Movie"],
        }),
        addComment:builder.mutation({
            query:(data)=>({
                url:`/movies/comment/${data?.id}`,
                method:"POST",
                body:data?.payload,
            }),
            invalidatesTags:["Movie"]
        }),
        
        editComment:builder.mutation({
            query:(data)=>({
                url:`/movies/comment/${data?.id}`,
                method:"PUT",
                body:data?.payload,
            }),
            invalidatesTags:["Movie"]
        }),
        deleteComment:builder.mutation({
            query:(id)=>({
                url:`/movies/comment/${id}`,
                method:"DELETE"
            }),
            validateTags:["Movie"],
        })
    }),
});

export const {
    useGetAllMoviesQuery,
    useGetMovieByIdQuery,
    useGetTopMoviesQuery,
    useGetYourContributionQuery,
    useGetTopContributorQuery,

    useAddLikeMutation,
    useDisLikeMutation,
    useAddCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
}=moviesApi;