import { combineReducers} from 'redux';
const INIT_STATE = {
    isSignedIn : null,
    userId : null,
    accountData : null
}
const authReducer = (state = INIT_STATE , action) => {

    switch(action.type) {

        case "SIGN_IN" : return {...state, isSignedIn : true , userId : action.payload};
        case "SIGN_OUT" : return {...state , isSignedIn : false, userId : null};
        case "Account_Details" : return {...state , accountData : action.payload};
        default : return state;
    }
}



export default combineReducers({
    auth : authReducer
})