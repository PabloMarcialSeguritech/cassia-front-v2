import './styles/TableAlerts.css'
import ReactDOM from 'react-dom';
import React from 'react';
import Modal from 'react-modal';
import RowProblem from './RowProblem'
import LoadAlerts from './LoadAlerts'
import { useFetch } from '../hooks/useFetch';
import { useState,useEffect } from 'react';
import Search from './cis-components/Search';
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
  const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  const [openSelectList,setOpenSelect]=useState(false)
  const [optionsSelectList, setOptionsSelectList] = useState([
    { value: '6', label: 'Down', status: true },
    { value: '5', label: 'Severidad 5', status: false },
    { value: '4', label: 'Severidad 4', status: false },
    { value: '3', label: 'Severidad 3', status: false },
    { value: '2', label: 'Severidad 2', status: false },
    { value: '1', label: 'Severidad 1', status: false },
  ]);
  
  const [flagSearch,setFlagsearch]=useState(false)
  console.log(openSelectList)
  function expandAlerts(){
    console.log(typeof props.search_problems)
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
  
  const index = optionsSelectList.findIndex((option) => option.value === element.value);

  if (index !== -1) {
    // Clonar el array actual para evitar mutar el estado directamente
    const updatedOptions = [...optionsSelectList];
    
    // Actualizar el atributo status del objeto en el índice encontrado
    updatedOptions[index] = {
      ...updatedOptions[index],
      status: !updatedOptions[index].status, // Invertir el valor de status
    };

    // Actualizar el estado con el nuevo array
    setOptionsSelectList(updatedOptions);

   
  }
}


  var dataList=(searchTerm==='')?props.dataProblems.data:searchResults;
    return(
<>
<div className={props.alertsIsOpen?'menuAlertTitle' :'menuAlertTitleMin' } onClick={(!props.alertsIsOpen)?expandAlerts:()=>{}}>
{/* <div className={props.alertsIsOpen?'menuAlertTitle' :'menuAlertTitleMin' }> */}
                        <div className='cardTitle cardTitleAlert'>
                        {props.modalIsOpen || props.alertsIsOpen?
                        <div className='cont-menu-eventos'>
                          <div className='cont-option-eventos'>
                          <Search searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}   dataObject={props.dataProblems.data} />
                          </div>
                          <div className='cont-option-eventos'>
                              <>
                              <div className='selector-multiple'>
                                  <div className='selector-cont-text'>
                                      {(props.severityProblms=="")?'Severidades...':props.severityProblms.map((element,index)=>(
                                        element=="6"?'Down, ':'S'+element+', '
                                      ))}
                                  </div>
                                  <hr class="vertical-line"></hr>
                                  <div className='selector-cont-depliegue ' >
                                  <img className='img-field-acciones' src={'/iconos/'+((openSelectList)?'up':'down')+'-arrow-select.png'} title='expand' alt='expand' name='expand'    onClick={openSelector} />
                                  </div>
                                  
                              </div>
                              {(openSelectList)?
                                <div className='select-multiple-list' >
                                  {
                                      optionsSelectList.map((element,index)=>(
                                        <>
                                    <div className={'row-option-select-list '+(((props.severityProblms=="6" && optionsSelectList[index].value!="6") || (props.severityProblms!="" && props.severityProblms!="6" && optionsSelectList[index].value=="6"))?'option_bloqueado':'')} >
                                        <input   defaultChecked={optionsSelectList[index].status} onClick={()=>selectOptionList(element)} value={optionsSelectList[index].value} name="r" type="checkbox" id={`checkboxList-${index}`}  />
                                        <label htmlFor={`checkboxList-${index}`}>{optionsSelectList[index].label}</label>
                                        </div>
                                        </>
                                    ))
                                    }
                                    
                              </div>:''
                              }
                              {
                                flagSearch?<div className='imgCardTitleMin'>
                                <div className='imgContent'>
                                <img src={"/iconos/search_select.png"}  className="expandLogo" alt="Logo" onClick={()=>{props.search_problems();setFlagsearch(false);setOpenSelect(false)}}/>
                                </div>
                              </div>:''
                              }
                              
                              </>
                          </div>
                        </div>:''
                //         <div className='cont-search' style={{left:'0px',position:'absolute'}}>
                //     {(!props.dataProblems.loading )?''
                //     :<Search searchResults={searchResults} setSearchResults={setSearchResults} searchTerm={searchTerm} setSearchTerm={setSearchTerm}   dataObject={props.dataProblems.data} />
                //     }
                    
                // </div>:''
                }
                            <div className='textCardTitle'>
                            EVENTOS ({props.dataProblems.data.length})
                            </div>
                            <div className='imgCardTitleMin'>
                              <div className='imgContent'>
                              <img src={props.modalIsOpen?"/iconos/minimize.svg":"/iconos/maximize.svg"}  className="expandLogo" alt="Logo" onClick={props.action}/>
                              </div>
                            </div>
                            {
                              (props.alertsIsOpen && props.modalIsOpen==false)?
                              <div className='imgCardTitleMin' style={{left:'96%'}}>
                              <div className='imgContent'>
                              <img  style={{top:'40%'}}src={"/iconos/minimizar.png"}  className="expandLogo" alt="Logo" onClick={()=>{ props.setAlertsIsOpen(false)}}/>
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
                  <div className='headerCell'style={{width:'7%'}}>
                    <div className='txtHeaderCell'>
                        Fecha
                    </div>
                  </div>
                  <div className='headerCell'style={{width:'7%'}}>
                    <div className='txtHeaderCell'>
                        Hora
                    </div>
                  </div>
                </div>
                <div className='TableBody'>
                {
                  
                  props.dataProblems.loading?<LoadAlerts/>:(props.dataProblems.data.length===0?<div className='txtLoader'>Sin Resultados</div>:
                  dataList.map((elemento, indice)=>(
                    
                    <RowProblem   mapAux={props.mapAux} setmapAux={props.setmapAux} search_problems={props.search_problems} key={indice} severity={elemento.severity} dataAgencies={dataAgencies} data={elemento} ubicacion={props.ubicacion} setUbicacion={props.setUbicacion} server={props.server} />
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