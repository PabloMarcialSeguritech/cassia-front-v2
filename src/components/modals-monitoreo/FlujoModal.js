import './styles/FlujoModal.css'
const FlujoModal = ({ eventId ,props}) => {
    const token_item=localStorage.getItem('access_token')
    const timelineData = [
        {
            text: 'Started working on the app-ideas repository',
            date: 'February 25 2019',
            category: {
                tag: 'app-ideas',
                color: '#FFDB14'
            },
           
        },
        {
            text: 'Started the Weekly Coding Challenge program',
            date: 'March 04 2019',
            category: {
                tag: 'blog',
                color: '#e17b77'
            },
           
        },
        {
            text: 'Got 1.000 followers on Twitter',
            date: 'March 07 2019',
            category: {
                tag: 'twitter',
                color: '#1DA1F2'
            },
           
        }
    ]
    
    function search_rfid(){
       
        //   const fetchData = async () => {
        //     try {
        //       console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/layers/carreteros/'+ubicacion.groupid)
        //    const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/layers/carreteros/'+ubicacion.groupid, {                 
        //                           headers: {
        //                             'Content-Type': 'application/json',
        //                             Authorization: `Bearer ${token_item}`,
        //                           },
        //                         });
        //       if (response.ok) {
        //         const response_data = await response.json();
        //         console.log(response_data.data)
                
        //       } else {
        //         throw new Error('Error en la solicitud');
        //       }
        //     } catch (error) {
              
        //     }
        //   };
        //   fetchData();
      }
    return(
        <div className='contFlujoModal'>
            <div className='headContFlujoModal'>
                Flujo del evento: {eventId}
            </div>
            <div className='bodyContFlujoModal'>
                {/* izquierda */}
                <div className='rowLevel'>
                    <div className='rowSide leftSideRow'>

                    </div>
                    <div className='rowSide RightSideRow'>
                        <div className='consArrowflujo arrowLeft'></div>
                        <div className='contInfoFlujo'>
                            <div className='contTopInfoFlujo'>
                            <div className='contTopRightFlujo impar'>
                                        <div className='txtTimeFlujo '>
                                            00/00/0000 00:00:00
                                        </div>
                                </div>
                                <div className='contTopLeftFlujo'>
                                        <div className='txtStatusFlujo '>
                                            Finalizado
                                        </div>
                                </div>
                                
                            </div>
                            <div className='contBotInfoFlujo'>
                            
                                <div className='contBotRightFlujo'>
                                        <div className='contMsgFlujo'>
                                            este es un posible mensaje muy largo para prueba del flujo
                                        </div>   
                                        <div className='contMsgBotFlujo impar'>
                                            zabbix
                                        </div>  
                                </div>
                                <div className='contBotLeftFlujo'>
                                            <div className='contTicketInfo'>
                                                Ticket: 999
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /*** derecha */ }
                <div className='rowLevel'>
                    <div className='rowSide leftSideRow'>
                    <div className='consArrowflujo arrowRight'></div>
                        <div className='contInfoFlujo'>
                            <div className='contTopInfoFlujo'>
                                <div className='contTopLeftFlujo'>
                                        <div className='txtStatusFlujo '>
                                            Finalizado
                                        </div>
                                </div>
                                <div className='contTopRightFlujo par'>
                                        <div className='txtTimeFlujo '>
                                            00/00/0000 00:00:00
                                        </div>
                                </div>
                            </div>
                            <div className='contBotInfoFlujo'>
                            <div className='contBotLeftFlujo'>
                                            <div className='contTicketInfo'>
                                                Ticket: 999
                                            </div>
                                </div>
                                <div className='contBotRightFlujo'>
                                        <div className='contMsgFlujo'>
                                            este es un posible mensaje muy largo para prueba del flujo
                                        </div>   
                                        <div className='contMsgBotFlujo par'>
                                            zabbix
                                        </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rowSide RightSideRow'>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlujoModal
