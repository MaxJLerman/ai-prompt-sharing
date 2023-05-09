import mongoose from "mongoose";

let isConnected = false; // tracks connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connnect(process.env.MONGODB_URI, {
      dbName: "ai_prompt_sharing",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("Connected to MongoDB");
  }
  
  catch (error) {
    console.log(error);
  }
};
