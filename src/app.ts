import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';

const app: Application = express();
app.use(express.json());

// Middleware to parse JSON bodies
// app.use('/api', bookRoutes);
// app.use('/api', borrowRoutes);
app.use('/', bookRoutes);
app.use('/', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send({success: true, message: "Welcome to Library Management API"});
});

export default app;
