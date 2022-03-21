import type { CustomNextPage, GetServerSideProps } from "next";
import type { Post } from "typings";

import { Home } from "@/components/page/index";
import { sanityClient } from "@/lib/sanity";

export type HomePageProps = {
  posts: [Post];
};

const IndexPage: CustomNextPage<HomePageProps> = (props) => {
  return <Home {...props} />;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
  _id,
  title,
  author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
}
`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
