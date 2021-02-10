export const signIn = (userId) => {

    return { 
        type : "SIGN_IN",
        payload : userId
    }
}

export const signOut = () => {

    return { 
        type : "SIGN_OUT"
    }
}

export const myDetails = (accountData) => {

    return {
        type : "Account_Details",
        payload : accountData
    }
}