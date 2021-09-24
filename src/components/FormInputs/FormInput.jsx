import {
	FormGroup,
	Label,
	Input,
	FormText,
	FormFeedback
  } from 'reactstrap';
  
  export const FormInput = ({ 
	input,
	label,
	type,
	placeholder,
	xs,
	md,
	lg,
	meta: {
	  touched,
	  error,
	  warning
	},
	formText,
	min,
	max,
	step,
	disabled,
	size,
  }) => (
	<FormGroup  xs={xs} md={md} lg={lg} className="mt-1">
	  {label && <Label >
		<strong className="mr-auto">
		  {label}
		</strong>
	  </Label>}
	  <Input
		{...input}
		type={type}
		placeholder={placeholder}
		disabled={disabled}
		min={min}
		max={max}
		step={step}
		size={size}
		invalid={(touched && (error || warning))}
	  />
	  {formText && <FormText>
		{formText}
	  </FormText>}
	  {touched && (
		(error && <FormFeedback>
		  {error}
		</FormFeedback>) || 
		(warning && <FormFeedback>
		  {warning}
		</FormFeedback>)
	  )}
	</FormGroup>
  )
  
  export const FormSelect = ({
	input,
	meta: {
	  touched,
	  error,
	  warning
	},
	formText,
	placeholder,
	label,
	disabled,
	options
  }) => {
	return <FormGroup className="mt-1">
	  {label && <Label >
		<strong className="mr-auto">
		  {label}
		</strong>
	  </Label>}
	  <Input
		{...input}
		type="select"
		placeholder={placeholder}
		disabled={disabled}
		invalid={(touched && (error || warning))}
	  >
		{options && options.map(option => 
		  <option value={option.id}>
			{option.name}
		  </option>
		)}
	  </Input>
	  {formText && <FormText>
		{formText}
	  </FormText>}
	  {touched && (
		(error && <FormFeedback>
		  {error}
		</FormFeedback>) || 
		(warning && <FormFeedback>
		  {warning}
		</FormFeedback>)
	  )}
	</FormGroup>
  }
  
  const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
  
  export const FileInput = ({ 
	input: { value: omitValue, onChange, onBlur, ...inputProps }, 
	meta: {
	  touched,
	  error,
	  warning
	},
	...props 
  }) => {
	return (<FormGroup className="mt-1">
	  {props.label && <Label >
		<strong className="mr-auto">
		  {props.label}
		</strong>
	  </Label>}
	  <br/>
	  <Input 
		type="file"
		onChange={adaptFileEventToValue(onChange)}
		onBlur={adaptFileEventToValue(onBlur)}
		{...props.input}
		{...props}
		invalid={(touched && (error || warning))}
	  />
	  {props.formText && <FormText>
		{props.formText}
	  </FormText>}
	  {touched && (
		(error && <FormFeedback>
		  {error}
		</FormFeedback>) || 
		(warning && <FormFeedback>
		  {warning}
		</FormFeedback>)
	  )}
	</FormGroup>);
  };