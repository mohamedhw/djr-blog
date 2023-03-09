import { PROFILE_FAIL, PROFILE_SUCCESS, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL } from "../action/type";



const initialState = {
    username: '',
    image: ''
}


export default function(state=initialState,action){
    const { type, payload } = action
    switch(type){
        case PROFILE_UPDATE_SUCCESS:
        case PROFILE_SUCCESS:
            return {
                ...state,
                image: payload.profile.image,
                username: payload.username
            }
        case PROFILE_FAIL:
            return {
                ...state,
                image: '',
                username: '',
            }
        case PROFILE_UPDATE_FAIL:
            return { ...state}
        default:
            return state
    }
}