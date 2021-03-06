import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";

type PageAttributes = { getLayout?: (page: ReactElement) => ReactNode };

declare module "next" {
  type CustomLayout = PageAttributes["getLayout"];
  type CustomNextPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & PageAttributes;
}

declare module "next/app" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  type CustomAppProps<P = Record<string, unknown>> = AppProps<P> & { Component: NextPage & PageAttributes };
}
