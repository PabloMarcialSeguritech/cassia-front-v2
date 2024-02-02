import React, { useState } from 'react';
import BuzonList from './BuzonList';
import LoadSimple from '../LoadSimple';
const TableBuzon = ({devices,editActive,dataBuzon,setDataBuzon, Buzonelected,setBuzonelected,registerIsValid,searchResults, setSearchResults,onSearch,dataUsers,setDataUsers,searchTerm, setSearchTerm,server,setRegisterIsValid,setData,setLoading,setError,handleChangEdit }) => {
  
  return (
    <div className='cont-table-Buzon'>
                                    <div className='head-table-Buzon'>
                                        <div className='field-head-table-Buzon field-small'>
                                            No
                                        </div>
                                        <div className='field-head-table-Buzon field-medium' >
                                            Folio
                                        </div>
                                        <div className='field-head-table-Buzon field-small'>
                                            Conf_ID
                                        </div>
                                        <div className='field-head-table-Buzon field-larger' >
                                            Quien Solicita
                                        </div>
                                        <div className='field-head-table-Buzon field-larger' >
                                            Fecha Solicitud
                                        </div>
                                        <div className='field-head-table-Buzon field-larger' >
                                            Requizito
                                        </div>
                                        <div className='field-head-table-Buzon field-larger' style={{width:'40%'}}>
                                            Comentarios
                                        </div>
                                        <div className='field-head-table-Buzon field-larger'>
                                            Acciones
                                        </div>
                                        
                                        
                                    </div>
                                    <div className='body-table-Buzon'>
                                      {
                                            ( registerIsValid)?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
                                            <BuzonList dataBuzon={dataBuzon} setDataBuzon={setDataBuzon} editActive={editActive} devices={devices} Buzonelected={Buzonelected} setBuzonelected={setBuzonelected} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit}></BuzonList>
                                        
                                          }
                                        
                                        
                                    </div>
                                </div>
  );
}

export default TableBuzon;
