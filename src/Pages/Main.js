import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import '../components/styles/MapBox.css'
import Perfil from '../sections/Perfil'
import Admin from '../sections/Admin'
import Monitoreo from '../sections/Monitoreo'
import Modal from 'react-modal';
import ModalVerificateUser from "../components/main-components/ModalVerificateUser";
import { useState,useEffect } from 'react';
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
const Main=({ onLogin,token,setToken })=>{
   
    const [pageSelected,setPageSelected]=useState("perfil")
    const [rol_id,setRolID]=useState("")
    const [verificateUserModalOpen, setVerificateUserModalOpen] =useState(true);
    console.log('verificateUserModalOpen',verificateUserModalOpen)
    useEffect(()=>{
      
      try {
        let userSession=JSON.parse(localStorage.getItem('user_session'))
        console.log(userSession.roles[0].rol_id)
        setRolID(userSession.roles[0].rol_id)
        if (userSession.verified_at=== null) {
          setVerificateUserModalOpen(true)
         
        }else{
          console.log(userSession.verified_at)
          console.log('no null')
          setVerificateUserModalOpen(false)
        }
      } catch (error) {
        console.log(error)
        // onLogin(false)
      }
      
    },[])
    
      function closVerificateUserModal() {
        setVerificateUserModalOpen(false);
      }
      

    return(
        <div className='main' style={{height:'100%',width:'100%',position: 'absolute'}}>
      <NavBar/>
      <SideBar rolId={rol_id} onLogin={onLogin} pageSelected={pageSelected} setPageSelected={setPageSelected}/>
      <Container>
      {(() => {
        if (pageSelected === "perfil") {
            return <Perfil />;
        } else  if (pageSelected === "monitoreo"){
            return <Monitoreo token={token}/>;
        }else if (pageSelected === "panel-admin"){
          return <Admin />;
      }
    })()}
        
      </Container>
      <Modal
        isOpen={verificateUserModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closVerificateUserModal}
        style={verificateUserModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalVerificateUser onLogin={onLogin} closVerificateUserModal={closVerificateUserModal}></ModalVerificateUser>
    </Modal>
    </div>
    )
}

export default Main