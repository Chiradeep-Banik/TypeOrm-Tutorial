import { Router } from 'express';
import { Banker } from '../entities/Banker';


const createBankerRouter = Router();

createBankerRouter.post('/api/banker', async (req, res) => {
    const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

    const banker = Banker.create({
        firstName,
        lastName,
        email,
        cardNumber,
        employeeNumber,
    });

    await banker.save();

    return res.json(banker);
});

export default createBankerRouter;
