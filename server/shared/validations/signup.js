import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 * Validate input function
 * @param data
 * @returns {{errors: {}, isValid: *}}
 */
export default function validateInput(data) {

    let errors = {};

    // username field validation
    if(Validator.isNull(data.username)) {
        errors.username = 'This field is required';
    }

    // email field validation
    if(Validator.isNull(data.email)) {
        errors.email = 'This field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'E-mail is invalid';
    }

    // password field validation
    if(Validator.isNull(data.password)) {
        errors.password = 'This field is required';
    }

    // passwordConfirmation field validation
    if(Validator.isNull(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'This field is required';
    }

    // password matching validation
    if(!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Passwords must be the same';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}