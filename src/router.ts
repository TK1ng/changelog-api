import { body, oneOf, validationResult } from 'express-validator';
import { Router } from 'express';
import { handleInputErrors } from './modules/middleware';

const router = Router();

// Product

router.get('/product', (req, res) => {
    res.json({ message: 'hello, universe!' })
});
router.get('/product/:id', () => { })
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {

})
router.post('/product', body('name').isString(), handleInputErrors, (req, res) => {

})
router.delete('/product/:id', () => { })

// Update

router.get('/update', () => { })
router.get('/update/:id', () => { })

router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    body('version').optional(),
    (req: any, res: any) => { })

router.post('/update',
    body('title').exists(),
    body('body').exists().isString(),
    (req: any, res: any) => { })

router.delete('/update/:id', () => { })

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

router.delete('/updatefeature/:id', () => { })

export default router;