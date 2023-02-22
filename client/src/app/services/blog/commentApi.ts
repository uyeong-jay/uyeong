import { api } from '../api';

export interface BlogReply {
  _id: string;
  post_id: string;
  comment_id: string;
  user: {
    _id: string;
    nickname: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  _id: string;
  post_id: string;
  post_title: string;
  user: {
    _id: string;
    nickname: string;
    avatar: string;
  };
  content: string;
  replies: BlogReply[];
  createdAt: string;
}

export interface BlogCommentRes {
  comments?: BlogComment[];
  count?: number;
  msg?: string;
}

export interface BlogCommentReq {
  post_id: string;
  post_title: string;
  user_id?: string;
  content: string;
  replies: object[];
}

export interface BlogReplyReq {
  post_id: string;
  comment_id?: string;
  reply_user_id?: string;
  reply_content: string;
  // createdAt: string;
}

export interface BlogCommentReqWithToken {
  commentInfo: BlogCommentReq;
  token?: string;
}

export interface BlogReplyReqWithToken {
  replyInfo: BlogReplyReq;
  token?: string;
}

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //getMany
    getBlogComments: builder.query<BlogCommentRes, string>({
      query: (slug) => ({
        url: `/api/comment/blog/${slug}`,
        method: 'get',
      }),
      providesTags: ['BlogComment'],
    }),

    //create comment
    createBlogComment: builder.mutation<BlogCommentRes, BlogCommentReqWithToken>({
      query: (data) => ({
        url: '/api/comment',
        method: 'post',
        data: data.commentInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogComment'],
    }),

    //create reply
    createBlogReply: builder.mutation<BlogCommentRes, BlogReplyReqWithToken>({
      query: (data) => ({
        url: '/api/reply',
        method: 'post',
        data: data.replyInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogComment'],
    }),

    //update
    updateBlogComment: builder.mutation<BlogCommentRes, BlogCommentReqWithToken>({
      query: (data) => ({
        url: `/api/comment/${data.commentInfo.user_id}`,
        method: 'patch',
        data: data.commentInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogComment'],
    }),

    //delete
    deleteBlogComment: builder.mutation<BlogCommentRes, BlogCommentReqWithToken>({
      query: (data) => ({
        url: `/api/comment/${data.commentInfo.user_id}`,
        method: 'delete',
        data: data.commentInfo,
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ['BlogComment'],
    }),
  }),
});

// export hooks for usage in functional components
export const {
  useGetBlogCommentsQuery,
  useCreateBlogCommentMutation,
  useUpdateBlogCommentMutation,
  useDeleteBlogCommentMutation,
  useCreateBlogReplyMutation,
} = commentApi;

// export endpoints for use in SSR
export const { getBlogComments } = commentApi.endpoints;
