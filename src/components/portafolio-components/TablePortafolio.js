import React, { useState } from "react";
import PortafolioList from "./PortafolioList";
import LoadSimple from "../LoadSimple";
const TablePortafolio = ({
  pageActual,
  limitList,
  devices,
  dataList,
  cisSelected,
  setCisSelected,
  registerIsValid,
  searchResults,
  setSearchResults,
  onSearch,
  dataUsers,
  setDataUsers,
  searchTerm,
  setSearchTerm,
  server,
  setRegisterIsValid,
  setData,
  setLoading,
  setError,
  handleChangEdit,
}) => {
  return (
    <div className="cont-table-cis">
      <div className="head-table-cis">
        <div className="field-head-table-cis field-larger">ID</div>
        <div className="field-head-table-cis field-larger">Tecnologia</div>
        <div className="field-head-table-cis field-larger">Descripcion</div>
        <div className="field-head-table-cis field-larger">SLA</div>
      </div>
      <div className="body-table-cis">
        {registerIsValid ? (
          <div className="cont-load-user-list">
            <LoadSimple></LoadSimple>
          </div>
        ) : (
          <PortafolioList
            pageActual={pageActual}
            limitList={limitList}
            dataList={dataList}
            devices={devices}
            cisSelected={cisSelected}
            setCisSelected={setCisSelected}
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
          ></PortafolioList>
        )}
      </div>
    </div>
  );
};

export default TablePortafolio;
