import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validate input function
 * @param data
 * @returns {{errors: {}, isValid: *}}
 */
export default function validateInput(data) {

    let errors = {};

    // identifier field validation
    if(Validator.isNull(data.identifier)) {
        errors.identifier = 'This field is required';
    }

    // password field validation
    if(Validator.isNull(data.password)) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}