"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import React from "react";

const Page = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tags: "" });

  const router = useRouter();
  const thename = "helllo";

  // console.log("session jj", session);
  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("post", post, "session", session);
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
          user_id: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/"); // Router auto suggestion
      }
    } catch (error) {
      console.log("error at page", error);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default Page;
