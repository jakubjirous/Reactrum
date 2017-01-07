import express from 'express';

// models
import Category from '../models/category';


// express router
let router = express.Router();


/**
 * Get all categories from DB
 */
router.get('/', (req, res) => {
    Category.query({
        select: ['id', 'title']
    }).fetchAll().then(categories => {
        res.json({ categories });
    });
});

export default router;