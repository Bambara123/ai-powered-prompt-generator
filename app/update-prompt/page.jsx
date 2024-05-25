"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPost = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tags: "" });

  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  console.log("post id", postId);
  const { data: session } = useSession();

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${postId}`);

      const data = await response.json();

      console.log("data", data);

      setPost({
        prompt: data.prompt,
        tags: data.tags,
      });
    };

    if (postId) getPromptDetails();
  }, [postId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) {
      return alert("Prompt id not found");
    }

    try {
      const response = await fetch(`api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPost;
