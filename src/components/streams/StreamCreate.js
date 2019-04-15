import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  renderInput({ input, label }) { // takes formProps key/value pairs and adds them as properties to the input element, we destructure input out when passing in formProps, before it would be ...formProps.input
    return(
      <div>
        <label htmlFor="">{label}</label>      {/* we add our own custom prop 'label' and destructure it */}
        <input {...input} /> 
      </div>
      
    )  
  }

  onSubmit(formValues) {
    console.log(formValues)
  }
  
  render() {
    // console.log(this.props)
    return( // Field element renders a React component or runs a function that returns JSX
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
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
  form: 'streamCreate',
  validate: validate // can be condensed just to validate since key and value are the same
})(StreamCreate);

