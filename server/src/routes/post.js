import express from 'express';
import authenticate from '../middlewares/authenticate';
import commonValidations from '../shared/validations/post';
import isEmpty from 'lodash/isEmpty';


// models
import Topic from '../models/topic';
import Post from '../models/post';


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

    return Post.query({
        where: {text: data.text}
    }).fetch().then(post => {

        if (post) {
            // more validation will be here
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    });
}


/**
 * Get post count in topic by ID
 */
router.get('/count/:identifier', (req, res) => {
    Post.query({
        select: ['id'],
        where: {topic_id: req.params.identifier}
    })
        .fetchAll().then(posts => {
        res.json({
            'count': posts.length
        });

    });
});


/**
 * Get all posts in topic by ID
 */
router.get('/:identifier', (req, res) => {
    Post.query({
        select: ['id', 'text', 'topic_id', 'user_id', 'created_at'],
        where: {topic_id: req.params.identifier}
    })
        .orderBy('created_at', 'DESC')
        .fetchAll().then(posts => {
        res.json({posts});
    });
});


/**
 * Get post by ID
 */
router.get('/id/:identifier', (req, res) => {
    Post.query({
        select: ['id', 'text', 'topic_id', 'user_id', 'created_at'],
        where: {id: req.params.identifier}
    })
        .fetch().then(post => {
        res.json({post});
    });
});


/**
 * Create new post in topic
 */
router.post('/', authenticate, (req, res) => {

    /**
     * server and database layer validation
     */
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {

        if (isValid) {
            const {text, topicIdentifier, userIdentifier} = req.body;
            const topic_id = topicIdentifier;
            const user_id = userIdentifier;

            Post.forge({
                text, topic_id, user_id
            }, {hasTimestamps: true}).save()
                .then(
                    post => res.json({success: true}),
                )
                .catch(err => res.status(500).json({errors: err}));
        } else {
            // response to client if errors
            res.status(400).json(errors);
        }

    });
});

export default router;