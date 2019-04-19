import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions'; 
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createStream(formValues); // running the createStream action creator with formValues when user submits the form in order to create a stream (uses POST request from apis folder)
  }
  
  render() {
    // console.log(this.props)
    return( // Field element renders a React component or runs a function that returns JSX
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { createStream })(StreamCreate); 