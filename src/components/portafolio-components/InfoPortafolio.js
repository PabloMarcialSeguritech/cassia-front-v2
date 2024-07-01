import React, { useEffect, useState } from "react";
import "./styles/InfoPortafolio.css";
// import CisList from './CisList';
// import LoadSimple from '../LoadSimple';
import TablePortafolioDevices from "./TablePortafolioDevices";
import Search from "../generales/Search";
import Action from "../Action";
import Paginador from "../generales/Paginador";

/* estilos modal crear configuracion */

const InfoPortafolio = ({
  server,
  portfolioSelected,
  onSearch,
  dataUsers,
  setDataUsers,
}) => {
  const limitList = 20;

  const [pageActual, setPageActual] = useState(1);
  const [CreateCisModalOpen, setCreateCisModalOpen] = useState(false);
  const [CisAfectaModalOpen, setCisAfectaModalOpen] = useState(false);
  const [CisDocsModalOpen, setCisDocsModalOpen] = useState(false);

  const [dataCisConf, setDataCisConf] = useState({
    data: [],
    loading: true,
    error: null,
  });
  const [editActiveConfig, setEditActiveConfig] = useState(false);
  const [dataCisConfig, setDataCisConfig] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  var dataList = searchTerm === "" ? dataCisConf.data : searchResults;
  const startLimit = limitList * pageActual - limitList;
  const pages = parseInt(dataList.length / limitList) + 1;
  console.log(searchResults);
  useEffect(() => {
    buscar_cis_history();
  }, []);
  function closCreateCisModal() {
    setEditActiveConfig(false);
    setCreateCisModalOpen(false);
    buscar_cis_history();
  }
  const crear = () => {
    // Aquí puedes realizar la búsqueda usando el valor de 'query'
    // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
    setCreateCisModalOpen(true);
  };

  function closeCisAfectaModal() {
    setCisAfectaModalOpen(false);
  }

  function openCisAfectaModal() {
    setCisAfectaModalOpen(true);
  }
  function closeCisDocsModal() {
    setCisDocsModalOpen(false);
  }

  function openCisDocsModal() {
    setCisDocsModalOpen(true);
  }
  const handleChangEdit = (cis) => {
    console.log("handle edit");

    setEditActiveConfig(true);
    console.log(cis);
    buscar_cis(cis.conf_id);
  };
  const buscar_cis = (ci_id) => {
    console.log("buscar_cis", ci_id);

    // setLoadingCis(true)
    const fetchDataPost = async () => {
      try {
        console.log(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/ci_elements/" +
            ci_id
        );
        const response = await fetch(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/ci_elements/history/detail/" +
            ci_id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const data1 = await response.json();
          // setLoadingCis(false)
          console.log(data1);
          setDataCisConfig(data1.data);
          setCreateCisModalOpen(true);
        } else {
          const data1 = await response.json();
          console.log(data1);
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataPost();
  };
  const buscar_cis_history = () => {
    // setLoadingCis(true)
    setDataCisConf({
      data: dataCisConf.data,
      loading: true,
      error: dataCisConf.error,
    });
    const fetchDataPost = async () => {
      try {
        console.log(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/technologies/devices/" +
            portfolioSelected.tech_id
        );
        const response = await fetch(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/technologies/devices/" +
            portfolioSelected.tech_id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const data1 = await response.json();
          // setLoadingCis(false)

          console.log(data1);
          setDataCisConf({
            data: data1,
            loading: false,
            error: dataCisConf.error,
          });
          setPageActual(1);

          // setCreateCisModalOpen(true)
        } else {
          const data1 = await response.json();
          console.log(data1);
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataPost();
  };
  return (
    <>
      {/* {dataCisConf.loading ? (
        ""
      ) : (
        <ul>
          {dataCisConf.data.data.map((element) => (
            <li key={element.element_id}>{element.name}</li>
          ))}
        </ul>
      )} */}
      <div className="cont_info_cis">
        <div className="body_info_cis">
          <div
            className="content-cis"
            style={{ border: "px solid #607582", boxShadow: "unset" }}
          >
            <div className="cont-cis-search" style={{ background: "#0166a0" }}>
              <>
                <div className="cont-search hiddenPDF">
                  {dataCisConf.loading ? (
                    ""
                  ) : (
                    <>
                      <div className="cont-search" style={{ width: "100%" }}>
                        <Search
                          searchResults={searchResults}
                          setSearchResults={setSearchResults}
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          onSearch={onSearch}
                          dataObject={dataCisConf.data.data}
                          setDataObject={setDataCisConf}
                        />
                        <p style={{ color: "aliceblue", textAlign: "center" }}>
                          &nbsp;
                          {searchTerm !== ""
                            ? searchResults.length
                            : dataCisConf.data.data.length + " resultados"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="cont-search-space"></div>
              </>
            </div>

            <div className="cont-cis-table">
              <div className="content-card-cis">
                {dataCisConf.loading ? (
                  ""
                ) : (
                  <TablePortafolioDevices
                    buscar_cis_history={buscar_cis_history}
                    searchResults={searchResults}
                    server={server}
                    dataCisConf={dataCisConf}
                    searchTerm={searchTerm}
                  ></TablePortafolioDevices>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPortafolio;
