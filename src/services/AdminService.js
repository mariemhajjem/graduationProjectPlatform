import axios from 'axios'


let baseUrl = "http://localhost:5000/users" ;
let baseUrlPfe =  "http://localhost:5000/users"

export async function getAllUser(){



  try{

    var resp = await axios.get(baseUrl + "/etudiants");
    return await resp.data;


  }catch(error){

    alert(error);
    return null;


  }
}

export async function getAllProf(){



  try{

    var resp = await axios.get(baseUrl + "/profs");
    return await resp.data;


  }catch(error){

    alert(error);
    return null;


  }
}


export async function getUserById (id){


  try{

    var resp = await axios.get(baseUrl +"/" + id);
    return await resp.data;


  }catch(error){

    alert(error);
    return null;


  }
}


  export async function deleteUser (id){


    try{
  
      var resp = await axios.delete(baseUrl +"/" + id);
      return await resp.data;
  
  
    }catch(error){
  
      alert(error);
      return null;
  
  
    }
  }

export async function updateUser (id,student){


  try{

    var resp = await axios.put(baseUrl +"/" + id , student);
    return await resp.data;


  }catch(error){

    alert(error);
    return null;


  }

}


export async function GetPfeForProf(id){

  try{

    var resp = await axios.get(baseUrl +"/" + id);
    return await resp.data;


  }catch(error){

    alert(error);
    return null;


  }

}