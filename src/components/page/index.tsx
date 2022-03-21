import Head from "next/head";
import Link from "next/link";

import { Header } from "@/components/ui/Header";
import { urlFor } from "@/lib/sanity";
import type { HomePageProps } from "@/pages";

export const Home: React.VFC<HomePageProps> = ({ posts }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="flex justify-between items-center py-10 bg-yellow-400 border-y border-black lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className=" max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">Medium</span>
            is a place to write read, and connect
          </h1>
          <h2>It&apos;s easy to and free to post your thinking om any topic and connect with millions of readers.</h2>
        </div>

        <img src="/images/Medium-logo.png" alt="" className="hidden h-32 md:inline-flex lg:h-full" />
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <a className="group overflow-hidden rounded-lg border cursor-pointer">
              <img
                className="object-cover w-full h-60 transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-sm">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img className="w-12 h-12" src={urlFor(post.author.image).url()} alt="" />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
