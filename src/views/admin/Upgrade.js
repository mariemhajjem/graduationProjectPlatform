import React from "react";
import {useHistory} from "react-router-dom";  

function Upgrade() {
  let history = useHistory()
  localStorage.removeItem('token');
  history.push("/login");
  history.go(0)
  return (
    <>
       {Upgrade}
    </>
  );
}

export default Upgrade;
