import sanityClient from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2021-08-31",
};

const client = sanityClient(config);

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't submit comment", error });
  }

  return res.status(200).json({ message: "Comment submitted" });
};

export default createComment;
