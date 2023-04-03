import prisma from '../db';

// Get all updates
export const getUpdates = async (req: any, res: any) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    // better way. revisit schema
    const updates = products.reduce((allUpdates: any, product: any) => {
        return [...allUpdates, ...product.updates];
    }, []);

    res.json({ data: updates });
}

// Get one update
export const getOneUpdate = async (req: any, res: any) => {

    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    });

    res.json({ data: update });
}

// Create update
export const createUpdate = async (req: any, res: any) => {

    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if (!product) {
        return res.json({ message: 'nada' })
    }

    const newUpdate = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: { id: product.id } }
        }
    });

    res.json({ data: newUpdate });
}

//  Update product
export const updateUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates: any, product: any) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        return res.json({ message: 'no can do!' });
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({ data: updated });
}

//  Delete product
export const deleteUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products?.reduce((allUpdates: any, product: any) => {
        return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find(update => update.id === req.params.id);

    if (!match) {
        return res.json({ message: 'no can do!' });
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deleted })
}