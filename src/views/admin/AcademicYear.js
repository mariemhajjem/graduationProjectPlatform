import React, { useState } from "react"
import axios from "axios"  
import PanelHeader from "components/PanelHeader/PanelHeader.js"; 

function AcademicYear() {
  const [data, setData] = useState({
    nom: "",
    DateDepotPFE: "",
  });

  const [error, setError] = useState("");
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  function clearData(e) {
    e.preventDefault();
    setData({
      nom: "",
      DateDepotPFE: "",
    });
  }
  async function add_academic_year(e) {
    e.preventDefault();
    let request = {
      nomAnnee: data.nom,
      DateDepotPFE: data.DateDepotPFE,
    };
    const res = await axios.post(
      "http://localhost:5000/annee/Create",
      request
    );
    try {
      if (res.data.type === "error") {
        setError(res.data.error);
      } else {
        setData(res.data);
        clearData(e);
        window.location.reload();
      }
    } catch (err) {
      setError("bad request");
    }
  }
  return (
    <>
        <PanelHeader size="sm" />
    <div className="container">
      <form onSubmit={(e) => add_academic_year(e)} className="form-sm">
        <legend style={{ fontFamily: "bold" }}>
        Academic year
        </legend>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              value={data.nom}
              onChange={(e) => handle(e)}
              id="nom"
              class="form-control"
              placeholder="Academic year"
            ></input>
          </div>
          <div className="col">
            <input
              type="date"
              value={data.DateDepotPFE}
              onChange={(e) => handle(e)}
              id="DateDepotPFE"
              class="form-control"
              placeholder="Graduaton project Date"
            ></input>
          </div>
        </div>
        <br></br>
        <div className="button">
          <button type="submit" class="btn btn-success">
            Ajouter
          </button>
          &nbsp;&nbsp;&nbsp;
          <button type="reset" class="btn btn-warning " onClick={clearData}>
            Annuler
          </button>
        </div>
        <br></br>
        {error && (
          <div
            style={{
              color: "red",
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "17px",
            }}
            severity="error"
            onClick={() => setError(null)}
          >
            {props.error || error}
          </div>
        )}
      </form>
    </div>
  </>
  );
}

export default AcademicYear;
