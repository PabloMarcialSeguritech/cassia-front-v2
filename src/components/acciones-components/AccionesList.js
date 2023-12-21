import { useFetch } from "../../hooks/useFetch"
import LoadSimple from "../LoadSimple"
import Modal from 'react-modal';
// import ModalDeleteCis from "./ModalDeleteCis";
import { useState,useEffect } from 'react';
import ModalAcciones from "./ModalAccion";
import SwitchCassia from "../generales/SwitchCassia";
// import ModalCisAfecta from './ModalCisAfecta';
const deleteCisModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      background: '#ffffff !important',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'40%',
      height:'30%',
      padding:'20px'
    },
  };
  /* estilos modal crear relacion */
const ActionModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    background: '#ffffff !important',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'40%',
    height:'90%',
    padding:'20px'
  },
};
const AccionesList =({handleChangEdit,setData ,setError,server,dataUsers,setDataUsers,searchResults, setSearchResults,searchTerm,setSearchTerm})=>{
    // const dataUsers=useFetch('cassia/ci','',localStorage.getItem('access_token'),'GET',server)
    
    const [deleteActionModalOpen, setdeleteActionModalOpen] =useState(false);
    const [userSelected,setUserSelected]=useState({})
    const [ActionModalOpen, setActionModalOpen] =useState(false); 
    const [actionSelectedAux,setActionSelectedAux]=useState([])
    const [registerIsValid,setRegisterIsValid]=useState(false)
    const [changeTerm,setChangeTerm]=useState(true)
    const [Loading,setLoading]=useState(true)
    var dataList=(searchTerm==='')?dataUsers.data:searchResults;
    
    useEffect(()=>{
      // setLoading(true)
      // setTimeout(()=>setLoading(false),100)
    },[searchTerm])
    function openDeleteUserModal() {
        setdeleteActionModalOpen(true);
      }
    
      function closDeleteCisModal() {
        setdeleteActionModalOpen(false);
      }
      const handledeleteUserClick = (data) => {
        
        openDeleteUserModal()
        setUserSelected(data)
        // Realiza las acciones deseadas al hacer clic en el marcador
      };
      useEffect(()=>{
         buscar_acciones() 
      },[])
      useEffect(()=>{
       
        if(registerIsValid){
          buscar_acciones()
        }
  },[registerIsValid])
      const buscar_acciones=()=>{
        
        console.log("buscando acciones")
        setLoading(true)
        setSearchTerm("")
                setSearchResults([])
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/')
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/', {
                method: 'GET',  
                headers: {
                  'Content-Type': 'application/json',
                  'accept': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
              console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoading(false)
                console.log(data1)
                setSearchResults(data1.data)
                setDataUsers(data1)
                setRegisterIsValid(false)
                
                // setCreateCisModalOpen(true)
              } else {
                const data1 = await response.json();
                console.log(data1)
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchDataPost();
        
    }
    
    function closeCisAfectaModal() {
    
      setActionModalOpen(false);
      
    }
    
    const openActionModal=(elemento) =>{ 
      console.log("openAfect")
      console.log(elemento)
      setActionSelectedAux(elemento)
      setActionModalOpen(true);
      
    }
    const activarAccion=(element)=>{
      
       
        let method='POST'
        
       
        
        const formData = new URLSearchParams();
        formData.append("status", (element.active===1)?false:true);
        
        // setLoading(true)
          const fetchDataPost = async () => {
            setLoading(true)
         try {
            console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/change-status/'+element.action_id)
          
            // console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/actions/change-status/'+element.action_id, {
                method: method,  
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                  },
                  body: formData
              });
            //  console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setRegisterIsValid(true)
                setSearchResults([])
                console.log(data1.data);
                
              } else {
                const data = await response.json();
            console.log(data.detail)
            
            throw new Error('Error en la solicitud');
              }
            } catch (error) {
               
             
            }
          };
      
          fetchDataPost();
          
    
    } 
   
    return(
        <>
        <div className='cont-row-user-list'>
        {(Loading ) ?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
          
           
          dataList.map((elemento, indice) => (
            <div className='row-table-accManage' key={indice}   >
              <div className='field-body-table-accManage field-larger'>
                {elemento.action_id}
              </div>
              <div className='field-body-table-accManage field-x-larger'>
                {elemento.name}
              </div>
              <div className='field-body-table-accManage field-larger'>
                {elemento.aplicados}
              </div>
              <div className='field-body-table-cis field-larger' style={{fontWeight:'bold',color:(elemento.active==1)?'green':'red'}}>
                {(elemento.active==1)?'Activo':'Inactivo'}
                {/* <SwitchCassia accion={activarAccion} elemento={elemento} active={(elemento.active===1)?true:false}/> */}
              </div>
             
              
              <div className='field-body-table-accManage field-larger'>
              {/* <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/cis-afecta.png' title='Afecta' name='Afecta' alt='Afecta' style={{height:'85%'}}  ci_id={elemento.ci_id} onClick={(e) =>{e.stopPropagation(); openActionModal(elemento)}}  />
                </div> */}
                <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/edit.png' title='Editar' name='Editar' action_id={elemento.action_id} onClick={(e) =>{e.stopPropagation(); openActionModal(elemento)}} />
                </div>
                <div className='cont-img-field-acciones' >
                  
                  <SwitchCassia accion={activarAccion} elemento={elemento} active={(elemento.active===1)?true:false}/>
               
                </div>
              </div>
            </div>
          ))
        }
        {
          (dataList.length==0)?<div className="no-results">SIN RESULTADOS.</div>:''
        }
      </div>
        <Modal
        isOpen={deleteActionModalOpen}
        // isOpen={true}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closDeleteCisModal}
        style={deleteCisModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          {/* <ModalDeleteCis server={server} setRegisterIsValid ={setRegisterIsValid } setData={setData} setLoading={setLoading} setError={setError} cis={userSelected} closDeleteCisModal={closDeleteCisModal}></ModalDeleteCis> */}
    </Modal>
    {/* modal cis que afecta */}
    <Modal
        isOpen={ActionModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closeCisAfectaModal}
        style={ActionModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalAcciones server={server} registerIsValid={registerIsValid} setRegisterIsValid={setRegisterIsValid} actionSelectedAux={actionSelectedAux} closeCisAfectaModal ={closeCisAfectaModal }/>
    </Modal>
    </>
    )
}

export default AccionesList