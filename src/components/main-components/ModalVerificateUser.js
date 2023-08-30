import Action from '../Action'
import './styles/ModalVerificateUser.css'
import { useState ,useEffect} from 'react';
import LoadSimple from '../LoadSimple';
import InputAdmin from '../InputAdmin';

const ModalverificateUSer =({user,onLogin,closverificateUserModal,setData,setLoading,setError})=>{
    const [loadingM,setLoadingM]=useState(false);
    const [passwordValid,setPasswordValid]=useState(false)
    const [matchPassword,setMatchPassword]=useState(false)
    const [disabled,setDisabled]=useState(true)
    const [passwordData,setPasswordData]=useState({old_password:"",new_password:"",new_password_confirmation:""})
        console.log(passwordData)

        console.log(passwordValid, matchPassword)
    const handleChange=(e)=>{
        console.log(e.target.name)
        const {name,value}=e.target
        setPasswordData((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
            
        })
        if(e.target.name=="new_password"){
            setPasswordValid(validatePassword(value))
            setMatchPassword(validateMatch(value,passwordData.new_password_confirmation))
        }else if(e.target.name=="new_password_confirmation"){
            setMatchPassword(validateMatch(value,passwordData.new_password))
        }
        
        
      }

      useEffect(()=>{
            if(passwordData.new_password==="" || passwordData.new_password_confirmation==="" || passwordData.old_password==="" || passwordValid===false || matchPassword===false ){
                console.log('disabled')
                setDisabled(true)
            }else{
                console.log('no disabled')
                setDisabled(false)
            }
      },[passwordData])

    const Actualizar=()=>{
        console.log("Actualizar")
        
        setLoadingM(true)
          const fetchDataPost = async () => {
            
         try {

              const response = await fetch('http://172.18.200.14:8002/api/v1/auth/profile/update-password', {
                method: 'PUT',  
                headers: {
                  'Content-Type': 'application/json',
                  'accept': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(passwordData)
              });
              
            // 
              if (response.ok) {
                
                const data1 = await response.json();
                setLoadingM(false)
                // Manejo de la respuesta
                console.log(data1)
                onLogin(false)
                // closverificateUserModal()
                // setData(data1)
                setDisabled(true)
                // closverificateUserModal()
                // console.log(data1);
              } else {
                const data1 = await response.json();
                console.log(data1)
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
              // Manejo de errores
            //   setError(error)
              console.error(error);
            }
          };
      
          fetchDataPost();
        
    }

    const validatePassword= (password) => {
        console.log("validando correo: ",password )
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/;
        let result = passwordRegex.test(password);
        return result;
      };

      const validateMatch= (password,comparate) => {
        console.log("validando correo: ",passwordData.new_password_confirmation ,passwordData.new_password)
        // let result=false
        if(password===comparate){
            return true
        }else{
            return false
        }
        // return result;
      };
    const {old_password,new_password,new_password_confirmation}=passwordData;
    return(
        <div className="modal-user-content">
            <div className='card-users modal-verificate'>
                <div className='head-card-users'>
                    <div className='title-head-card-users'>
                        {'VALIDAR USUARIO'}
                    </div>
                </div>
                <div className='content-card-users'>
                
                                    <div className="form-admin-box"> 
                                    <div className='cont-img-user-box-admin'>
                                    <img  className='img-user-box-admin' src={'/iconos/user_invalid_rojo.png'} name="valid" />
                                    </div>
                                    <div className='title-user-box-admin '>
                                        <div className='txt-title-user-box-admin  modal-verificate'>
                                        Este usuario no ha sido verificado, favor de completar el registro:
                                            
                                        </div>
                                    </div>
                                    <div className="user-box-admin">
                                    <input required name="old_password"  type="text" value={old_password}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Contraseña actual</label>
                                        {
                                            // (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-admin">
                                        <input required name="new_password"  type="password" value={new_password}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Nueva contraseña</label>
                                        {
                                            (new_password==="" || passwordValid )?'':<span className='form-msg-error'> La contraseña debe incluir a-z A-Z 0-9 y algun caracter especial</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-admin">
                                        <input required name="new_password_confirmation"  type="password" value={new_password_confirmation}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Confirmar contraseña</label>
                                        {
                                            (new_password_confirmation==="" || matchPassword)?'':<span className='form-msg-error'>Las contraseñas no coinciden</span>
                                        }
                                        
                                    </div>
                                   
                                    <div className="user-box-admin">
                                        {
                                            (loadingM)?<LoadSimple></LoadSimple>
                                            :
                                            <Action disabled={disabled} origen='Login' titulo='Guardar'  action={Actualizar}/>
                                        }
                                            
                                    {
                                        // (registerIsValid && data.message!=="User deleted successfully")?<span className='form-msg-ok'>Usuario registrado correctamente</span>:''
                                    }
                                        
                                    </div>
                                </div>
                </div>
                </div>
        </div>
    )
}

export default ModalverificateUSer