import express from 'express';
import cookieParser from 'cookie-parser';
import { PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import subscriptionsRouter from './routes/subscriptions.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(express.json()); //allows the app to handle json data sent in as requests
app.use(express.urlencoded({ extended: false })); //allows the app to process the form data sent via html forms in a simple form
app.use(cookieParser()); //reads cookies from incoming requests so your app can store user data

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter);
app.use('/api/v1/users', userRouter);
app.use(errorMiddleware);

app.get('/', (req, res) =>{
    res.send('Subscription Tracker is running');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    await connectToDatabase();
})