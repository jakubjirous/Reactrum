import express from 'express';
import authenticate from '../middlewares/authenticate';
import commonValidations from '../shared/validations/board';
import isEmpty from 'lodash/isEmpty';


// models
import Board from '../models/board';


// express router
let router = express.Router();


/**
 * Database layer uniqueness validation
 * @param data
 * @param otherValidations
 * @returns {Promise}
 */
function validateInput(data, otherValidations) {
    let {errors} = otherValidations(data);

    return Board.query({
        where: {title: data.title}
    }).fetch().then(board => {
        if (board) {
            if ((board.get('title') === data.title)) {
                errors.title = 'There is board with such title';
            }
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    });
}


router.get('/:identifier', (req, res) => {
    Board.query({
        select: ['title'],
        where: { category_id: req.params.identifier }
    }).fetchAll().then(boards => {
        res.json({ boards });
    });
});


router.post('/', authenticate, (req, res) => {

    /**
     * server and database layer validation
     */
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {

        if (isValid) {
            const {title, categoryIdentifier} = req.body;
            const category_id = categoryIdentifier;

            Board.forge({
                title, category_id
            }, {hasTimestamps: true}).save()
                .then(board => res.json({success: true}))
                .catch(err => res.status(500).json({errors: err}));
        } else {
            // response to client if errors
            res.status(400).json(errors);
        }


    });
});

export default router;