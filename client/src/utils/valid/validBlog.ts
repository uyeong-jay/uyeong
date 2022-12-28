interface blogPostInfoProps {
  user?: string;
  title?: string;
  tags?: string[];
  content?: string;
  thumbnail?: string;
  description?: string;
  category?: string;
  createdAt?: string;
}

const validBlog = (blogPostInfo: blogPostInfoProps) => {
  const { title, content } = blogPostInfo;

  //title 에러
  if (!title) return 'Please add title.';
  else if (title.length > 2) return 'Title must be 50 characters or less.';

  //content 에러
  if (!content) return 'Please add content.';
  else if (content.length > 4000) return 'Content must be 50 characters or less.';
  return '';
};

export default validBlog;
