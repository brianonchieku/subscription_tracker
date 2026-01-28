import express from 'express';
import { PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import subscriptionsRouter from './routes/subscriptions.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) =>{
    res.send('Subscription Tracker is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})