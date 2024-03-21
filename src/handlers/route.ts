import express, {Request, Response} from 'express';
import {AppDataSource} from '../database/database';
import {ErrorHandler} from './error-handler';
import {Collection} from '../database/entities/collection';
import {
    CollectionSchema,
    CollectionUpdateSchema,
    ListCollectionSchema,
} from './validators/collectionValidator';

export const initRoutes = (app: express.Express) => {
    app.get('/health', (req: Request, res: Response) => {
        res.send({message: 'Hello World!'});
    });

    app.get('/collections', async (req: Request, res: Response) => {
        const schema = ListCollectionSchema;
        const result = schema.safeParse(req.query);

        if (!result.success) {
            res.status(400).send(ErrorHandler(result.error));
            return;
        }

        const {tomes, rating, price} = result.data as {
            tomes?: number;
            rating?: number;
            price?: number;
        };

        const collectionRepository = AppDataSource.getRepository(Collection);

        try {
            const collections = await collectionRepository.find({
                where: {
                    number_tomes: tomes ? tomes : undefined,
                    rating: rating ? rating : undefined,
                    price: price ? price : undefined,
                },
            });

            res.status(200).send(collections);
        } catch (error) {
            res.status(500).send({message: 'Failed to fetch collections'});
            return;
        }
    });

    app.patch('/collections/:id', async (req: Request, res: Response) => {
        const {id} = req.params;
        const schema = CollectionUpdateSchema;
        const result = schema.safeParse({...req.body, id: Number(id)});

        if (!result.success) {
            res.status(400).send(ErrorHandler(result.error));
            return;
        }

        const {name, number_tomes, author, price, rating} = result.data as {
            name: string;
            number_tomes: number;
            author: string;
            price: number;
            rating: number;
        };

        const collectionRepository = AppDataSource.getRepository(Collection);

        try {
            const collection = await collectionRepository.findOneBy({id: Number(id)});

            if (!collection) {
                res.status(404).send({message: 'Collection not found'});
                return;
            }

            collection.name = name ? name : collection.name;
            collection.number_tomes = number_tomes ? number_tomes : collection.number_tomes;
            collection.author = author ? author : collection.author;
            collection.price = price ? price : collection.price;
            collection.rating = rating ? rating : collection.rating;

            await collectionRepository.save(collection);
            res.status(200).send(collection);
        } catch (error) {
            res.status(500).send({message: 'Failed to update collection'});
            return;
        }
    });

    app.get('/collections/:id', async (req: Request, res: Response) => {
        const {id} = req.params;
        if (isNaN(Number(id))) {
            res.status(400).send({message: 'ID must be a number'});
            return;
        }
        const collectionRepository = AppDataSource.getRepository(Collection);

        try {
            const collection = await collectionRepository.findOneBy({id: Number(id)});
            if (!collection) {
                res.status(404).send({message: 'Collection not found'});
                return;
            }

            res.status(200).send(collection);
        } catch (error) {
            res.status(500).send({message: 'Failed to fetch collection'});
            return;
        }
    });

    app.post('/collections', async (req: Request, res: Response) => {
        const schema = CollectionSchema;
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).send(ErrorHandler(result.error));
            return;
        }

        const {name, number_tomes, author, price, rating} = result.data as {
            name: string;
            number_tomes: number;
            author: string;
            price: number;
            rating: number;
        };

        const collectionRepository = AppDataSource.getRepository(Collection);

        try {
            const collection = collectionRepository.create({
                name,
                number_tomes,
                author,
                price,
                rating,
            });
            await collectionRepository.save(collection);
            res.status(201).send(collection);
        } catch (error) {
            res.status(500).send({message: 'Failed to create collection'});
            return;
        }
    });

    app.delete('/collections/:id', async (req: Request, res: Response) => {
        const {id} = req.params;
        if (isNaN(Number(id))) {
            res.status(400).send({message: 'ID must be a number'});
            return;
        }
        const collectionRepository = AppDataSource.getRepository(Collection);

        try {
            const collection = await collectionRepository.findOneBy({id: Number(id)});
            if (!collection) {
                res.status(404).send({message: 'Collection not found'});
                return;
            }

            await collectionRepository.remove(collection);
            res.status(200).send({message: 'Collection deleted'});
        } catch (error) {
            res.status(500).send({message: 'Failed to delete collection'});
            return;
        }
    });
};
