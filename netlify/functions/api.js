import express from 'express';
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import tasklistRoutes from './routes/tasklistRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


connectDB();

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cookieParser());

if(process.env.NETLIFY_DEV || process.env.NODE_ENV === 'development') {
  api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};

api.get('/api/', (req, res) => res.send('Bienvenido a la api')); 
api.use('/api/users', userRoutes);
api.use('/api/tasklists', tasklistRoutes);
api.use('/api/tasks', taskRoutes);

api.use(notFound);
api.use(errorHandler);

export const handler = serverless(api);
