import { useFetch } from "../../hooks/useFetch"
import LoadSimple from "../LoadSimple"
import Modal from 'react-modal';
import ModalDeleteBuzon from "./ModalDeleteBuzon";
import { useState,useEffect } from 'react';
const deleteBuzonModalStyles = {
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
const BuzonAfectaModalStyles = {
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
const BuzonList =({devices,editActive,dataBuzon,setDataBuzon,handleChangEdit,setData,setRegisterIsValid ,setLoading,setError,server,dataUsers,setDataUsers,searchResults, setSearchResults,searchTerm,Buzonelected,setBuzonelected})=>{
    // const dataUsers=useFetch('cassia/ci','',localStorage.getItem('access_token'),'GET',server)
    
    const [deleteBuzonModalOpen, setdeleteBuzonModalOpen] =useState(false);
    const [CreateBuzonModalOpen, setCreateBuzonModalOpen] =useState(false);
    const [userSelected,setUserSelected]=useState({})
    const [BuzonAfectaModalOpen, setBuzonAfectaModalOpen] =useState(false); 
    const [BuzonelectedAux,setBuzonelectedAux]=useState([])
    const [auth,setAuth]=useState(false)
    var dataList=(searchTerm==='')?dataUsers.data:searchResults;
    console.log(dataList)
    const crear = () => {
      // Aquí puedes realizar la búsqueda usando el valor de 'query'
      // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
      setCreateBuzonModalOpen(true)
    }
    function closCreateBuzonModal() {
      // setEditActive(true)
      setCreateBuzonModalOpen(false);
    }
    function openDeleteUserModal() {
        setdeleteBuzonModalOpen(true);
      }
    
      function closDeleteBuzonModal() {
        setdeleteBuzonModalOpen(false);
      }
      const handleActionResponse = (data,a) => {
        setAuth(a)
        openDeleteUserModal()
        setUserSelected(data)
        // Realiza las acciones deseadas al hacer clic en el marcador
      };
      useEffect(()=>{
         buscar_Buzon() 
      },[])
      const buscar_Buzon=()=>{
        
        
        // setLoadingBuzon(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/requests/get')
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/requests/get', {
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
                // setLoadingBuzon(false)
                console.log(data1)
                setDataUsers(data1)
                // setCreateBuzonModalOpen(true)
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
    const BuzonelectRow=(elemento)=>{
console.log(elemento)
setBuzonelected(elemento)

    }
    function closeBuzonAfectaModal() {
    
      setBuzonAfectaModalOpen(false);
      
    }
    
    const openBuzonAfectaModal=(elemento) =>{ 
      console.log("openAfect")
      setBuzonelectedAux(elemento)
      setBuzonAfectaModalOpen(true);
      
    }
    return(
        <>
        <div className='cont-row-user-list'>
        {(dataUsers.loading ) ?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
          
           
          dataList.map((elemento, indice) => (
            <div className='row-table-Buzon' key={indice}   onClick={()=>{}}>
              <div className='field-body-table-Buzon field-small'>
                {elemento.mail_id}
              </div>
              <div className='field-body-table-Buzon field-medium'>
                {elemento.folio}
              </div>
              <div className='field-body-table-Buzon field-small'>
                {elemento.configuration_id}
              </div>
              <div className='field-body-table-Buzon field-larger' >
                {elemento.user_request}
              </div>
              <div className='field-body-table-Buzon field-larger' >
                {elemento.request_date}
              </div>
              <div className='field-body-table-Buzon field-larger'>
                {elemento.process_name}
              </div>
             
             
              <div className='field-body-table-Buzon field-larger' style={{width:'40%'}}>
                {elemento.comments}
              </div>
             
              {/* <div className='field-body-table-Buzon field-small'>
                {elemento.status_conf}
              </div> */}
              <div className='field-body-table-Buzon field-larger'>
              
                <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/aceptar.png' title='Aceptar' name='Aceptar' ci_id={elemento.mail_id} onClick={(e) =>{e.stopPropagation(); handleActionResponse(elemento,true)}} />
                </div>
                <div className='cont-img-field-acciones' >
                  <img className='img-field-acciones' src='/iconos/rechazar.png' title='Rechazar'name='Rechazar' ci_id={elemento.mail_id} onClick={(e)=> {e.stopPropagation(); handleActionResponse(elemento,false)}} />
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
        isOpen={deleteBuzonModalOpen}
        // isOpen={true}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closDeleteBuzonModal}
        style={deleteBuzonModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalDeleteBuzon server={server}  auth={auth} setRegisterIsValid ={setRegisterIsValid } setData={setData} setLoading={setLoading} setError={setError} Buzon={userSelected} closDeleteBuzonModal={closDeleteBuzonModal}></ModalDeleteBuzon>
    </Modal>
    {/* modal Buzon que afecta */}
    
    </>
    )
}

export default BuzonList