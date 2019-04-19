import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  
  renderActions() { // fragment of JSX we want to pass as a prop to the Modal component, using React.Fragment gives us a single variable with two elements nested inside
    return ( 
      <React.Fragment>
        <button className="ui button negative">Delete</button>
        <button className="ui button">Cancel</button>
      </React.Fragment>
    );
  }
  
  renderContent() { // renders whatever text is supposed to be passed to the content prop of Modal component

  }

  render() {
    return(
      <div>
        StreamDelete
        <Modal 
          title="Delete Stream"
          content="Are you sure you want to delete this stream?"
          actions={this.renderActions()} // ensure you invoke helper functions like this one
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => { // we want ownProps so we can look at match and pull out the id of the stream we should be showing
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(
  mapStateToProps, 
  { fetchStream }
)(StreamDelete);