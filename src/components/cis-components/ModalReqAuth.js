import Action from '../Action'
import './styles/ModalReqAuth.css'
import { useState } from 'react';
import LoadSimple from '../LoadSimple';
const ModalReqAuth =({Buzon,requests_auth,closDeleteBuzonModal,setRegisterIsValid,setData,setLoading,setError,server})=>{
    const [loadingM,setLoadingM]=useState(false);
    const [validaBtn, setValidaBtn] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState('');
   const auth=true
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
        requests_auth(Buzon,textAreaValue)
        closDeleteBuzonModal()
    }
    return(
        <div className="modal-user-content">
            <div className='card-users auth-modal'>
                            <div className={'head-card-users '+((auth)?'authorize':'denied')} >
                                <div className={'title-head-card-users '}  >
                                   Solicitar
                                </div>
                            </div>
                            <div className='content-card-users'>
                                <div className='cont-info-modal-delete'>
                                    <div className='cont-message-modal-delete' style={{height:'25%'}}>
                                    <div className='txt-user-modal-delete-buzon'>
                                                Cambio de Configuración
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

export default ModalReqAuth