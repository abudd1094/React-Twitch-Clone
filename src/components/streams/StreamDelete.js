import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal'
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  
  renderActions() { // fragment of JSX we want to pass as a prop to the Modal component, using React.Fragment gives us a single variable with two elements nested inside
    const { id } = this.props.match.params;

    return ( 
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }
  
  renderContent() { // renders whatever text is supposed to be passed to the content prop of Modal component
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }

    return `Are you sure you want to delte the stream with title: ${this.props.stream.title}?`
  }

  render() {
    return(
      <Modal 
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()} // ensure you invoke helper functions like this one
        onDismiss={() => history.push('/')}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => { // we want ownProps so we can look at match and pull out the id of the stream we should be showing
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(
  mapStateToProps, 
  { fetchStream, deleteStream }
)(StreamDelete);