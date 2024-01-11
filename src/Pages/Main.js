import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import '../components/styles/MapBox.css'
import Perfil from '../sections/Perfil'
import Admin from '../sections/Admin'
import Cis from '../sections/Cis'
import Hosts from '../sections/Hosts'
import Reportes from '../sections/Reportes'
import Monitoreo from '../sections/Monitoreo'
import Modal from 'react-modal';
import ModalVerificateUser from "../components/main-components/ModalVerificateUser";
import { useState,useEffect,Component  } from 'react';
import { useFetch } from '../hooks/useFetch'
import Acciones from '../sections/Acciones'
import { Redirect } from 'react-router-dom'
import Popup from '../components/generales/Popup'
import '../sections/styles/perfil.css'
const verificateUserModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      background: '#ffffff !important',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'40%',
      height:'70%',
      padding:'20px'
    },
  };
const Main=({ onLogin,token,setToken,server,setServer,object_state_sessions,set_object_state_sessions })=>{
   
    const [pageSelected,setPageSelected]=useState("perfil")
    const [rol_id,setRolID]=useState("")
    const [verificateUserModalOpen, setVerificateUserModalOpen] =useState(false);
    const [nameState,setNameState]=useState("")
    const [estadoActivo,setEstadoActivo]=useState({})
    const [estadoSelected,setEstadoSelected]=useState({})
    const [dataPingEstado,setDataPingEstado]=useState({data:[],loading:false,error:''})
    // console.log(dataPingEstado)
    const [globals,setGlobals]=useState({data:[],loading:false,error:''})
    const dataGlobals=useFetch('cassia/configuration','','','GET',server)
    const estados_list=useFetch('cassia/configuration/estados','','','GET',server)
    const [newLogin,setNewLogin]=useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [infoPopup,setInfoPopup]=useState({message:'',title:'',submsg:'',type:false})
    const [serverStatus,setServerStatus]=useState(false)
    const [statusChangeState,setStatusChangeState]=useState(false)
    const [statusLoginState,setStatusLoginState]=useState(true)
    const [msgCharge,setMsgCharge]=useState('')
    const handleShowPopup = (title,message,submsg,type) => {
        setInfoPopup({message:message,title:title,submsg:submsg,type:type})
        setShowPopup(true);
    };
    const idEstadoExistente = (id) => {
      return Object.values(object_state_sessions).some(estado => estado.id === id);
    };
    // console.log(newLogin)
    // console.log(globals)
    // console.log(dataGlobals)
    // console.log(estadoActivo)
    // console.log(Object.values(estadoActivo))
    // console.log(estadoSelected)
    // useEffect(()=>{
    //   console.log("")
    // },[globals])
    useEffect(()=>{
      console.log(server)
      if(serverStatus){
        // console.log('cambio el server')
      // console.log(globals)
      // console.log(server)
      // getDataGlobals()
      if(!idEstadoExistente(estadoSelected.id)){
        login_state()
      }else{
        console.log('func 1 ')
        getDataGlobals()
      }
      
      }else{
        setServerStatus(true)
      }
      
    },[server])
    useEffect(()=>{
      console.log(object_state_sessions)
      console.log(estadoActivo)
      if(Object.values(object_state_sessions).length!=1){
          console.log('func 2 ')
          getDataGlobals()
      }
    },[object_state_sessions])
    function getDataGlobals(){
      var object_state=''
      var token_state=''
      if(Object.values(object_state_sessions).length!=0){
          if(Object.values(object_state_sessions).length>0){
          var id_state=0
          if(Object.values(estadoSelected)==0){
            id_state=estadoActivo.id
          }else{
            id_state=estadoSelected.id
          }       
          object_state=Object.values(object_state_sessions).find(obj => obj.id === id_state)
          token_state=object_state.access_token
        }
      }else{
        token_state=localStorage.getItem('access_token')
      }
      
      setGlobals({data:globals.data,loading:true,error:globals.error})
          const fetchData = async () => {
            try {
              console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/configuration')
              // console.log(object_state_sessions)
              // console.log(object_state)
              // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/configuration/', { 
             const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/configuration', {  
              // const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/configuration/', {               
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token_state}`,
                                    // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                  },
                                });
                                console.log(response)
              if (response.ok) {
                const response_data = await response.json();
                // console.log(response_data)
                setGlobals({data:response_data,loading:false,error:globals.error})
                localStorage.setItem('access_token',token_state)
                setEstadoActivo(estadoSelected)
                setEstadoSelected({})
                
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              // Manejo de errores
              // setDataPingEstado({data:dataPingEstado.data,loading:dataPingEstado.loading,error:error})
              //console.error(error);
            }
          };
          fetchData();
        }
   useEffect(()=>{
      console.log('acaba de cambiar el estado '+estadoSelected.id)
      if(!idEstadoExistente(estadoSelected.id)){
        console.log('no hay credenciales hara ping '+estadoSelected.id)
      if(Object.keys(estadoSelected).length!==0){
        ping_estado(estadoSelected.id)
      }
    }else{
      console.log('ya hay credenciales')
      console.log(idEstadoExistente(estadoSelected.id))
      const object_state=Object.values(object_state_sessions).find(obj => obj.id == estadoSelected.id)
      console.log(object_state)
      setServer({ip:object_state.server,port:object_state.port})
      localStorage.setItem('access_token',object_state.access_token)
    }
   },[estadoSelected])

   useEffect(()=>{
    console.log('acaba de resivir datos de ping')
    // console.log(dataPingEstado.data)
    if(dataPingEstado.data!=undefined){
      if(dataPingEstado.data.available){
      console.log("reedirigiendo pagina")
      // console.log(estadoSelected)
      // setEstadoActivo(estadoSelected)
      // setEstadoSelected({})
      // console.log(estadoActivo)
      const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
    const match = estadoSelected.url.match(ipPattern);

          if (match) {
            const ipAddress = match[0];
            setServer({ip:ipAddress,port:8002})
            
          } 
      // window.open(estadoSelected.url_front, '_blank');
      }else{
        console.log('no hizo ping')
        // console.log(dataPingEstado.error)
      }
    }
    // ping_estado(estadoSelected.id)
 },[dataPingEstado.data])

 const login_state=async(e)=>{
  setMsgCharge('Iniciando session ...')
  setDataPingEstado({data:dataPingEstado.data,loading:true,error:dataPingEstado.error})
  const formData = new URLSearchParams();
  formData.append("username", localStorage.getItem('user_cassia'));
  formData.append("password", localStorage.getItem('password_cassia_'+ localStorage.getItem('main_access_token')));
  formData.append("grant_type", "");
  formData.append("scope", "");
  formData.append("client_id", "");
  formData.append("client_secret", "");

  try {
    console.log('http://'+server.ip+':'+server.port+'/api/v1/auth/login')
    const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/auth/login', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    });
    // console.log(response)
    if (response.ok) {
      
      const data = await response.json();
      console.log(data)
      console.log(server.ip,server.port)
      console.log(estadoSelected)
      setNewLogin(true)
      setStatusChangeState(false)
      if(!idEstadoExistente(estadoSelected.id)){
      set_object_state_sessions((prevObj) => ({
        ...prevObj,
        [Object.keys(prevObj).length ]: { id:estadoSelected.id,name:estadoSelected.name,server:server.ip,port:server.port,user:'juan.marcial@seguritech.com',pass:'12345678',access_token:data.data.access_token},

      }))
    }
      
      
    } else {
      // setUserVal(false)
      throw new Error('Error en la solicitud');
    }
  
  } catch (error) {
      // setError(error)
      setServerStatus(false)
      setServer({ip:localStorage.getItem('main_server_ip'),port:localStorage.getItem('main_server_port')})
      setMsgCharge('Credenciales no aceptadas')
      setStatusLoginState(false)
      setDataPingEstado({data:dataPingEstado.data,loading:false,error:dataPingEstado.error})
     console.log(error)
    
  }
 }
    useEffect(()=>{
      
      try {
        let userSession=JSON.parse(localStorage.getItem('user_session'))
        
        const expirationDate = new Date(userSession.refresh_token_expires);
    const currentDate = new Date();

    
    
        setRolID(userSession.roles[0].rol_id)
        if (userSession.verified_at=== null) {
          setVerificateUserModalOpen(true)
         
        }else{
          setVerificateUserModalOpen(false)
          if(expirationDate<currentDate){
            onLogin(false)
          }
        }
      } catch (error) {
        console.log(error)
        onLogin(false)
      }
      
    },[])
    
      function closVerificateUserModal() {
        setVerificateUserModalOpen(false);
      }
      
      function ping_estado(id_estado){
      console.log('haciendo ping')
      setNewLogin(false)
      setMsgCharge('Estableciendo ping con el servidor ...')
      setStatusChangeState(true)

        setDataPingEstado({data:dataPingEstado.data,loading:true,error:dataPingEstado.error})
          const fetchData = async () => {
            try {
              console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/configuration/estados/ping/'+id_estado)
             const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/configuration/estados/ping/'+id_estado, {                 
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                  },
                                });
                                console.log(response)
              if (response.ok) {
                const response_data = await response.json();
                console.log(response_data)
                
                setDataPingEstado({data:response_data.data,loading:false,error:response_data.message})
                
                
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              // Manejo de errores
              // setDataPingEstado({data:dataPingEstado.data,loading:dataPingEstado.loading,error:error})
              //console.error(error);
            }
          };
          fetchData();
        }
    return(
        <div className='main' style={{height:'100%',width:'100%',position: 'absolute'}}>
      {/* <div className='load-main' style={{height:'100%',width:'100%',position: 'absolute'}}>

      </div> */}
      <>
      <NavBar statusLoginState={statusLoginState} dataGlobals={globals.data.data} msgCharge={msgCharge} statusChangeState={statusChangeState} setStatusChangeState={setStatusChangeState} server={server}  object_state_sessions={object_state_sessions} set_object_state_sessions={set_object_state_sessions} estadoActivo={estadoActivo} setEstadoActivo={setEstadoActivo} estados_list={estados_list} nameState={nameState} estadoSelected={estadoSelected} setEstadoSelected={setEstadoSelected} dataPingEstado={dataPingEstado}/>
      <SideBar dataGlobals={globals} rolId={rol_id} onLogin={onLogin} pageSelected={pageSelected} setPageSelected={setPageSelected}/>
      <Container>
      {(() => {
        if(globals.loading){
          return <>
          <div className='top-welcome'>
                    <div className='Title'>
                    <img src="logo_cassia.png"  style={{height: '50%'}} alt="Logo"/>
                    </div>
                </div>
          <div className='mid-welcome'>
                    
                    {
                        
                        <div className='cont-load-main'>
                        <div className='txt-load-main'>
                            Cargando datos, por favor espere...
                        </div>
                    <section className="dots-container-main">
                        <div className="dots-main"></div>
                        <div className="dots-main"></div>
                        <div className="dots-main"></div>
                        <div className="dots-main"></div>
                        <div className="dots-main"></div>
                    </section>
                    </div>
                        
                    }
                    
                </div>
          </>
        }else{
          if (pageSelected === "perfil") {
            return <Perfil server={server}  dataGlobals={globals} setNameState={setNameState} />;
        } else  if (pageSelected === "monitoreo"){
            return <Monitoreo handleShowPopup={handleShowPopup} server={server} token={token} dataGlobals={globals.data.data}/>;
        }else if (pageSelected === "panel-admin"){
          return <Admin server={server} dataGlobals={globals.data.data} />;
      }else if (pageSelected === "cis"){
        return <Cis server={server} dataGlobals={globals.data.data} />;
    }else if (pageSelected === "reportes"){
      return <Reportes server={server} dataGlobals={globals.data.data} />;
  }else if (pageSelected === "acciones"){
    return <Acciones server={server} dataGlobals={globals.data.data} />;
}else if (pageSelected === "host-manage"){
  return <Hosts server={server} dataGlobals={globals.data.data} />;
}
        }
    })()}
        <Popup infoPopup={infoPopup} isVisible={showPopup} setShowPopup={setShowPopup} setInfoPopup={setInfoPopup}></Popup>
      </Container>
      </>
      <Modal
        isOpen={verificateUserModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closVerificateUserModal}
        style={verificateUserModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalVerificateUser server={server} onLogin={onLogin} closVerificateUserModal={closVerificateUserModal}></ModalVerificateUser>
    </Modal>
    </div>
    )
}

export default Main