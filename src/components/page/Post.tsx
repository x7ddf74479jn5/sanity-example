/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import PortableText from "react-portable-text";

import { Header } from "@/components/ui/Header";
import { urlFor } from "@/lib/sanity";
import type { PostPageProps } from "@/pages/post/[slug]";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export const Post: React.VFC<PostPageProps> = ({ post }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleFormSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log(data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
        setIsSubmitted(false);
      });
  };

  return (
    <main>
      <Header />

      <img className="object-cover w-full h-40" src={urlFor(post.mainImage).url()} alt="" />

      <article className="p-5 mx-auto max-w-3xl">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">{post.description}</h2>

        <div className="flex items-center space-x-2">
          <img src={urlFor(post.author.image).url()} alt="" className="w-10 h-10 rounded-full" />
          <p className="text-sm font-extralight">
            Blog post by <span className="text-green-600">{post.author.name}</span> - Published at{" "}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div
          className="mt-10
        "
        >
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => <h1 className="my-5 text-2xl font-bold" {...props} />,
              h2: (props: any) => <h2 className="my-5 text-xl font-bold" {...props} />,
              li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
              link: ({ href, children }: any) => (
                <a className="text-blue-500 hover:underline" href={href}>
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />

      {isSubmitted ? (
        <div className="flex flex-col p-10 my-10 mx-auto max-w-2xl text-white bg-yellow-500">
          <h3 className="text-3xl font-bold ">Thank you for your comment!</h3>
          <p className="">Once it have been approved, it will appear below!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col p-5 mx-auto mb-10 max-w-2xl">
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />

          <input {...register("_id")} type="hidden" name="_id" value={post._id} />

          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              className="block py-2 px-3 mt-1 w-full rounded border outline-none focus:ring ring-yellow-500 shadow form-input"
              type="text"
              placeholder="John Appleseed"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              className="block py-2 px-3 mt-1 w-full rounded border outline-none focus:ring ring-yellow-500 shadow form-input"
              type="email"
              placeholder="example@gmail.com"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="block py-2 px-3 mt-1 w-full rounded border outline-none focus:ring ring-yellow-500 shadow form-textarea"
              rows={8}
              placeholder="John Appleseed"
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && <span className="text-red-500">- The Name Field is required</span>}
            {errors.email && <span className="text-red-500">- The Email Field is required</span>}
            {errors.comment && <span className="text-red-500">- The Comment Field is required</span>}
          </div>

          <input
            type="submit"
            className="py-2 px-4 font-bold text-white bg-yellow-500 hover:bg-yellow-400 rounded focus:outline-none shadow cursor-pointer focus:shadow-outline"
          />
        </form>
      )}

      <div className="flex flex-col p-10 my-10 mx-auto space-y-2 max-w-2xl shadow-yellow-500">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <span className="text-yellow-500">{comment.name}</span>
            <p>: {comment.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
