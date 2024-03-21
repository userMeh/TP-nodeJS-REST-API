import {ZodError} from 'zod';

interface Message {
    [key: string]: string;
}

export const ErrorHandler = (error: ZodError): Message => {
    const errors: Message = {};

    error.errors.map((err) => {
        errors[err.path[0]] = err.message;
    });

    return errors;
};
