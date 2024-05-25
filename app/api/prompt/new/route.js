import connectToDatabase from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { user_id, prompt, tags } = await req.json();

  try {
    await connectToDatabase();

    const newPrompt = new Prompt({
      creator: user_id,
      prompt,
      tags,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { Status: 201 });
  } catch (error) {
    console.log("Error at router", error);
    return new Response(error.message, { Status: 500 });
  }
};
