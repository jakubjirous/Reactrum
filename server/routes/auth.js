import express from 'express';
import commonValidations from '../shared/validations/login';
import sha1 from 'sha1';
import jwt from 'jsonwebtoken';
import config from '../config';


// models
import User from '../models/user';


// express router
let router = express.Router();


router.post('/', (req, res) => {

    const { identifier, password } = req.body;

    User.query({
        where: { username: identifier },
        orWhere: { email: identifier }
    }).fetch().then(user => {

        if(user) {

            if(sha1(password) === user.get('password_digest')) {

                // generate web token and send to client
                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username')
                }, config.jwtSecret);

                // send token to client
                res.json({ token });

            } else {
                res.status(401).json({ errors: {form: 'Invalid credentials' } });
            }

        } else {
            res.status(401).json({ errors: {form: 'Invalid credentials' } });
        }

    });

});


export default router;