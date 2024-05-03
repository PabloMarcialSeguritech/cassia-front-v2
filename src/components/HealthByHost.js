import './styles/HealthByHost.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
import RowProblem from './RowProblem'
import LoadAlerts from './LoadAlerts'
const HealthByHost=({hostId,mode,server})=>{
    const health_list=useFetch('zabbix/hosts/detail/health',hostId,'','GET',server)
    const dataAgencies=useFetch('zabbix/exception_agencies','','props.token','GET',server)
    console.log(health_list)
    return(
        <div className='contHealthByHost'>
           <div className='TableHeader' >
                  
                  <div className='headerCell' style={{width:'10%'}}>
                    <div className='txtHeaderCell' >
                      itemid
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'30%'}}>
                    <div className='txtHeaderCell' >
                        Metrica
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'20%'}}>
                    <div className='txtHeaderCell'>
                        Valor
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'15%'}}>
                    <div className='txtHeaderCell'>
                        {/* IP */}
                        Fecha
                    </div>
                  </div>
                  
                  <div className='headerCell' style={{width:'15%'}}>
                    <div className='txtHeaderCell'>
                        severidad
                    </div>
                  </div>
                  <div className='headerCell'style={{width:'9%'}}>
                    <div className='txtHeaderCell'>
                        
                    </div>
                  </div>
                </div>

                <div className='TableBody'>
                {
                  
                  health_list.loading?<LoadAlerts/>:(health_list.data.data.length===0?<div className='txtLoader'>Sin Resultados</div>:
                  health_list.data.data.map((elemento, indice)=>(
                    <>
                    <div className={'rowProblem '/*+elemento.Estatus*/} style={{background:(mode=='')?'#43434d6':'#eeeeee',background:(mode=='')?'#43434d6':'#eeeeee'}} >
                    <span className="rowProblem-hover"> </span>
                              <div className={'problemCell'+mode} style={{width:'10%'}}>
                              <div className='txtProblemCell'>
                                  { elemento.itemid}
                                
                                </div>
                               </div>
                              <div className={'problemCell'+mode} style={{width:'30%'}}>
                                <div className='txtProblemCell' >
                                { elemento.name}
                                
                                </div>
                              </div>
                              <div className={'problemCell'+mode} style={{width:'22%'}}>
                                <div className='txtProblemCell'>
                            {(elemento.units!="")?elemento.Metric+" ("+elemento.units+")":elemento.Metric}
                                
                                </div>
                              </div>
                              <div className={'problemCell'+mode} style={{width:'15%'}}>
                                <div className='txtProblemCell'>
                                {/* {elemento.ip} */}
                                {elemento.Date}
                                </div>
                              </div>
                              
                              <div className={'problemCell'+mode} style={{width:'15%'}}>
                                <div className='txtProblemCell'>
                                <img  src={'/iconos/alerts3.svg'} className={' s3'} alt="Logo"></img>
                    <p className='txtSeverity'>{'S-3'}</p>
                                </div>
                              </div>
                              <div className={'problemCell'+mode}style={{width:'9%'}}>
                                <div className='txtProblemCell'>
                                
                                </div>
                              </div>
                              
                  </div>
                  
                  </>
                   
                    // <RowProblem  key={indice} severity={elemento.severity} dataAgencies={dataAgencies} data={elemento} />
                  )))
                  }
                </div>
        </div>
    )
}

export default HealthByHost