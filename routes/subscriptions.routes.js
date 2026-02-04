import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';

const subscriptionsRouter = Router();

subscriptionsRouter.post('/', authorize, createSubscription);

subscriptionsRouter.get('/', (req,res) => res.send({title: 'GET all subscriptions'}));

subscriptionsRouter.get('/:id', (req,res) => res.send({title: 'GET a single subscription'}));

subscriptionsRouter.put('/:id', (req,res) => res.send({title: 'UPDATE a subscription'}));

subscriptionsRouter.delete('/:id', (req,res) => res.send({title: 'DELETE a subscription'}));

subscriptionsRouter.get('/user/:id', (req,res) => res.send({title: 'GET subscriptions for a user'}));

subscriptionsRouter.put('/:id/cancel', (req,res) => res.send({title: 'CANCEL a subscription'}));

subscriptionsRouter.get('/upcoming-renewals', (req,res) => res.send({title: 'GET upcoming renewals'}));

export default subscriptionsRouter; 