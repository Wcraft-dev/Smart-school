import React from 'react'
import { Redirect } from "react-router-dom"
import {isAuth} from  './auth'
import { toast } from "react-toastify";
const validationAux = async (path,authenticator,next) =>{
    try {
        const x = await isAuth(path)
        if (x[0]) {
           next() 
        }else{
            toast.error("Unauthorized")
            authenticator(<Redirect to={x[1]}/>)
        }
    } catch (error) {
        authenticator(<Redirect to="/user/singin"/>)
    }

}
export default validationAux