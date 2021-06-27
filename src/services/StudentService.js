/* import axios from "axios";

class StudentApiGenerated {

  static contextUrl = "" + "/student";
 
  static createStudent(student) {
    return axios.post(StudentApiGenerated.contextUrl, student )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

 
  static deleteStudent(id) {
    return axios.delete(StudentApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
 
  static findBy_courses(id) {
    return axios.get(StudentApiGenerated.contextUrl + "/findBy_courses/" + id )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
 
  static getOneStudent(id) {
    return axios.get(StudentApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
 
  static getStudentList() {
    return axios.get(StudentApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
 
  static saveStudent(student) {
    return axios.post(StudentApiGenerated.contextUrl + "/" + student._id, student )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }


}

export default StudentApiGenerated;
 */
import axios from "axios";

let baseUrl = "http://localhost:5000/utilisateur"

export async function loadStudentDetail() {
  var response = fetch(baseUrl + "/etudiants")
     .then(function(response){
        return response.json();
      })
     .then(function(myJson) {
         return myJson;
      });
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