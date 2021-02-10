import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom'
import streams from '../api/streams';
import Swal from 'sweetalert2';
const StreamEdit = (props) => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [state, setState] = useState(useHistory().location.state);
    const setTitle = (event) => {
        setState((prevState) => {
            const title = event.target.name;
            const value = event.target.value;
            return { ...prevState, [title]: value }
        })
    }
    const updateStream = (e) => {
        e.preventDefault();
        const error = {};
        if (state.title.length === 0) {
            error.titleError = "Please Enter a valid Title";
        }
        else if (state.description.length === 0) {
            error.descError = "Please Enter a Description to your Stream"
        }
        else {
            streams.patch(`/streams/${state.id}`, { title: state.title, description: state.description }).then(() => {
                Swal.fire({
                    title: 'Success',
                    text: 'Your stream is successfully updated',
                    icon: 'success',
                    iconColor: "#2da05d",
                    confirmButtonText: 'Great!',
                    confirmButtonColor: '#2da05d'
                }).then(()=>{
                    
                history.push("/")
                })
            })
        }

        setErrors(error)
    }

    if (props.isSignedIn) {
        return (
        <div className = "col-sm-4 card cardClass" style = {{borderRadius : "15px"}}>
        <form className="m-5" onSubmit={updateStream} >
            <label style = {{fontSize : "18px"}}>Stream Title</label>
            <input className = "form-control myinput" type="text" name="title" value={state.title} onChange={setTitle} /><br/>
            {errors.titleError ? (<div className="alert alert-danger mt-1">{errors.titleError}</div>) : null}
            <label style = {{fontSize : "18px"}}>Description</label>
            <textarea rows="3" className="form-control myinput" name="description" value={state.description} onChange={setTitle} ></textarea><br/>
            {errors.descError ? (<div className="alert alert-danger mt-1">{errors.descError}</div>) : null}
            <button className="btn updatebtn btn-block">Update Stream</button>
        </form>
        </div>
        )
    }
    else {
        return <Redirect to="/" />
    }

}

const mapProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapProps)(StreamEdit)
