import {React,useState,useEffect} from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import axios from "axios";

function GraduationProjects() {
  const [search, setSearch] = useState("");
  const [record, setRecord] = useState([]);

  // On Page load display all records
    const loadProjects = async () => {
      var response = fetch("http://localhost:5000/pfe/Lists")
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setRecord(myJson);
          console.log(myJson)
        });
    };
    useEffect(() => {
      loadProjects();
    }, []);

    // Insert Student Records
    const submitStudentRecord = async (e) => {
      e.preventDefault();
      e.target.reset();
      await axios.post("http://localhost:5000/utilisateur/", student);
      alert("Data Inserted");

      loadProjects();
    };

    // Search Records here
    const searchRecords = () => {
      alert(search);
      axios
        .get(`http://localhost:5000/utilisateur/${search}`)
        .then((response) => {
          setRecord(response.data);
        });
    };
    const showYear = (Annee, DateDepotPFE) => {
      setUpdatedYear(Annee);
      setUpdateLimitDate(DateDepotPFE);
      handleShow();
      setDetails(true);
    };
    return (
      <>
        <PanelHeader size="sm" />
        <div class="col-sm-8">
          <h5 class="text-center  ml-4 mt-4  mb-5">List Graduation Projects</h5>
           
          <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Graduation project</th> 
                <th>Professor</th> 
              </tr>
            </thead>
            <tbody>
              {record.map((item) => (
                <tr>
                  <td>
                    {" "}
                    <a onClick={() => showYear(item.Annee, item.DateDepotPFE)}>
                    {item.title}
                    </a>
                  </td>  
                  <td> {item.userId}</td> 
                  <td> {item.enseignantId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default GraduationProjects;
