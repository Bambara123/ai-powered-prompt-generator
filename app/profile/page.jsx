"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; //  route

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession(); //  data get renames to session

  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json(); // Convert JSON into JS object.

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    // inside async funcitons we pause  (I think scriot inside the function) until return the await waiting for.

    const hasConfirmed = confirm("Are you sure to delete?");

    if (hasConfirmed) {
      try {
        console.log("post_id", post._id);

        await fetch(`/api/prompt/${post._id}`, {
          // send the id as url paramter for the dynamic route.
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => {
          p._id !== post._id;
        });

        setPosts(filteredPosts);
      } catch (error) {}
    }
  };
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to my personalized profile page"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
