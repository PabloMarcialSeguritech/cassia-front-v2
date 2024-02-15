import { useState,useEffect } from 'react'
import './styles/ConfigUser.css'

const ConfigUser=(props)=>{
    const [permisos,setPermisos]=useState([])
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
     return (
        <div className='cont-config-user'>
            <div className='cont-info-user'>
                <div className=' info-user'>
                    <div className='title-info-user'>
                        Nombre:
                    </div>
                    <div className='txt-info-user'>
                        Luis Giovanni Rocha Carrizales
                    </div>
                </div>
                <div className=' info-user'>
                    <div className='title-info-user'>
                        Correo:
                    </div>
                    <div className='txt-info-user'>
                        luis.rocha@seguritech.com
                    </div>
                </div>
                <div className=' info-user'>
                    <div className='title-info-user'>
                       Rol:
                    </div>
                    <div className='txt-info-user'>
                        Administrador
                    </div>
                </div>
            </div>
            <div className='cont-roles-user'>
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
        </div>

     )
}

export default ConfigUser