import { useFetch } from "../../hooks/useFetch";
import LoadSimple from "../LoadSimple";

import { useState, useEffect } from "react";

const PortafolioList = ({
  pageActual,
  limitList,
  dataList,
  devices,
  handleChangEdit,
  setData,
  setRegisterIsValid,
  setLoading,
  setError,
  server,
  dataUsers,
  setDataUsers,
  searchResults,
  setSearchResults,
  searchTerm,
  cisSelected,
  setCisSelected,
}) => {
  // const dataUsers=useFetch('cassia/ci','',localStorage.getItem('access_token'),'GET',server)

  // var dataList=(searchTerm==='')?dataUsers.data:searchResults;
  console.log(dataList);
  console.log("intervalo de resultados", pageActual, limitList);

  useEffect(() => {
    buscar_cis();
  }, []);
  const buscar_cis = () => {
    // setLoadingCis(true)
    const fetchDataPost = async () => {
      try {
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
          setDataUsers(data1);
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
  const cisSelectRow = (elemento) => {
    console.log(elemento);
    setCisSelected(elemento);
  };

  return (
    <>
      <div className="cont-row-user-list">
        {dataUsers.loading ? (
          <div className="cont-load-user-list">
            <LoadSimple></LoadSimple>
          </div>
        ) : (
          dataList
            .slice(pageActual, pageActual + limitList)
            .map((elemento, indice) => (
              <div
                className="row-table-cis"
                key={indice}
                onClick={() => cisSelectRow(elemento)}
              >
                <div className="field-body-table-cis field-larger">
                  {elemento.tech_id}
                </div>
                <div className="field-body-table-cis field-larger">
                  {elemento.tech_name}
                </div>
                <div className="field-body-table-cis field-larger">
                  {elemento.description}
                </div>
                <div className="field-body-table-cis field-larger">
                  {elemento.sla}
                </div>
              </div>
            ))
        )}
        {dataUsers.loading == false && dataList.length == 0 ? (
          <div className="no-results">SIN RESULTADOS.</div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default PortafolioList;
