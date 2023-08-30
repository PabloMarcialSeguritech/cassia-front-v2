
import { useState,useEffect } from 'react'
import './styles/UsersAdmin.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import { useFetchPost } from '../../hooks/useFetchPost'
import Selector from '../Selector'
import LoadAdding from '../LoadAdding'
import LoadSimple from '../LoadSimple'
import UserList from './UserList'
const UsersAdmin=()=>{
    const [nivelForm,setNivelForm]=useState(1)
    const [userData,setUserData]=useState({name:"",mail:"",roles:"1"})
    const [disabled,setDisabled]=useState(true)
    const [correoIsValid, setCorreoIsValid] = useState(true);
    const [nombreIsValid, setNombreIsValid] = useState(true);
    const [registerIsValid, setRegisterIsValid] = useState(false);
    const [editActive, setEditActive] = useState(false);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [userId,setUserId]=useState(0)
    
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
      });
    
    const handleChange=(e)=>{
        console.log(e.target.name)
        const {name,value}=e.target
        setUserData((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
            
        })
        if(e.target.name=="mail"){
            setCorreoIsValid(validateEmail(value))
        }else if(e.target.name=="name"){
            setNombreIsValid(validateName(value))
        }
        
        
      }
      useEffect(()=>{
    console.log(userData.name,userData.mail)
        if(userData.name==="" || userData.mail==="" || nombreIsValid===false || correoIsValid===false ){
            console.log('disabled')
            setDisabled(true)
        }else{
            console.log('no disabled')
            setDisabled(false)
        }
  },[userData])
  useEffect(()=>{
    console.log(data)
    if(data.length!==0){
        if(data.success===true ){
            setRegisterIsValid(true) 
            setUserData({name:"",mail:"",roles:"1"})
            
        }
    }
    const timer = setTimeout(() => {
        setRegisterIsValid(false)
        
      }, 3000);
  
      return () => {
        // Limpieza: cancelar el temporizador si el componente se desmonta antes de que expire
        clearTimeout(timer);
      };
  },[data])
  
  const handleChangform=()=>{
        nivelForm===1?setNivelForm(2):setNivelForm(1)
  }
  const Regresar=()=>{
    setUserData({name:"",mail:"",roles:"1"})
    setEditActive(false)
    setLoading(false)
  }
  const handleChangEdit=(user)=>{
    setLoading(false)
    console.log("editar")
    console.log(user.roles)
    const rolIds = user.roles.map(obj => obj.rol_id).join(',')
    console.log(rolIds)
    setEditActive(true)
    setUserData({name:user.name,mail:user.mail,roles:""+rolIds})
    setUserId(user.user_id)
}
const Registrar=()=>{
    console.log("registra")
    let method='POST'
    let url_add=''
    if(editActive){
        method='PUT'
        url_add=userId
    }
    
    console.log(method)
    console.log(userData)
    console.log(JSON.stringify(userData))
    setLoading(true)
      const fetchDataPost = async () => {
        
     try {
          const response = await fetch('http://172.18.200.14:8002/api/v1/cassia/users/'+url_add, {
            method: method,  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(userData),
          });
         console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
            setLoading(false)
            // Manejo de la respuesta
            setData(data1)
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

  const validateEmail = (email) => {
    console.log("validando correo: ",email )
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@seguritech\.com$/;
    let result = emailRegex.test(email);
    return result;
  };
  const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{8,}$/;
    let result = nameRegex.test(name);
    return result;
  };
      const {name,mail}=userData
    return (
        <div className="main-users-admin">
            <div className='content-users-admin'>
                <div className='rigth-users-admin block-users-admin' >
                    <div className='card-users'>
                            <div className='head-card-users'>
                                
                                    {
                                        (editActive)?
                                        <div className='cont-btn-back-users' onClick={Regresar}>
                                            <div className='cont-img-back-users'>
                                                <img  className='img-back-users' src={'/iconos/btn_crear_usuario_gris.png'} name="regresar" />
                                                </div>
                                                <div className='cont-txt-back-users'>
                                                <div className='txt-back-users'>
                                                    Regresar
                                                </div>
                                            </div>
                                        </div>
                                        :''
                                    }
                                    
                                <div className='title-head-card-users'>
                                   {(editActive)?'EDITAR USUARIO':' CREAR USUARIO'}
                                </div>
                            </div>
                            <div className='content-card-users'>
                                {nivelForm===1?
                                    <>
                                    <div className="form-admin-box"> 
                                    <div className='cont-img-user-box-admin'>
                                    <img  className='img-user-box-admin' src={'/iconos/btn_'+((editActive)?'editar':'crear')+'_usuario_azul.png'} name="crear" />
                                    </div>
                                    <div className='title-user-box-admin'>
                                        <div className='txt-title-user-box-admin'>
                                        {(editActive)?'Editar Datos':' Ingresar Datos'}
                                            
                                        </div>
                                    </div>
                                    {/* <div className="user-box-admin">
                                    <Selector origen={'admin'} data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' props={[]}></Selector>
                                    </div> */}
                                    <div className="user-box-admin">
                                        <input required name="name"  type="text" value={name}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Nombre</label>
                                        {
                                            (name==="" || nombreIsValid)?'':<span className='form-msg-error'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-admin">
                                        <input required name="mail"  type="text" value={mail}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Correo</label>
                                        {
                                            (mail==="" || correoIsValid)?'':<span className='form-msg-error'> Correo no valido.</span>
                                        }
                                        
                                    </div>
                                   <div className="user-box-admin roles">
                                   <div class="container-tabs-roles"> 
                                                <div class="tabs-roles">
                                                    <div className='box-text'>
                                                        <div className='txt-box-text'>Rol:</div>
                                                    </div>
                                                    <div className='box-options'>
                                                    <input type="radio" id="radio-1" name="tabs-roles" />
                                                    <label class="option-role" for="radio-1" checked="checked">Administrador</label>
                                                    <input type="radio" id="radio-2" name="tabs-roles"/>
                                                    <label class="option-role" for="radio-2">Basico</label>
                                                    {/* <input type="radio" id="radio-3" name="tabs-roles"/>
                                                    <label class="option-role" for="radio-3">Rol2</label> */}
                                                    <span class="glider"></span>
                                                    </div>
                                                </div>
                                            </div>
                                   </div>
                                    <div className="user-box-admin">
                                        {
                                            (loading)?<LoadSimple></LoadSimple>
                                            :
                                            <Action disabled={disabled} origen='Login' titulo='Guardar'  action={Registrar}/>
                                        }
                                            
                                    {
                                        (registerIsValid && data.message!=="User deleted successfully")?<span className='form-msg-ok'>Usuario registrado correctamente</span>:''
                                    }
                                        
                                    </div>
                                </div>
                                    </> 
                                    :
                                    <div className="form-admin-box"> 
                                    <div className='title-user-box-admin'>
                                        <div className='txt-title-user-box-admin'>
                                            Permisos
                                        </div>
                                    </div>
                                    <div className='content-box-admin'>
                                        <div className='content-roles'>
                                            <div class="container-tabs-roles"> 
                                                <div class="tabs-roles">
                                                    <div className='box-text'>
                                                        <div className='txt-box-text'>Tipo:</div>
                                                    </div>
                                                    <div className='box-options'>
                                                    <input type="radio" id="radio-1" name="tabs-roles" />
                                                    <label class="option-role" for="radio-1" checked="checked">Administrador</label>
                                                    <input type="radio" id="radio-2" name="tabs-roles"/>
                                                    <label class="option-role" for="radio-2">Rol 1</label>
                                                    <input type="radio" id="radio-3" name="tabs-roles"/>
                                                    <label class="option-role" for="radio-3">Rol2</label>
                                                    <span class="glider"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className='content-permissions'>
                                            <div className='table-permissions'>
                                                <div className='head-card-users'>
                                                    <div className='title-head-card-users'>
                                                        Seleccione permisos
                                                    </div>
                                                </div>
                                                <div className='content-list-permissions'>
                                                    <div className='center-content-list'>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox"/>
                                                        permiso 1</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox"/>
                                                        permiso 2</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox"/>
                                                        permiso 3</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox"/>
                                                        permiso 4</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox"/>
                                                        permiso 5</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-box-admin">
                                    <Action disabled={false} origen='Login' titulo='Atras'  action={handleChangform}/>
                                    <Action disabled={true} origen='Login' titulo='Guardar'  action={handleChangform}/>
                                    </div>
                                </div>   
                            }
                            </div>
                    </div>
                </div>
                <div className='left-users-admin block-users-admin' >
                    <div className='card-users'>
                        <div className='head-card-users'>
                                <div className='title-head-card-users'>
                                    USUARIOS
                                </div>
                            </div>
                            <div className='content-card-users'>
                                <div className='cont-table-users'>
                                    <div className='head-table-users'>
                                        <div className='field-head-table-users field-acciones'>
                                            Acciones
                                        </div>
                                        <div className='field-head-table-users field-nombre'>
                                            Nombre
                                        </div>
                                        <div className='field-head-table-users field-correo'>
                                            Correo
                                        </div>
                                    </div>
                                    <div className='body-table-users'>
                                        {
                                            ( registerIsValid)?<div className='cont-load-user-list'><LoadSimple></LoadSimple></div>:
                                            <UserList handleChangEdit={handleChangEdit} setData={setData} setLoading={setLoading} setError={setError}></UserList>
                                        
                                          }
                                        
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersAdmin