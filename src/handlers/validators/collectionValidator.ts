import {z} from 'zod';

export const CollectionSchema = z.object({
    name: z
        .string()
        .min(3, 'The name of the collection must be greater than 3')
        .max(30, 'The name of the collection must be less than 30'),
    number_tomes: z.number().min(1, 'Number of tomes must be greater than 0'),
    author: z
        .string()
        .min(3, 'The name of the author must be greater than 3')
        .max(30, 'The name of the author must be less than 30'),
    price: z.number().min(0, 'Price cannot be negative'),
    rating: z
        .number()
        .min(1, 'The rating must be between 1 and 5')
        .max(5, 'The rating must be between 1 and 5')
        .int('The rating must be an integer'),
});

export const CollectionUpdateSchema = z.object({
    id: z.number().int('ID must be an integer'),
    name: z
        .string()
        .min(3, 'The name of the collection must be greater than 3')
        .max(30, 'The name of the collection must be less than 30')
        .optional(),
    number_tomes: z.number().min(1, 'Number of tomes must be greater than 0').optional(),
    author: z
        .string()
        .min(3, 'The name of the author must be greater than 3')
        .max(30, 'The name of the author must be less than 30')
        .optional(),
    price: z.number().min(0, 'Price cannot be negative').optional(),
    rating: z
        .number()
        .min(1, 'The rating must be between 1 and 5')
        .max(5, 'The rating must be between 1 and 5')
        .int('The rating must be an integer')
        .optional(),
});

export const ListCollectionSchema = z.object({
    tomes: z.number().int().optional(),
    rating: z.number().int().optional(),
    price: z.number().int().optional(),
});
