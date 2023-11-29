import Action from '../Action'
import './styles/ModalDeleteCis.css'
import { useState } from 'react';
import LoadSimple from '../LoadSimple';
const ModalDeleteCis =({cis,closDeleteCisModal,setRegisterIsValid,setData,setLoading,setError,server})=>{
    const [loadingM,setLoadingM]=useState(false);
    console.log(cis)
    const Eliminar=()=>{
        console.log("eliminar")
        
        setLoading(true)
        setRegisterIsValid(true)
          const fetchDataPost = async () => {
            let url=(typeof cis.conf_id=='undefined')?'http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+cis.element_id:'http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/'+cis.conf_id
         try {
              // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+cis.element_id, {
              console.log(url)  
              const response = await fetch(url, {
                method: 'DELETE',  
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoading(false)
                setRegisterIsValid(false)
                // Manejo de la respuesta
                setData(data1)
                closDeleteCisModal()
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
                                   ELIMINAR CONFIGURACION
                                </div>
                            </div>
                            <div className='content-card-users'>
                                <div className='cont-info-modal-delete'>
                                    <div className='cont-message-modal-delete'>
                                            <div className='txt-message-modal-delete'>
                                                Se eliminara la configuracion:
                                            </div>
                                    </div>
                                    <div className='cont-user-modal-delete'>
                                            <div className='txt-user-modal-delete'>
                                                {(typeof cis.ip === 'undefined')?cis.description:cis.ip}
                                            </div>
                                    </div>
                                    <div className='cont-btn-modal-delete'>
                                            {
                                                (loadingM)?<LoadSimple></LoadSimple>:
                                                <>
                                                <Action  disabled={false} origen='Red' titulo='Eliminar'  action={Eliminar}></Action>
                                            <Action  disabled={false} origen='Cancelar' titulo='Cancelar'  action={closDeleteCisModal}></Action>
                                                </>
                                            }
                                    </div>
                                </div>
                            </div>
            </div>
        </div>
    )
}

export default ModalDeleteCis