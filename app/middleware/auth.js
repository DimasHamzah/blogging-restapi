const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.status(401).json({ error: true, message: 'Token is missing' });

            jwt.verify(token, 'secret', (err, decode) => {
                if (err) return res.status(403).json({ error: true, message: 'Invalid token' });

                req.users = decode.users.id;
                next();
            });

        } catch (error) {
            res.status(400).json({
                error: true,
                message: 'Invalid Token'
            });
        }
    }
}