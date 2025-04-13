import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@usuarios.ekkkbxq.mongodb.net/?appName=usuarios`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

const connectDB = async () => {
    try {
        await mongoose.connect(url, clientOptions);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB