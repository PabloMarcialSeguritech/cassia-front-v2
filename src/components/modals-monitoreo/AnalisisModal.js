import { useEffect, useState } from 'react'
import './styles/AnalisisModal.css'
import LoadSimple from '../LoadSimple'
const AnalisisModal = ({ eventId ,props}) => {
    const token_item=localStorage.getItem('access_token')
   const [dataAnalisis,setDataAnalisis]=useState({data:[],loading:true,error:null})
   console.log(dataAnalisis.data.history)
   console.log(props)
//    eventId=34990088

    useEffect(()=>{
        console.log('data')
        search_event()
    },[])
    function search_event(){
        setDataAnalisis({data:{},loading:true,error:dataAnalisis.error})
          const fetchData = async () => {
            // console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/diagnosta/'+props.data.ip)
            try {
              console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/diagnosta/'+props.data.ip)
           const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/diagnosta/'+props.data.ip, {                 
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token_item}`,
                                  },
                                });
              if (response.ok) {
                const response_data = await response.json();
                console.log(response_data.data)
                
                setDataAnalisis({data:response_data.data,loading:false,error:dataAnalisis.error})
                
                // setDataAnalisis(response_data.data)
              } else {
                console.log('Error en la solicitud')
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              
            }
          };
          fetchData();
      }
    return(
        <div className='contAnalisisModal'>
            <div className='headContAnalisisModal'>
                Analisis del evento: {eventId}
                
            </div>
            
            <div className='bodyContAnalisisModal'>
            {
                (dataAnalisis.loading)?<div className='contflujoload'><LoadSimple/></div>:
                <>
                
                    <div className='contTableAnalisis'>
                    <div className='contInfoHostAnalisis'>
                    <div className='contRowTableAnalisis' style={{background:'transparent',color:'aliceblue',fontSize:'large',fontWeight:'bold'}}>
                     ODD
                            </div>
                    <div className='contRowTableAnalisis' style={{background:'transparent',color:'aliceblue',fontSize:'small'}}>
                    <p style={{fontWeight:'Bold',color:'#e8044f'}}>Host:</p> {props.data.Host}
                            </div>
                            <div className='contRowTableAnalisis' style={{background:'transparent',color:'aliceblue',fontSize:'small'}}>
                                <div className='controwCellTableanalisis' style={{width:'50%'}}>
                                <p style={{fontWeight:'Bold',color:'#e8044f'}}>Problem:</p> {props.data.Problem}
                                </div>
                                <div className='controwCellTableanalisis' style={{width:'50%'}}>
                                <p style={{fontWeight:'Bold',color:'#e8044f'}}>IP:</p> {props.data.ip}
                                </div>
                            
                            </div>
                    </div>
                        <div className='contHeadTableAnalisis'>
                            <div className='contCellHeadTableAnalisis' style={{width:'15%'}}>
                                Tecnologia      
                            </div>
                            <div className='contCellHeadTableAnalisis' style={{width:'15%'}}>
                                IP
                            </div>
                            <div className='contCellHeadTableAnalisis' style={{width:'55%'}}>
                                Nombre
                            </div>
                            <div className='contCellHeadTableAnalisis' style={{width:'15%'}}>
                                ODD
                            </div>
                        </div>
                        <div className='contBodyTableAnalisis'>
                            {
                            (dataAnalisis.loading)?<LoadSimple/>:
                            dataAnalisis.data.map((element,index)=>(
                                <div id={'contRowTableAnalisis'+index} className='contRowTableAnalisis'>
                                <div className='controwCellTableanalisis' style={{width:'15%'}}>
                                    {element.tech_name}
                                </div>
                                <div className='controwCellTableanalisis'style={{width:'15%'}}>
                                    {element.ip}
                                </div>
                                <div className='controwCellTableanalisis' style={{width:'55%'}}>
                                    {element.host}
                                </div>
                                <div className='controwCellTableanalisis ' style={{width:'15%',color:(element.conectado)?'lime':'red'}}>
                                    {(element.conectado)?'Conectado':'Desconectado'}
                                </div>
                            </div>
                            ))}
                            
                            
                        </div>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default AnalisisModal
