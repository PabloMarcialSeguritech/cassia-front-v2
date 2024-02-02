import Action from '../Action'
import './styles/ModalDeleteBuzon.css'
import { useState } from 'react';
import LoadSimple from '../LoadSimple';
const ModalDeleteBuzon =({Buzon,auth,closDeleteBuzonModal,setRegisterIsValid,setData,setLoading,setError,server})=>{
    const [loadingM,setLoadingM]=useState(false);
    const [validaBtn, setValidaBtn] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState('');
   
    const handleTextAreaChange = (event) => {
        if(event.target.value.length === 0){
            setValidaBtn(true)
        }else{
            setValidaBtn(false)
        }
        
        setTextAreaValue(event.target.value);
      };
    const authorize=()=>{
        console.log("authorize")
        const data={
            action: auth,
            action_comments: textAreaValue
        }
        setLoading(true)
        setRegisterIsValid(true)
          const fetchDataPost = async () => {
            let url='http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/history/authorization/authorize/'+Buzon.mail_id
         try {
              // const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/ci_elements/'+Buzon.element_id, {
              console.log(url)  
              const response = await fetch(url, {
                method: 'POST',  
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
                body:JSON.stringify(data)
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
                setLoading(false)
                setRegisterIsValid(false)
                // Manejo de la respuesta
                setData(data1)
                closDeleteBuzonModal()
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
            <div className='card-users auth-modal'>
                            <div className={'head-card-users '+((auth)?'authorize':'denied')} >
                                <div className={'title-head-card-users '}  >
                                   {(auth)?'ACEPTAR':'RECHAZAR'} CONFIGURACION
                                </div>
                            </div>
                            <div className='content-card-users'>
                                <div className='cont-info-modal-delete'>
                                    <div className='cont-message-modal-delete' style={{height:'25%'}}>
                                    <div className='txt-user-modal-delete-buzon'>
                                                {Buzon.process_name+' solicitado por: '+Buzon.user_request}
                                            </div>
                                    
                                    </div>
                                    <div className='cont-user-modal-delete'  style={{height:'45%'}}>
                                        <label className='lblCmtAuth'> Comentarios:</label>
                                    <textarea id="nota" name="nota" className="CmtAuth" rows="4" cols="25" style={{resize: 'none'}} onChange={handleTextAreaChange}></textarea>
                                    </div>
                                    <div className='cont-btn-modal-delete'>
                                            {
                                                (loadingM)?<LoadSimple></LoadSimple>:
                                                <>
                                                <Action  disabled={validaBtn} origen={(auth)?'Green':'Red'} titulo={(auth)?'ACEPTAR':'RECHAZAR'}  action={authorize}></Action>
                                            <Action  disabled={false} origen='Cancelar' titulo='Cancelar'  action={closDeleteBuzonModal}></Action>
                                                </>
                                            }
                                    </div>
                                </div>
                            </div>
            </div>
        </div>
    )
}

export default ModalDeleteBuzon