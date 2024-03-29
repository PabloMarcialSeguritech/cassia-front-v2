
import { useState,useEffect } from 'react'
import './styles/RolesAdmin.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import Selector from '../Selector'
import LoadSimple from '../LoadSimple'
import {roles}  from '../generales/GroupsId';
const RolesAdmin=({server})=>{
    console.log('entra roles')
    const [editActive, setEditActive] = useState(false);
    const [nivelForm,setNivelForm]=useState(1)
    const [userData,setUserData]=useState({name:"",description:"",permissions:""})
    const [disabled,setDisabled]=useState(true)
    const [permisos,setPermisos]=useState([])
    const [loading,setLoading]=useState(false)
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
      });
    const [dataPermisos,setDataPermisos]=useState({data:[],loading:true,error:''})
    const [dataRoles,setDataRoles]=useState({data:[],loading:true,error:''})
    // const dataPermisos=useFetch('cassia/users/roles/permissions/get','',localStorage.getItem('access_token'),'GET',server)
    // const dataRoles=useFetch('cassia/users/roles','',localStorage.getItem('access_token'),'GET',server)
    console.log(dataPermisos)
    console.log(permisos.join(','))
    const addPermiso=(e)=>{
        console.log('addPermiso')
        
        if (permisos.includes(e)) {
            // Eliminar el valor si ya existe
            const nuevoArreglo = permisos.filter(valor => valor !== e);
            setPermisos(nuevoArreglo);
          } else {
            // Agregar el valor si no existe
            const nuevoArreglo = [...permisos, e];
            setPermisos(nuevoArreglo);
          }
        // const nuevoArreglo = [...permisos, e]
        
        
    }

    useEffect(()=>{
        console.log(permisos.length)
        if(permisos.length!==0  && userData.name!==""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
        setUserData((prevState)=>{
            return {
                ...prevState,
                ['permissions']:permisos.join(',')
            }
            
        })
    },[permisos])
    const handleChange=(e)=>{
        console.log(e)
        const {name,value}=e.target
        setUserData((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
            
        })
        if(permisos.length!==0  && value!==""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
      }
      
      const getPermisos=()=>{
        console.log('solicita permisos')
        setDataPermisos({data:dataPermisos.data,loading:true,error:''})
          const fetchDataPost = async () => {
            
         try {
            console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles/permissions/get')
            console.log(JSON.stringify(userData))
            console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles/permissions/get', {
                method: 'GET',  
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              });
             console.log(response)
              if (response.ok) {
                
                const data1 = await response.json();
               
                setDataPermisos({data:data1,loading:false,error:''})
               
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
                setDataPermisos({data:dataPermisos.data,loading:false,error:''})
              console.error(error);
            }
          };
      
          fetchDataPost();
          
    
  }
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
    console.log('inicia roles')
    getPermisos()
    getRoles()
},[])
  const Guardar=()=>{
        console.log(userData)
        console.log("registra")
        let method='POST'
        let url_add=''
        if(editActive){
            method='PUT'
            // url_add=userId
        }
        
        console.log(method)
        console.log(userData)
        console.log(JSON.stringify(userData))
        setLoading(true)
          const fetchDataPost = async () => {
            
         try {
            console.log(method,'http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles/'+url_add)
            console.log(JSON.stringify(userData))
            console.log(localStorage.getItem('access_token'))
              const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles/'+url_add, {
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
                setUserData({name:"",description:"",permissions:""})
                setPermisos([])
                getPermisos()
                getRoles()
                // // Manejo de la respuesta
                // setData(data1)
                console.log(data1);
              } else {
                throw new Error('Error en la solicitud');
              }
            } catch (error) {
                setUserData({name:"",description:"",permissions:""})
                setPermisos([])
        
        setLoading(false)
              console.error(error);
            }
          };
      
          fetchDataPost();
          
    
  }
  const handledeleteRolClick=(rol_id)=>{
    console.log('elimina permisos',rol_id)
    setDataRoles({data:dataPermisos.data,loading:true,error:''})
      const fetchDataPost = async () => {
        
     try {
        console.log('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles/'+rol_id)
        console.log(JSON.stringify(userData))
        console.log(localStorage.getItem('access_token'))
          const response = await fetch('http://'+server.ip+':'+server.port+'/api/v1/cassia/users/roles/'+rol_id, {
            method: 'Delete',  
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
         console.log(response)
          if (response.ok) {
            
            const data1 = await response.json();
           
            getRoles()
           
          } else {
            throw new Error('Error en la solicitud');
          }
        } catch (error) {
            setDataRoles({data:dataPermisos.data,loading:false,error:''})
          console.error(error);
        }
      };
  
      fetchDataPost();
      
  }
      const {name,description,permissions}=userData
    return (
        <div className="main-users-admin">
            <div className='content-users-admin'>
                <div className='rigth-users-admin block-users-admin' >
                    <div className='card-users'>
                            <div className='head-card-users'>
                                <div className='title-head-card-users'>
                                    CREAR ROL
                                </div>
                            </div>
                            <div className='content-card-users'>
                                {2===1?
                                    <>
                                    {/* <div className="form-admin-box"> 
                                    <div className='title-user-box-admin'>
                                        <div className='txt-title-user-box-admin'>
                                            Datos
                                        </div>
                                    </div>
                                    <div className="user-box-admin">
                                    <Selector opGeneral={false}   txtOpGen={''} origen={'admin'} data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' props={[]}></Selector>
                                    </div>
                                    
                                    <div className="user-box-admin">
                                        <input required name="correo"  type="text" value={correo}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Correo</label>
                                    </div>
                                    <div className="user-box-admin">
                                        <input required name="username"  type="text" value={username}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Usuario</label>
                                    </div>
                                    
                                    <div className="user-box-admin">
                                    <Action disabled={disabled} origen='Login' titulo='Siguiente'  action={Guardar}/>
                                    
                                    </div>
                                </div> */}
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
                                            {/* <div class="container-tabs-roles"> 
                                                <div class="tabs-roles">
                                                    <div className='box-text'>
                                                        <div className='txt-box-text'>Tipo:</div>
                                                    </div>
                                                    <div className='box-options'>
                                                    <input type="radio" id="radio-1" name="tabs-roles" defaultChecked />
                                                    <label class="option-role" for="radio-1" >Administrador</label>
                                                    <input type="radio" id="radio-2" name="tabs-roles"/>
                                                    <label class="option-role" for="radio-2">Rol 1</label>
                                                    <input type="radio" id="radio-3" name="tabs-roles"/>
                                                    <label class="option-role" for="radio-3">Rol2</label>
                                                    <span class="glider"></span>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="user-box-admin" style={{height:'100%'}}>
                                        <input required name="name"  type="text" value={name}
                                    onChange={handleChange}  style={{top: '14%',position: 'absolute'}}/>
                                        <label className='label-admin' >ROL</label>
                                    </div>
                                        </div>
                                        <div className='content-permissions'>
                                            <div className='table-permissions' style={{top: '7%'}}>
                                                <div className='head-card-users'>
                                                    <div className='title-head-card-users'>
                                                        Seleccione permisos
                                                    </div>
                                                </div>
                                                <div className='content-list-permissions'>
                                                    <div className='center-content-list'>
                                                        { (dataPermisos.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:
                                                dataPermisos.data.data.map((element,index)=>(
                                                    <div className='compact-option-permission'>
                                                    <label class="cyberpunk-checkbox-label">
                                                        <input  id={'check-permission-'+element.permission_id} type="checkbox" class="cyberpunk-checkbox" onClick={()=>addPermiso(element.permission_id)}/>
                                                        <p>{element.module_name}</p>
                                                    </label>
                                                    </div>
                                            ))}
                                                        
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-box-admin">
                                    {/* <Action disabled={false} origen='Login' titulo='Atras'  action={Guardar}/> */}
                                    {(loading)?<LoadSimple/>:<Action disabled={disabled} origen='Login' titulo='Guardar'  action={Guardar}/>}
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
                                    Roles
                                </div>
                            </div>
                            <div className='content-card-users' style={{height: '90%'}}>
                            <div className='cont-table-users-main'>
                                <div className='cont-table-users cont-table-roles' >
                                    <div className='head-table-users'>
                                        {/* <div className='field-head-table-users field-acciones'>
                                            Acciones
                                        </div> */}
                                        <div className='field-head-table-users field-nombre' style={{width:'30%'}}>
                                            Rol
                                        </div>
                                        { (dataPermisos.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:
                                                dataPermisos.data.data.map((element,index)=>(
                                                    <div className='field-head-table-users field-nombre' style={{width:'20%',fontSize:'small', display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                                            {element.module_name}
                                        </div>
                                            ))}
                                             <div className='field-head-table-users field-nombre' style={{width:'20%'}}>
                                            
                                        </div>
                                        {/* <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
                                            Usuarios
                                        </div>
                                        <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
                                            Monitoreo
                                        </div>
                                        <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
                                        permiso 3
                                        </div>
                                        <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
                                        permiso 4
                                        </div>
                                        <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
                                        permiso 5
                                        </div> */}
                                        
                                        

                                    </div>
                                    <div className='body-table-users'>
                                    <div className='cont-row-user-list'>
                                    { (dataRoles.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:
                                                dataRoles.data.data.map((element,index)=>(
                                                    <div className='row-table-users' key={index}>
                                                    <div className='field-body-table-users field-nombre' style={{width:'30%'}}>
                                                      {element.name}
                                                    </div>
                                                    {(dataPermisos.loading)?<div style={{width:'100%',height:'95%',display:'flex',justifyContent:'center'}}><LoadSimple></LoadSimple></div>:dataPermisos.data.data.map((permiso,index)=>(
                                                    <div className='field-body-table-users field-correo' style={{width:'20%',fontWeight:'bold'}}>
                                                    {
                                                    (element.permissions.some(objeto => objeto.permission_id === permiso.permission_id))?'X':''
                                                    }
                                                    </div>
                                            ))}
                                            <div className='field-body-table-users field-correo' style={{width:'20%',fontWeight:'bold'}}>
                                            <img className='img-field-acciones' src='/iconos/delete.png' title='Eliminar'name='Eliminar' rol_id={element.rol_1} onClick={(e)=> {e.stopPropagation(); handledeleteRolClick(element.rol_id)}} />
                                                    </div>
                                                    {/* <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                                                    X
                                                    </div>
                                                    <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                                                    X
                                                    </div>
                                                    <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                                                    X
                                                    </div>
                                                    <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                                                      X
                                                    </div>
                                                    <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                                                      X
                                                    </div> */}
                                                  </div>   
                                            ))}
        
            
            {/* <div className='row-table-users' key={1}>
              <div className='field-body-table-users field-nombre' style={{width:'30%'}}>
                Basico
              </div>
              <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
              
              </div>
              <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
              X
              </div>
              <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
              
              </div>
              <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                
              </div>
              <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                
              </div>
            </div> */}
        
        
      </div>
                                        
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RolesAdmin