
import { useState,useEffect } from 'react'
import './styles/RolesAdmin.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import Selector from '../Selector'
const RolesAdmin=({server})=>{
    const [nivelForm,setNivelForm]=useState(1)
    const [userData,setUserData]=useState({nombre:"",correo:"",username:""})
    const [disabled,setDisabled]=useState(true)
    const [permisos,setPermisos]=useState([])
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
      });
    const dataLocations=useFetch('zabbix/groups/municipios','',localStorage.getItem('access_token'),'GET',server)
    console.log(permisos)
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
        if(permisos.length===0){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
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
        
      }
      

  const handleChangform=()=>{
        nivelForm===1?setNivelForm(2):setNivelForm(1)
  }
      const {nombre,correo,username}=userData
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
                                    <div className="form-admin-box"> 
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
                                    <Action disabled={disabled} origen='Login' titulo='Siguiente'  action={handleChangform}/>
                                    
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
                                            <div className="user-box-admin">
                                        <input required name="nombre"  type="text" value={nombre}
                                    onChange={handleChange}  style={{top: '14%',position: 'absolute'}}/>
                                        <label className='label-admin' style={{top:'10px'}}>Nombre</label>
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
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox" onClick={()=>addPermiso(1)}/>
                                                        Usuarios</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox" onClick={()=>addPermiso(2)}/>
                                                        Monitoreo</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox" onClick={()=>addPermiso(3)}/>
                                                        permiso 3</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox" onClick={()=>addPermiso(3)}/>
                                                        permiso 4</label>
                                                        </div>
                                                        <div className='compact-option-permission'>
                                                        <label class="cyberpunk-checkbox-label">
                                                        <input type="checkbox" class="cyberpunk-checkbox" onClick={()=>addPermiso(4)}/>
                                                        permiso 5</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-box-admin">
                                    {/* <Action disabled={false} origen='Login' titulo='Atras'  action={handleChangform}/> */}
                                    <Action disabled={disabled} origen='Login' titulo='Guardar'  action={handleChangform}/>
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
                            <div className='content-card-users'>
                                <div className='cont-table-users'>
                                    <div className='head-table-users'>
                                        {/* <div className='field-head-table-users field-acciones'>
                                            Acciones
                                        </div> */}
                                        <div className='field-head-table-users field-nombre' style={{width:'30%'}}>
                                            Rol
                                        </div>
                                        <div className='field-head-table-users field-nombre' style={{width:'15%'}}>
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
                                        </div>
                                        
                                        

                                    </div>
                                    <div className='body-table-users'>
                                    <div className='cont-row-user-list'>
        
        
            <div className='row-table-users' key={0}>
              <div className='field-body-table-users field-nombre' style={{width:'30%'}}>
                Administrador
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
              </div>
              <div className='field-body-table-users field-correo' style={{width:'15%',fontWeight:'bold'}}>
                X
              </div>
            </div>
            <div className='row-table-users' key={0}>
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