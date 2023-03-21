import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createJWT = (user: any) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET!);
    return token;
}


export const hashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const protect = (req: any, res: any, next: any) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json('NOPE!! Not authorized');
        return;
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        res.status(401);
        res.json('Not authorized');
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = user;
        next();
    } catch (e) {
        res.status(401);
        res.json('Not authorized');
        return;
    }
}