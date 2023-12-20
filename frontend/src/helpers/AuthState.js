import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState= ({children})=>{

    const [state, setState]= useState({
        isLoggedIn: false,
        data:{}
    });
    useEffect(()=>{
        if(localStorage.getItem('user')){
            setState(JSON.parse(localStorage.getItem('user')))
        }
    },[])
    return (
        <AuthContext.Provider value={{state,setState}}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthState