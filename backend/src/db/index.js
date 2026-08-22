import mongoose from "mongoose";  

const connectDB = async() => {
    try{
        const databaseName = process.env.DB_NAME || "odoo";
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${databaseName}`)
        console.log(`\n MongoDB connected! DB Host: ${connectionInstance.connection.host}`)
    } catch(error){
        console.log("MongoDB connection error", error);
        process.exit(1)
    }
}
export default connectDB;
