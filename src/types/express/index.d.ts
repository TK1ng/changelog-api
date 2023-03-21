export { };

declare global {
    namespace Express {
        interface Request {
            secret_key?: string
        }
    }
}