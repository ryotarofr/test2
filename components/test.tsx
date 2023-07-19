import getPostMetadata from "@/utils/getPostMetadata";
import PostPreview from "./PostPreview";

const Test = () => {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div>{postPreviews}</div>
  )
}

export default Test