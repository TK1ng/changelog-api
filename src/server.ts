import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { protect } from './modules/auth';
import router from './router';
import { createNewUser, signIn } from './handlers/users';

const app = express();

app.use(cors());
app.use(morgan('dev'));
// allows client to send server JSON
app.use(express.json());
// handles query string in url and places in object to make easy to work with
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.secret_key = 'King';
    next();
})

app.get('/', (req, res) => {
    console.log('Hello', req.secret_key);
    res.status(200);
    res.json({ message: 'hello' });
});


app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signIn);

// Error handler. Must be registered after the routes it is meant to handlers for. This is synchronous
app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input' });
    } else {
        res.status(500).json({ message: 'Oops! Something went wrong' });
    }
});


export default app;