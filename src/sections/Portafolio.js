import { useState } from "react";
import "./styles/cis.css";
import PanelCis from "../components/cis-components/PanelCis";
import PanelPortafolio from "../components/portafolio-components/PanelPortafolio";
const Portafolio = ({ server, dataGlobals }) => {
  const [listSelected, setListSelected] = useState(1);
  const hadleChangeList = (e) => {
    setListSelected(e);
  };

  return (
    <div className="main-cis">
      <div className="head-cis">
        <div className="title-cis">
          <div className="txt-title-cis">Portafolio de Tecnologias</div>
        </div>
      </div>
      <div className="cont-cis">
        {listSelected === 1 ? <PanelPortafolio server={server} /> : ""}
      </div>
    </div>
  );
};

export default Portafolio;
