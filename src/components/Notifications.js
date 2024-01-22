import LoadSimple from './LoadSimple'
import './styles/Notifications.css'
import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import InfoMarker from '../components/InfoMarker'
const infoMarkerStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#363636',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'70%',
    height:'60%',
    padding:'20px'
  },
};
const Notifications=(props)=>{
    const [dataNotifications,setDataNotifications]=useState({data:[],loading:true,error:null})
    const [dataInfoNoti,setDataInfoNoti]=useState({data:[],loading:true,error:null})
    const [infoMarkerOpen, setInfoMarkerOpen] =useState(false);
    const  [infoMarker, setInfoMarker]=useState([])
    const [countNoti,setCountNoti]=useState(0)
    const [statusListNoti,setStatusListNoti]=useState(false)
    const [requestInterval,setRequestInterval]=useState({initial:0,final:20})
    const [dataNotiGeneral,setDataNotiGeneral]=useState([])
    console.log(dataNotiGeneral)
    console.log(requestInterval)
    function openInfoMarker() {
      console.log("abre infomarker ....................")
      console.log(infoMarker)
      setInfoMarkerOpen(true);
    }
  
    function closeInfoMarker() {
      setInfoMarkerOpen(false);
    }
    // setTimeout(() => {
    //     search_notifications() 
    // }, 10000);
    function search_notifications(){
    //   console.log('request notifications')
        setDataNotifications({data:dataNotifications.data,loading:true,error:dataNotifications.error})
          const fetchData = async () => {
            try {
             
                
          // console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/problems/'+ubicacion.groupid+''+devicefilter+andAux+subtypefilter+((ubicacion.dispId==0 && ubicacion.templateId==0)?'?':'&')+severityfilter)
              const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/slack_notifications/count', {                 
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                  },
                                });
              if (response.ok) {
                const response_data = await response.json();
                setDataNotifications({data:response_data.data,loading:false,error:dataNotifications.error})
                // console.log(response_data.data.notifications_count)
                setCountNoti(response_data.data.notifications_count)
                // setCountNoti(10)
                setTimeout(() => {
                    search_notifications() 
                }, 30000);
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              // Manejo de errores
              setDataNotifications({data:dataNotifications.data,loading:dataNotifications.loading,error:error})
              //console.error(error);
            }
          };
          fetchData();
        }
        useEffect(()=>{
            search_notifications()
        },[])


        function search_notifications_info(){
           
            setDataInfoNoti({data:dataInfoNoti.data,loading:true,error:dataInfoNoti.error})
                const fetchData = async () => {
                  try {
                   
                      
                console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/slack_notifications/?skip='+requestInterval.initial+'&limit='+requestInterval.final)
                    const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/cassia/slack_notifications/?skip='+requestInterval.initial+'&limit='+requestInterval.final, {                 
                                        headers: {
                                          'Content-Type': 'application/json',
                                          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                        },
                                      });
                    if (response.ok) {
                      const response_data = await response.json();
                      // setDataNotiGeneral(response_data.data)
                      setDataNotiGeneral([...dataNotiGeneral,...response_data.data])
                      setDataInfoNoti({data:response_data.data,loading:false,error:dataInfoNoti.error})
                      console.log(response_data.data)
                      
                    } else {
                      throw new Error('Error en la solicitud');
                    }
                  } catch (error) {
                    // Manejo de errores
                    setDataInfoNoti({data:dataInfoNoti.data,loading:dataInfoNoti.loading,error:error})
                    //console.error(error);
                  }
                };
                fetchData();
              }
              const formatearFecha = (fechaString) => {
                const año = fechaString.substr(0, 4);
                const mes = fechaString.substr(5, 2);
                const dia = fechaString.substr(8, 2);
                const hora = fechaString.substr(11, 8);
            
                return `${dia}/${mes}/${año} ${hora}`;
              };
    const activeNotiList=()=>{
        
        if(!statusListNoti){
          setCountNoti(0)
            search_notifications_info()
        }else{
          setRequestInterval({initial:0,final:20})
          setDataNotiGeneral([])
        }
        setStatusListNoti(!statusListNoti)
        

    }
    const eventNoti=(elemento)=>{
      //       console.log(elemento)
            
      // const data={
      //   "hostidC": parseInt(elemento.hostid),
      //   "hostidP": "",
      //   "end_lat": elemento.latitude,
      //   "end_lon": elemento.longitude,
      //   "name_hostC": elemento.host,
      //   "name_hostipC": elemento.ip,
      //   "color_alineacion": "#00ff70",
      //   "tooltip": true
      // }
      // setInfoMarker(data)
     
    }
    useEffect(()=>{
      if(infoMarker.length!==0){
        openInfoMarker()
      }
    },[infoMarker])
    const seeMore=()=>{
      const initial=(parseInt(requestInterval.initial)+parseInt(requestInterval.final))
      
      setRequestInterval({initial:initial,final:requestInterval.final})
    }
    useEffect(()=>{
      if(requestInterval.initial!==0){
        search_notifications_info()
      }
    },[requestInterval.initial])

    const openHost=(element)=>{
      
    }
    return(
        <>
        <div className='contNotiHost' onClick={()=>{activeNotiList()}}>
            {(countNoti!==0)?<div className='circle-NotiHost'>
                {
                    (dataNotifications.loading)?'...':countNoti
                }
            </div>:''}
                <div className="container-NotiHost">
                    {/* <input defaultChecked={true} className="checkbox-NotiHost" type="checkbox" onClick={'closeFindHost'}/>  */}
                    <div className="mainbox-NotiHost">
                        <div className="iconcontainer-NotiHost">
                            <img   src={'/iconos/notification'+((countNoti!==0)?'_active':'')+'.png' } ></img>
                            {/* <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="search_icon-NotiHost "><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg> */}
                        </div>
                    {/* <input className="search_input-NotiHost" placeholder="Buscar IP ..." type="text" value={'inputIp'}onChange={'handleChange'}/> */}
                    </div>
                   <div className='con'> 

                   </div>
            </div>
            
        </div>
        {
            (statusListNoti)?<div className='contNotiHostList'>
            
            {dataNotiGeneral.map((elemento, indice) => (
                <div className='contNotiInfo'>
                <div className={'compactNotiInfo '+((elemento.seen==0)?'noseen':'')} onClick={()=>{eventNoti(elemento)}}>
                <div className='leftContentNotiInfo'>
                <img   src={'/iconos/view'+((elemento.seen==1)?'_active':'')+'.png' } ></img>
                </div>
                <div className='RigthContentNotiInfo'>
                    <div className='RowContentNotiInfo'>
                        {formatearFecha(elemento.problem_date)}
                    </div>
                    <div className='RowContentNotiInfo' style={{fontSize:'x-small'}}>
                        {elemento.host.slice(0,30)+'...'}
                    </div>
                    <div className='RowContentNotiInfo'>
                        {elemento.status}
                    </div>
                    <div className='RowContentNotiInfo'>
                        {elemento.incident}
                    </div>
                </div>
            </div>
            </div>
            ))
            }
            <div className='contSeeMore' onClick={seeMore}>
            {(dataInfoNoti.loading)?<div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}><LoadSimple/></div>:
            <>VER MAS<svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-tj5bde-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg></>}
            </div>
        
    </div>:''
        }
        <Modal
                  isOpen={infoMarkerOpen}
                  // onAfterOpen={afterOpenExeption}
                  onRequestClose={closeInfoMarker}
                  style={infoMarkerStyles}
                  contentLabel="Example Modal2"
                  // shouldCloseOnOverlayClick={false}
                  >
                    <InfoMarker handleShowPopup={props.handleShowPopup} mapAux={props.mapAux} setmapAux={props.setmapAux} search_problems={props.earch_problems} devices={props.devices} server={props.server} isOpen={infoMarkerOpen} data={infoMarker} closeInfoMarker={closeInfoMarker} ubiActual={props.ubiActual}></InfoMarker>
                </Modal>
        </>
        
    )
}

export default Notifications