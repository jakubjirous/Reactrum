import express from 'express';
import authenticate from '../middlewares/authenticate';
import commonValidations from '../shared/validations/topic';
import isEmpty from 'lodash/isEmpty';


// models
import Topic from '../models/topic';


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

    return Topic.query({
        where: {title: data.title}
    }).fetch().then(topic => {
        if (topic) {
            if ((topic.get('title') === data.title)) {
                errors.title = 'There is topic with such title';
            }
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    });
}


/**
 * Get all topic in board by ID
 */
router.get('/:identifier', (req, res) => {
    Topic.query({
        select: ['id', 'title', 'posts_count', 'board_id', 'user_id', 'created_at'],
        where: {board_id: req.params.identifier}
    })
        .orderBy('created_at', 'DESC')
        .fetchAll().then(topics => {
        res.json({topics});
    });
});


/**
 * Get topic by ID
 */
router.get('/id/:identifier', (req, res) => {
    Topic.query({
        select: ['id', 'title'],
        where: {id: req.params.identifier}
    })
        .fetch().then(topic => {
        res.json({topic});
    });
});


/**
 * Create new topic in board
 */
router.post('/', authenticate, (req, res) => {

    /**
     * server and database layer validation
     */
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {

        if (isValid) {
            const {title, boardIdentifier, userIdentifier} = req.body;
            const board_id = boardIdentifier;
            const user_id = userIdentifier;

            Topic.forge({
                title, board_id, user_id
            }, {hasTimestamps: true}).save()
                .then(topic => res.json({success: true}))
                .catch(err => res.status(500).json({errors: err}));
        } else {
            // response to client if errors
            res.status(400).json(errors);
        }

    });
});

export default router;