import prisma from '../models/user'
import { Request, Response } from 'express'
import { hashPassword } from '../services/passwordService'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.findMany({
            select: {
                id: true,
                email: true,
                nombre: true,
                password: true
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const usuario = await prisma.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                nombre: true,
                password: true
            }
        });

        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, nombre } = req.body
    try {
        const hashedPassword = await hashPassword(password)
        const user = await prisma.create(
            {
                data: {
                    email,
                    password: hashedPassword,
                    nombre
                }
            }
        )
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error en el registro' })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { email, nombre, password } = req.body;

    try {
        const existingUser = await prisma.findUnique({
            where: { id }
        });

        if (!existingUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        let hashedPassword: string | undefined = undefined;
        if (password) {
            hashedPassword = await hashPassword(password);
        }

        const updatedUser = await prisma.update({
            where: { id },
            data: {
                email,
                nombre,
                ...(hashedPassword && { password: hashedPassword }),
            },
            select: {
                id: true,
                email: true,
                nombre: true,
                password: true
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const existingUser = await prisma.findUnique({
            where: { id },
        });

        if (!existingUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }

        await prisma.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};