"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const handleCreatePrompt = async (event) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });

      if (response.ok) {
        router.push("/");
      }
    }

    catch (error) {
      console.log(error);
    }

    // clause that will be executed whether try succeedes or catch catches an error
    finally {
      setSubmitting(false);
    }
  };
  
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleCreatePrompt}
    />
  );
};

export default CreatePrompt;
