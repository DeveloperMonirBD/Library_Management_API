import { Response } from 'express';

interface IApiResponse<T> {
    statusCode?: number;
    success: boolean;
    message: string;
    data?: T;
    error?: unknown;
}

export const sendResponse = <T>(res: Response, { statusCode = 200, success, message, data, error }: IApiResponse<T>): void => {
    res.status(statusCode).json({
        success,
        message,
        data,
        error
    });
};
