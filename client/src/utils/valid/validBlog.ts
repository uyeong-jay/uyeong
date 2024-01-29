interface validBlogProps {
  user?: string;
  title?: string;
  tags?: string[];
  content?: string;
  thumbnail?: string;
  description?: string;
  category?: string;
  createdAt?: string;
}

const validBlog = (blogPostInfo: validBlogProps) => {
  const { title, content } = blogPostInfo;

  //title 에러
  if (!title) return 'Please enter a title.';
  else if (title.length >= 100) return 'The title must be 100 characters or less.';

  //content 에러
  if (!content) return 'Please enter a content.';
  return '';
};

export default validBlog;
