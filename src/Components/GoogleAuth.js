import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, myDetails } from '../Actions/actions'
const GoogleAuth = (props) => {
    const auth = useRef(null);
    async function getAuth() {
        await window.gapi.load('client:auth2', () => {

            window.gapi.client.init({
                clientId: "1019353739933-nsgiqesb54rh2tbachotmrio2407g5v2.apps.googleusercontent.com",
                scope: 'email'
            }).then(() => {

                auth.current = window.gapi.auth2.getAuthInstance();
                onAuthChange(auth.current.isSignedIn.get());
                // var data = {name : auth.current.currentUser.get().getBasicProfile().getName()};
                auth.current.isSignedIn.listen(onAuthChange);
            })

        });
    }
    getAuth();
    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            props.signIn(auth.current.currentUser.get().getId());
            props.myDetails(auth.current.currentUser.get().getBasicProfile())
        }
        else {
            props.signOut();
        }
    }

    const logout = () => {
        auth.current.signOut();
    }
    const login = () => {
        auth.current.signIn();


    }
    if (props.isSignedIn === true) {
        return (<button className="btn mybtn" onClick={logout}>Logout</button>)
    }
    else if (props.isSignedIn === false) {

        return (<button className="btn googlebtn" onClick={login}><i className = "fa fa-google-plus"></i>&nbsp;&nbsp;Login with Google</button>)
    } 

    else {
        return null;
    }

}

const mapStateToProps = (state) => {

    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId }
}

export default connect(mapStateToProps, { signIn, signOut, myDetails })(GoogleAuth)
