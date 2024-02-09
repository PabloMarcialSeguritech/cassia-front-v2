import './styles/TableAlerts.css'
import ReactDOM from 'react-dom';
import React from 'react';
import Modal from 'react-modal';
import RowProblem from './RowProblem'
import LoadAlerts from './LoadAlerts'
import { useFetch } from '../hooks/useFetch';
import { useState,useEffect } from 'react';
import Search from './generales/Search';
import Select from 'react-select';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const TableAlerts=(props)=>{
  // console.log(props)
  const dataAgencies=useFetch('zabbix/exception_agencies','',props.token,'GET',props.server)
  // console.log(dataAgencies)
  
  const [openSelectList,setOpenSelect]=useState(false)
  const [orderAsc,setOrderAsc]=useState(true)
  const [problems,setProblems]=useState(props.dataProblems.data)
  const [flagSearch,setFlagsearch]=useState(false)
  // console.log(props.severityProblms)
  // console.log(props.optionsSelectList)
  function expandAlerts(){
    // console.log(typeof props.search_problems)
    if(!props.modalIsOpen){
      props.search_problems()
      if(props.alertsIsOpen){
        props.setAlertsIsOpen(false)
      }else{
        props.setAlertsIsOpen(true)
      }
    }
    
    
  }
  
  useEffect(()=>{
    setOpenSelect(false)
  },[props.modalIsOpen])
 const openSelector=()=>{
  setOpenSelect(!openSelectList)
 }
useEffect(()=>{
  // props.search_problems()
  setFlagsearch(true)
},[props.severityProblms])
const selectOptionList=(element)=>{
  
  if (props.severityProblms.includes(element.value)) {
    // Si existe, eliminarlo
    const newArray = props.severityProblms.filter(value => value !== element.value);
    console.log(newArray); // Output: [1, 3]
    props.setSeverityProblms(newArray)
  }else{
    props.setSeverityProblms([...props.severityProblms, ...element.value])
  }
  
  const index = props.optionsSelectList.findIndex((option) => option.value === element.value);

  if (index !== -1) {
    // Clonar el array actual para evitar mutar el estado directamente
    const updatedOptions = [...props.optionsSelectList];
    
    // Actualizar el atributo status del objeto en el índice encontrado
    updatedOptions[index] = {
      ...updatedOptions[index],
      status: !updatedOptions[index].status, // Invertir el valor de status
    };

    // Actualizar el estado con el nuevo array
    props.setOptionsSelectList(updatedOptions);

   
  }
}
 

  var dataList=(props.searchTerm==='')?problems:props.searchResults;
  // var dataList=props.searchResults;
  // console.log(dataList)
  const formatDateTime = (dateTimeString) => {
    // Dividir la cadena en fecha y hora
    const [datePart, timePart] = dateTimeString.split(' ');
  
    // Dividir la parte de la fecha en día, mes y año
    const [day, month, year] = datePart.split('/');
  
    // Reconstruir la cadena en el formato deseado
    const formattedDateTime = `${year}/${month}/${day} ${timePart}`;
  
    return formattedDateTime;
  };
 
  const orderBy = (attr) => {
    if (dataList.length === 0) {
        console.log('No hay datos para ordenar');
        return;
    }

    const sortedData = [...dataList].sort((a, b) => {
        if (orderAsc) {
          setOrderAsc(false)
            if (formatDateTime(a[attr]) > formatDateTime(b[attr])) return 1;
            if (formatDateTime(a[attr]) < formatDateTime(b[attr])) return -1;
        } else {
          setOrderAsc(true)
            if (formatDateTime(a[attr]) < formatDateTime(b[attr])) return 1;
            if (formatDateTime(a[attr]) > formatDateTime(b[attr])) return -1;
        }
        return 0;
    });

    if (orderAsc) {
        console.log('Ascendente', sortedData);
    } else {
        console.log('Descendente', sortedData);
    }

    // Actualizar estado o hacer lo que necesites con sortedData
    setProblems(sortedData);
};

    function exportData(){
      console.log('exportData')
      // setDataProblems({data:dataProblems.data,loading:true,error:dataProblems.error})
        const fetchData = async () => {
          console.log('fetch')
          console.log(+props.ubiActual)
          try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqdWFuLm1hcmNpYWwiLCJleHAiOjE2OTExNjg3ODZ9.LETk5Nu-2WXF571qMqTd__RxHGcyOHzg4GfAbiFejJY'; // Reemplaza con tu token de autenticación
            const devicefilter=props.ubiActual.dispId!==0?'?tech_host_type='+props.ubiActual.dispId:''
        const subtypefilter=props.ubiActual.templateId!==0?'subtype='+props.ubiActual.templateId:''
        const severityfilter=props.severityProblms.length>0?'severities='+props.severityProblms.join(', '):''
        let andAux=(devicefilter!=='' )?'&':'?'
              andAux=(subtypefilter!=='')?andAux:''
              
        console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/download/'+props.ubiActual.groupid+''+devicefilter+andAux+subtypefilter+((props.ubiActual.dispId==0 && props.ubiActual.templateId==0)?'?':'&')+severityfilter)
            const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/download/'+props.ubiActual.groupid+''+devicefilter+andAux+subtypefilter+((props.ubiActual.dispId==0 && props.ubiActual.templateId==0)?'?':'&')+severityfilter, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                },
                              });
            if (response.ok) {
              try {
                const response_data = await response.blob();
                // console.log(response_data)
          
                // Crear un enlace para descargar el archivo
                const url = window.URL.createObjectURL(response_data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data_problems.xlsx'); // Cambia el nombre y la extensión del archivo
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
              } catch (error) {
                console.error('Error al descargar el archivo', error);
              }
              
            } else {
              throw new Error('Error en la solicitud');
            }
          } catch (error) {
            // Manejo de errores
            // setDataProblems({data:dataProblems.data,loading:dataProblems.loading,error:error})
            console.error(error);
          }
        };

        fetchData();
      
   }
    return(
<>
<div className={props.alertsIsOpen?'menuAlertTitle' :'menuAlertTitleMin' } onClick={(!props.alertsIsOpen)?expandAlerts:()=>{}}>
{/* <div className={props.alertsIsOpen?'menuAlertTitle' :'menuAlertTitleMin' }> */}
                        <div className='cardTitle cardTitleAlert'>
                        {props.modalIsOpen || props.alertsIsOpen?
                        <div className='cont-menu-eventos'>
                          <div className='cont-option-eventos'>
                          <Search searchResults={props.searchResults} setSearchResults={props.setSearchResults} searchTerm={props.searchTerm} setSearchTerm={props.setSearchTerm}   dataObject={problems} />
                          </div>
                          <div className='cont-option-eventos'>
                              <>
                              <div className='selector-multiple'  onClick={openSelector} >
                                  <div className='selector-cont-text'>
                                      {(props.severityProblms=="")?'Severidades...':props.severityProblms.map((element,index)=>(
                                        element=="6"?'Down, ':'S'+element+', '
                                      ))}
                                  </div>
                                  <hr className="vertical-line"></hr>
                                  <div className='selector-cont-depliegue ' >
                                  <img className='img-field-acciones' src={'/iconos/'+((openSelectList)?'up':'down')+'-arrow-select.png'} title='expand' alt='expand' name='expand'   />
                                  </div>
                                  
                              </div>
                              {(openSelectList)?
                                <div className='select-multiple-list' >
                                  {
                                      props.optionsSelectList.map((element,index)=>(
                                        <>
                                    <div className={'row-option-select-list '+(((props.severityProblms=="6" && props.optionsSelectList[index].value!="6") || (props.severityProblms!="" && props.severityProblms!="6" && props.optionsSelectList[index].value=="6"))?'option_bloqueado':'')} >
                                        <input   defaultChecked={props.optionsSelectList[index].status} onClick={()=>selectOptionList(element)} value={props.optionsSelectList[index].value} name="r" type="checkbox" id={`checkboxList-${index}`}  />
                                        <label htmlFor={`checkboxList-${index}`}>{props.optionsSelectList[index].label}</label>
                                        </div>
                                        </>
                                    ))
                                    }
                                    
                              </div>:''
                              }
                              {
                                flagSearch?<div className='imgCardTitleMin'>
                                <div className='imgContent'>
                                <img src={"/iconos/search_select.png"}  className="expandLogo" alt="Logo" onClick={()=>{props.search_problems();setFlagsearch(false);setOpenSelect(false);props.setSearchTerm("")}}/>
                                </div>
                              </div>:''
                              }
                              <div className='imgCardTitleMin' style={{left:'110%'}}>
                              <div className='imgContent' onClick={()=>{ exportData()}}>
                              <img  style={{top:'15%',height:'100%'}}src={"/iconos/download-blanco.png"}  className="expandLogo expandLogoD" alt="Logo" />
                              </div>
                            </div>
                              </>
                          </div>
                        </div>:''
                //         <div className='cont-search' style={{left:'0px',position:'absolute'}}>
                //     {(!props.dataProblems.loading )?''
                //     :<Search searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}   dataObject={problems} />
                //     }
                    
                // </div>:''
                }
                            <div className='textCardTitle'>
                            EVENTOS ({problems.length})
                            </div>
                            <div className='imgCardTitleMin'>
                              <div className='imgContent'>
                              <img src={props.modalIsOpen?"/iconos/minimize.svg":"/iconos/maximize.svg"}  className="expandLogo" alt="Logo" onClick={props.action}/>
                              </div>
                            </div>
                            {
                              (props.alertsIsOpen && props.modalIsOpen==false)?
                              <div className='imgCardTitleMin' style={{left:'96%'}}>
                              <div className='imgContent' onClick={()=>{ props.setAlertsIsOpen(false)}}>
                              <img  style={{top:'40%'}}src={"/iconos/minimizar.png"}  className="expandLogo" alt="Logo" />
                              </div>
                            </div>:''
                            }
                             
                        </div>
                        
              </div>
              <div className={(props.modalIsOpen || props.alertsIsOpen )?'menuAlertTabla':'menuAlertTablaMin'}  >
                <div className='TableHeader'>
                  
                  <div className='headerCell' style={{width:'6%'}}>
                    <div className='txtHeaderCell' >
                        Severidad
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'26%'}}>
                    <div className='txtHeaderCell' >
                        Host
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'15%'}}>
                    <div className='txtHeaderCell'>
                        Incidencia
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'10%'}}>
                    <div className='txtHeaderCell'>
                        {/* IP */}
                        Estatus
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'5%'}}>
                    <div className='txtHeaderCell'>
                        Ack
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'15%'}}>
                    <div className='txtHeaderCell'>
                        Last Ack Message
                    </div>
                  </div>
                  <div className='headerCell'style={{width:'12%'}}>
                    <div className='txtHeaderCell'>
                        Tiempo activo
                    </div>
                  </div>
                  <div className='headerCell headerbtn'style={{width:'7%'}} onClick={()=>orderBy('Time')} >
                    <div className='txtHeaderCell'>
                        Fecha
                    </div>
                    <img className='img-field-acciones' src={'/iconos/'+((!orderAsc)?'up':'down')+'-arrow-select.png'} title='expand' alt='expand' name='expand'   />
                  </div>
                  <div className='headerCell'style={{width:'7%'}}>
                    <div className='txtHeaderCell'>
                        Hora
                    </div>
                    
                  </div>
                </div>
                <div className='TableBody'>
                {
                  
                  props.dataProblems.loading?<LoadAlerts/>:(problems.length===0?<div className='txtLoader'>Sin Resultados</div>:
                  dataList.map((elemento, indice)=>(
                    
                    <RowProblem  ubiActual={props.ubiActual} mapAux={props.mapAux} setmapAux={props.setmapAux} search_problems={props.search_problems} key={indice} severity={elemento.severity} dataAgencies={dataAgencies} data={elemento} ubicacion={props.ubicacion} setUbicacion={props.setUbicacion} server={props.server} />
                  )))
                  }

                  {
                  
                }
                </div>
              </div>
</>
    )
}

export default TableAlerts 