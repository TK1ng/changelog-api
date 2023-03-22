import prisma from '../db';
import { comparePasswords, createJWT, hashedPassword } from '../modules/auth';

export const createNewUser = async (req: any, res: any) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashedPassword(req.body.password)
        }
    })

    const token = createJWT(user);
    res.json({ token });
}


export const signIn = async (req: any, res: any) => {
    // check for username in database
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });

    // if username exists, compare passwords
    if (user) {
        const isValid = await comparePasswords(req.body.password, user.password);

        if (!isValid) {
            res.status(401).json({ message: 'Not authorized' })
        }
        // if password matches, create token and send onward
        const token = createJWT(user);
        return res.status(200).json({ token });
    }
    // No user found, send 400
    return res.json('unable to login')

}