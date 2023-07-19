import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import PostContent from "../components/PostContent";


const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

// generateStaticParamsがあるとエラー出るからコメントアウトしてる
// export const generateStaticParams = async () => {
//   const posts = getPostMetadata();
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// };

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  return (
    <div>
      {post.data.subrcrive && (
        <PostContent>
          <div>
            <div className="my-12 text-center">
              <h1 className="text-2xl dark:text-slate-600 ">{post.data.title}</h1>
              <p className="dark:text-slate-400 mt-2">{post.data.date}</p>
            </div>

            <article
              className="prose prose-cyan prose-h2:text-indigo-100 prose-h3:text-indigo-100 prose-p:text-indigo-50 text-white"
            >
              <Markdown>{post.content}</Markdown>
            </article>
          </div>
        </PostContent>

      )}
      {!post.data.subrcrive && (
        <div>
          <div className="my-12 text-center">
            <h1 className="text-2xl dark:text-slate-600 ">{post.data.title}</h1>
            <p className="dark:text-slate-400 mt-2">{post.data.date}</p>
          </div>

          <article
            className="prose prose-cyan prose-h2:text-indigo-100 prose-h3:text-indigo-100 prose-p:text-indigo-50 text-white"
          >
            <Markdown>{post.content}</Markdown>
          </article>
        </div>
      )}
    </div>
  );
};

export default PostPage;
