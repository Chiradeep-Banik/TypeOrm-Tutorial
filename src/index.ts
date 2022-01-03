import { createConnection } from 'typeorm';
import { Banker } from './entities/Banker';
import { Client } from './entities/Client';
import { Transaction } from './entities/Transaction';
import express from 'express';
import createClientRouter from './routes/createClient';
import createBankerRouter from './routes/createBanker';
import createTransactionRouter from './routes/createTransaction';

const main = async () => {
    try {
        const connection = await createConnection({
            type: 'postgres',
            host: 'db-postgres',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'typeorm',

            entities: [Client, Banker, Transaction],
            synchronize: true
        });
        console.log('Connected to db sucessfull 👍👍👍');

        const app = express();
        app.use(express.json());
        app.use(createClientRouter);
        app.use(createBankerRouter);
        app.use(createTransactionRouter);

        app.listen(1313, () => {
            console.log('Listening on port 1313');
        });
    } catch (err) {
        console.error('Connection unsucessfull 👎👎👎\n', err);
    }
};

main();
