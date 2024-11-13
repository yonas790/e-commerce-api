import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connected = mongoose.connect(process.env.DATABASE_URL)
        console.log(`Connected to MongoDB ${(await connected).connection.host}`)
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default dbConnect;