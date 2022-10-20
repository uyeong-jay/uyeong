import fs from 'fs'; //file system module
import path from 'path';
import matter from 'gray-matter';

// getPostSlugs
// getPostBySlug
// getSortedPosts

const postsDirectory = path.join(process.cwd(), 'src/posts');

//getStaticPaths 가 필요할때 주석 풀어서 쓰기
// export async function getPostSlugs() {
//   const postNames = fs.readdirSync(postsDirectory);

//   return postNames.map((postName) => ({
//     params: {
//       slug: postName.replace(/\.md$/, ''),
//     },
//   }));
// }

export async function getPostBySlug(slug: string | string[] | undefined) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const postContents = fs.readFileSync(fullPath, 'utf-8');

  const { data, content } = matter(postContents);

  return {
    frontMatter: data, //date, title, description, tags
    markdownBody: content,
  };
}

export async function getSortedPosts() {
  const postNames = fs.readdirSync(postsDirectory);

  const allPostsData = postNames.map((postName) => {
    // const slug = postName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, postName);

    const postContents = fs.readFileSync(fullPath, 'utf8');

    const { data: frontMatter } = matter(postContents);

    return {
      slug: postName.replace(/\.md$/, ''),
      ...frontMatter, //date, title, description, tags
    };
  });

  return allPostsData.sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (a.date < b.date) return 1;
    else return -1;
  });
}
