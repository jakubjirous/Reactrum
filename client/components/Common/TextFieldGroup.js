import React, {Component} from 'react';
import classnames from 'classnames';


/**
 * TextFieldGroup component
 */
const TextFieldGroup = ({ id, field, value, label, error, type, placeholder, onChange, checkUserExists }) => {
    return(
        <div className={classnames('form-group', {'has-danger': error})}>
            <label className="form-control-label" htmlFor={id}>{label}</label>
            <input
                type={type}
                name={field}
                className={classnames('form-control', {'form-control-danger': error})}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={checkUserExists}
            />
            {error && <div className="form-control-feedback">
                <small>{error}</small>
            </div>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    id: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    checkUserExists: React.PropTypes.func
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;