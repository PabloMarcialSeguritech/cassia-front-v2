import { useFetch } from "../../hooks/useFetch"
import LoadSimple from "../LoadSimple"
import Modal from 'react-modal';
import ModalDeleteCis from "./ModalDeleteCis";
import { useState,useEffect } from 'react';
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
const CisList =({handleChangEdit,setData,setRegisterIsValid ,setLoading,setError,server,dataUsers,setDataUsers,searchResults, setSearchResults,searchTerm,setCisSelected})=>{
    // const dataUsers=useFetch('cassia/ci','',localStorage.getItem('access_token'),'GET',server)
    
    const [deleteCisModalOpen, setdeleteCisModalOpen] =useState(false);
    const [userSelected,setUserSelected]=useState({})
    
    var dataList=(searchTerm==='')?dataUsers.data:searchResults;
    // console.log(userSelected)
    function openDeleteUserModal() {
        setdeleteCisModalOpen(true);
      }
    
      function closDeleteCisModal() {
        setdeleteCisModalOpen(false);
      }
      const handledeleteUserClick = (data) => {
        
        openDeleteUserModal()
        setUserSelected(data)
        // Realiza las acciones deseadas al hacer clic en el marcador
      };
      useEffect(()=>{
         buscar_cis() 
      },[])
      const buscar_cis=()=>{
        
        
        // setLoadingCis(true)
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/')
            const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/', {
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
                // setLoadingCis(false)
                console.log(data1)
                setDataUsers(data1)
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
    const cisSelect=(elemento)=>{
console.log(elemento)
setCisSelected(elemento)
    }
    return(
        <>
        <div className='cont-row-user-list'>
        {(dataUsers.loading ) ?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
          
           
          dataList.map((elemento, indice) => (
            <div className='row-table-cis' key={indice}   onClick={()=>cisSelect(elemento)}>
              <div className='field-body-table-cis field-medium'>
                {elemento.folio}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.ip}
              </div>
              <div className='field-body-table-cis field-larger'>
                {elemento.name.slice(0,35)}...
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.technology}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.device_name}
              </div>
              <div className='field-body-table-cis field-larger'>
                {elemento.description}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.hardware_brand}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.hardware_model}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.software_version}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.location}
              </div>
              <div className='field-body-table-cis field-small'>
                {elemento.criticality}
              </div>
              <div className='field-body-table-cis field-medium' style={{fontWeight:'bold',color:(elemento.status=="Activo")?'green':'red'}}>
                {elemento.status}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.status_conf}
              </div>
              <div className='field-body-table-cis field-medium'>
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
        isOpen={deleteCisModalOpen}
        // isOpen={true}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closDeleteCisModal}
        style={deleteCisModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalDeleteCis server={server} setRegisterIsValid ={setRegisterIsValid } setData={setData} setLoading={setLoading} setError={setError} cis={userSelected} closDeleteCisModal={closDeleteCisModal}></ModalDeleteCis>
    </Modal>
    </>
    )
}

export default CisList