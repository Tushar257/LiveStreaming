import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import streams from '../api/streams';
import shortid from 'shortid';
import Swal from 'sweetalert2';
const StreamCreate = (props) => {
    const history = useHistory();
    console.log(props.authDetails)
    const [form, setForm] = useState({ title: "", description: "" });
    const [errors, setErrors] = useState({});
    const changeData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (value.length > 0 && name === "title") {
            delete errors.titleError;
        }

        if (value.length > 0 && name === "description") {
            delete errors.descError;
        }
        setForm((prevVal) => {

            return { ...prevVal, [name]: value }
        })
    }
    const submitForm = (e) => {
        const error = {};
        const streamId  = shortid.generate();
        e.preventDefault();
        if (form.title.length === 0) {
            error.titleError = "Please Enter a valid Title";
        }
        else if (form.description.length === 0) {
            error.descError = "Please Enter a Description to your Stream"
        }
        else {
            streams.post("/streams", {title: form.title, description: form.description, owner: props.userId, streamData : {streamId : streamId} }).then(() => { 
                Swal.fire({
                    title: 'Success',
                    text: 'Your stream is successfully created',
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

    if (props.isSignedIn !== true) {
        return <Redirect to={{ pathname: "/" }}></Redirect>
    }
    else {
        return (
            <div className="col-sm-4 card cardClass" style={{ borderRadius: "15px" }}>
                <div className="text-center mt-4">
                    <h4>Welcome to StreamO</h4>
                    <small className="text-muted"><b>You can create your own live stream here</b></small>
                </div>
                <form className="m-5" onSubmit={submitForm}>
                    <input className = "form-control myinput" placeholder = "Stream Title" type="text" onChange={changeData} name="title" value={form.title} /><br/>
                    {errors.titleError ? (<div className="alert alert-danger mt-1">{errors.titleError}</div>) : null}
                    <textarea placeholder = "Add Description Here" className = "form-control myinput" rows="3" onChange={changeData} name="description" value={form.description}></textarea><br/>
                    {errors.descError ? (<div className="alert alert-danger mt-1">{errors.descError}</div>) : null}
                    <button className="btn updatebtn btn-block">Create Stream</button>
                </form>
            </div>
        )
    }
}

const mapStateToParams = (state) => {
    console.log(state)
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId, authDetails : state.auth.accountData }
}

export default connect(mapStateToParams)(StreamCreate)
