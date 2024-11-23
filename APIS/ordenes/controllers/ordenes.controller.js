const { response, request } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mostrar todas las órdenes
const getAllordenes = async (req = request, res = response) => {
    try {
        const ordenes = await prisma.ordenes.findMany();
        res.json({ ordenes });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

// Crear una nueva orden
const createOrder = async (req = request, res = response) => {
    const { customerName, totalPrice, status, products } = req.body;

    try {
        const order = await prisma.ordenes.create({
            data: {
                customerName,
                totalPrice,
                status,
                products: {
                    create: products.map(product => ({
                        productId: product.productId,
                        quantity: product.quantity
                    }))
                }
            }
        });
        res.status(201).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

// Actualizar una orden existente
const updateOrder = async (req = request, res = response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await prisma.ordenes.update({
            where: { id: Number(id) },
            data: { status }
        });
        res.json({ updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

// Eliminar una orden
const deleteOrder = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        await prisma.ordenes.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = {
    getAllordenes,
    createOrder,
    updateOrder,
    deleteOrder
};
