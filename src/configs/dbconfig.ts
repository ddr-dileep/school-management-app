import mongoose from "mongoose";

const dataBaseConfig = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "school_management",
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("error in database connection", err);
  }
};

export default dataBaseConfig;
