import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your favourite prompts with the world, so they can't
        stop coming back..
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-7 mt-10 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            className="form_textarea"
            placeholder="Write your prompt..."
            required
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            value={post.prompt}
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className="font-normal">
              (#product, #midjourney, #webdev, #design, #ux, #ui, #frontend,)
            </span>
          </span>

          <input
            className="form_input"
            placeholder="#Tags"
            required
            onChange={(e) => setPost({ ...post, tags: e.target.value })}
            value={post.tags}
          ></input>
        </label>

        <div className="mx-3 flex-end mb-3 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={submitting}
            type="submit"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
