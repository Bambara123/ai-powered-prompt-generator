import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tags: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = models.prompt || model("prompt", PromptSchema);

export default Prompt;

// here what you got was a caching issue, the problem is it checks whether there is a model named "prompt"
// inside the mongodb cache. if it was there it's not going to change that, since it exists
