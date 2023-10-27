import './styles/RowProblem.css'
import { useState } from 'react';

import MenuAlert from './MenuAlert';

const RowProblem=(props)=>{
  // const [infoShow,setInfoShow]=useState({severity:0,host:"",problem:"",ip:"",ack:"",ack_message:"",time:""})
  const [menuAlertOpen, setMenuAlertOpen] = useState(false);
  const [color, setColor] = useState('#43434d');
  const [ackMessage, setAckMessage] = useState('');
  // console.log(props.data)
  const openMenuAlert = () => {
// buscar_info(props.data.eventid)
    console.log(props.data)
    // console.log(props.data.longitude)
    // console.log(props.ubicacion.groupid)
    // props.setUbicacion({latitud:props.data.latitude.replace(",", "."),longitud:props.data.longitude.replace(",", "."),zoom:16,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId: props.ubicacion.templateId})
    setMenuAlertOpen(true);
  };
//   const buscar_info=(eventid)=>{
        
        
//     // setDataCis({data:dataCis.data,loading:true,error:null})
//       const fetchDataPost = async () => {
        
//      try {
//         console.log('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/acknowledge/'+eventid)
//         const response = await fetch('http://'+props.server.ip+':'+props.server.port+'/api/v1/zabbix/problems/acknowledge/'+eventid, {
//             method: 'GET',  
//             headers: {
//               'Content-Type': 'application/json',
//               'accept': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
//             },
//           });
//           console.log(response)
//           if (response.ok) {
            
//             const data1 = await response.json();
//             // setLoadingCis(false)
//             console.log(data1.data[0].message)
//             setAckMessage(data1.data[0].message)
//             // setDataCis({data:data1.data,loading:false,error:null})
//             // setCreateCisModalOpen(true)
//           } else {
//             const data1 = await response.json();
//             console.log(data1)
//             throw new Error('Error en la solicitud');
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };
  
//       fetchDataPost();
    
// }
  const closeMenuAlert = () => {
    // if(props.ubicacion.groupid===0){
    //   // props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,zoom:6,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId: props.ubicacion.templateId})
    // }else{
    //   // props.setUbicacion({latitud:props.ubicacion.latitud,longitud:props.ubicacion.longitud,zoom:11,groupid:props.ubicacion.groupid,dispId:props.ubicacion.dispId,templateId: props.ubicacion.templateId})
    // }
    setMenuAlertOpen(false);
  };

  
  
    return(
      <>
        <div className={'rowProblem '/*+props.data.Estatus*/} style={{background:menuAlertOpen?'#82829160':'#43434d60'}} onClick={menuAlertOpen?closeMenuAlert:openMenuAlert}>
        <span className="rowProblem-hover"> </span>
                  <div className='problemCell ' style={{width:'6%'}}>
                    {/* <div className='txtProblemCell' >
                        {props.severity}
                    </div> */}
                    {/* <div className={'sphere s'+props.data.severity}></div> */}
                    <img  src={'/iconos/alerts'+props.data.severity+'.svg'} className={' s'+props.data.severity} alt="Logo"></img>
                    <p className='txtSeverity'>{'S-'+props.data.severity}</p>
                  </div>
                  <div className='problemCell' style={{width:'33%'}}>
                    <div className='txtProblemCell' >
                    {props.data.Host.length > 35 ? `${props.data.Host.slice(0, 35)}...` : props.data.Host}
                    
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'22%'}}>
                    <div className='txtProblemCell'>
                      {props.data.Problem.length > 25 ? `${props.data.Problem.slice(0, 25)}...` : props.data.Problem}
                    
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'10%'}}>
                    <div className='txtProblemCell'>
                    {/* {props.data.ip} */}
                    {props.data.Estatus}
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'5%'}}>
                    <div className='txtProblemCell'>
                    {props.data.Ack}
                    </div>
                  </div>
                  <div className='problemCell' style={{width:'15%'}}>
                    <div className='txtProblemCell'>
                    {props.data.Ack_message.length > 20 ? `${props.data.Ack_message.slice(0, 20)}...` : props.data.Ack_message}
                       {/* {props.data.Ack_message} */}
                    </div>
                  </div>
                  <div className='problemCell'style={{width:'9%'}}>
                    <div className='txtProblemCell'>
                    {props.data.Time.slice(-9)}
                    </div>
                  </div>
                  
      </div>
      <MenuAlert search_problems={props.search_problems} server={props.server} ackMessage={ackMessage} setAckMessage={setAckMessage}isOpen={menuAlertOpen} props={props} onClose={closeMenuAlert} />
      
      </>
    )
}
export default RowProblem