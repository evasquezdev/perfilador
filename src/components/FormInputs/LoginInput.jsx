import React from 'react';
import classnames from "classnames";
import {
	Input,
	FormFeedback,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
} from "reactstrap";

export const FormInput = ({
    input,
	input: {onChange,value},
	placeholder,
	type,
	meta: {
		touched,
		error,
	},
}) => {
    const [state, setState] = React.useState({});
    return (<InputGroup
        className={classnames({
            "input-group-focus": state.emailFocus,
        })}
    >
        <InputGroupAddon addonType="prepend">
            <InputGroupText>
            <i className="tim-icons icon-email-85" />
            </InputGroupText>
        </InputGroupAddon>
        <Input
            {...input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={({ target }) => onChange(target.value)}
            autoFocus={false}
            formNoValidate
            onFocus={(e) => {
                setState({ ...state, emailFocus: true });
                input.onFocus(e)
            }}
            onBlur={(e) => {
                setState({ ...state, emailFocus: false });
                input.onBlur(e)
            }}
        />
        {touched && error && <FormFeedback style={{display: 'block'}}>
            {error}
        </FormFeedback>}
    </InputGroup>)
};