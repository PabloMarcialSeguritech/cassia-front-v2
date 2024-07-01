import { useState } from "react";
import "./styles/cis.css";
import PanelCis from "../components/cis-components/PanelCis";
import PanelExcepciones from "../components/excepciones-components/PanelExcepciones";
const Portafolio = ({ server, dataGlobals }) => {
  const [listSelected, setListSelected] = useState(1);
  const hadleChangeList = (e) => {
    setListSelected(e);
  };

  return (
    <div className="main-cis">
      <div className="head-cis">
        <div className="title-cis">
          <div className="txt-title-cis">Excepciones</div>
        </div>
      </div>
      <div className="cont-cis">
        {listSelected === 1 ? <PanelExcepciones server={server} /> : ""}
      </div>
    </div>
  );
};

export default Portafolio;
