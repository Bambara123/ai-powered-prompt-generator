import connectToDatabase from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    console.log("rew");
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    // console.log(prompts);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch  all prompts", { status: 500 });
  }
};
