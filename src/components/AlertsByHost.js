import './styles/AlertsByHost.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
import RowProblem from './RowProblem'
import LoadAlerts from './LoadAlerts'
const AlertsByHost=({hostId,mapAux,setmapAux,server,search_problems})=>{
    const alerts_list=useFetch('zabbix/hosts/detail/alerts',hostId,'','GET',server)
    const dataAgencies=useFetch('zabbix/exception_agencies','','props.token','GET',server)
    console.log(alerts_list)
    return(
        <div className='contAlertsByHost'>
           <div className='TableHeader' style={{backgroundColor:'#e3290f6e'}}>
                  
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
                        Ack_message
                    </div>
                  </div>
                  <div className='headerCell'style={{width:'12%'}}>
                    <div className='txtHeaderCell'>
                        Tiempo Activo
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
                  
                  alerts_list.loading?<LoadAlerts/>:(alerts_list.data.data.length===0?<div className='txtLoader'>Sin Resultados</div>:
                  alerts_list.data.data.map((elemento, indice)=>(
                    
                    <RowProblem mapAux={mapAux} setmapAux={setmapAux} search_problems={search_problems} key={indice} severity={elemento.severity} dataAgencies={dataAgencies} data={elemento} server={server}/>
                  )))
                  }
                </div>
        </div>
    )
}

export default AlertsByHost