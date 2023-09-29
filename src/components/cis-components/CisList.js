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
const CisList =({handleChangEdit,setData,setRegisterIsValid ,setLoading,setError,server})=>{
    const dataUsers=useFetch('cassia/ci','',localStorage.getItem('access_token'),'GET',server)
    // console.log(dataUsers)
    const [deleteCisModalOpen, setdeleteCisModalOpen] =useState(false);
    const [userSelected,setUserSelected]=useState({})
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
      
    return(
        <>
        <div className='cont-row-user-list'>
        {(dataUsers.loading ) ?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
          dataUsers.data.data.map((elemento, indice) => (
            <div className='row-table-cis' key={indice}>
              <div className='field-body-table-cis field-small'>
                {elemento.ci_id}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.ip}
              </div>
              <div className='field-body-table-cis field-larger'>
                {elemento.name.slice(0,35)}...
              </div>
              <div className='field-body-table-cis field-larger'>
                {elemento.device_description}
              </div>
              <div className='field-body-table-cis field-larger'>
                {elemento.justification}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.result}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.responsible_name}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.auth_name}
              </div>
              <div className='field-body-table-cis field-medium'>
                {elemento.date.slice(0, 10)}
              </div>
              <div className='field-body-table-cis field-medium'>
                <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/btn_editar_usuario_azul.png' title='Editar' name='Editar' ci_id={elemento.ci_id} onClick={() => handleChangEdit(elemento)} />
                </div>
                <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/btn_eliminar_usuario.png' title='Eliminar'name='Eliminar' ci_id={elemento.ci_id} onClick={()=>handledeleteUserClick(elemento)}/>
                </div>
              </div>
            </div>
          ))
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
          <ModalDeleteCis server={server} setRegisterIsValid ={setRegisterIsValid } setData={setData} setLoading={setLoading} setError={setError} user={userSelected} closDeleteCisModal={closDeleteCisModal}></ModalDeleteCis>
    </Modal>
    </>
    )
}

export default CisList