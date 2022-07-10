import express, { Request, Response, NextFunction } from 'express';
import connectDb from './db/connect';

import userRouter from './routes/user';

// Basic config
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Startup the database connection
connectDb()
    .then(() => console.log('DB CONNECTED'))
    .catch((e) => console.log(e));

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');

    next();
});

// Routes
app.use('/api', userRouter);

// If route not found
app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).send({
        message: 'Not found',
    });
});

export default app;
