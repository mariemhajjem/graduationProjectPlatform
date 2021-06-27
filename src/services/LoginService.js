import axios from "axios";

let baseUrl = "http://localhost:5000/auth"

export async function Connect(credential){

    try {
        let jwt = await axios.post("/auth" , credential);
        localStorage.setItem("token" , jwt );
        return true;

        
    } catch (error) {
        return false;
    }
}

export async function Register(user){

try{

    let userData = {

        "email" : user.email,
        "mdp" : user.password,
        "role" : "student",
        //"phone" : user.phone,
        //"username" :  user.username
    }
    var resp =  await axios.post(baseUrl + "/register" , userData);
    return true;


}catch(error){

alert(error);
console.log(error)
return false;

}


}

export async function Disconnected(){

    try {
    await axios.post("/logout",{});
        return true;
    } catch (error) {
        return false;
    }
}

export async function LoginService (user){

try{

    let data = await (await axios.post(baseUrl + "/login" , user)).data.token;
    console.log(data);

   await localStorage.setItem("info" ,data  );
    return true
}catch(error){

    return false;
}

}