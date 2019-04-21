import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }
  
  componentDidMount() {
    const { id } = this.props.match.params;
    
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer(); // if component fetches the stream successfully in the future, re build player
  }

  componentWillUnmount() {
    this.player.destroy();
  }
  
  buildPlayer() {
    if (this.player || !this.props.stream) { // if we already have a player or the stream does not yet exist
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({ // configuring video streaming server
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    
    const { title, description } = this.props.stream;  // destructuring title and description properties from the stream
    
    return( // for controls={true} in the HTML video player we can simply write controls, it will be read the same
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls={true} /> 
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    ) 
  }
  
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
  mapStateToProps, 
  { fetchStream }
)(StreamShow);