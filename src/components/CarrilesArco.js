import './styles/CarrilesArco.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
import RowProblem from './RowProblem'
import LoadAlerts from './LoadAlerts'
const CarrilesArco=({hostId,server})=>{
    const carriles_list=useFetch('zabbix/hosts/detail/arcos',hostId,'','GET',server)

    console.log(carriles_list)
    return(
        <div className='contCarrilesArco'>
           <div className='TableHeader' >
                  
                  <div className='headerCell' style={{width:'19%'}}>
                    <div className='txtHeaderCell' >
                      Dirección
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'30%'}}>
                    <div className='txtHeaderCell' >
                        Carril
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'20%'}}>
                    <div className='txtHeaderCell'>
                        Lectura
                    </div>
                  </div>
                  <div className='headerCell' style={{width:'15%'}}>
                    <div className='txtHeaderCell'>
                        {/* IP */}
                        Ultima lectura
                    </div>
                  </div>
                  
                  <div className='headerCell' style={{width:'15%'}}>
                    <div className='txtHeaderCell'>
                        Ip
                    </div>
                  </div>
                  {/* <div className='headerCell'style={{width:'9%'}}>
                    <div className='txtHeaderCell'>
                        
                    </div>
                  </div> */}
                </div>

                <div className='TableBody'>
                {
                  
                  carriles_list.loading?<LoadAlerts/>:(carriles_list.data.data.length===0?<div className='txtLoader'>Sin Resultados</div>:
                  carriles_list.data.data.map((elemento, indice)=>(
                    <>
                    <div className={'rowProblem '/*+elemento.Estatus*/} style={{background:(elemento.Lecturas===0)?'#ff30307d':'#43434d60'}} >
                    <span className="rowProblem-hover"> </span>
                              <div className='problemCell ' style={{width:'19%'}}>
                              <div className='txtProblemCell'>
                                  { elemento.Descripcion}
                                
                                </div>
                               </div>
                              <div className='problemCell' style={{width:'30%'}}>
                                <div className='txtProblemCell' >
                                { elemento.Carril}
                                
                                </div>
                              </div>
                              <div className='problemCell' style={{width:'22%'}}>
                                <div className='txtProblemCell' style={{fontSize: 'large'}}>
                            {elemento.Lecturas}
                                
                                </div>
                              </div>
                              <div className='problemCell' style={{width:'15%'}}>
                                <div className='txtProblemCell'>
                                {/* {elemento.ip} */}
                                {elemento.UltimaLectura}
                                </div>
                              </div>
                              
                              <div className='problemCell' style={{width:'15%'}}>
                                <div className='txtProblemCell'>
                                
                                {elemento.Ip}
                                </div>
                              </div>
                              {/* <div className='problemCell'style={{width:'9%'}}>
                                <div className='txtProblemCell'>
                                
                                </div>
                              </div> */}
                              
                  </div>
                  
                  </>
                   
                    // <RowProblem  key={indice} severity={elemento.severity} dataAgencies={dataAgencies} data={elemento} />
                  )))
                  }
                </div>
        </div>
    )
}

export default CarrilesArco