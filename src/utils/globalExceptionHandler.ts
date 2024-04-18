export class HTTPError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export function handle404Error(req: any, res: any) {
    const error = new HTTPError(404, 'Not Found');
}

export function handleConflictError(req: any, res: any) {
    const errorMessage = req.message + "already exists!";
    const error = new HTTPError(409, errorMessage);
}

export function errorHandler(err: any, req: any, res: any) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message
    });
}
