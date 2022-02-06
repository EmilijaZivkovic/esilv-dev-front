import { useEffect, useState } from "react";
import Button from "../lib/Button";

function MatchList() {
  const [matchs, setMatchs] = useState();
  const f = [];
  useEffect(() => {
    fetch("http://fauques.freeboxos.fr:3000/matches", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setMatchs(data));
  }, []);
  
  function handleAddMatches() {
    fetch("http://fauques.freeboxos.fr:3000/matches", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((data) => f = data)
    .then((response) => {
      if(response.status === 404) {

      }else{
        setMatchs([...matchs,f]);
      }
    });
  }

  function handleDeleteMatches(id){
    setMatchs(matchs.filter((value) => value._id !== id));
  }
  return (
    <>
      {<button onClick={handleAddMatches}> Create Match</button>}
      <ul>
      {matchs === undefined && <span>Loading...</span>}
      {matchs?.length === 0 && <span>No data</span>}
      {matchs?.map((match) => (
        <li>
          <Button title={match._id}></Button>
        <button onClick={() => handleDeleteMatches(match._id)}>X</button>
       </li>
      ))}
    </ul>
    </>
    
  );
}

export default MatchList;
