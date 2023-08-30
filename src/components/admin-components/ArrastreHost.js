
import { useState,useEffect } from 'react'
import './styles/ArrastreHost.css'
import Action from '../Action'
import { useFetch } from '../../hooks/useFetch'
import Selector from '../Selector'
const ArrastreHost=()=>{
    const [nivelForm,setNivelForm]=useState(1)
    const [userData,setUserData]=useState({nombre:"",correo:"",username:""})
    const [disabled,setDisabled]=useState(true)
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
      });
    const dataLocations=useFetch('zabbix/groups/municipios','',localStorage.getItem('access_token'),'GET')
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
      useEffect(()=>{
    console.log(userData.nombre,userData.correo,userData.username)
        if(userData.nombre==="" || userData.correo===""  || userData.username===""){
            console.log('disabled')
            setDisabled(true)
        }else{
            console.log('no disabled')
            setDisabled(false)
        }
  },[userData])

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
                                    HOSTS
                                </div>
                            </div>
                            <div className='content-card-users'>
                                {/* {2===1?
                                    <>
                                    <div className="form-admin-box"> 
                                    <div className='title-user-box-admin'>
                                        <div className='txt-title-user-box-admin'>
                                            Datos
                                        </div>
                                    </div>
                                    <div className="user-box-admin">
                                    <Selector origen={'admin'} data={dataLocations.data.data} loading={dataLocations.loading}  titulo='Municipio' props={[]}></Selector>
                                    </div>
                                    <div className="user-box-admin">
                                        <input required name="nombre"  type="text" value={nombre}
                                    onChange={handleChange} />
                                        <label className='label-admin'>Nombre</label>
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
                            } */}
                            </div>
                    </div>
                </div>
                {/* <div className='left-users-admin block-users-admin' >
                    <div className='card-users'>
                        <div className='head-card-users'>
                                <div className='title-head-card-users'>
                                    Roles
                                </div>
                            </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ArrastreHost