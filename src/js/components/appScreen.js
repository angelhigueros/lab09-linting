import React, {useState} from "react";
import { Table } from "./table";


export const AppScreen = () => {

  const [attemps, setAttemps] = useState(0)
  const [msg, seTmsg] = useState("")

  const handleNewGame = () => {
    window.location.reload()
  }

  return (
    <>
      <div className="container is-flex">
        <div className="is-2 is-flex-column is-flex-bspace">
          <button onClick={handleNewGame} className="button is-success">Nuevo</button>

        
        </div>
        <div className="is-8 is-flex-column">
          <span className="title">MEMORIA UVG</span>
          <Table setAttemps={setAttemps} seTmsg={seTmsg} />
        </div>
        <div className="is-2 is-flex-column is-flex-bspace">
          <span className="title">{attemps} intentos</span>
          <span className="title-2">{msg}</span>
        </div>
      </div>
    </>
  );
};
