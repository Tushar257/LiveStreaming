import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import flv from 'flv.js';
const StreamShow = () => {
    const video = useRef(null);
    const history = useHistory();
    const streamDetails = history.location.state;
    const id = streamDetails.streamData.streamId;
    let player;

    function buildPlayer() {
        if (!video.current) {
            return;
        }
        player = flv.createPlayer({
            type: 'flv',
            url: `https://rtmplive.herokuapp.com/live/${id}.flv`
        })
        player.attachMediaElement(video.current);
        player.load();

    }

    buildPlayer();

    useEffect(() => {
        buildPlayer();

        return () => {
            player.destroy()
        }
    })
    return (
        <div>
            <video ref={video} style={{ width: '100%'}} controls />
            <div className = "row">
                <div className = "col-lg-12">
                    <div className="card m-4" style ={{ boxShadow : '0px 5px 12px #0000001f', border : 'none' , borderRadius : '10px'}}>
                        <div className = "card-body">
                <h3>{streamDetails.title}</h3>
                <h5 className="text-muted">{streamDetails.description}</h5>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default StreamShow
