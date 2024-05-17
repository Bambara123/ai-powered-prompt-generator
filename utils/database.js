import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompt-share",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("=> new database connection established.");
  } catch (err) {
    console.error("Error connecting to database: ", err);
  }
};

export default connectToDatabase;
