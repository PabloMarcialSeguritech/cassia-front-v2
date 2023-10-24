import React, { useState } from 'react';
import './styles/InfoCis.css'
import CisList from './CisList';
import LoadSimple from '../LoadSimple';
import TableCis from './TableCis';
import Search from './Search';
import Action from '../Action';
const InfoCis = ({server,cisSelected,searchResults,setSearchResults,searchTerm,setSearchTerm,onSearch,dataUsers,setDataUsers}) => {
  
  return (
    <div className='cont_info_cis'>
        <div className='top_info_cis'>
            <div className='row_info_cis'>
                <div className='title-info_cis'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    CI-ID:
                    </div>
                    
                </div>
                <div className='txt-info_cis'>
                    {cisSelected.ci_id}
                </div>
            </div>
            <div className='row_info_cis'>
            <div className='title-info_cis'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    Host:
                    </div>
                    
                </div>
                <div className='txt-info_cis'>
                    {cisSelected.name}
                </div>
                </div>
            <div className='row_info_cis'>
            <div className='title-info_cis'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    IP:
                    </div>
                    
                </div>
                <div className='txt-info_cis'>
                    {cisSelected.ip}
                </div>
            </div>
            <div className='row_info_cis'>
            <div className='title-info_cis'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    Tecnologia:
                    </div>
                    
                </div>
                <div className='txt-info_cis'>
                    tecnologia...
                </div>
            </div>
            <div className='row_info_cis'>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Nombre:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                    nombre...
                </div>
                </div>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Ubicacion:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                    ubicacion...
                </div>
                </div>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Severidad:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                    severidad...
                </div>
                </div>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Status:
                </div>
                <div className='txt-info_cis' style={{width:'50%',color:'green'}} >
                   Activo
                </div>
                </div>
            </div>
        </div>
        <div className='body_info_cis'>
        <div className='content-cis' style={{border: 'px solid #607582',boxShadow:'unset'}}>
                <div className='cont-cis-search' style={{background:'#607582'}}>
              
              <>
              <div className='cont-search'>
                    
                    <Search  searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch}  dataUsers={dataUsers} setDataUsers={setDataUsers} />
                </div>
                <div className='cont-search-space'>

                </div>
                <div className='cont-search-buttons'>
                <Action disabled={false} origen='Blanco' titulo='+ Crear Registro'  />
                </div>
              </>
             
              
              
                
                    
                    
                </div>
               
                <div className='cont-cis-table'>
                <div className='content-card-cis'>
                              {/* {(cisSelected.length===0)?
                            //   <TableCis  cisSelected={cisSelected} setCisSelected={setCisSelected} registerIsValid={true} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server} setRegisterIsValid={setRegisterIsValid} setData={setData} setLoading={setLoading} setError={setError}  handleChangEdit={handleChangEdit}></TableCis>:
                            //   <InfoCis server={server} cisSelected={cisSelected}></InfoCis>
                            } */}
                                
                            </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default InfoCis;
