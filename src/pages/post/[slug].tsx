import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Post as TPost } from "typings";

import { Post } from "@/components/page/Post";
import { sanityClient } from "@/lib/sanity";

export interface PostPageProps {
  post: TPost;
}

const PostPage: CustomNextPage<PostPageProps> = (props) => {
  return <Post {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  *[_type == "post"]{
  _id,
  slug {
    current
  }
}
  `;

  const posts = await sanityClient.fetch<[TPost]>(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  author -> {
    name,
    image
  },
  'comments': *[
    _type == "comment" &&
    post.ref == ^._id &&
    approved == true
  ],
  description,
  mainImage,
  slug,
  body
}
  `;

  const post = await sanityClient.fetch<TPost>(query, { slug: params?.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
