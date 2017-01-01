import express from 'express';
import commonValidations from '../shared/validations/signup';
// import bcrypt from 'bcrypt';
import sha1 from 'sha1';
import isEmpty from 'lodash/isEmpty';


// models
import User from '../models/user';


// express router
let router = express.Router();


/**
 * Database layer validation
 * @param data
 * @param otherValidations
 * @returns {Promise}
 */
function validateInput(data, otherValidations) {
    let {errors} = otherValidations(data);

    return User.query({
        where: {email: data.email},
        orWhere: {username: data.username}
    }).fetch().then(user => {
        if (user) {
            if (user.get('username') === data.username) {
                errors.username = 'There is user with such username';
            }
            if (user.get('email') === data.email) {
                errors.email = 'There is user with such e-mail';
            }
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    });
}


router.post('/', (req, res) => {

    // parse request body to terminal console
    //console.log(req.body);

    /**
     * server and database layer validation
     */
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {


        if (isValid) {
            // response to client if success
            // res.json({ success: true });


            // create user on success
            // export variables from request body
            const {username, email, password} = req.body;
            const password_digest = sha1(password); //bcrypt.hashSync(password, 10);   // bcrypted password to save into database


            /**
             * forge object to model
             * fields are saved to database
             * hasTimestamps - automatically populate timestamps with current date
             * then - promise on success -> send data to client (OK)
             * catch - promise on errors (WRONG)
             */
            User.forge({
                username, email, password_digest
            }, {hasTimestamps: true}).save()
                .then(user => res.json({success: true,}))
                .catch(err => res.status(500).json({error: err}));


        } else {
            // response to client if errors
            res.status(400).json(errors);
        }

    });

});

export default router;