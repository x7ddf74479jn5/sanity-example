import type { CustomNextPage } from "next";

import { Home } from "@/components/page/index/index";

const IndexPage: CustomNextPage = () => {
  return <Home />;
};

// IndexPage.getLayout = Layout;

export default IndexPage;
