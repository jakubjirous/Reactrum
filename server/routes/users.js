import express from 'express';
import validateInput from '../shared/validations/signup';


// express router
let router = express.Router();

router.post('/', (req, res) => {

    // parse request body to terminal console
    //console.log(req.body);

    const {errors, isValid} = validateInput(req.body);

    if (isValid) {
        // response to client if success
        res.json({ success: true });

    } else {
        // response to client if errors
        res.status(400).json(errors);
    }
});

export default router;