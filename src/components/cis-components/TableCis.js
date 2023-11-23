import React, { useState } from 'react';
import CisList from './CisList';
import LoadSimple from '../LoadSimple';
const TableCis = ({ cisSelected,setCisSelected,registerIsValid,searchResults, setSearchResults,onSearch,dataUsers,setDataUsers,searchTerm, setSearchTerm,server,setRegisterIsValid,setData,setLoading,setError,handleChangEdit }) => {
  
  return (
    <div className='cont-table-cis'>
                                    <div className='head-table-cis'>
                                        <div className='field-head-table-cis field-medium'>
                                            CI-ID
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Host IP
                                        </div>
                                        <div className='field-head-table-cis field-larger'>
                                            Host name
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Tecnologia
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Nombre
                                        </div>
                                        <div className='field-head-table-cis field-larger'>
                                            Descripcion
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Marca
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Modelo
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Versión
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Ubicación
                                        </div>
                                        <div className='field-head-table-cis field-small'>
                                            Criticidad
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Status
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Status
                                           Conf.
                                        </div>
                                        {/* <div className='field-head-table-cis field-small'>
                                            Acciones
                                        </div> */}
                                        <div className='field-head-table-cis field-larger'>
                                            Acciones
                                        </div>
                                        {/* <div className='field-head-table-cis field-medium'>
                                            CI´s afecta
                                        </div>
                                        <div className='field-head-table-cis field-medium'>
                                            Documentos
                                        </div> */}
                                        
                                    </div>
                                    <div className='body-table-cis'>
                                      {
                                            ( registerIsValid)?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
                                            <CisList  cisSelected={cisSelected} setCisSelected={setCisSelected} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit}></CisList>
                                        
                                          }
                                        
                                        
                                    </div>
                                </div>
  );
}

export default TableCis;
