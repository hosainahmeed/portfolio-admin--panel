import baseApis from "@/app/store/baseApi";

const projectApis = baseApis.injectEndpoints(({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => ({
                url: '/project/get-all-projects',
                method: 'GET'
            }),
            providesTags: ['projects']
        }),
        createProject: builder.mutation({
            query: ({ data }: { data: any }) => ({
                url: '/project/create-project',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['projects']
        }),
        updateProject: builder.mutation({
            query: ({ data, id }: { data: any, id: string }) => ({
                url: `/project/update-project/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['projects']
        }),
        deleteProject: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/project/delete-project/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['projects']
        })
    })
}))

export const { useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = projectApis