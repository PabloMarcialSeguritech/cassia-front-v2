import './styles/AlertsByHost.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import data_ubi from './ubicaciones'
import { useFetch } from '../hooks/useFetch'
import RowProblem from './RowProblem'
import LoadAlerts from './LoadAlerts'
const AlertsByHost=({hostId,mapAux,ubiActual,setmapAux,server,search_problems})=>{
    const alerts_list=useFetch('zabbix/hosts/detail/alerts',hostId,'','GET',server)
    const dataAgencies=useFetch('zabbix/exception_agencies','','props.token','GET',server)
    const [orderAsc,setOrderAsc]=useState(true)
  const [problems,setProblems]=useState()
  const [dataProblems,setDataProblems]=useState({data:[],loading:true,error:null})
    // console.log(alerts_list)
useEffect(()=>{
  search_problems()
},[])
    function search_problems(){
      
      setDataProblems({data:dataProblems.data,loading:true,error:dataProblems.error})
        const fetchData = async () => {
          try {
            
              
        // console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter+((ubicacion.dispId==0 && ubicacion.templateId==0)?'?':'&')+severityfilter)
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts/detail/alerts/'+hostId, {                 
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                },
                              });
            if (response.ok) {
              const response_data = await response.json();
              setProblems(response_data.data)
              setDataProblems({data:response_data.data,loading:false,error:dataProblems.error})
              // console.log(response_data)
              
            } else {
              throw new Error('Error en la solicitud');
            }
          } catch (error) {
            // Manejo de errores
            
            setDataProblems({data:dataProblems.data,loading:dataProblems.loading,error:error})
            //console.error(error);
          }
        };
        fetchData();
      }
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
      if (problems.length === 0) {
          console.log('No hay datos para ordenar');
          return;
      }
  
      const sortedData = [...problems].sort((a, b) => {
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
  
      // if (orderAsc) {
      //     console.log('Ascendente', sortedData);
      // } else {
      //     console.log('Descendente', sortedData);
      // }
  
      // Actualizar estado o hacer lo que necesites con sortedData
      setProblems(sortedData);
  };
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
                  
                  dataProblems.loading?<LoadAlerts/>:(alerts_list.data.data.length===0?<div className='txtLoader'>Sin Resultados</div>:
                  problems.map((elemento, indice)=>(
                    
                    <RowProblem ubiActual={ubiActual}mapAux={mapAux} setmapAux={setmapAux} search_problems={search_problems} key={indice} severity={elemento.severity} dataAgencies={dataAgencies} data={elemento} server={server}/>
                  )))
                  }
                </div>
        </div>
    )
}

export default AlertsByHost