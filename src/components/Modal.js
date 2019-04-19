import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal( // below, if user clicks on background, navigate back to home page, clear modal
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      {/* to avoid having the onClick event above invoked when an area inside the modal is clicked, we add the below click handler which takes in the event object e generated whenever an event is created, and invoke the stopPropagation function to stop that click event from invoking the history.push() function above */}
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active"> 
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>, 
    document.querySelector('#modal') // renders into the div with id of modal in the index.html file
  );
};

export default Modal;