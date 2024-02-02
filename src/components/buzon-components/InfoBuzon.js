import React, { useEffect, useState } from 'react';
import './styles/InfoBuzon.css'
// import BuzonList from './BuzonList';
// import LoadSimple from '../LoadSimple';
import Search from '../generales/Search';
import Action from '../Action';
import Modal from 'react-modal';
/* estilos modal crear configuracion */
const CreateBuzonModalStyles = {
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
const BuzonDocsModalStyles = {
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
const BuzonAfectaModalStyles = {
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
const InfoBuzon = ({server,Buzonelected,onSearch,dataUsers,setDataUsers}) => {
  const [CreateBuzonModalOpen, setCreateBuzonModalOpen] =useState(false); 
  const [BuzonAfectaModalOpen, setBuzonAfectaModalOpen] =useState(false); 
  const [BuzonDocsModalOpen, setBuzonDocsModalOpen] =useState(false); 
  const [dataBuzonConf,setDataBuzonConf]=useState({data:[],loading:true,error:null})
  const [editActiveConfig, setEditActiveConfig] = useState(false);
  const [dataBuzonConfig,setDataBuzonConfig]=useState([]); 
  const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(searchResults)
  useEffect(()=>{
    buscar_Buzon_history()
  },[])
  function closCreateBuzonModal() {
    setEditActiveConfig(false)
    setCreateBuzonModalOpen(false);
    buscar_Buzon_history()
  }
  const crear = () => {
    // Aquí puedes realizar la búsqueda usando el valor de 'query'
    // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
    setCreateBuzonModalOpen(true)
  }
  
  function closeBuzonAfectaModal() {
    
    setBuzonAfectaModalOpen(false);
    
  }
  
  function openBuzonAfectaModal() {
    
    setBuzonAfectaModalOpen(true);
    
  }
  function closeBuzonDocsModal() {
    
    setBuzonDocsModalOpen(false);
    
  }
  
  function openBuzonDocsModal() {
    
    setBuzonDocsModalOpen(true);
    
  }
  const handleChangEdit=(Buzon)=>{
    console.log("handle edit")
  
    setEditActiveConfig(true)
    console.log(Buzon)
    buscar_Buzon(Buzon.conf_id)
    
}
const buscar_Buzon=(ci_id)=>{
  console.log("buscar_Buzon",ci_id)
  
  // setLoadingBuzon(true)
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
          // setLoadingBuzon(false)
          console.log(data1)
          setDataBuzonConfig(data1.data)
          setCreateBuzonModalOpen(true)
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
  const buscar_Buzon_history=()=>{
        
        
    // setLoadingBuzon(true)
    setDataBuzonConf({data:dataBuzonConf.data,loading:true,error:dataBuzonConf.error})
      const fetchDataPost = async () => {
        
     try {
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+Buzonelected.element_id)
        const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+Buzonelected.element_id, {
            method: 'GET',  
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
            // setLoadingBuzon(false)
            console.log(data1)
            setDataBuzonConf({data:data1,loading:false,error:dataBuzonConf.error})
            // setCreateBuzonModalOpen(true)
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
    <div className='cont_info_Buzon'>
        <div className='top_info_Buzon'>
            <div className='row_info_Buzon'>
                <div className='title-info_Buzon'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    CI-ID:
                    </div>
                    
                </div>
                <div className='txt-info_Buzon'>
                    {Buzonelected.folio}
                </div>
            </div>
            <div className='row_info_Buzon'>
            <div className='title-info_Buzon'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    Buzon:
                    </div>
                    
                </div>
                <div className='txt-info_Buzon'>
                    {Buzonelected.name}
                </div>
                </div>
            <div className='row_info_Buzon'>
            <div className='title-info_Buzon'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    IP:
                    </div>
                    
                </div>
                <div className='txt-info_Buzon'>
                    {Buzonelected.ip}
                </div>
            </div>
            {/* <div className='row_info_Buzon'>
            <div className='title-info_Buzon'>
                    <div style={{width:'50%',justifyContent:'start'}}>
                    Tecnologia:
                    </div>
                    
                </div>
                <div className='txt-info_Buzon'>
                {Buzonelected.technology}
                </div>
            </div> */}
            <div className='row_info_Buzon'>
            <div className='cel_row_info_Buzon'>
                <div className='title-info_Buzon' style={{width:'50%' }}>
                Tecnologia:
                </div>
                <div className='txt-info_Buzon' style={{width:'50%'}}>
                {Buzonelected.technology}
                </div>
                </div>
                <div className='cel_row_info_Buzon'>
                <div className='title-info_Buzon' style={{width:'50%' }}>
                    Nombre:
                </div>
                <div className='txt-info_Buzon' style={{width:'50%'}}>
                {Buzonelected.device_name}
                </div>
                </div>
                <div className='cel_row_info_Buzon'>
                <div className='title-info_Buzon' style={{width:'50%' }}>
                    Ubicacion:
                </div>
                <div className='txt-info_Buzon' style={{width:'50%'}}>
                {Buzonelected.location}
                </div>
                </div>
                <div className='cel_row_info_Buzon'>
                <div className='title-info_Buzon' style={{width:'50%' }}>
                    Severidad:
                </div>
                <div className='txt-info_Buzon' style={{width:'50%'}}>
                {Buzonelected.criticality}
                </div>
                </div>
            </div>
            <div className='row_info_Buzon'>
                <div className='cel_row_info_Buzon '>
                <div className='title-info_Buzon hiddenPDF' style={{width:'50%' }}>
                    CI´s que afecta:
                </div>
                <div className='txt-info_Buzon' style={{width:'50%'}}>
                <div className='cont-img-field-acciones info-Buzon-action hiddenPDF'>
                  <img className='img-field-acciones' src='/iconos/Buzon-afecta.png' title='Afecta' alt='Afecta' name='Afecta' ci_id={Buzonelected.element_id} onClick={openBuzonAfectaModal} style={{height:'100%'}} />
                </div>
                </div>
                </div>
                <div className='cel_row_info_Buzon ' >
                <div className='title-info_Buzon hiddenPDF' style={{width:'50%' }}>
                    Documentacion:
                </div>
                <div className='txt-info_Buzon ' style={{width:'50%'}}>
                <div className='cont-img-field-acciones info-Buzon-action hiddenPDF' >
                  <img className='img-field-acciones' src='/iconos/Buzon-docs.png' title='Editar' name='Editar' alt='Editar' ci_id={Buzonelected.element_id} onClick={openBuzonDocsModal} style={{height:'100%'}}/>
                </div>
                </div>
                </div>
                <div className='cel_row_info_Buzon'>
                {/* <div className='title-info_Buzon' style={{width:'50%' }}>
                    Severidad:
                </div>
                <div className='txt-info_Buzon' style={{width:'50%'}}>
                {Buzonelected.criticality}
                </div> */}
                </div>
                <div className='cel_row_info_Buzon'>
                <div className='title-info_Buzon' style={{width:'50%' }}>
                    Status:
                </div>
                <div className='txt-info_Buzon' style={{width:'50%',color:(Buzonelected.status.toLowerCase()==='activo')?'green':'red'}} >
                {Buzonelected.status}
                </div>
                </div>
            </div>
        </div>
        <div className='body_info_Buzon'>
        <div className='content-Buzon' style={{border: 'px solid #607582',boxShadow:'unset'}}>
                <div className='cont-Buzon-search' style={{background:'#0166a0'}}>
              
              <>
              <div className='cont-search hiddenPDF'>
                    {(dataBuzonConf.loading )?'':<Search  searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch}  dataObject={dataBuzonConf.data.data.history} setDataObject={setDataBuzonConf} /> }
                    
                </div>
                <div className='cont-search-space'>

                </div>
                <div className='cont-search-buttons hiddenPDF'>
                <Action disabled={false} origen='Blanco' titulo='+ Crear Registro'  action={crear} />
                </div>
              </>
             
              
              
                
                    
                    
                </div>
               
                <div className='cont-Buzon-table'>
                <div className='content-card-Buzon'>
                 
                                
                            </div>
                </div>
            </div>
        </div>
    </div>
    

    {/* modal documents */}
   
    </>
  );
}

export default InfoBuzon;
