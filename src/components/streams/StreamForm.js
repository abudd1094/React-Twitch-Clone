import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ error, touched }) { // destructuring error and touched keys out of the redux-form meta object
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  
  renderInput = ({ input, label, meta }) => { // takes formProps key/value pairs and adds them as properties to the input element, we destructure input out when passing in formProps, before it would be ...formProps.input
    const className = `field ${meta.error && meta.touched ? 'error' : ''}` // creating some logic to conditionally add the className error to our div, which in Semantic UI makes the input field red when there is an error
    return(
      <div className={className}>
        <label htmlFor="">{label}</label>      {/* we add our own custom prop 'label' and destructure it */}
        <input {...input} autoComplete="off" /> 
        <div>{this.renderError(meta)}</div>   {/* we pass meta object from redux form into the renderError helper method */}
      </div>
      
    )  
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues); // running the appropriate onSubmit callback when the user submits the form; expects an onSubmit prop
  }
  
  render() {
    // console.log(this.props)
    return( // Field element renders a React component or runs a function that returns JSX
      <form 
        onSubmit={this.props.handleSubmit(this.onSubmit)} 
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="enter title"/> 
        <Field name="description" component={this.renderInput} label="enter description"/>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => { // form validation for form in render method above
  const errors = {};

  if (!formValues.title) { // check if a user entered in a title or not
    errors.title = 'You must enter a title';
  } 

  if (!formValues.description) { // check if a user entered in a description or not
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validate // can be condensed just to validate since key and value are the same
})(StreamForm);