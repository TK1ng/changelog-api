import { Router } from 'express';

const router = Router();

// Product

router.get('/product', (req, res) => {
    res.json({ message: 'hello, universe!' })
});
router.get('/product/:id', () => { })
router.put('/product/:id', () => { })
router.post('/product', () => { })
router.delete('/product/:id', () => { })

// Update

router.get('/update', () => { })
router.get('/update/:id', () => { })
router.put('/update/:id', () => { })
router.post('/update', () => { })
router.delete('/update/:id', () => { })

// Update

router.get('/updatefeature', () => { })
router.get('/updatefeature/:id', () => { })
router.put('/updatefeature/:id', () => { })
router.post('/updatefeature', () => { })
router.delete('/updatefeature/:id', () => { })

export default router;