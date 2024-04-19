import { useEffect, useState } from 'react'
import './styles/FlujoModal.css'
import LoadSimple from '../LoadSimple'
const FlujoModal = ({ eventId ,props}) => {
    const token_item=localStorage.getItem('access_token')
   const [dataFlujo,setDataFlujo]=useState({data:[],loading:true,error:null})
   console.log(dataFlujo.data.history)
   console.log(props)
//    eventId=34990088

    useEffect(()=>{
        console.log('data')
        search_event()
    },[])
    function search_event(){
        setDataFlujo({data:{},loading:true,error:dataFlujo.error})
          const fetchData = async () => {
            console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/acknowledge/'+eventId)
            try {
              console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/acknowledge/'+eventId+'?is_cassia_event='+((props.data.alert_type=="")?0:1))
           const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/acknowledge/'+eventId+'?is_cassia_event='+((props.data.alert_type=="")?0:1), {                 
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token_item}`,
                                  },
                                });
              if (response.ok) {
                const response_data = await response.json();
                console.log(response_data.data)
                
                setDataFlujo({data:response_data.data,loading:false,error:dataFlujo.error})
                
                // setDataFlujo(response_data.data)
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
        <div className='contFlujoModal'>
            <div className='headContFlujoModal'>
                Flujo del evento: {eventId}
                
            </div>
            
            <div className='bodyContFlujoModal'>
                {
                (dataFlujo.loading)?<div className='contflujoload'><LoadSimple/></div>:
                <>
                {/* Inicio */}
                <div className='rowLevel' style={{height:'10%'}}>
                    <div className='rowSide leftSideRow'>

                    </div>
                    <div className='rowSide RightSideRow'>
                        <div className='consArrowflujo arrowLeft'></div>
                        <div className='contInfoFlujo'>
                            <div className='contTopInfoFlujo'>
                            <div className='contTopRightFlujo impar'>
                                        <div className='txtTimeFlujo '>
                                            {props.data.Time}
                                        </div>
                                </div>
                                
                                
                            </div>
                            <div className='contBotInfoFlujo'>
                            
                                <div className='contBotRightFlujo'>
                                        <div className='contMsgFlujo' style={{justifyContent:'left',fontWeight:'bold'}}>
                                            Inicio de evento
                                        </div>   
                                       
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
               {
                 dataFlujo.data.history.map((element, index) => {
                    if(index%2==0){
                        return <>
                        {/* der */}
     <div className='rowLevel'>
                    <div className='rowSide leftSideRow'>
                    <div className='consArrowflujo arrowRight'></div>
                        <div className='contInfoFlujo'>
                            <div className='contTopInfoFlujo'>
                                <div className='contTopLeftFlujo'>
                                        {/* <div className='txtStatusFlujo FINALIZADO'>
                                            FINALIZADO 
                                        </div> */}
                                </div>
                                <div className='contTopRightFlujo par'>
                                        <div className='txtTimeFlujo '>
                                            {element.Time}
                                        </div>
                                </div>
                            </div>
                            <div className='contBotInfoFlujo'>
                            <div className='contBotLeftFlujo'>
                            <div className='contTicketInfo'>
                                            {
                                                (element.tickets!="")?'Tickets:':''
                                            } 
                                        </div>
                                        {element.tickets.slice(2).split(',').map(item =>{ 
                                            return <div className='contTicketInfo'>
                                             {item}
                                        </div>
                                        }
                                            )}
                                </div>
                                <div className='contBotRightFlujo'>
                                        <div className='contMsgFlujo par'>
                                            {element.message}
                                        </div>   
                                        <div className='contMsgBotFlujo par'>
                                        {element.user}
                                        </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rowSide RightSideRow'>
                        
                    </div>
                </div>
                        </>
                    }else{
                        return <>
                    {/* izq */}
                 <div className='rowLevel'>
                    <div className='rowSide leftSideRow'>

                    </div>
                    <div className='rowSide RightSideRow'>
                        <div className='consArrowflujo arrowLeft'></div>
                        <div className='contInfoFlujo'>
                            <div className='contTopInfoFlujo'>
                            <div className='contTopRightFlujo impar'>
                                        <div className='txtTimeFlujo '>
                                        {element.Time}
                                        </div>
                                </div>
                                <div className='contTopLeftFlujo'>
                                        {/* <div className='txtStatusFlujo FINALIZADO'>
                                            FINALIZADO
                                        </div> */}
                                </div>
                                
                            </div>
                            <div className='contBotInfoFlujo'>
                            
                                <div className='contBotRightFlujo'>
                                        <div className='contMsgFlujo impar'>
                                        {element.message}
                                        </div>   
                                        <div className='contMsgBotFlujo impar'>
                                        {element.user}
                                        </div>  
                                </div>
                                <div className='contBotLeftFlujo'>
                                <div className='contTicketInfo'>
                                {
                                                (element.tickets!="")?'Tickets:':''
                                            } 
                                        </div>
                                        {element.tickets.slice(2).split(',').map(item =>{ 
                                            return <div className='contTicketInfo'>
                                             {item}
                                        </div>
                                        }
                                            )}
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </>
                    }
                    
                  })
               
               }
 
                 
                {/* fijo */}
                <div className='rowLevel' style={{height:'auto'}}>
                    <div className='rowSide leftSideRow' style={{height:'auto',width:'100%',border:'unset'}}>
                    {/* <div className='consArrowflujo arrowRight'></div> */}
                        <div className='contInfoFlujo' style={{height:'auto',top:'10px',width:'50%'}}>
                            <div className='contTopInfoFlujo' style={{height: '30px'}}>
                                <div className='contTopLeftFlujo'>
                                        <div className='txtStatusFlujo  ENPROCESO'>
                                            EN PROCESO
                                        </div>
                                </div>
                                <div className='contTopRightFlujo par'>
                                        <div className='txtTimeFlujo '>
                                            {dataFlujo.data.date}
                                        </div>
                                </div>
                            </div>
                            <div className='contBotInfoFlujo'>
                            
                                <div className='contBotRightFlujo' style={{width:'100%'}}>
                                        <div className='contMsgFlujo' style={{height:'35%',color:'#ec5141'}}>
                                            Acumulado Evento:<p style={{color:'black'}}>{'  '+dataFlujo.data.acumulated_cassia + ' hrs.'}</p> 
                                        </div>
                                        {(dataFlujo.data.acumulated_ticket===0)?<div style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',color:'grey'}}>Sin tickets</div>:
                                                dataFlujo.data.acumulated_ticket.map(element=>{
                                                    return  <div className='contMsgFlujo ' style={{height:'20px',color:'#ec5141'}}>
                                                    Acumulado Ticket {element.tracker_id}:<p style={{color:'black'}}>{'  '+element.accumulated+' hrs.'}</p>
                                                </div>    
                                                })
                                        } 
                                       
                                         
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='rowSide RightSideRow'  style={{height:'auto'}}>
                        
                    </div> */}
                </div>
                <div style={{height:'30px'}}></div>

                </>
                }
            </div>
        </div>
    )
}

export default FlujoModal
