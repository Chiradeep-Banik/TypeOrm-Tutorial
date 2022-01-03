import { Router } from 'express';
import { Client } from '../entities/Client';

const createClientRouter = Router();

createClientRouter.post('/api/client', async (req, res) => {
    const { firstName, lastName, email, cardNumber, balance } = req.body;

    const client = Client.create({
        firstName,
        lastName,
        email,
        cardNumber,
        balance
    });

    await client.save();

    return res.json(client);
});

export default createClientRouter;
