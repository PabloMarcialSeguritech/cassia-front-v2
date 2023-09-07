import Action from '../Action'
import './styles/ModalDeleteUSer.css'
import { useState } from 'react';
import LoadSimple from '../LoadSimple';
const ModalDeleteUSer =({user,closDeleteUserModal,setData,setLoading,setError,server})=>{
    const [loadingM,setLoadingM]=useState(false);
    const Eliminar=()=>{
        console.log("eliminar")
        
        setLoadingM(true)
          const fetchDataPost = async () => {
            
         try {
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/'+user.user_id, {
                method: 'DELETE',  
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoadingM(false)
                // Manejo de la respuesta
                setData(data1)
                closDeleteUserModal()
                // console.log(data1);
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              // Manejo de errores
              setError(error)
              console.error(error);
            }
          };
      
          fetchDataPost();
          
    }
    return(
        <div className="modal-user-content">
            <div className='card-users delete-modal'>
                            <div className='head-card-users delete-modal'>
                                <div className='title-head-card-users'>
                                   ELIMINAR USUARIO
                                </div>
                            </div>
                            <div className='content-card-users'>
                                <div className='cont-info-modal-delete'>
                                    <div className='cont-message-modal-delete'>
                                            <div className='txt-message-modal-delete'>
                                                Se eliminara al usuario:
                                            </div>
                                    </div>
                                    <div className='cont-user-modal-delete'>
                                            <div className='txt-user-modal-delete'>
                                                {user.name}
                                            </div>
                                    </div>
                                    <div className='cont-btn-modal-delete'>
                                            {
                                                (loadingM)?<LoadSimple></LoadSimple>:
                                                <>
                                                <Action  disabled={false} origen='Red' titulo='Eliminar'  action={Eliminar}></Action>
                                            <Action  disabled={false} origen='Cancelar' titulo='Cancelar'  action={closDeleteUserModal}></Action>
                                                </>
                                            }
                                    </div>
                                </div>
                            </div>
            </div>
        </div>
    )
}

export default ModalDeleteUSer