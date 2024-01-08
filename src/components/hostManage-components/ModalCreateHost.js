import Action from '../Action'
import './styles/ModalCreateHost.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';
import { useFetch } from '../../hooks/useFetch';
import SelectorAdmin from '../SelectorAdmin';
import GeneralSection from './sections/GeneralSection';
import UbicacionSection from './sections/UbicacionSection';
const ModalCreateHost =({server,loadingHost,editActive,dataHost})=>{
   
    const [disabled,setDisabled]=useState(true)
    const [host,sethost]=useState([])
    const [listSelected,setListSelected]=useState(1)
    const Proxy_list=useFetch('zabbix/hosts_management/proxys','','','GET',server)
    // const [HostData,setHostData]=useState({ip:(editActive)?dataHost.ip:"",host_id:0,tech_id:(editActive)?dataHost.tech_id:"",device_name:(editActive)?dataHost.device_name:"",description:(editActive)?dataHost.description:"",location:(editActive)?dataHost.location:"",criticality:(editActive)?dataHost.criticality:0,status:(editActive)?dataHost.status:"Inactivo",referencia:(editActive)?dataHost.referencia:""})
    
   
    console.log(dataHost)
   
      
      const Registrar=()=>{
        // console.log("registra")
        // let method='POST'
        // let url_add=''
        // if(editActive){
        //     method='PUT'
        //     url_add=dataHost.ci_id
        // }
        
        // console.log(method)
       
        
        // setLoading(true)
        //   const fetchDataPost = async () => {
            
        //  try {
        //     console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+url_add)
          
        //     // console.log(localStorage.getItem('access_token'))
        //       const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+url_add, {
        //         method: method,  
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        //           },
        //         body: JSON.stringify(dataHost),
        //       });
        //      console.log(response)
        //       if (response.ok) {
                
        //         const data1 = await response.json();
        //         setLoading(false)
        //         // Manejo de la respuesta
        //         setData(data1)
        //         // console.log(data1);
        //         closCreateHostModal()
        //       setRegisterIsValid(true)
              
        //       const timer = setTimeout(() => {
        //         setRegisterIsValid(false)
        //         setEditActive(false)
        //         closCreateHostModal()
        //       }, 3000);
            
        //       } else {
        //         throw new Error('Error en la solicitud');
        //       }
        //     } catch (error) {
        //         setHostName("")
        //         // setHostData({ip:"",host_id:0,date:"",responsible_name:"",auth_name:"",device_description:"",justification:"",previous_state:"",new_state:"",impact:"",result:"",observations:"",files:[],status:'Activo'})
                
        //     setLoading(false)
        //       // Manejo de errores
        //       setError(error)
        //       closCreateHostModal()
        //       setRegisterIsValid(true)
              
        //       const timer = setTimeout(() => {
        //         setRegisterIsValid(false)
        //         setEditActive(false)
        //         closCreateHostModal()
        //       }, 3000);
        //       console.error(error);
        //     }
        //   };
      
        //   fetchDataPost();
          
    }
   
    
    
      const hadleChangeList=()=>{

      }
  
    // const {ip,host_id,tech_id,referencia,device_name,description,criticality,status}=HostData;
    return(
        <div className="modal-host-content">
           <div className='card-users modal-verificate'>
                <div className='head-card-cis'>
                    <div className='title-head-card-users'>
                        {((editActive)?'EDITAR':'CREAR')+' HOST ID:'+((editActive)?dataHost.hostid:'') }
                    </div>
                </div>
                <div className='content-card-users'>
                {(loadingHost)?<LoadSimple></LoadSimple>:
                <>
                    <div className='content-hostManage'>
                            <div className='menu-hostManage'>
                                <div className='menu-hostManage-content'>
                                    <ol className='compact-menu-list-hostManage' >
                                        <li className={listSelected===1?'list-hostManage-selected':''} onClick={() =>{setListSelected(1)}}>General</li>
                                        <li className={listSelected===2?'list-hostManage-selected':''} onClick={() =>{setListSelected(2)}}>Ubicación</li>
                                        <li className={listSelected===3?'list-hostManage-selected':''} onClick={() =>{setListSelected(3)}}>Credenciales</li>
                                        <li className={listSelected===4?'list-hostManage-selected':''} onClick={() =>{setListSelected(4)}}>Inventory</li>
                                     </ol>
                                </div>
                                <hr className='head-line-hostManage'></hr>
                            </div>
                            <div className='display-menu-hostManage'>
                                <div className='compact-section-menu-hostManage'>
                                    {
                                    listSelected===1?
                                    <GeneralSection Proxy_list={Proxy_list} dataHost={dataHost}/>:
                                    listSelected===2?
                                    <UbicacionSection Proxy_list={Proxy_list} dataHost={dataHost}/>:''
                                    }
                                </div>
                            </div>
                            <div className='cont-button-hostManage'>
                            <Action disabled={disabled} origen='Login' titulo='Guardar'  action={Registrar}/>
                            </div>
                    </div>
                    </>
                    }
            </div>
            </div>
            
        </div>
    )
}

export default ModalCreateHost