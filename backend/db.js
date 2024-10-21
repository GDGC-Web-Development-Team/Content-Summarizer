import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/gdgc-project`);
    console.log(`\n MongoDB connected, DB NAME: gdgc-project`);
  } catch (err) {
    console.log("something went wrong while connecting to db", err);
    process.exit(1);
  }
};

export { connectDb };
