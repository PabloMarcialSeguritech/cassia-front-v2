import './styles/TableAlerts.css'
import ReactDOM from 'react-dom';
import React from 'react';
import Modal from 'react-modal';
import RowProblem from './RowProblem'
import LoadAlerts from './LoadAlerts'
import { useFetch } from '../hooks/useFetch';
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
  const dataAgencies=useFetch('zabbix/exception_agencies','',props.token,'GET',props.server)
  // console.log(dataAgencies)
  
  function expandAlerts(){
    if(props.alertsIsOpen){
      props.setAlertsIsOpen(false)
    }else{
      props.setAlertsIsOpen(true)
    }
  }
    return(
<>
<div className={props.alertsIsOpen?'menuAlertTitle' :'menuAlertTitleMin' }onClick={expandAlerts}>
                        <div className='cardTitle cardTitleAlert'>
                            <div className='textCardTitle'>
                            ALERTAS ({props.dataProblems.data.length})
                            </div>
                            <div className='imgCardTitleMin'>
                              <div className='imgContent'>
                              <img src={props.modalIsOpen?"/iconos/minimize.svg":"/iconos/maximize.svg"}  className="expandLogo" alt="Logo" onClick={props.action}/>
                              </div>
                            </div>
                        </div>
                        
              </div>
              <div className={(props.modalIsOpen || props.alertsIsOpen )?'menuAlertTabla':'menuAlertTablaMin'}  >
                <div className='TableHeader'>
                  
                  <div className='headerCell' style={{width:'10%'}}>
                    <div className='txtHeaderCell' >
                        Severidad
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'30%'}}>
                    <div className='txtHeaderCell' >
                        Host
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'20%'}}>
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
                        Ack_message
                    </div>
                  </div>
                  <div className='headerCell'style={{width:'9%'}}>
                    <div className='txtHeaderCell'>
                        Hora
                    </div>
                  </div>
                </div>
                <div className='TableBody'>
                {
                  
                  props.dataProblems.loading?<LoadAlerts/>:(props.dataProblems.data.length===0?<div className='txtLoader'>Sin Resultados</div>:
                  props.dataProblems.data.map((elemento, indice)=>(
                    
                    <RowProblem  key={indice} severity={elemento.severity} dataAgencies={dataAgencies} data={elemento} ubicacion={props.ubicacion} setUbicacion={props.setUbicacion} />
                  )))
                  }

                  {
                  // props.dataProblems.data.map((elemento, indice)=>(
                    
                  //   <RowProblem  key={indice} severity={elemento.severity} data={elemento} ubicacion={props.ubicacion} setUbicacion={props.setUbicacion} />
                  // ))
                 
                    // <>
                    
                    // // <RowProblem severity={1} />
                    // // <RowProblem severity={2}/>
                    // // <RowProblem severity={3}/>
                    // // <RowProblem severity={4} />
                    // // <RowProblem severity={2}/>
                    // // <RowProblem severity={3}/>
                    // // <RowProblem severity={1} />
                    // // <RowProblem severity={2}/>
                    // // <RowProblem severity={3}/>
                    // // <RowProblem severity={4} />
                    // // <RowProblem severity={2}/>
                    // // <RowProblem severity={3}/>
                    // // <RowProblem severity={1} />
                    // // <RowProblem severity={2}/>
                    // // <RowProblem severity={3}/>
                    // // <RowProblem severity={4} />
                    // // <RowProblem severity={2}/>
                    // // <RowProblem severity={3}/>
                     
                    // </>
                    
                 
                }
                </div>
              </div>
</>
    )
}

export default TableAlerts 