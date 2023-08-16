import './styles/RightQuadrant.css'
import Selector from './Selector'
import InfoStatus from './InfoStatus'
import Action from './Action'
import {fetchData} from '../hooks/fetchData'
import { useFetch } from '../hooks/useFetch'
import { Suspense } from 'react'


const RightQuadrant =(props)=>{
    console.log("rigcuadrant")
    console.log(props.token)
    const dataLocations=useFetch('groups/municipios','',props.token,'GET')
    const dataSubtype=useFetch('groups/subtypes','',props.token)
    const dataDevices=useFetch('groups/devices','',props.token,'GET')
    let s4= undefined
    let s3= undefined
    let s2= undefined
    let s1=undefined
    console.log(props.dataHosts.data)
    if(props.dataHosts.data.length!=0){
     s4= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 4)
     s3= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 3)
     s2= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 2)
     s1= props.dataHosts.data.problems_by_severity.find(obj => obj.severity === 1)
    }
    function buscar(){
        console.log("buscar")
        props.search_problems()
        props.search_devices()
        props.search_downs()
    }
//    console.log(props.dataHosts.data)
    return(
        
        <div className='rowQuadrant rightQuadrant'>
            <div className='column' style={{width:'80%'}}>
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
                        
                        <Selector data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' props={props}></Selector>
                    </div>
                    <div className='menuSearchColumn'>
                        {/* <Selector data={dataSubtype.data.data} loading={dataSubtype.loading}  titulo='Tecnologia'></Selector> */}
                        <Selector data={dataDevices.data.data} loading={dataDevices.loading}  titulo='Tecnologia' props={props}></Selector>
                    </div>
                    
                    <div className='menuSearchColumn'>
                    <Selector data={dataSubtype.data.data}  loading={dataSubtype.loading}  titulo='Subtipo' props={props}></Selector>
                    </div>
                    <div className='menuSearchColumn'>
                    <Action disabled={false} origen='General' titulo='Buscar'  action={buscar}/>
                    </div>
                    </div>
                </div>
            </div>
            <div className='column' style={{width:'20%'}}>
                <div className='card menuInfo'>
                    <div className='menuInfotitle'>
                        <div className='cardTitle'>
                            <div className='textCardTitle'>
                            Estatus de dispositivos:
                            </div>
                        </div>
                    </div>
                    <div className='menuInfoData' >
                        <div className='dataContent' style={{borderRadius:' 0px 0px 0px 10px'}}>
                            <InfoStatus titulo={'UP'} tipo={'UP'}  size='max'value={props.markers.length==0?'...':props.markers.length}/>
                        </div>
                        <div className='dataContent'  style={{borderRadius:' 0px 0px 10px 0px'}}>
                            <InfoStatus titulo={'DOWN'} tipo={'DOWN'} size='max' value={props.markers.length==0?'...':(props.dataHosts.data.host_availables[0].Down==""?0:props.dataHosts.data.host_availables[0].Down)}/>
                        </div>
                    </div>
                </div>
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
    )
}

export default RightQuadrant