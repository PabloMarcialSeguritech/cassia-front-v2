import { useFetch } from "../../hooks/useFetch"
import LoadSimple from "../LoadSimple"
import Modal from 'react-modal';
import ModalDeleteUSer from "./ModalDeleteUser";
import { useState,useEffect } from 'react';
const deleteUserModalStyles = {
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
const UserList =({handleChangEdit,setData,setLoading,setError,server})=>{
    const dataUsers=useFetch('cassia/users','',localStorage.getItem('access_token'),'GET',server)
    console.log(dataUsers.data.data)
    const [deleteUserModalOpen, setDeleteUserModalOpen] =useState(false);
    const [userSelected,setUserSelected]=useState({})
    // console.log(userSelected)
    function openDeleteUserModal() {
        setDeleteUserModalOpen(true);
      }
    
      function closDeleteUserModal() {
        setDeleteUserModalOpen(false);
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
            <div className='row-table-users' key={indice}>
              <div className='field-body-table-users field-acciones'>
                <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/btn_editar_usuario_azul.png' title='Editar' name='Editar' user_id={elemento.user_id} onClick={() => handleChangEdit(elemento)} />
                </div>
                <div className='cont-img-field-acciones'>
                  <img className='img-field-acciones' src='/iconos/btn_eliminar_usuario.png' title='Eliminar'name='Eliminar' user_id={elemento.user_id} onClick={()=>handledeleteUserClick(elemento)}/>
                </div>
              </div>
              <div className='field-body-table-users field-nombre'>
                {elemento.name}
              </div>
              <div className='field-body-table-users field-correo'>
                {elemento.mail}
              </div>
              <div className='field-body-table-users field-rol'>
                {elemento.roles[0].name}
              </div>
            </div>
          ))
        }
      </div>
        <Modal
        isOpen={deleteUserModalOpen}
        // isOpen={true}
        // onAfterOpen={afterOpenExeption}
        onRequestClose={closDeleteUserModal}
        style={deleteUserModalStyles}
        contentLabel="Example Modal2"
        // shouldCloseOnOverlayClick={false}
        >
          <ModalDeleteUSer server={server} setData={setData} setLoading={setLoading} setError={setError} user={userSelected} closDeleteUserModal={closDeleteUserModal}></ModalDeleteUSer>
    </Modal>
    </>
    )
}

export default UserList