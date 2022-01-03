import { Router } from 'express';
import { Transaction, TransactionsType } from '../entities/Transaction';
import { Client } from '../entities/Client';

const createTransactionRouter = Router();

createTransactionRouter.post('/api/client/:clientId/transaction', async (req, res) => {
    const { clientId } = req.params;

    const client = await Client.findOne(parseInt(clientId));

    if (!client) {
        return res.json({
            "msg": "transaction unsuccessfull"
        });
    };
    const { type, amount } = req.body;

    const transaction = Transaction.create({
        type,
        amount,
        client
    });
    await transaction.save();

    if (transaction.type === TransactionsType.DEPOSIT) {
        client.balance += transaction.amount;
    } else if (transaction.type === TransactionsType.WITHDRAW) {
        client.balance -= transaction.amount;
    }
    await client.save();

    return res.json({
        "msg": "transaction successfull"
    });
});

export default createTransactionRouter;