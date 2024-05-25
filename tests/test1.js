const handleDelete = async (post) => {
  // inside async funcitons we pause  (I think scriot inside the function) until return the await waiting for.

  const hasConfirmed = confirm("Are you sure to delete?");

  if (hasConfirmed) {
    try {
      await fetch(`app/api/prompt/${postId.toString()}`, {
        method: DELETE,
      });

      const filteredPosts = posts.filter((p) => {
        p._id !== post._id;
      });

      setPosts(filteredPosts); // set the posts to new post
    } catch (error) {
      console.log(error);
    }
  }