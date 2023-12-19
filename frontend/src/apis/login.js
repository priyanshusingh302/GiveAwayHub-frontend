import { request } from "../helpers/axios_helper";

const login= async (cred)=>{
    try{
        const response = await request('post','/login',cred);
        return {success:true,data:response.data};
    }
    catch(err){
        console.log(err)
        return {success:false,data:{}};
    }
}

export {login}