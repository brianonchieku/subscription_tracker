import express from 'express';
import { PORT} from './config/env';

const app = express();

app.get('/', (req, res) =>{
    res.send('Subscription Tracker is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})