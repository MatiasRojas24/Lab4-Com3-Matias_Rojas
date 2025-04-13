import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await User.find(); 
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

router.post("/usuarios", async (req, res) => {
    try {
        const { nombre, edad, email } = req.body;
        const nuevoUsuario = new User({ nombre, edad, email });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario); 
    } catch (error) {
        res.status(400).json({ error: "Error al crear usuario", detalles: error });
    }
});

export default router;