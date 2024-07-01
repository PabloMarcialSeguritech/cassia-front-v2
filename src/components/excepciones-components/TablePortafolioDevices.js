import React, { useState } from "react";
import LoadSimple from "../LoadSimple";

const TablePortafolioDevices = ({
  buscar_cis_history,
  searchResults,
  searchTerm,
  server,
  dataCisConf,
}) => {
  const [deleteCisModalOpen, setdeleteCisModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registerIsValid, setRegisterIsValid] = useState(false);
  const [cisConfSelected, setCisConfSelected] = useState({});
  const [deleteBuzonModalOpen, setdeleteBuzonModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  function openDeleteUserModalauth() {
    setdeleteBuzonModalOpen(true);
  }

  function closDeleteBuzonModal() {
    setdeleteBuzonModalOpen(false);
  }
  const handleActionResponse = (data) => {
    setUserSelected(data);
    openDeleteUserModalauth();
    // Realiza las acciones deseadas al hacer clic en el marcador
  };
  console.log(dataCisConf);
  var dataList = searchTerm === "" ? dataCisConf.data.data : searchResults;
  console.log("FUE AQUIIIII");
  console.log(dataList);
  console.log(dataCisConf.data.data);

  const handledeleteUserClick = (data) => {
    setCisConfSelected(data);
    openDeleteUserModal();
  };
  function openDeleteUserModal() {
    setdeleteCisModalOpen(true);
  }

  function closDeleteCisModal() {
    setdeleteCisModalOpen(false);
    buscar_cis_history();
  }
  const handleChangReqAuth = (element) => {
    console.log(element);
    if (element.status == "No iniciado") {
      // requests_auth(element)
      handleActionResponse(element);
    } else {
      cancel_auth(element);
    }
  };
  function requests_auth(element, txtarea) {
    console.log("autorizar");
    const data = {
      process_id: 1,
      comments: txtarea,
    };
    setLoading(true);
    setRegisterIsValid(true);
    const fetchDataPost = async () => {
      let url =
        "http://" +
        server.ip +
        ":" +
        server.port +
        "/api/v1/cassia/ci_elements/history/authorization/create/" +
        element.conf_id;
      try {
        // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+cis.element_id, {
        console.log(url);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        });
        console.log(response);
        if (response.ok) {
          const data1 = await response.json();
          setLoading(false);
          setRegisterIsValid(false);
          // Manejo de la respuesta
          setData(data1);
          closDeleteCisModal();
          // console.log(data1);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        // Manejo de errores
        setError(error);
        console.error(error);
      }
    };

    fetchDataPost();
  }
  function cancel_auth(element) {
    console.log(" cancela autorizar");
    const data = {
      process_id: 1,
      comments: "comentario de prueba",
    };
    setLoading(true);
    setRegisterIsValid(true);
    const fetchDataPost = async () => {
      let url =
        "http://" +
        server.ip +
        ":" +
        server.port +
        "/api/v1/cassia/ci_elements/history/authorization/cancel/" +
        element.conf_id;
      try {
        // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+cis.element_id, {
        console.log(url);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        console.log(response);
        if (response.ok) {
          const data1 = await response.json();
          setLoading(false);
          setRegisterIsValid(false);
          // Manejo de la respuesta
          setData(data1);
          closDeleteCisModal();
          // console.log(data1);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        // Manejo de errores
        setError(error);
        console.error(error);
      }
    };

    fetchDataPost();
  }
  return (
    <div className="cont-table-cis-config">
      <div className="head-table-cis-config">
        <div className="field-head-table-cis-config field-small">
          Id de elemento
        </div>
        <div className="field-head-table-cis-config field-small">Host ID</div>
        <div className="field-head-table-cis-config field-medium">IP</div>
        <div className="field-head-table-cis-config field-larger">Nombre</div>
        <div className="field-head-table-cis-config field-medium">
          Descripcion
        </div>
        <div className="field-head-table-cis-config field-medium">
          Marca de Hardware
        </div>
        <div className="field-head-table-cis-config field-medium">
          Modelo de Hardware
        </div>
        <div className="field-head-table-cis-config field-medium">
          Version de Software
        </div>
        {/* <div className='field-head-table-cis-config field-medium'>
                                            CI´s afecta
                                        </div>
                                        <div className='field-head-table-cis-config field-medium'>
                                            Documentos
                                        </div> */}
      </div>
      <div className="body-table-cis-config">
        <>
          <div className="cont-row-user-list">
            {dataCisConf.loading ? (
              <div className="cont-load-user-list">
                <LoadSimple></LoadSimple>
              </div>
            ) : (
              // console.log(elemento)
              //    (dataCisConf.data.length>0)?
              // dataCisConf.data.data.history.map((elemento, indice) => (
              dataList.map((elemento, indice) => (
                <div className="row-table-cis" key={indice}>
                  <div className="field-body-table-cis field-small">
                    {elemento.element_id}
                  </div>
                  <div className="field-body-table-cis field-small">
                    {elemento.host_id}
                  </div>
                  <div className="field-body-table-cis field-medium">
                    {elemento.ip}
                  </div>
                  <div className="field-body-table-cis field-larger">
                    {elemento.name}
                  </div>
                  <div className="field-body-table-cis field-medium">
                    {elemento.description}
                  </div>
                  <div className="field-body-table-cis field-medium">
                    {elemento.hardware_brand}
                  </div>
                  <div className="field-body-table-cis field-medium">
                    {elemento.hardware_model}
                  </div>
                  <div className="field-body-table-cis field-medium">
                    {elemento.software_version}
                  </div>
                </div>
              ))
            )}
            {
              //   (dataList.length==0)?<div className="no-results">SIN RESULTADOS.</div>:''
            }
          </div>
        </>
      </div>
    </div>
  );
};

export default TablePortafolioDevices;
