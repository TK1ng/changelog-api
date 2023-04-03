import { body, oneOf, validationResult } from 'express-validator';
import { Router } from 'express';
import { handleInputErrors } from './modules/middleware';

import { getOneProduct, getProducts, createProduct, updateProduct, deleteProduct } from './handlers/product';
import { deleteUpdate, getOneUpdate, getUpdates, updateUpdate, createUpdate } from './handlers/updates';

const router = Router();

// Product
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deleteProduct)

// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)

router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate)

router.post('/update',
    body('title').exists(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)

router.delete('/update/:id', deleteUpdate)

// UpdateFeature
router.get('/updatefeature', () => { })
router.get('/updatefeature/:id', () => { })

router.put('/updatefeature/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { })

router.post('/updatefeature',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => { })

router.delete('/updatefeature/:id', () => { });

router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'error in router handler' })
})

export default router;