import { Router } from "express";
const authRouter = Router();

authRouter.post('/signup', (req,res) => res.send({ title: 'User signed up' }));
authRouter.post('/signin', (req,res) => res.send({ title: 'User signed in' }));
authRouter.post('/signout', (req,res) => res.send({ title: 'User signed out' }));

export default authRouter;