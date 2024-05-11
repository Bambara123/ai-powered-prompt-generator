import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email should be unique!"],
    required: [true, "please enter the email address."],
  },
  username: {
    type: String,
    required: [true, "please enter the username."],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
