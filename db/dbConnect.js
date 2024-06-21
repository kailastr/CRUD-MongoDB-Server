import mongoose from "mongoose";

const connectMongoDBFn = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Successfully Connected to MongoDB");

    } catch (error) {
        console.log(" Error in Connect Mongo DB Fn : ", error.message);
    }
};

export default connectMongoDBFn;