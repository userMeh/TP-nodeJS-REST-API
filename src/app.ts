import express from 'express';
import {initRoutes} from './handlers/route';
import {AppDataSource} from './database/database';

const main = async () => {
    const app = express();
    const port = 3001;

    app.use(express.json());

    try {
        await AppDataSource.initialize();
        console.log('Connected to database');
    } catch (error) {
        console.error('Failed to connect to database', error);
        process.exit(1);
    }

    initRoutes(app);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

main();
