import { api } from '../api';

export interface BlogTag {
  name: string;
  count: number;
}
export interface BlogTagRes {
  tags: BlogTag[];
}

export interface BlogTagReq {
  limit: number;
}

export const tagApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBlogTags: builder.query<BlogTagRes, BlogTagReq>({
      query: (data) => ({
        url: `/api/tag?limit=${data.limit}`,
        method: 'get',
      }),
      providesTags: ['BlogTag', 'BlogPost'],
    }),
  }),
});

// export hooks for usage in functional components
export const { useGetBlogTagsQuery } = tagApi;

// export endpoints for use in SSR
export const { getBlogTags } = tagApi.endpoints;
