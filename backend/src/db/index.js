import mongoose from "mongoose";  

const connectDB = async() => {
    try{
        const databaseName = process.env.DB_NAME || "odoo";
        const connectionUri = new URL(process.env.MONGODB_URI);
        connectionUri.pathname = `/${databaseName}`;
        const connectionInstance = await mongoose.connect(connectionUri.toString())
        console.log(`\n MongoDB connected! DB Host: ${connectionInstance.connection.host}`)
    } catch(error){
        console.log("MongoDB connection error", error);
        process.exit(1)
    }
}
export default connectDB;
