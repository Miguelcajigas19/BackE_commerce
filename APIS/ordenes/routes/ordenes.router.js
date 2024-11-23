const { Router } = require('express');
const { 
    getAllordenes, 
    createOrder, 
    updateOrder, 
    deleteOrder 
} = require('../controllers/ordenes.controller');

const router = Router();

// Obtener todas las órdenes
router.get('/', getAllordenes);

// Crear una nueva orden
router.post('/', createOrder);

// Actualizar el estado de una orden
router.put('/:id', updateOrder);

// Eliminar una orden
router.delete('/:id', deleteOrder);

module.exports = router;
