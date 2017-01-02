import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';


export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        // second element from header is token
        token = authorizationHeader.split(' ')[1];
    }

    if (token) {
        // verify if we have token
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err) {
                res.status(401).json({
                    error: 'Failed to authenticate'
                });
            } else {
                User.query({
                    where: { id: decoded.id },
                    select: ['email', 'id', 'username']
                }).fetch().then(user => {
                    if(!user) {
                        res.status(404).json({ errors: 'No such user' });
                    } else {
                        req.currentUser = user;
                        next();
                    }
                });
            }
        });

    } else {
        res.status(403).json({
            error: 'No token provided'
        });
    }
}