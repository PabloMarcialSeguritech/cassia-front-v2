import { useFetch } from "../../hooks/useFetch"
import LoadSimple from "../LoadSimple"
import Modal from 'react-modal';
import ModalDeleteHost from "./ModalDeleteHost";
import ModalCreateHost from "./ModalCreateHost";
import { useState,useEffect } from 'react';
const deleteHostModalStyles = {
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
const HostAfectaModalStyles = {
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
const HostsList =({devices,editActive,dataHost,setDataHost,handleChangEdit,setData,setRegisterIsValid ,setLoading,setError,server,dataUsers,setDataUsers,searchResults, setSearchResults,searchTerm,HostSelected,setHostSelected})=>{
    // const dataUsers=useFetch('cassia/ci','',localStorage.getItem('access_token'),'GET',server)
    
    const [deleteHostModalOpen, setdeleteHostModalOpen] =useState(false);
    const [CreateHostModalOpen, setCreateHostModalOpen] =useState(false);
    const [userSelected,setUserSelected]=useState({})
    const [HostAfectaModalOpen, setHostAfectaModalOpen] =useState(false); 
    const [HostSelectedAux,setHostSelectedAux]=useState([])
    var dataList=(searchTerm==='')?dataUsers.data:searchResults;
    console.log(dataList)
    const crear = () => {
      // Aquí puedes realizar la búsqueda usando el valor de 'query'
      // Por ejemplo, puedes actualizar el estado 'searchResult' con los resultados
      setCreateHostModalOpen(true)
    }
    function closCreateHostModal() {
      // setEditActive(true)
      setCreateHostModalOpen(false);
    }
    function openDeleteUserModal() {
        setdeleteHostModalOpen(true);
      }
    
      function closDeleteHostModal() {
        setdeleteHostModalOpen(false);
      }
      const handledeleteUserClick = (data) => {
        
        openDeleteUserModal()
        setUserSelected(data)
        // Realiza las acciones deseadas al hacer clic en el marcador
      };
      useEffect(()=>{
         buscar_Host() 
      },[])
      const buscar_Host=()=>{
        
        
        // setLoadingHost(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts_management/')
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/zabbix/hosts_management/', {
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
                // setLoadingHost(false)
                console.log(data1)
                setDataUsers(data1)
                // setCreateHostModalOpen(true)
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
    const HostSelectRow=(elemento)=>{
console.log(elemento)
setHostSelected(elemento)

    }
    function closeHostAfectaModal() {
    
      setHostAfectaModalOpen(false);
      
    }
    
    const openHostAfectaModal=(elemento) =>{ 
      console.log("openAfect")
      setHostSelectedAux(elemento)
      setHostAfectaModalOpen(true);
      
    }
    return(
        <>
        <div className='cont-row-user-list'>
        {(dataUsers.loading ) ?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
          
           
          dataList.map((elemento, indice) => (
            <div className='row-table-Host' key={indice}   onClick={()=>{}}>
              <div className='field-body-table-Host field-medium'>
                {elemento.hostid}
              </div>
              <div className='field-body-table-Host field-medium'>
                {elemento.ip}
              </div>
              <div className='field-body-table-Host field-larger' style={{width:'30%'}}>
                {elemento.host}
              </div>
              <div className='field-body-table-Host field-larger'>
                {elemento.name_brand}
              </div>
              <div className='field-body-table-Host field-medium'>
                {elemento.name_model}
              </div>
              <div className='field-body-table-Host field-larger'>
                {elemento.location_lat+" , "+elemento.location_lon}
              </div>
              <div className='field-body-table-Host field-medium'>
                {elemento.Proxy}
              </div>
             
              <div className='field-body-table-Host field-medium' style={{fontWeight:'bold',color:(elemento.status==1)?'green':'red'}}>
                {elemento.status==1?"Activo":"Inactivo"}
              </div>
             
              {/* <div className='field-body-table-Host field-small'>
                {elemento.status_conf}
              </div> */}
              <div className='field-body-table-Host field-larger'>
              
                <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/edit.png' title='Editar' name='Editar' ci_id={elemento.ci_id} onClick={(e) =>{e.stopPropagation(); handleChangEdit(elemento)}} />
                </div>
                <div className='cont-img-field-acciones' >
                  <img className='img-field-acciones' src='/iconos/delete.png' title='Eliminar'name='Eliminar' ci_id={elemento.ci_id} onClick={(e)=> {e.stopPropagation(); handledeleteUserClick(elemento)}} />
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
        isOpen={deleteHostModalOpen}
        // isOpen={true}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closDeleteHostModal}
        style={deleteHostModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalDeleteHost server={server} setRegisterIsValid ={setRegisterIsValid } setData={setData} setLoading={setLoading} setError={setError} Host={userSelected} closDeleteHostModal={closDeleteHostModal}></ModalDeleteHost>
    </Modal>
    {/* modal Host que afecta */}
    <Modal
        isOpen={HostAfectaModalOpen}
        // isOpen={false}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closeHostAfectaModal}
        style={HostAfectaModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
         <ModalCreateHost server={server} editActive={editActive} dataHost={dataHost} setDataHost={setDataHost}></ModalCreateHost>
    </Modal>
    </>
    )
}

export default HostsList