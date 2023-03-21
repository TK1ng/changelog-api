import app from './server';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(3001, () => {
    console.log('Hello on http://localhost:3001')
})