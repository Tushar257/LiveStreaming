import React from 'react'
import { connect } from 'react-redux';
const MyAccout = (props) => {

    const renderComp = ()=> {
        if (props.userData !== null) {
            return (
                <div>
                    Welcome to account page {props.userData.getName()}
                </div>
            )
        }
        else {
            return null;
        }
    }

    return (
        <div>
           {renderComp()}
        </div>
    )
}

const stateToParam = (state) => {
    return { userData: state.auth.accountData }
}
export default connect(stateToParam)(MyAccout)
