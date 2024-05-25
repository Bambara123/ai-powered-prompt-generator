// GET

import connectToDatabase from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    // console.log("get prompt");
    // console.log("param id", params.id);
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found ", { status: 404 });
    }

    console.log(prompt);

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch  all prompts", { status: 500 });
  }
};

// patch - update

export const PATCH = async (request, { params }) => {
  const { prompt, tags } = await request.json();

  try {
    await connectToDatabase();
    const prompt_ = await Prompt.findById(params.id); //  find the prompt

    if (!prompt_) {
      return new Response("Prompt not found", { status: 404 });
    }

    prompt_.prompt = prompt;
    prompt_.tags = tags;

    await prompt_.save();

    return new Response("Prompt updated", { status: 200 });
  } catch (error) {
    return new Response("failed to update prompt", { status: 500 });
  }
};

// delete

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();
    console.log("prompt", params.id);

    const prompt = await Prompt.findById(params.id);

    console.log(prompt);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    await Prompt.deleteOne({ _id: params.id }); //  If the prompt was found delete it.

    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("failed to delete prompt", { status: 500 });
  }
};
