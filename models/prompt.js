import { model, models, Schema } from "mongoose";

const PromptSchema = new Schema({
  creater: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tags: {
    type: String,
    required: [true, "At least one tag is required"],
  },
});

const Prompt = models.prompt || model("prompt", PromptSchema);

export default Prompt;
