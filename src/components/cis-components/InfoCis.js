import React, { useEffect, useState } from 'react';
import './styles/InfoCis.css'
// import CisList from './CisList';
// import LoadSimple from '../LoadSimple';
import TableCisConfig from './TableCisConfig';
import Search from './Search';
import Action from '../Action';
import ModalCreateCisConfig from './ModalCreateCisConfig';
import ModalCisAfecta from './ModalCisAfecta';
import ModalCisDocs from './ModalCisDocs';
import Modal from 'react-modal';
/* estilos modal crear configuracion */
const CreateCisModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'90%',
    padding:'20px'
  },
};

/* estilos modal docs */
const CisDocsModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'90%',
    padding:'20px'
  },
};
/* estilos modal crear relacion */
const CisAfectaModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'90%',
    padding:'20px'
  },
};
const InfoCis = ({server,cisSelected,onSearch,dataUsers,setDataUsers}) => {
  const [CreateCisModalOpen, setCreateCisModalOpen] =useState(false); 
  const [CisAfectaModalOpen, setCisAfectaModalOpen] =useState(false); 
  const [CisDocsModalOpen, setCisDocsModalOpen] =useState(false); 
  const [dataCisConf,setDataCisConf]=useState({data:[],loading:true,error:null})
  const [editActiveConfig, setEditActiveConfig] = useState(false);
  const [dataCisConfig,setDataCisConfig]=useState([]); 
  const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchResults)
  useEffect(()=>{
    buscar_cis_history()
  },[])
  function closCreateCisModal() {
    setEditActiveConfig(false)
    setCreateCisModalOpen(false);
    buscar_cis_history()
  }
  const crear = () => {
    // Aquí puedes realizar la búsqueda usando el valor de 'query'
    // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
    setCreateCisModalOpen(true)
  }
  
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
  const handleChangEdit=(cis)=>{
    console.log("handle edit")
  
    setEditActiveConfig(true)
    console.log(cis)
    buscar_cis(cis.conf_id)
    
}
const buscar_cis=(ci_id)=>{
  console.log("buscar_cis",ci_id)
  
  // setLoadingCis(true)
    const fetchDataPost = async () => {
      
   try {
      console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+ci_id)
      const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/detail/'+ci_id, {
          method: 'GET',  
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        console.log(response)
        if (response.ok) {
          
          const data1 = await response.json();
          // setLoadingCis(false)
          console.log(data1)
          setDataCisConfig(data1.data)
          setCreateCisModalOpen(true)
        } else {
          const data1 = await response.json();
          console.log(data1)
          throw new Error('Error en la solicitud');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataPost();
  
}
  const buscar_cis_history=()=>{
        
        
    // setLoadingCis(true)
    setDataCisConf({data:dataCisConf.data,loading:true,error:dataCisConf.error})
      const fetchDataPost = async () => {
        
     try {
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+cisSelected.element_id)
        const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+cisSelected.element_id, {
            method: 'GET',  
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
            // setLoadingCis(false)
            console.log(data1)
            setDataCisConf({data:data1,loading:false,error:dataCisConf.error})
            // setCreateCisModalOpen(true)
          } else {
            const data1 = await response.json();
            console.log(data1)
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchDataPost();
    
}
  return (
    <>
    <div className='cont_info_cis'>
        <div className='top_info_cis'>
            <div className='row_info_cis'>
                <div className='title-info_cis'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    CI-ID:
                    </div>
                    
                </div>
                <div className='txt-info_cis'>
                    {cisSelected.folio}
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
            {/* <div className='row_info_cis'>
            <div className='title-info_cis'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    Tecnologia:
                    </div>
                    
                </div>
                <div className='txt-info_cis'>
                {cisSelected.technology}
                </div>
            </div> */}
            <div className='row_info_cis'>
            <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                Tecnologia:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                {cisSelected.technology}
                </div>
                </div>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Nombre:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                {cisSelected.device_name}
                </div>
                </div>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Ubicacion:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                {cisSelected.location}
                </div>
                </div>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Severidad:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                {cisSelected.criticality}
                </div>
                </div>
            </div>
            <div className='row_info_cis'>
                <div className='cel_row_info_cis '>
                <div className='title-info_cis hiddenPDF' style={{width:'50%' }}>
                    CI´s que afecta:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                <div className='cont-img-field-acciones info-cis-action hiddenPDF'>
                  <img className='img-field-acciones' src='/iconos/cis-afecta.png' title='Afecta' alt='Afecta' name='Afecta' ci_id={cisSelected.element_id} onClick={openCisAfectaModal} style={{height:'100%'}} />
                </div>
                </div>
                </div>
                <div className='cel_row_info_cis ' >
                <div className='title-info_cis hiddenPDF' style={{width:'50%' }}>
                    Documentacion:
                </div>
                <div className='txt-info_cis ' style={{width:'50%'}}>
                <div className='cont-img-field-acciones info-cis-action hiddenPDF' >
                  <img className='img-field-acciones' src='/iconos/cis-docs.png' title='Editar' name='Editar' alt='Editar' ci_id={cisSelected.element_id} onClick={openCisDocsModal} style={{height:'100%'}}/>
                </div>
                </div>
                </div>
                <div className='cel_row_info_cis'>
                {/* <div className='title-info_cis' style={{width:'50%' }}>
                    Severidad:
                </div>
                <div className='txt-info_cis' style={{width:'50%'}}>
                {cisSelected.criticality}
                </div> */}
                </div>
                <div className='cel_row_info_cis'>
                <div className='title-info_cis' style={{width:'50%' }}>
                    Status:
                </div>
                <div className='txt-info_cis' style={{width:'50%',color:(cisSelected.status.toLowerCase()==='activo')?'green':'red'}} >
                {cisSelected.status}
                </div>
                </div>
            </div>
        </div>
        <div className='body_info_cis'>
        <div className='content-cis' style={{border: 'px solid #607582',boxShadow:'unset'}}>
                <div className='cont-cis-search' style={{background:'#0166a0'}}>
              
              <>
              <div className='cont-search hiddenPDF'>
                    {(dataCisConf.loading )?'':<Search  searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch}  dataUsers={dataCisConf.data.data.history} setDataUsers={setDataCisConf} /> }
                    
                </div>
                <div className='cont-search-space'>

                </div>
                <div className='cont-search-buttons hiddenPDF'>
                <Action disabled={false} origen='Blanco' titulo='+ Crear Registro'  action={crear} />
                </div>
              </>
             
              
              
                
                    
                    
                </div>
               
                <div className='cont-cis-table'>
                <div className='content-card-cis'>
                  {(dataCisConf.loading )?'':
                <TableCisConfig  buscar_cis_history={buscar_cis_history} handleChangEdit={handleChangEdit} cisSelected={cisSelected}  registerIsValid={true} searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} dataUsers={dataUsers} setDataUsers={setDataUsers} server={server}  setDataCisConf={setDataCisConf}  dataCisConf={dataCisConf}  ></TableCisConfig >
               }
                                
                            </div>
                </div>
            </div>
        </div>
    </div>
    <Modal
        isOpen={CreateCisModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closCreateCisModal}
        style={CreateCisModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalCreateCisConfig server={server} buscar_cis_history={buscar_cis_history} setEditActiveConfig={setEditActiveConfig} editActiveConfig={editActiveConfig} dataCisConfig={dataCisConfig} ci_id={cisSelected.element_id} closCreateCisModal ={closCreateCisModal }></ModalCreateCisConfig>
    </Modal>

    {/* modal documents */}
    <Modal
        isOpen={CisDocsModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closeCisDocsModal}
        style={CisDocsModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalCisDocs server={server} cisSelected={cisSelected} closeCisDocsModal ={closeCisDocsModal }></ModalCisDocs>
    </Modal>
    <Modal
        isOpen={CisAfectaModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closeCisAfectaModal}
        style={CisAfectaModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalCisAfecta server={server} cisSelected={cisSelected} closeCisAfectaModal ={closeCisAfectaModal }></ModalCisAfecta>
    </Modal>
    </>
  );
}

export default InfoCis;
