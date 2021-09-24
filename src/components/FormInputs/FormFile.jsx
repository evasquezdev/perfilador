import {
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';
  
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