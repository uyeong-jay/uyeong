import fs from 'fs'; //file system module
import path from 'path';
import matter from 'gray-matter';

// getFiles
// getPostSlugs
// getPostBySlug
// getSortedPosts

const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function getFiles() {
  return fs.readdirSync(postsDirectory, 'utf-8');
}

export function getPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const postContents = fs.readFileSync(fullPath, 'utf-8');

  const { data, content } = matter(postContents);

  return {
    frontMatter: data,
    markdownBody: content,
  };
}

export async function getSortedPosts() {
  const postNames = fs.readdirSync(postsDirectory);

  const allPostsData = postNames.map((postName) => {
    const slug = postName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, postName);

    const postContents = fs.readFileSync(fullPath, 'utf8');

    const { data: frontMatter } = matter(postContents);

    return {
      slug,
      ...frontMatter, //date, title, description, tags
    };
  });

  return allPostsData.sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (a.date < b.date) return 1;
    else return -1;
  });

  // const posts = fs.readdirSync(postsDirectory);

  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // return posts.reduce((allPosts, postSlug) => {
  //   const post = fs.readFileSync(path.join(process.cwd(), 'src/posts', postSlug), 'utf8');

  //   const { data } = matter(post);

  //   return [
  //     {
  //       frontMatter: data,
  //       slug: postSlug.replace('.md', ''),
  //     },
  //     ...allPosts,
  //   ];
  // }, []);
}
