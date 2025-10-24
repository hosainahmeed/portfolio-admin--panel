import baseApis from "@/app/store/baseApi";

const profileApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET'
            }),
            providesTags: ['profile'],
        }),
        updateProfile: builder.mutation({
            query: (data: any) => ({
                url: '/profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['profile'],
        })
    })
})

export const { useGetProfileQuery } = profileApis