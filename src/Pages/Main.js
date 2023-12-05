import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import '../components/styles/MapBox.css'
import Perfil from '../sections/Perfil'
import Admin from '../sections/Admin'
import Cis from '../sections/Cis'
import Reportes from '../sections/Reportes'
import Monitoreo from '../sections/Monitoreo'
import Modal from 'react-modal';
import ModalVerificateUser from "../components/main-components/ModalVerificateUser";
import { useState,useEffect,Component  } from 'react';
import { useFetch } from '../hooks/useFetch'
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
const Main=({ onLogin,token,setToken,server })=>{
   
    const [pageSelected,setPageSelected]=useState("perfil")
    const [rol_id,setRolID]=useState("")
    const [verificateUserModalOpen, setVerificateUserModalOpen] =useState(false);
    // const [globals,setGlobals]=useState([])
    const dataGlobals=useFetch('cassia/configuration','','','GET',server)
    // console.log(dataGlobals)
    // dataGlobals.loading=true
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
      

    return(
        <div className='main' style={{height:'100%',width:'100%',position: 'absolute'}}>
      {/* <div className='load-main' style={{height:'100%',width:'100%',position: 'absolute'}}>

      </div> */}
      <>
      <NavBar/>
      <SideBar dataGlobals={dataGlobals} rolId={rol_id} onLogin={onLogin} pageSelected={pageSelected} setPageSelected={setPageSelected}/>
      <Container>
      {(() => {
        if (pageSelected === "perfil") {
            return <Perfil server={server}  dataGlobals={dataGlobals} />;
        } else  if (pageSelected === "monitoreo"){
            return <Monitoreo server={server} token={token} dataGlobals={dataGlobals.data.data}/>;
        }else if (pageSelected === "panel-admin"){
          return <Admin server={server} dataGlobals={dataGlobals.data.data} />;
      }else if (pageSelected === "cis"){
        return <Cis server={server} dataGlobals={dataGlobals.data.data} />;
    }else if (pageSelected === "reportes"){
      return <Reportes server={server} dataGlobals={dataGlobals.data.data} />;
  }
    })()}
        
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