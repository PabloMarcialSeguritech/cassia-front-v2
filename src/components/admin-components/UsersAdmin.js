
import { useState,useEffect } from 'react'
import './styles/UsersAdmin.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import { useFetchPost } from '../../hooks/useFetchPost'
import Selector from '../Selector'
import LoadAdding from '../LoadAdding'
import LoadSimple from '../LoadSimple'
import UserList from './UserList'
import TableUsers from './TableUsers'
import ConfigUser from './ConfigUser'
import {roles}  from '../generales/GroupsId';
const UsersAdmin=({server})=>{
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
    const [rol, setRol] = useState(2);
    console.log(userData)
    const [dataRoles,setDataRoles]=useState({data:[],loading:true,error:''})
    // const dataRoles=useFetch('cassia/users/roles','',localStorage.getItem('access_token'),'GET',server)
    const getRoles=()=>{
        console.log('solicita permisos')
        setDataRoles({data:dataRoles.data,loading:true,error:''})
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles')
            console.log(JSON.stringify(userData))
            console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles', {
                method: 'GET',  
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
               
                setDataRoles({data:data1,loading:false,error:''})
               
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
                setDataRoles({data:dataRoles.data,loading:false,error:''})
              console.error(error);
            }
          };
      
          fetchDataPost();
          
    
    }
    useEffect(()=>{
        getRoles()
    },[])
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
      });
    
    const addRoles=(e)=>{
        console.log(e)
        setUserData((prevState)=>{
            return {
                ...prevState,
                ['roles']:''+e
            }
            
        })

    }
    const handleChange=(e)=>{
        console.log(e.target.name)
        setRol(parseInt(e.target.value, 10))
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
    getRoles()
    setUserData({name:user.name,mail:user.mail,roles:""+rolIds})
    setUserId(user.user_id)
    setRol(rolIds)
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
        console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/users/'+url_add)
        console.log(JSON.stringify(userData))
        console.log(localStorage.getItem('access_token'))
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/'+url_add, {
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
            Regresar()
            getRoles()
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
            setUserData({name:"",mail:"",roles:"1"})
    
    setLoading(false)
          // Manejo de errores
          setError(error)
          setRegisterIsValid(true)
          const timer = setTimeout(() => {
            setRegisterIsValid(false)
            setEditActive(false)
          }, 3000);
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
                                            (name==="" || nombreIsValid)?'':<span className='form-msg-error-admin'> Nombre no valido</span>
                                        }
                                        
                                    </div>
                                    <div className="user-box-admin">
                                        <input required name="mail"  type="text" value={mail}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Correo</label>
                                        {
                                            (mail==="" || correoIsValid)?'':<span className='form-msg-error-admin'> Correo no valido.</span>
                                        }
                                        
                                    </div>
                                   <div className="user-box-admin roles">
                                   <div className="container-tabs-roles"> 
                                                <div className="tabs-roles">
                                                    <div className='box-text'>
                                                        <div className='txt-box-text'>Rol: </div>
                                                    </div>
                                                    <div className='box-options'>
                                                    { (dataRoles.loading)?<LoadSimple></LoadSimple>:
                                                    
                                                dataRoles.data.data.map((element,index)=>(
                                                    <>
                                                    <div className='contOptionRol'>
                                                        <input type="radio" id={"radio-"+index} name="tabs-roles" defaultChecked={(element.rol_id == userData.roles)}   />
                                                        <label className="option-role" htmlFor={"radio-"+index} onClick={()=>addRoles(element.rol_id)}>{element.name}</label>
                                                        </div>
                                                    </>
                                                ))}
                                                        {/* <div className='contOptionRol'>
                                                        <input type="radio" id="radio-2" name="tabs-roles" defaultChecked={rol===1}/>
                                                     
                                                     <label className="option-role" htmlFor="radio-2"   onClick={()=>addRoles(1)}>Administrador</label>
                                                     
                                                        </div> */}
                                                        
                                                    {/* <span className="glider"></span> */}
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
                                        (registerIsValid && data.message!=="User deleted successfully")?<span className='form-msg-ok'>{'Usuario '+(editActive? 'editado':'registrado' )+' correctamente'}</span>:''
                                    }
                                        
                                    </div>
                                </div>
                                    </> 
                                    :''
                                 
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
                            <div className='content-card-users' style={{height: '90%' }}>
                                <TableUsers registerIsValid={registerIsValid}  server={server} handleChangEdit={handleChangEdit} setData={setData} setLoading={setLoading} setError={setError}/>
                                {/* <ConfigUser></ConfigUser> */}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersAdmin