import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => { // accessing the google api on the global window and loading client portion of the library, 
      window.gapi.client.init({             // callback arrow function to initiate the client once it is loaded (this returns a promise when initialzed)
        clientId: '564376285222-j92rh1tgegd79t47ki99n89glopel217.apps.googleusercontent.com',
        scope: 'email'                    // specifying scopes to load; access to the user's email
      }).then(() => {                    // executed after gapi library is ready, 
        this.auth = window.gapi.auth2.getAuthInstance();  // *** our state REFERENCE to gapi auth object on our component class

        this.onAuthChange(this.auth.isSignedIn.get());  // update auth state inside redux store
        this.auth.isSignedIn.listen(this.onAuthChange); // .listen() method from prototype allows us to add callback event listener
      })
    }); 
  }

  onAuthChange = isSignedIn => { // accessing redux store through props
    if(isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  } 

  onSignIn = () => {     // helper methods like this make it easier for others to understand what is going on in the code
    this.auth.signIn();  // using our state reference to google auth to invoke its built in signIn() function
  };

  onSignOut = () => {
    this.auth.signOut();
  };
  
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) { // we don't include parentheses w onClick events below bc we don't want function to invoke upon the component rendering
      return (
        <button onClick={this.onSignOut} className="ui red google button"> 
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  
  render() {
    return(
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
  mapStateToProps, 
  { signIn, signOut }
)(GoogleAuth);