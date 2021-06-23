const INITIAL_STATE = {
    username: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOGIN' : 
            return {
                ...state,
                username: action.payload
            }
        case 'LOGOUT' : 
            return INITIAL_STATE
        default: 
            return state
    }
}

export default userReducer