import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import streams from '../api/streams';
import Swal from 'sweetalert2'
const StreamList = (props) => {
    const [streamsList, setStreams] = useState([]);
    const [mounted,setmounted] = useState(true);
    useEffect(() => {
        async function getStreams() {
            const response = await streams.get("/streams");
            setStreams(response.data)
        }
        getStreams();

    }, [mounted])

    const copyToClipboard = (streamcode) => {
        var id = document.getElementById(streamcode);
        id.select();
        id.setSelectionRange(0, 99999)
        document.execCommand("copy")
        Swal.fire({
            title: 'Success',
            text: 'Your stream Id is successfully copied, paste it to your broadcasting software (OBS etc.)',
            icon: 'success',
            iconColor: "#556be7",
            confirmButtonText: 'Cool',
            confirmButtonColor: '#556be7'
        })
    }

    const deleteStream = (stream) => {
        console.log(stream)
        Swal.fire({
            title: 'Delete?',
            text: 'Are you sure you want to delete this stream ?',
            icon: 'error',
            iconColor: "red",
            confirmButtonText: 'Delete Stream',
            confirmButtonColor: '#db6767',
            showCancelButton: true,
            cancelButtonText: "Not Now",
        }).then((result) => {
            if (result.isConfirmed) {
                streams.delete(`/streams/${stream.id}`);
                setmounted(!mounted)
            }
        })
    }
    const renderButtons = (stream) => {
        if (stream.owner === props.userId) {
            return <>
                <div>
                <input className="myClass" id={stream.streamData.streamId} value={stream.streamData.streamId} readOnly />&nbsp;<button onClick={() => copyToClipboard(stream.streamData.streamId)} className="btn copybtn">Copy Id</button>&nbsp;
                <NavLink to={{ pathname: "/streams/edit", state: stream }}><button className="btn editbtn">Edit</button></NavLink>&nbsp;
                <button className="btn deletebtn" onClick={() => { deleteStream(stream) }}>Delete</button></div>
            </>
        }

        else {
            return null;
        }
    }

    const renderData = streamsList.map((stream) => {
        return (
            <div key={stream.id}>
                <div className="row">
                    <div className="col-lg-8 col-sm-4">
                        <NavLink to={{ pathname: "/streams/show", state: stream }}><b>{stream.title}</b></NavLink>
                        <div><small><b>{stream.description}</b></small>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-4">{renderButtons(stream)}</div>
                </div>
                <hr />
            </div>
        )
    })

    return (
        <>
            <div className="offset-sm-1 col-sm-10 mt-5">
                <div className="list-group">
                    {renderData}
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return { userId: state.auth.userId, userName: state.auth.accountData }
}

export default connect(mapStateToProps)(StreamList)
