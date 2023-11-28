import './styles/RightQuadrant.css'
import Selector from './Selector'
import InfoStatus from './InfoStatus'
import Action from './Action'
import {fetchData} from '../hooks/fetchData'
import { useFetch } from '../hooks/useFetch'
import { Suspense, useEffect, useState } from 'react'


const RightQuadrant =(props)=>{
    // console.log("rigcuadrant")
    // console.log()
    // console.log(props.token)
    const dataLocations=useFetch('zabbix/groups/municipios','',props.token,'GET',props.server)
    const [dataTec,setDataTec]=useState({data:[],loading:true,error:null})
    const [dataDisp,setDataDisp]=useState({data:[],loading:true,error:null})
    
//    console.log(dataDisp.data)
//    console.log(props.ubiActual.templateId)
   const metrica=dataDisp.data.find(obj => obj.template_id === props.ubiActual.templateId)
//    console.log(metrica)
   if( typeof(metrica) !=="undefined"){
    props.setMetricaSelected(metrica.nickname) 
   } 
//    
   let s4= undefined
    let s3= undefined
    let s2= undefined
    let s1=undefined
    const token_item=localStorage.getItem('access_token')
    // console.log(props.dataHosts.data)
    if(props.dataHosts.data.length!=0){
     s4= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 4)
     s3= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 3)
     s2= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 2)
     s1= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 1)
    }
    function buscar(){
       props.setCapas({})
        let aux_municipio=dataLocations.data.data.find(obj => obj.groupid === props.ubicacion.groupid)
        if(aux_municipio===undefined){
            aux_municipio='Todos'
        }
        props.setUbiActual({municipio:aux_municipio.name,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId:props.ubicacion.templateId})
        props.search_problems()
        props.search_devices()
        props.search_downs()
        if(props.ubicacion.dispId===9){
            props.search_rfid()
        }if(props.ubicacion.dispId===12){
            console.log('switches')
            props.search_switches()
        }else{
            props.setRfid([])
        }
        
    }
    
    useEffect(()=>{
        console.log("cambio la ubicacion")
        search_tecnologias()
    },[props.ubicacion.groupid])
    useEffect(()=>{
        if(dataTec.data.length!==0){
       
        let aux_deft=dataTec.data.find(obj => obj.dispId === 11)
        if(aux_deft===undefined){
            console.log("undefined",dataTec.data[0].dispId)

            props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:dataTec.data[0].dispId,templateId:props.ubicacion.templateId})
        }else{
            props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:11,templateId:props.ubicacion.templateId})
        }
    }
    },[dataTec])
    function search_tecnologias(){
        
        setDataTec({data:dataTec.data,loading:true,error:dataTec.error})
          const fetchData = async () => {
            try {
           const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/groups/devices/'+props.ubicacion.groupid, {                 
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token_item}`,
                                  },
                                });
                                // console.log(response)
              if (response.ok) {
                const response_data = await response.json();
                setDataTec({data:response_data.data,loading:false,error:dataTec.error})
               
                // //console.log(response_data)
                
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              // Manejo de errores
              setDataTec({data:dataTec.data,loading:dataTec.loading,error:error})
              //console.error(error);
            }
          };
          fetchData();
      }
      useEffect(()=>{
        console.log("cambio la tecnologia")
        search_metricas()
    },[props.ubicacion.dispId])
    useEffect(()=>{
        if(dataDisp.data.length!==0){
       
            let aux_deft=dataDisp.data.find(obj => obj.id === 0)
            if(aux_deft===undefined){
                props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId:dataDisp.data[0].id})
            }else{
                props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId:0})
            }
        
    }
    },[dataDisp])
    function search_metricas(){
        
       
        
        setDataDisp({data:dataTec.data,loading:true,error:dataTec.error})
          const fetchData = async () => {
            try {
           const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/groups/subtypes/'+props.ubicacion.dispId, {                 
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token_item}`,
                                  },
                                });
                                // console.log(response)
              if (response.ok) {
                const response_data = await response.json();
                setDataDisp({data:response_data.data,loading:false,error:dataTec.error})
               
                // //console.log(response_data)
                
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              // Manejo de errores
              setDataDisp({data:dataTec.data,loading:dataTec.loading,error:error})
              //console.error(error);
            }
          };
          fetchData();
      }
    return(
        <>
        <div className='rowQuadrant rightQuadrant'>
            <div className='column' style={{width:'70%'}}>
                <div className='card menuSearch'>
                    {/* <div className='menuSearchColumn menuSearchTitle'>
                        <div className='cardTitle'>
                            <div className='textCardTitle'>
                                BUSQUEDA:
                            </div>
                            <hr className='lineTitle'></hr>
                        </div>
                    </div> */}
                    <div className='menuSearchData' >
                    <div className='menuSearchColumn'>
                        
                        <Selector opGeneral={true} txtOpGen={'TODOS'}  opt_de={'0'} origen={'mapa'} data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' props={props}></Selector>
                    </div>
                    <div className='menuSearchColumn'>
                        {/* <Selector data={dataSubtype.data.data} loading={dataSubtype.loading}  titulo='Tecnologia'></Selector> */}
                        {(!dataTec.loading)?
                          <Selector  opGeneral={false} txtOpGen={''} opt_de={'11'} origen={'mapa'}  data={dataTec.data} loading={dataTec.loading}  titulo='Tecnología' props={props}></Selector>
                        :<p className='loadSelect'>cargando...</p>
                    }
                        {/* <Selector  opGeneral={false} txtOpGen={''} opt_de={'11'} origen={'mapa'}  data={dataTec.data} loading={dataTec.loading}  titulo='Tecnología' props={props}></Selector> */}
                    </div>
                    
                    <div className='menuSearchColumn'>
                        {/* <Selector data={dataSubtype.data.data} loading={dataSubtype.loading}  titulo='Tecnologia'></Selector> */}
                        {(!dataDisp.loading)?
                          <Selector opGeneral={false}   txtOpGen={'N/A'} opt_de={'0'} origen={'mapa'}  data={dataDisp.data}  loading={dataDisp.loading}  titulo='Métrica' props={props}></Selector>
                        :<p className='loadSelect'>cargando...</p>
                    }
                        
                    </div>
                    <div className='menuSearchColumn'>
                        <Action disabled={false} origen='General' titulo='Buscar'  action={buscar}/>
                    </div>
                    </div>
                </div>
            </div>
            <div className='column' style={{width:'30%',justifyContent: 'space-around'}}>
                <div className='card menuInfo' style={{background:'rgba(94, 99, 115, 0.62)'}}>
                    <div className='menuInfotitle'>
                        <div className='cardTitle'>
                            <div className='textCardTitle'>
                            Conexiones por estado:
                            </div>
                        </div>
                    </div>
                    <div className='menuInfoData' >
                        <div className='dataContent' style={{borderRadius:' 0px 0px 0px 10px'}}>
                            {/* <InfoStatus titulo={'UP'} tipo={'UP'}  size='max'value={props.markersWOR.length==0?'...':(props.dataHosts.data.host_availables[0].UP==""?0:props.dataHosts.data.host_availables[0].UP)}/> */}
                            <InfoStatus titulo={'UP'} tipo={'UP'}  size='max' value={props.markersWOR.length==0?'...':(props.dataHosts.data.global_host_availables[0].UP)}/>
                        </div>
                        <div className='dataContent'  style={{borderRadius:' 0px 0px 10px 0px'}}>
                            {/* <InfoStatus titulo={'DOWN'} tipo={'DOWN'} size='max' value={props.markersWOR.length==0?'...':(props.dataHosts.data.host_availables[0].Down==""?0:props.dataHosts.data.host_availables[0].Down)}/> */}
                            <InfoStatus titulo={'DOWN'} tipo={'DOWN'} size='max' value={props.markersWOR.length==0?'...':props.dataHosts.data.global_host_availables[0].Down}/>
                        </div>
                    </div>
                </div>
                {
                    (props.ubiActual.groupid!==0)?
                
                <div className='card menuInfo'>
                    <div className='menuInfotitle'>
                        <div className='cardTitle' style={{}}>
                            <div className='textCardTitle'>
                            {/* {Conexiones por municipio:} */}
                            {props.ubiActual.municipio}
                            </div>
                        </div>
                    </div>
                    <div className='menuInfoData' >
                        <div className='dataContent' style={{borderRadius:' 0px 0px 0px 10px'}}>
                            <InfoStatus titulo={'UP'} tipo={'UP'}  size='max'value={props.markersWOR.length==0?'...':(props.dataHosts.data.host_availables[0].UP==""?0:props.dataHosts.data.host_availables[0].UP)}/>
                            {/* <InfoStatus titulo={'UP'} tipo={'UP'}  size='max' value={props.markersWOR.length==0?'...':(props.markersWOR.length)}/> */}
                        </div>
                        <div className='dataContent'  style={{borderRadius:' 0px 0px 10px 0px'}}>
                            <InfoStatus titulo={'DOWN'} tipo={'DOWN'} size='max' value={props.markersWOR.length==0?'...':(props.dataHosts.data.host_availables[0].Down==""?0:props.dataHosts.data.host_availables[0].Down)}/>
                            {/* <InfoStatus titulo={'DOWN'} tipo={'DOWN'} size='max' value={props.markersWOR.length==0?'...':props.downs.length}/> */}
                        </div>
                    </div>
                </div>
                :''
                }
            </div>
            {/* <div className='column' style={{height:'30%'}}>
                <div className='card menuAction'>
                    <div className='menuActiontitle'>
                        <div className='cardTitle'>
                            <div className='textCardTitle'>
                            
                            Estatus de Problemas
                            </div>
                        </div>
                    </div>
                   <div className='menuActionData'>
                        <div className='menuActionCell'>
                            <InfoStatus titulo={'Severidad 4'} tipo={'DOWN'} size='min' value={props.latitudes.length==0?'...':(s4===undefined ?0:s4.Severities)}/>
                        </div>
                        <div className='menuActionCell'>
                        <InfoStatus titulo={'Severidad 3'} tipo={'DOWN3'} size='min' value={props.latitudes.length==0?'...':(s3===undefined ?0:s3.Severities)}/>
                           </div>
                        <div className='menuActionCell' style={{borderRadius:' 0px 0px 0px 10px'}}>
                        <InfoStatus titulo={'Severidad 2'} tipo={'DOWN2'} size='min' value={props.latitudes.length==0?'...':(s2===undefined ?0:s2.Severities)}/>
                            </div>
                        <div className='menuActionCell' style={{borderRadius:' 0px 0px 10px 0px'}}>
                        <InfoStatus titulo={'Severidad 1'} tipo={'DOWN1'} size='min' value={props.latitudes.length==0?'...':(s1===undefined ?0:s1.Severities)}/>
                          
                        </div>
                    </div> 
                </div>
            </div> */}
        </div>
        
        </>
    )
}

export default RightQuadrant