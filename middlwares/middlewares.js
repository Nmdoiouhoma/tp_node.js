class Middleware {
    constructor() { }
    checkPassword = (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: '401: Not authorized' });
        }

        next();

    };
}

module.exports = { Middleware }