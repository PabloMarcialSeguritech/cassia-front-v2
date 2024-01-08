import React, { useState } from 'react';
import HostsList from './HostsList';
import LoadSimple from '../LoadSimple';
const TableHost = ({devices,editActive,dataHost,setDataHost, HostSelected,setHostSelected,registerIsValid,searchResults, setSearchResults,onSearch,dataUsers,setDataUsers,searchTerm, setSearchTerm,server,setRegisterIsValid,setData,setLoading,setError,handleChangEdit }) => {
  
  return (
    <div className='cont-table-Host'>
                                    <div className='head-table-Host'>
                                        <div className='field-head-table-Host field-medium'>
                                            HOST-ID
                                        </div>
                                        <div className='field-head-table-Host field-medium'>
                                            Host IP
                                        </div>
                                        <div className='field-head-table-Host field-larger' style={{width:'30%'}}>
                                            Host name
                                        </div>
                                        <div className='field-head-table-Host field-larger'>
                                            Marca
                                        </div>
                                        <div className='field-head-table-Host field-medium'>
                                            Modelo
                                        </div>
                                        <div className='field-head-table-Host field-larger'>
                                            Ubicación
                                        </div>
                                        <div className='field-head-table-Host field-medium'>
                                            Proxy
                                        </div>
                                        <div className='field-head-table-Host field-medium'>
                                            Status
                                        </div>
                                        
                                        {/* <div className='field-head-table-Host field-small'>
                                            Acciones
                                        </div> */}
                                        <div className='field-head-table-Host field-larger'>
                                            Acciones
                                        </div>
                                        {/* <div className='field-head-table-Host field-medium'>
                                            CI´s afecta
                                        </div>
                                        <div className='field-head-table-Host field-medium'>
                                            Documentos
                                        </div> */}
                                        
                                    </div>
                                    <div className='body-table-Host'>
                                      {
                                            ( registerIsValid)?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
                                            <HostsList dataHost={dataHost} setDataHost={setDataHost} editActive={editActive} devices={devices} HostSelected={HostSelected} setHostSelected={setHostSelected} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit}></HostsList>
                                        
                                          }
                                        
                                        
                                    </div>
                                </div>
  );
}

export default TableHost;
