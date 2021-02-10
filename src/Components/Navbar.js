import React from 'react'
import { NavLink } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import { connect } from 'react-redux';
const Navbar = (props) => {
    return (<>
        <nav className="navbar navbar-expand-lg navbar-light myNavbar">
            <NavLink className="navbar-brand" to="/"><b>StreamO</b></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    {props.loggedIn ? <li className="nav-item dropdown mybtn mr-2">
                        <div  className="nav-link dropdown-toggle" style = {{color:'white', cursor : 'pointer'}} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {props.userData ? props.userData.getName() : null}
                        </div>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink className="dropdown-item" to="/streams/new"><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp;&nbsp;Create Stream</NavLink>
                        </div>
                    </li> : null}
                    <GoogleAuth />
                </div>
            </div>
        </nav>
    </>
    )
}

const mapStateToParams = (state) => {
    return { loggedIn: state.auth.isSignedIn, userData: state.auth.accountData }
}

export default connect(mapStateToParams)(Navbar)
