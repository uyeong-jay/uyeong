import { api } from '../api';

export interface BlogCategoryRes {
  categories?: [
    {
      _id: string;
      name: string;
    },
  ];
  msg?: string;
}

export interface BlogCategoryReq {
  categoryName?: {
    currName: string;
    name: string;
  };
  categoryInfo?: {
    name: string;
  };
  token?: string;
}

export const blogCategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 서버에 전달할 data ? builder.mutation() : builder.query()
    // builder.query<type of 'res' , type of 'query arg'>

    //refresh
    getBlogCategories: builder.query<BlogCategoryRes, void>({
      query: () => ({
        url: '/api/blog/category',
        method: 'get',
      }),
      providesTags: ['BlogCategory'],
    }),

    //create
    createBlogCategory: builder.mutation<BlogCategoryRes, BlogCategoryReq>({
      query: (data) => ({
        url: '/api/blog/category',
        method: 'post',
        data: data.categoryInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogCategory'],
    }),

    //update
    updateBlogCategory: builder.mutation<BlogCategoryRes, BlogCategoryReq>({
      query: (data) => ({
        url: '/api/blog/category',
        method: 'patch',
        data: data.categoryName,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogCategory'],
    }),

    //delete
    deleteBlogCategory: builder.mutation<BlogCategoryRes, BlogCategoryReq>({
      query: (data) => ({
        url: '/api/blog/category',
        method: 'delete',
        data: data.categoryInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogCategory'],
    }),
  }),
});

// export hooks for usage in functional components
export const {
  useGetBlogCategoriesQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  util: { getRunningOperationPromises },
} = blogCategoryApi;

// export endpoints for use in SSR
export const { getBlogCategories } = blogCategoryApi.endpoints;
