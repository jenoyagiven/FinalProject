import {combineReducers} from "redux"

// state - untuk menaru semua data
const init = {
    id:'',
    username:''
}

// action creator - membikin action
const authReducer = (state = init, action) => {
switch(action.type){
    // case dipakai untuk menjalankan function mana 
    case "login_success":
        // ini akan membikin website terlogin
        return {...state, id:action.payload.id, username:action.payload.username}

        case "logout_success":
    // ini akan membikin website terlogout
    return {...state, id:'', username:''}

    default:
        return state
}


}

// reducer -mengproses data
 const reducer = combineReducers(
     {
         auth:authReducer
     }
 )

 export default reducer
