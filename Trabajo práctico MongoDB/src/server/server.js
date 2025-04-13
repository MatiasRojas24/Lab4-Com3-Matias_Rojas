import dotenv from "dotenv"
dotenv.config()
import express from "express";
import connectDB from "../config/database.js";
import bodyParser from "body-parser";
import router from "../routes/userRoutes.js";

export const startServer = async () =>{
    try {
        // Conectar a MongoDB y esperar hasta que la conexión se establezca
        await connectDB();
        const app = express();

        // Middlewares
        app.use(bodyParser.json());

        // Metodos 
        app.use("/api", router)


        // Puerto con valor por defecto
        const PORT = process.env.PORT || 3000;
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1); 
    }
}


