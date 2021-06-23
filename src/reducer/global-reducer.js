const INTIIAL_STATE = {
    global: {}
}

const globalReducer = (state = INTIIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_TOTAL':
            return {
                ...state,
                global: action.payload
            }
        default:
            return state
    }
}

export default globalReducer