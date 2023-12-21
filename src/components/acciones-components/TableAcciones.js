import React, { useState } from 'react';
import LoadSimple from '../LoadSimple';
import AccionesList from './AccionesList';
const TableAcciones = ({ cisSelected,setCisSelected,registerIsValid,searchResults, setSearchResults,onSearch,dataUsers,setDataUsers,searchTerm, setSearchTerm,server,setRegisterIsValid,setData,setLoading,setError,handleChangEdit }) => {
  
  return (
    <div className='cont-table-accManage'>
                                    <div className='head-table-accManage'>
                                        <div className='field-head-table-accManage field-larger' style={{borderLeft: '1px solid rgba(240, 248, 255, 0.473)' }}>
                                            ID 
                                        </div>
                                        <div className='field-head-table-accManage field-x-larger'>
                                        NOMBRE ACCION
                                        </div>
                                        <div className='field-head-table-accManage field-larger'>
                                           HOSTS APLICADOS
                                        </div>
                                        <div className='field-head-table-accManage field-larger'>
                                            ESTATUS
                                        </div>
                                        <div className='field-head-table-accManage field-larger'>
                                            ACCIONES
                                        </div>
                                       
                                       
                                        
                                    </div>
                                    <div className='body-table-accManage'>
                                      {
                                            ( registerIsValid)?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
                                            <AccionesList  cisSelected={cisSelected} setCisSelected={setCisSelected} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit}/>
                                        
                                          }
                                        
                                        
                                    </div>
                                </div>
  );
}

export default TableAcciones;
