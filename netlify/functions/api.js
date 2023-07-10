import express from 'express';
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import tasklistRoutes from './routes/tasklistRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

connectDB();

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cookieParser());

api.use('/api/users', userRoutes);
api.use('/api/tasklists', tasklistRoutes);
api.use('/api/tasks', taskRoutes);
api.get('/api', (req, res) => res.send('Bienvenido a la api'));

export const handler = serverless(api);
