import { useState, useEffect } from "react";
import "./styles/PanelPortafolio.css";
import Search from "../generales/Search";
import Action from "../Action";

import LoadSimple from "../LoadSimple";

import TablePortafolio from "./TablePortafolio";
import InfoPortafolio from "./InfoPortafolio";
import Paginador from "../generales/Paginador";
const CreateCisModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    background: "#ffffff !important",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "90%",
    padding: "20px",
  },
};
const PanelPortafolio = ({ server }) => {
  const limitList = 200;
  const [pageActual, setPageActual] = useState(1);
  const [CreateCisModalOpen, setCreateCisModalOpen] = useState(false);
  const [dataUsers, setDataUsers] = useState({
    data: [],
    loading: true,
    error: null,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  var dataList = searchTerm === "" ? dataUsers.data : searchResults;
  const [devices, setDevices] = useState({
    data: [],
    loading: true,
    error: null,
  });
  // const startLimit=(searchTerm==='')?((limitList*pageActual)-limitList):0;
  const startLimit = limitList * pageActual - limitList;
  const pages = parseInt(dataList.length / limitList) + 1;
  console.log(dataUsers);
  const [searchResult, setSearchResult] = useState(null);

  const [registerIsValid, setRegisterIsValid] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataCis, setDataCis] = useState([]);
  const [loadingCis, setLoadingCis] = useState(false);
  const [errorCis, setErrorCis] = useState(null);
  const [cisSelected, setCisSelected] = useState([]);
  console.log(loading);
  const obtenerFechaActualLocal = () => {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0"); // El mes se cuenta desde 0
    const dia = String(ahora.getDate()).padStart(2, "0");
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");

    return `${anio}-${mes}-${dia}_${horas}-${minutos}`;
  };
  useEffect(() => {
    setPageActual(1);
  }, [dataList]);
  const handleSearch = (query) => {
    // Aquí puedes realizar la búsqueda usando el valor de 'query'
    // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
    setSearchResult(`Resultados para: ${query}`);
  };
  const crear = () => {
    // Aquí puedes realizar la búsqueda usando el valor de 'query'
    // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
    setCreateCisModalOpen(true);
  };
  function closCreateCisModal() {
    setEditActive(false);
    setCreateCisModalOpen(false);
  }
  const handleChangEdit = (cis) => {
    console.log("handle edit");
    setEditActive(true);
    console.log(cis);
    buscar_cis(cis.element_id);
  };
  useEffect(() => {
    search_devices();
  }, []);
  const buscar_cis = (ci_id) => {
    console.log("buscar_cis", ci_id);

    setLoadingCis(true);
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
            "/api/v1/cassia/ci_elements/" +
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
          setLoadingCis(false);
          console.log(data1);
          setDataCis(data1.data);
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
  const regresar_cis = () => {
    setCisSelected([]);
    // setLoadingCis(true)
  };

  function search_devices() {
    setDevices({ data: devices.data, loading: true, error: devices.error });

    const fetchData = async () => {
      try {
        //console.log(`Bearer ${token_item}`)
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY"; // Reemplaza con tu token de autenticación
        // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/db/hosts/relations/'+ubicacion.groupid, {
        console.log(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/technologies"
        );
        const response = await fetch(
          "http://" +
            server.ip +
            ":" +
            server.port +
            "/api/v1/cassia/technologies",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (response.ok) {
          const response_data = await response.json();
          setDevices({
            data: response_data.data,
            loading: false,
            error: devices.error,
          });
          console.log(response_data);
          setLoadingCis(false);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        // Manejo de errores
        setDevices({
          data: devices.data,
          loading: devices.loading,
          error: error,
        });
        //console.error(error);
      }
    };
    fetchData();
  }
  return (
    <>
      <div className="main-panel-cis">
        <div className="content-cis">
          <div className="cont-cis-search">
            {cisSelected.length === 0 ? (
              <>
                <div className="cont-search" style={{ width: "25%" }}>
                  <Search
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    dataObject={dataUsers.data}
                    setDataObject={setDataUsers}
                  />
                  <p style={{ color: "aliceblue", textAlign: "center" }}>
                    &nbsp;
                    {"(" +
                      (startLimit + 1) +
                      " - " +
                      (dataList.length > startLimit + limitList
                        ? startLimit + limitList
                        : dataList.length) +
                      ")  de " +
                      dataList.length +
                      " resultados"}
                  </p>
                </div>
                <div className="cont-search-space pal-lado">
                  <Paginador
                    pages={pages}
                    pageActual={pageActual}
                    setPageActual={setPageActual}
                  />
                </div>
                <div className="cont-search-buttons"></div>
              </>
            ) : (
              <>
                <div
                  className="cont-btn-back-users"
                  style={{ width: "10%" }}
                  onClick={regresar_cis}
                >
                  <div className="cont-img-back-users">
                    <img
                      className="img-back-users"
                      src={"/iconos/back-blanco.png"}
                      name="regresar"
                    />
                  </div>
                  <div className="cont-txt-back-users">
                    <div className="txt-back-users">Regresar</div>
                  </div>
                </div>
                <div className="txt-back-users">{cisSelected.tech_name}</div>
              </>
            )}
          </div>

          <div className="cont-cis-table">
            <div className="content-card-cis" id="content">
              {devices.loading ? (
                <LoadSimple />
              ) : (
                <>
                  {cisSelected.length === 0 ? (
                    <TablePortafolio
                      pageActual={startLimit}
                      limitList={limitList}
                      dataList={dataList}
                      cisSelected={cisSelected}
                      setCisSelected={setCisSelected}
                      registerIsValid={registerIsValid}
                      searchResults={searchResults}
                      setSearchResults={setSearchResults}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      dataUsers={dataUsers}
                      setDataUsers={setDataUsers}
                      server={server}
                      setRegisterIsValid={setRegisterIsValid}
                      setData={setData}
                      setLoading={setLoading}
                      setError={setError}
                      handleChangEdit={handleChangEdit}
                      devices={devices}
                    ></TablePortafolio>
                  ) : (
                    <InfoPortafolio
                      server={server}
                      portfolioSelected={cisSelected}
                      searchResults={searchResults}
                      setSearchResults={setSearchResults}
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onSearch={handleSearch}
                      dataUsers={dataUsers}
                      setDataUsers={setDataUsers}
                      setCisSelected={setCisSelected}
                      registerIsValid={registerIsValid}
                    ></InfoPortafolio>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelPortafolio;
