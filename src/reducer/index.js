import {combineReducers} from "redux"

const inputState = {
    id:'',
    username:''
}

// action creator
const AuthController = (state = inputState  ,action) => {
    switch (action.type) {
        // kalau login succes
        case "login_success":
            return{...state, username:action.data.user_name, id:action.data.iduser}
         
        // tidak ada break, karena proses reducer akan terhenti
        case "logout_success":
            return {...state, username:"", id:""}
        
            default:
        return state    
    }
}

// combinereducer - mengabung function2 reducer menjadi satu dan membolehkan, gabung dengan value lain 
const reducer = combineReducers(
    {
        auth:AuthController
    }
)

export default reducer

