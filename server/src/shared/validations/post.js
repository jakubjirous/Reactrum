import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validate input function
 * @param data
 * @returns {{errors: {}, isValid: *}}
 */
export default function validateInput(data) {

    let errors = {};

    // title field validation
    if(Validator.isNull(data.text)) {
        errors.text = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}