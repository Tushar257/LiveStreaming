import React from 'react'
import ReactDOM from 'react-dom';
const Modal = (props) => {
    return ReactDOM.createPortal(
        <div onClick= {props.data.onDismiss} className = "ui dimmer modals visible active" >
            <div onClick = {(e) => {e.stopPropagation();}} className = "ui standard modal visible active" style = {{position : 'relative' , height : props.data.modalHeight}}>
                <div className = "header">{props.data.title}</div>
                <div className = "content">
                    <p>{props.data.content}</p>
                </div>
                <div className = "actions">
                    {props.data.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal
