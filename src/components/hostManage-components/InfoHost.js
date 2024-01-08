import React, { useEffect, useState } from 'react';
import './styles/InfoHost.css'
// import HostList from './HostList';
// import LoadSimple from '../LoadSimple';
import Search from '../generales/Search';
import Action from '../Action';
import Modal from 'react-modal';
/* estilos modal crear configuracion */
const CreateHostModalStyles = {
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
const HostDocsModalStyles = {
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
const HostAfectaModalStyles = {
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
const InfoHost = ({server,HostSelected,onSearch,dataUsers,setDataUsers}) => {
  const [CreateHostModalOpen, setCreateHostModalOpen] =useState(false); 
  const [HostAfectaModalOpen, setHostAfectaModalOpen] =useState(false); 
  const [HostDocsModalOpen, setHostDocsModalOpen] =useState(false); 
  const [dataHostConf,setDataHostConf]=useState({data:[],loading:true,error:null})
  const [editActiveConfig, setEditActiveConfig] = useState(false);
  const [dataHostConfig,setDataHostConfig]=useState([]); 
  const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchResults)
  useEffect(()=>{
    buscar_Host_history()
  },[])
  function closCreateHostModal() {
    setEditActiveConfig(false)
    setCreateHostModalOpen(false);
    buscar_Host_history()
  }
  const crear = () => {
    // Aquí puedes realizar la búsqueda usando el valor de 'query'
    // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
    setCreateHostModalOpen(true)
  }
  
  function closeHostAfectaModal() {
    
    setHostAfectaModalOpen(false);
    
  }
  
  function openHostAfectaModal() {
    
    setHostAfectaModalOpen(true);
    
  }
  function closeHostDocsModal() {
    
    setHostDocsModalOpen(false);
    
  }
  
  function openHostDocsModal() {
    
    setHostDocsModalOpen(true);
    
  }
  const handleChangEdit=(Host)=>{
    console.log("handle edit")
  
    setEditActiveConfig(true)
    console.log(Host)
    buscar_Host(Host.conf_id)
    
}
const buscar_Host=(ci_id)=>{
  console.log("buscar_Host",ci_id)
  
  // setLoadingHost(true)
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
          // setLoadingHost(false)
          console.log(data1)
          setDataHostConfig(data1.data)
          setCreateHostModalOpen(true)
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
  const buscar_Host_history=()=>{
        
        
    // setLoadingHost(true)
    setDataHostConf({data:dataHostConf.data,loading:true,error:dataHostConf.error})
      const fetchDataPost = async () => {
        
     try {
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+HostSelected.element_id)
        const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+HostSelected.element_id, {
            method: 'GET',  
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
            // setLoadingHost(false)
            console.log(data1)
            setDataHostConf({data:data1,loading:false,error:dataHostConf.error})
            // setCreateHostModalOpen(true)
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
    <div className='cont_info_Host'>
        <div className='top_info_Host'>
            <div className='row_info_Host'>
                <div className='title-info_Host'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    CI-ID:
                    </div>
                    
                </div>
                <div className='txt-info_Host'>
                    {HostSelected.folio}
                </div>
            </div>
            <div className='row_info_Host'>
            <div className='title-info_Host'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    Host:
                    </div>
                    
                </div>
                <div className='txt-info_Host'>
                    {HostSelected.name}
                </div>
                </div>
            <div className='row_info_Host'>
            <div className='title-info_Host'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    IP:
                    </div>
                    
                </div>
                <div className='txt-info_Host'>
                    {HostSelected.ip}
                </div>
            </div>
            {/* <div className='row_info_Host'>
            <div className='title-info_Host'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    Tecnologia:
                    </div>
                    
                </div>
                <div className='txt-info_Host'>
                {HostSelected.technology}
                </div>
            </div> */}
            <div className='row_info_Host'>
            <div className='cel_row_info_Host'>
                <div className='title-info_Host' style={{width:'50%' }}>
                Tecnologia:
                </div>
                <div className='txt-info_Host' style={{width:'50%'}}>
                {HostSelected.technology}
                </div>
                </div>
                <div className='cel_row_info_Host'>
                <div className='title-info_Host' style={{width:'50%' }}>
                    Nombre:
                </div>
                <div className='txt-info_Host' style={{width:'50%'}}>
                {HostSelected.device_name}
                </div>
                </div>
                <div className='cel_row_info_Host'>
                <div className='title-info_Host' style={{width:'50%' }}>
                    Ubicacion:
                </div>
                <div className='txt-info_Host' style={{width:'50%'}}>
                {HostSelected.location}
                </div>
                </div>
                <div className='cel_row_info_Host'>
                <div className='title-info_Host' style={{width:'50%' }}>
                    Severidad:
                </div>
                <div className='txt-info_Host' style={{width:'50%'}}>
                {HostSelected.criticality}
                </div>
                </div>
            </div>
            <div className='row_info_Host'>
                <div className='cel_row_info_Host '>
                <div className='title-info_Host hiddenPDF' style={{width:'50%' }}>
                    CI´s que afecta:
                </div>
                <div className='txt-info_Host' style={{width:'50%'}}>
                <div className='cont-img-field-acciones info-Host-action hiddenPDF'>
                  <img className='img-field-acciones' src='/iconos/Host-afecta.png' title='Afecta' alt='Afecta' name='Afecta' ci_id={HostSelected.element_id} onClick={openHostAfectaModal} style={{height:'100%'}} />
                </div>
                </div>
                </div>
                <div className='cel_row_info_Host ' >
                <div className='title-info_Host hiddenPDF' style={{width:'50%' }}>
                    Documentacion:
                </div>
                <div className='txt-info_Host ' style={{width:'50%'}}>
                <div className='cont-img-field-acciones info-Host-action hiddenPDF' >
                  <img className='img-field-acciones' src='/iconos/Host-docs.png' title='Editar' name='Editar' alt='Editar' ci_id={HostSelected.element_id} onClick={openHostDocsModal} style={{height:'100%'}}/>
                </div>
                </div>
                </div>
                <div className='cel_row_info_Host'>
                {/* <div className='title-info_Host' style={{width:'50%' }}>
                    Severidad:
                </div>
                <div className='txt-info_Host' style={{width:'50%'}}>
                {HostSelected.criticality}
                </div> */}
                </div>
                <div className='cel_row_info_Host'>
                <div className='title-info_Host' style={{width:'50%' }}>
                    Status:
                </div>
                <div className='txt-info_Host' style={{width:'50%',color:(HostSelected.status.toLowerCase()==='activo')?'green':'red'}} >
                {HostSelected.status}
                </div>
                </div>
            </div>
        </div>
        <div className='body_info_Host'>
        <div className='content-Host' style={{border: 'px solid #607582',boxShadow:'unset'}}>
                <div className='cont-Host-search' style={{background:'#0166a0'}}>
              
              <>
              <div className='cont-search hiddenPDF'>
                    {(dataHostConf.loading )?'':<Search  searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch}  dataObject={dataHostConf.data.data.history} setDataObject={setDataHostConf} /> }
                    
                </div>
                <div className='cont-search-space'>

                </div>
                <div className='cont-search-buttons hiddenPDF'>
                <Action disabled={false} origen='Blanco' titulo='+ Crear Registro'  action={crear} />
                </div>
              </>
             
              
              
                
                    
                    
                </div>
               
                <div className='cont-Host-table'>
                <div className='content-card-Host'>
                 
                                
                            </div>
                </div>
            </div>
        </div>
    </div>
    

    {/* modal documents */}
   
    </>
  );
}

export default InfoHost;
