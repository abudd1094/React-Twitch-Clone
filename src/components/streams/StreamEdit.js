import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues) // pass in stream id and changed formValues object to editStream action creator
  }

  render() {
    if (!this.props.stream) { // if we have not yet loaded up our stream return 'Loading...'
      return <div>Loading...</div>
    }

    return(
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          initialValues={_.pick(this.props.stream, 'title', 'description')} // this.props.stream is an object w a title and description property, however it also affects the id, to solve this we use lodash _.pick function to extract only the 'title' and 'description' properties for editing inside the form
          onSubmit={this.onSubmit} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => { // ownProps allows us to access the props object from our component
  return { stream: state.streams[ownProps.match.params.id] } // should select appropriate stream from streams object
}

export default connect(
  mapStateToProps, 
  { fetchStream, editStream }
)(StreamEdit);